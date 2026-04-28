const supabase = require('./_lib/supabase.js');
const { json, cors } = require('./_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  const { data } = await supabase.from('courts').select('id, name').eq('active', true).order('name');
  return json(res, 200, { courts: data || [] });
};
