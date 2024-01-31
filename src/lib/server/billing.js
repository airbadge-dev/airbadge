import Stripe from 'stripe'
import { env } from '$env/dynamic/private'

export const stripe = Stripe(env.SECRET_STRIPE_KEY, {
  apiVersion: '2022-11-15'
})

export function createService(adapter, plans) {
  return {
    async createCheckout(user, plan) {
      const metadata = {
        userId: user.id
      }

      return stripe.checkout.sessions.create({
        success_url: absoluteURL('/billing/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}'),
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
    },

    async createPortalSession(user) {
      return stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: absoluteURL('/')
      })
    },

    async syncCheckout(sessionId) {
      const checkout = await stripe.checkout.sessions.retrieve(sessionId)

      return this.syncSubscription(checkout.subscription)
    },

    async syncSubscription(subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const { userId } = subscription.metadata

      if (!userId) throw new Error(`Missing user id metadata for subscription '${subscriptionId}'`)

      const item = subscription.items.data[0]
      const priceId = item.price.id
      const plan = plans.getByPriceId(priceId)

      if (!plan) throw new Error(`Missing plan for price '${priceId}'`)

      await adapter.updateUser({
        id: userId,
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status.toUpperCase(),
        plan: plan.id,
        priceId
      })
    }
  }
}

function absoluteURL(path) {
  return new URL(path, env.DOMAIN).toString()
}
