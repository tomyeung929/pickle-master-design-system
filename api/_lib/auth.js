const supabase = require('./supabase.js');

async function getUser(req) {
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data.user) return null;
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email, tier, stripe_customer_id, is_admin')
    .eq('id', data.user.id)
    .single();
  return profile || null;
}

function json(res, status, body) {
  res.status(status).json(body);
}

async function parseBody(req) {
  if (req.body) return req.body;
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => { try { resolve(JSON.parse(data || '{}')); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
}

async function requireAdmin(req, res) {
  const user = await getUser(req);
  if (!user || !user.is_admin) {
    json(res, 403, { error: 'Forbidden' });
    return null;
  }
  return user;
}

module.exports = { getUser, requireAdmin, json, parseBody, cors };
