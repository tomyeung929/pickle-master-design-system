const supabase = require('../_lib/supabase.js');
const { json, cors } = require('../_lib/auth.js');
const { statusFromCount, slotCapacity } = require('../_lib/pricing.js');

const SLOTS = {
  peak:    ['18:00', '19:00', '20:00', '21:00'],
  nonpeak: ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
  class:   ['09:00', '11:00', '14:00', '16:00', '18:00', '19:30'],
};

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const { court_id, date, session_type } = req.query;
  if (!court_id || !date || !session_type) {
    return json(res, 400, { error: 'court_id, date and session_type are required' });
  }

  const { data: st } = await supabase
    .from('session_types')
    .select('id, key, slot_type')
    .eq('key', session_type)
    .single();

  if (!st) return json(res, 404, { error: 'Unknown session type' });

  const slots = SLOTS[st.slot_type] || SLOTS.nonpeak;
  const capacity = slotCapacity(st.key);

  const { data: bookings } = await supabase
    .from('bookings')
    .select('slot_time')
    .eq('court_id', court_id)
    .eq('booking_date', date)
    .eq('session_type_id', st.id)
    .in('status', ['pending', 'confirmed']);

  const counts = {};
  (bookings || []).forEach(b => {
    const t = b.slot_time.slice(0, 5);
    counts[t] = (counts[t] || 0) + 1;
  });

  const result = slots.map(slot => ({
    slot,
    status: statusFromCount(counts[slot] || 0, capacity),
  }));

  return json(res, 200, { slots: result, session_type_id: st.id });
};
