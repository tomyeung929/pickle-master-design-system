const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { data: tournaments, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('sort_order');
    if (error) return json(res, 500, { error: error.message });

    const { data: regs } = await supabase
      .from('tournament_registrations')
      .select('tournament_key');
    const counts = {};
    (regs || []).forEach(r => { counts[r.tournament_key] = (counts[r.tournament_key] || 0) + 1; });

    return json(res, 200, {
      tournaments: tournaments.map(t => ({ ...t, registration_count: counts[t.key] || 0 }))
    });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { action, key, ...fields } = body;

    if (action === 'create') {
      const { data, error } = await supabase.from('tournaments').insert({ key, ...fields }).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { tournament: data });
    }

    if (action === 'update') {
      const { data, error } = await supabase.from('tournaments').update(fields).eq('key', key).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { tournament: data });
    }

    if (action === 'delete') {
      const { error } = await supabase.from('tournaments').delete().eq('key', key);
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { ok: true });
    }

    return json(res, 400, { error: 'Unknown action' });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
