const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('session_types')
      .select('*')
      .order('key');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { sessionTypes: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { id, ...fields } = body;
    const { data, error } = await supabase
      .from('session_types')
      .update(fields)
      .eq('id', id)
      .select()
      .single();
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { sessionType: data });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
