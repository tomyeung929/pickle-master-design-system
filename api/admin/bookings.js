const supabase = require('../_lib/supabase.js');
const { requireAdmin, json, parseBody, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();

  const admin = await requireAdmin(req, res);
  if (!admin) return;

  if (req.method === 'GET') {
    const { status, limit = 50 } = req.query || {};
    let query = supabase
      .from('bookings')
      .select(`
        id, booking_date, slot_time, price_paid, status, created_at,
        guest_email, guest_name,
        courts(name),
        session_types(key, label_en),
        profiles(name, email)
      `)
      .order('booking_date', { ascending: false })
      .order('slot_time', { ascending: false })
      .limit(Number(limit));

    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) return json(res, 500, { error: error.message });
    return json(res, 200, { bookings: data });
  }

  if (req.method === 'POST') {
    const body = await parseBody(req);
    const { action, id, status } = body;

    if (action === 'update_status') {
      const { data, error } = await supabase
        .from('bookings').update({ status }).eq('id', id).select().single();
      if (error) return json(res, 500, { error: error.message });
      return json(res, 200, { booking: data });
    }

    return json(res, 400, { error: 'Unknown action' });
  }

  return json(res, 405, { error: 'Method not allowed' });
};
