const supabase = require('./_lib/supabase.js');
const { json, cors } = require('./_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const { key, keys } = req.query;

  if (key) {
    const { data, error } = await supabase
      .from('site_content')
      .select('key, value')
      .eq('key', key)
      .single();
    if (error) return json(res, 404, { error: 'Not found' });
    return json(res, 200, { [data.key]: data.value });
  }

  const keyList = keys ? keys.split(',').map(k => k.trim()).filter(Boolean) : null;
  const query = supabase.from('site_content').select('key, value');
  if (keyList) query.in('key', keyList);

  const { data, error } = await query;
  if (error) return json(res, 500, { error: error.message });

  const result = {};
  for (const row of data) result[row.key] = row.value;
  return json(res, 200, result);
};
