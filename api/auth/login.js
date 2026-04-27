import supabase from '../_lib/supabase.js';
import { parseBody, json, cors } from '../_lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { email, password } = body;
  if (!email || !password) return json(res, 400, { error: 'email and password are required' });

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return json(res, 401, { error: 'Invalid email or password' });

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, name, email, tier')
    .eq('id', data.user.id)
    .single();

  return json(res, 200, {
    user: profile || { id: data.user.id, name: email, email, tier: 'guest' },
    session: { access_token: data.session.access_token },
  });
}
