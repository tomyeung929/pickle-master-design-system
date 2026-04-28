const supabase = require('../_lib/supabase.js');
const { parseBody, json, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { name, email, password } = body;
  if (!name || !email || !password) return json(res, 400, { error: 'name, email and password are required' });
  if (password.length < 8) return json(res, 400, { error: 'Password must be at least 8 characters' });

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) return json(res, 400, { error: error.message });
  if (!data.user) return json(res, 400, { error: 'Registration failed' });

  await supabase.from('profiles').upsert({ id: data.user.id, name, email }, { onConflict: 'id' });

  return json(res, 200, {
    user: { id: data.user.id, name, email, tier: 'guest' },
    session: { access_token: data.session?.access_token || null },
  });
};
