import supabase from '../_lib/supabase.js';
import stripe from '../_lib/stripe.js';
import { getUser, parseBody, json, cors } from '../_lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const user = await getUser(req);
  if (!user) return json(res, 401, { error: 'Login required to subscribe' });

  let body;
  try { body = await parseBody(req); } catch { return json(res, 400, { error: 'Invalid JSON' }); }

  const { tier } = body;
  if (tier !== 'DINK' && tier !== 'FLEX') return json(res, 400, { error: 'tier must be DINK or FLEX' });

  const priceId = tier === 'DINK'
    ? process.env.STRIPE_DINK_PRICE_ID
    : process.env.STRIPE_FLEX_PRICE_ID;

  if (!priceId) return json(res, 500, { error: 'Membership pricing not configured' });

  // Get or create Stripe customer
  let customerId = user.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email, name: user.name });
    customerId = customer.id;
    await supabase.from('profiles').update({ stripe_customer_id: customerId }).eq('id', user.id);
  }

  const appUrl = process.env.APP_URL || 'https://pickle-master-design-system.vercel.app';

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/?subscription=success&tier=${tier}`,
    cancel_url:  `${appUrl}/?subscription=cancelled`,
    metadata: { user_id: user.id, tier },
  });

  return json(res, 200, { checkout_url: session.url });
}
