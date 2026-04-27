import stripe from '../_lib/stripe.js';
import supabase from '../_lib/supabase.js';
import { sendMembershipWelcome } from '../_lib/resend.js';

export const config = { api: { bodyParser: false } };

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'];
  const rawBody = await getRawBody(req);

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.payment_failed': {
        const pi = event.data.object;
        // Release pending booking slots
        await supabase
          .from('bookings')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('stripe_payment_intent_id', pi.id)
          .eq('status', 'pending');
        await supabase
          .from('orders')
          .update({ status: 'failed' })
          .eq('stripe_payment_intent_id', pi.id)
          .eq('status', 'pending');
        break;
      }

      case 'checkout.session.completed': {
        // Membership subscription created via Checkout Session
        const session = event.data.object;
        if (session.mode === 'subscription' && session.metadata?.user_id) {
          const { user_id, tier } = session.metadata;
          await supabase.from('profiles').update({ tier }).eq('id', user_id);
          await supabase.from('membership_subscriptions').insert({
            user_id,
            tier,
            stripe_subscription_id: session.subscription,
            status: 'active',
          });
          const { data: profile } = await supabase
            .from('profiles')
            .select('name, email')
            .eq('id', user_id)
            .single();
          if (profile) {
            try { await sendMembershipWelcome({ to: profile.email, name: profile.name, tier }); }
            catch (e) { console.error('Welcome email failed:', e.message); }
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const sub = event.data.object;
        const { data: membership } = await supabase
          .from('membership_subscriptions')
          .select('user_id, tier')
          .eq('stripe_subscription_id', sub.id)
          .single();
        if (membership) {
          const newStatus = sub.status === 'active' ? 'active' : sub.status;
          await supabase
            .from('membership_subscriptions')
            .update({ status: newStatus, current_period_end: new Date(sub.current_period_end * 1000).toISOString() })
            .eq('stripe_subscription_id', sub.id);
          if (sub.cancel_at_period_end || sub.status !== 'active') {
            // Downgrade tier when subscription expires
          }
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const { data: membership } = await supabase
          .from('membership_subscriptions')
          .select('user_id')
          .eq('stripe_subscription_id', sub.id)
          .single();
        if (membership) {
          await supabase
            .from('membership_subscriptions')
            .update({ status: 'cancelled' })
            .eq('stripe_subscription_id', sub.id);
          await supabase
            .from('profiles')
            .update({ tier: 'guest' })
            .eq('id', membership.user_id);
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error('Webhook handler error:', err.message);
  }

  res.status(200).json({ received: true });
}
