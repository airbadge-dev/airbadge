import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

export const stripe = Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15'
})

export async function createCheckout(user, plan) {
  const metadata = {
    userId: user.id
  }

  return stripe.checkout.sessions.create({
    success_url: absoluteURL('/welcome?checkout_session_id={CHECKOUT_SESSION_ID}'),
    cancel_url: absoluteURL('/pricing'),
    currency: 'usd',
    mode: 'subscription',
    customer_email: user.email,
    client_reference_id: user.id,
    metadata,
    subscription_data: {
      metadata
    },
    line_items: [
      {
        price: plan.priceId,
        quantity: 1
      }
    ]
  })
}

function absoluteURL(path) {
  return new URL(path, env.DOMAIN).toString()
}
