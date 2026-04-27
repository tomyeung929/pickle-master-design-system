import supabase from '../_lib/supabase.js';
import { getUser, parseBody, json, cors } from '../_lib/auth.js';
import { sendTournamentConfirmation } from '../_lib/resend.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const user = await getUser(req);
  if (!user) return json(res, 401, { error: 'Login required to register for tournaments' });

  const key = req.query.key;
  if (!key) return json(res, 400, { error: 'Tournament key required' });

  let body;
  try { body = await parseBody(req); } catch { body = {}; }

  const { partner_name, notes } = body;

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('*')
    .eq('key', key)
    .eq('active', true)
    .single();

  if (!tournament) return json(res, 404, { error: 'Tournament not found' });

  // Members-only check
  if (tournament.members_only && user.tier === 'guest') {
    return json(res, 403, { error: 'This tournament is for members only' });
  }

  // Capacity check
  if (tournament.capacity) {
    const { count } = await supabase
      .from('tournament_registrations')
      .select('*', { count: 'exact', head: true })
      .eq('tournament_key', key);
    if (count >= tournament.capacity) return json(res, 409, { error: 'Tournament is full' });
  }

  const { error } = await supabase.from('tournament_registrations').insert({
    tournament_key: key,
    user_id: user.id,
    partner_name: partner_name || null,
    notes: notes || null,
  });

  if (error) {
    if (error.code === '23505') return json(res, 409, { error: 'Already registered for this tournament' });
    return json(res, 500, { error: error.message });
  }

  try {
    await sendTournamentConfirmation({
      to: user.email,
      name: user.name,
      eventName: tournament.name_en,
    });
  } catch (e) {
    console.error('Tournament email failed:', e.message);
  }

  return json(res, 200, { success: true });
}
