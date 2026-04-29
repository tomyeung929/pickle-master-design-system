const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value, updated_at')
      .order('key');
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { content: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { key, value } = body;
    if (!key || value === undefined) return json(res, 400, { error: 'key and value are required' });

    const { data, error } = await supabase
      .from('site_content')
      .upsert({ key, value }, { onConflict: 'key' })
      .select()
      .single();
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { content: data });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
