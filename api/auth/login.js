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

  // Call Supabase Auth REST API directly — avoids mutating the shared service-role
  // client's internal session (which would cause subsequent DB queries to run as the
  // user with RLS instead of as service role, silently returning null profiles).
  const authRes = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      },
      body: JSON.stringify({ email, password }),
    }
  );
  const authData = await authRes.json();
  if (authData.error || !authData.access_token) {
    return json(res, 401, { error: 'Invalid email or password' });
  }

  const userId = authData.user.id;

  // Service-role client is uncontaminated — reads bypass RLS correctly
  let { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email, tier, is_admin')
    .eq('id', userId)
    .single();

  if (!profile) {
    await supabase
      .from('profiles')
      .upsert({ id: userId, name: email, email, tier: 'guest' }, { onConflict: 'id', ignoreDuplicates: true });

    const { data: refetched } = await supabase
      .from('profiles')
      .select('id, name, email, tier, is_admin')
      .eq('id', userId)
      .single();
    profile = refetched;
  }

  return json(res, 200, {
    user: profile || { id: userId, name: email, email, tier: 'guest', is_admin: false },
    session: { access_token: authData.access_token },
  });
};
