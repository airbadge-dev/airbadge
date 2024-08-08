import { stripe } from './stripe'
import { getEnv } from './env'

export async function handleWebhook(billing, body, signature) {
  const webhookSecret = getEnv('STRIPE_WEBHOOK_SECRET')
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  const { object } = event.data

  switch (event.type) {
    case 'checkout.session.completed':
      await billing.syncCheckout(object.id)
      console.log(`Synced checkout ${object.id}`)
      break

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.trial_will_end':
    case 'customer.subscription.paused':
      await billing.syncSubscription(object.id)
      console.log(`Synced subscription ${object.id}`)
      break
  }
}
