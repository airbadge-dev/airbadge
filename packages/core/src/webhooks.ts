import { getStripe } from './stripe.js'
import { getEnv } from './env.js'

import type { Stripe } from 'stripe'
import type { Billing } from './billing.ts'

export async function handleWebhook(
  billing: Billing,
  body: string,
  signature: string
): Promise<void> {
  const stripe = getStripe()
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET')
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  const { object } = event.data

  switch (event.type) {
    case 'checkout.session.completed':
      const checkout = object as Stripe.Checkout.Session

      await billing.syncCheckout(checkout.id)
      console.log(`Synced checkout ${checkout.id}`)
      break

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.trial_will_end':
    case 'customer.subscription.paused':
      const subscription = object as Stripe.Subscription

      await billing.syncSubscription(subscription.id)
      console.log(`Synced subscription ${subscription.id}`)
      break
  }
}
