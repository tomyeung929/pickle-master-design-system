import supabase from '../_lib/supabase.js';
import stripe from '../_lib/stripe.js';
import { parseBody, json, cors } from '../_lib/auth.js';
import { sendBookingConfirmation } from '../_lib/resend.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { payment_intent_id } = body;
  if (!payment_intent_id) return json(res, 400, { error: 'payment_intent_id required' });

  // Verify Stripe payment succeeded
  let pi;
  try {
    pi = await stripe.paymentIntents.retrieve(payment_intent_id);
  } catch {
    return json(res, 400, { error: 'Invalid payment intent' });
  }

  if (pi.status !== 'succeeded') {
    return json(res, 400, { error: `Payment not completed (status: ${pi.status})` });
  }

  // Confirm bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .update({ status: 'confirmed', stripe_charge_id: pi.latest_charge })
    .eq('stripe_payment_intent_id', payment_intent_id)
    .eq('status', 'pending')
    .select('*, courts(name), session_types(label_en)');

  // Confirm orders
  await supabase
    .from('orders')
    .update({ status: 'paid', stripe_charge_id: pi.latest_charge })
    .eq('stripe_payment_intent_id', payment_intent_id)
    .eq('status', 'pending');

  // Send confirmation emails
  const emailTo = pi.metadata?.guest_email;
  if (emailTo && bookings?.length > 0) {
    for (const booking of bookings) {
      try {
        await sendBookingConfirmation({
          to: emailTo,
          name: booking.guest_name || 'Member',
          court: booking.courts?.name || 'Court',
          sessionType: booking.session_types?.label_en || 'Session',
          date: booking.booking_date,
          time: booking.slot_time?.slice(0, 5) || '',
          price: booking.price_paid,
        });
      } catch (e) {
        console.error('Email failed:', e.message);
      }
    }
  }

  return json(res, 200, { success: true, bookings: bookings || [] });
}
