const supabase = require('../_lib/supabase.js');
const stripe = require('../_lib/stripe.js');
const { getUser, parseBody, json, cors } = require('../_lib/auth.js');
const { applyMemberPricing, isWithinBookingWindow, statusFromCount, slotCapacity } = require('../_lib/pricing.js');

module.exports = async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const user = await getUser(req);
  const tier = user ? user.tier || 'guest' : 'guest';
  const { cart, guest_name, guest_email } = body;

  if (!cart || cart.length === 0) return json(res, 400, { error: 'Cart is empty' });

  const guestName  = user ? user.name  : (guest_name  || 'Guest');
  const guestEmail = user ? user.email : (guest_email || null);

  let totalHkd = 0;
  const pendingBookings = [];
  const pendingOrderItems = [];

  for (const item of cart) {
    if (item.type === 'booking' || (!item.type && item.sessionType)) {
      const { data: st } = await supabase
        .from('session_types')
        .select('id, key, price_guest, price_member, slot_type')
        .eq('key', item.sessionType)
        .single();

      if (!st) return json(res, 400, { error: `Unknown session type: ${item.sessionType}` });

      if (!isWithinBookingWindow(item.date, tier, st.slot_type)) {
        return json(res, 400, { error: 'Booking window exceeded for your membership tier' });
      }

      const { data: existing } = await supabase
        .from('bookings')
        .select('id')
        .eq('court_id', item.courtId)
        .eq('session_type_id', st.id)
        .eq('booking_date', item.date)
        .eq('slot_time', item.time)
        .in('status', ['pending', 'confirmed']);

      const capacity = slotCapacity(st.key);
      if ((existing || []).length >= capacity) {
        return json(res, 409, { error: `Slot ${item.time} on ${item.date} is fully booked` });
      }

      const price = applyMemberPricing(st.price_guest, st.price_member, tier);
      totalHkd += price;
      pendingBookings.push({ st, item, price });

    } else if (item.type === 'product' || item.product_id) {
      const pid = item.product_id || item.id;
      const { data: product } = await supabase
        .from('products')
        .select('id, price, member_price, name_en, in_stock')
        .eq('id', pid)
        .single();

      if (!product || !product.in_stock) {
        return json(res, 400, { error: `Product ${pid} is unavailable` });
      }

      const qty = item.qty || 1;
      const price = tier !== 'guest' ? product.member_price : product.price;
      totalHkd += price * qty;
      pendingOrderItems.push({ product, qty, price });
    } else {
      totalHkd += item.price || 0;
      pendingOrderItems.push({ name: item.name, detail: item.detail, qty: 1, price: item.price || 0 });
    }
  }

  if (totalHkd === 0) return json(res, 400, { error: 'Total is zero' });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalHkd * 100,
    currency: 'hkd',
    metadata: {
      user_id: user ? user.id : 'guest',
      guest_email: guestEmail || '',
    },
  });

  for (const { st, item, price } of pendingBookings) {
    await supabase.from('bookings').insert({
      user_id: user ? user.id : null,
      guest_name: guestName,
      guest_email: guestEmail,
      court_id: item.courtId,
      session_type_id: st.id,
      booking_date: item.date,
      slot_time: item.time,
      price_paid: price,
      status: 'pending',
      stripe_payment_intent_id: paymentIntent.id,
    });
  }

  if (pendingOrderItems.length > 0) {
    const { data: order } = await supabase
      .from('orders')
      .insert({
        user_id: user ? user.id : null,
        guest_name: guestName,
        guest_email: guestEmail,
        status: 'pending',
        total_hkd: pendingOrderItems.reduce((s, i) => s + i.price * (i.qty || 1), 0),
        stripe_payment_intent_id: paymentIntent.id,
      })
      .select('id')
      .single();

    if (order) {
      for (const item of pendingOrderItems) {
        await supabase.from('order_items').insert({
          order_id: order.id,
          item_type: 'product',
          product_id: item.product ? item.product.id : null,
          name: item.product ? item.product.name_en : (item.name || ''),
          detail: item.detail || '',
          quantity: item.qty || 1,
          unit_price: item.price,
        });
      }
    }
  }

  return json(res, 200, {
    client_secret: paymentIntent.client_secret,
    total_hkd: totalHkd,
  });
};
