const supabase = require('../_lib/supabase.js');
const { json, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const { data: tournaments } = await supabase
    .from('tournaments')
    .select('id, key, name_en, name_zh, date_label, capacity, members_only')
    .eq('active', true)
    .order('sort_order');

  if (!tournaments) return json(res, 200, { tournaments: [] });

  const { data: regCounts } = await supabase
    .from('tournament_registrations')
    .select('tournament_key');

  const counts = {};
  (regCounts || []).forEach(r => {
    counts[r.tournament_key] = (counts[r.tournament_key] || 0) + 1;
  });

  const result = tournaments.map(t => {
    const registered = counts[t.key] || 0;
    let status = 'open';
    if (t.members_only) status = 'members_only';
    if (t.capacity && registered >= t.capacity) status = 'full';
    return Object.assign({}, t, { registered, status });
  });

  return json(res, 200, { tournaments: result });
};
