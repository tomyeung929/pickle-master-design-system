const supabase = require('../_lib/supabase.js');
const { parseBody, json, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { email, password } = body;
  if (!email || !password) return json(res, 400, { error: 'email and password are required' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return json(res, 401, { error: 'Invalid email or password' });

  let { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email, tier, is_admin')
    .eq('id', data.user.id)
    .single();

  if (!profile) {
    const { data: upserted } = await supabase
      .from('profiles')
      .upsert({ id: data.user.id, name: email, email, tier: 'guest' }, { onConflict: 'id', ignoreDuplicates: true })
      .select('id, name, email, tier, is_admin')
      .single();
    profile = upserted;
  }

  return json(res, 200, {
    user: profile || { id: data.user.id, name: email, email, tier: 'guest', is_admin: false },
    session: { access_token: data.session.access_token },
  });
};
