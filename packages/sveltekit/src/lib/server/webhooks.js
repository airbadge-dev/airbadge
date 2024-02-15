import { stripe } from './billing'
import { env } from '$env/dynamic/private'

export async function handleWebhook(billing, body, signature) {
  const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET)
  const { object } = event.data

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
    case 'customer.subscription.trial_will_end':
      await billing.syncSubscription(object.id)
      console.log(`Synced subscription ${object.id}`)
      break
  }
}
