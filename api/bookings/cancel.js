const supabase = require('../_lib/supabase.js');
const stripe = require('../_lib/stripe.js');
const { getUser, json, cors } = require('../_lib/auth.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const user = await getUser(req);
  if (!user) return json(res, 401, { error: 'Unauthorized' });

  const bookingId = req.query.id;
  if (!bookingId) return json(res, 400, { error: 'Booking id required' });

  const { data: booking } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', bookingId)
    .eq('user_id', user.id)
    .single();

  if (!booking) return json(res, 404, { error: 'Booking not found' });
  if (booking.status === 'cancelled') return json(res, 400, { error: 'Already cancelled' });

  const bookingDateTime = new Date(`${booking.booking_date}T${booking.slot_time}`);
  const hoursUntil = (bookingDateTime - Date.now()) / 3600000;
  if (hoursUntil < 24) return json(res, 400, { error: 'Cancellations must be made at least 24 hours in advance' });

  if (booking.stripe_payment_intent_id) {
    try {
      const pi = await stripe.paymentIntents.retrieve(booking.stripe_payment_intent_id);
      if (pi.latest_charge) {
        await stripe.refunds.create({ charge: pi.latest_charge });
      }
    } catch (e) {
      console.error('Refund failed:', e.message);
    }
  }

  await supabase
    .from('bookings')
    .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
    .eq('id', bookingId);

  return json(res, 200, { success: true });
};
