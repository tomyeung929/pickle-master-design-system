const supabase = require('../_lib/supabase.js');
const { getUser, json, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return json(res, 405, { error: 'Method not allowed' });

  const user = await getUser(req);
  if (!user) return json(res, 401, { error: 'Unauthorized' });

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      id, booking_date, slot_time, price_paid, status, created_at,
      courts (name),
      session_types (label_en, label_zh)
    `)
    .eq('user_id', user.id)
    .neq('status', 'cancelled')
    .order('booking_date', { ascending: false })
    .limit(20);

  if (error) return json(res, 500, { error: error.message });

  return json(res, 200, { bookings: bookings || [] });
};
