const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('courts')
      .select('*')
      .order('name');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { courts: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { action, id, ...fields } = body;

    if (action === 'update') {
      const { data, error } = await supabase.from('courts').update(fields).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { court: data });
    }

    if (action === 'create') {
      const { data, error } = await supabase.from('courts').insert(fields).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { court: data });
    }

    return json(res, 400, { error: 'Unknown action' });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
