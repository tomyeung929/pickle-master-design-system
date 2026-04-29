const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, tier, is_admin, created_at')
      .order('created_at', { ascending: false });
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { users: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { action, id, tier, is_admin } = body;

    if (action === 'update_tier') {
      const { data, error } = await supabase
        .from('profiles').update({ tier }).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { user: data });
    }

    if (action === 'toggle_admin') {
      const { data, error } = await supabase
        .from('profiles').update({ is_admin }).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { user: data });
    }

    return json(res, 400, { error: 'Unknown action' });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
