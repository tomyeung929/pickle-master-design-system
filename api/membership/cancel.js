import supabase from '../_lib/supabase.js';
import stripe from '../_lib/stripe.js';
import { getUser, json, cors } from '../_lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return json(res, 405, { error: 'Method not allowed' });

  const user = await getUser(req);
  if (!user) return json(res, 401, { error: 'Unauthorized' });

  const { data: sub } = await supabase
    .from('membership_subscriptions')
    .select('stripe_subscription_id')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (!sub?.stripe_subscription_id) {
    return json(res, 404, { error: 'No active subscription found' });
  }

  await stripe.subscriptions.update(sub.stripe_subscription_id, {
    cancel_at_period_end: true,
  });

  return json(res, 200, { success: true, message: 'Subscription will cancel at end of billing period' });
}
