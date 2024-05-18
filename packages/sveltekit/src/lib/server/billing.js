import { DOMAIN } from '$env/static/private'
import { stripe } from './stripe'

export function createBillingService(adapter, urls) {
  return {
    async createSubscription(user, price) {
      const customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        metadata: {
          userId: user.id
        }
      })

      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        metadata: {
          userId: user.id
        },
        items: [{ price: price.id }]
      })

      await adapter.updateUser({
        id: user.id,
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status.toUpperCase(),
        plan: price.lookup_key,
        priceId: price.id
      })
    },

    async createCheckout(user, price, quantity = 1) {
      const metadata = {
        userId: user.id,
        productId: price.product,
        priceId: price.id
      }
      const recurring = price.type == 'recurring'
      const subscription_data = {
        metadata: {
          userId: user.id
        }
      }

      return stripe.checkout.sessions.create({
        success_url: absoluteURL(
          '/billing/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}'
        ),
        cancel_url: absoluteURL(urls.checkout.cancel),
        currency: 'usd',
        mode: recurring ? 'subscription' : 'payment',
        customer_email: user.email,
        client_reference_id: user.id,
        metadata,
        line_items: [
          {
            price: price.id,
            quantity
          }
        ],
        ...(recurring ? { subscription_data } : {})
      })
    },

    async createPortalSession(user) {
      return stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: absoluteURL(urls.portalReturn)
      })
    },

    async syncCheckout(sessionId) {
      const checkout = await stripe.checkout.sessions.retrieve(sessionId)


      if (checkout.mode == 'subscription') {
        return this.syncSubscription(checkout.subscription)
      }
    },

    async syncSubscription(subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId)
      const { userId } = subscription.metadata

      if (!userId) throw new Error(`Missing user id metadata for subscription '${subscriptionId}'`)

      const item = subscription.items.data[0]
      const { price } = item

      await adapter.updateUser({
        id: userId,
        customerId: subscription.customer,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status.toUpperCase(),
        plan: price.lookup_key,
        priceId: price.id
      })
    },

    async cancelSubscription(user) {
      return stripe.subscriptions.update(user.subscriptionId, { cancel_at_period_end: true })
    },

    async updateSubscription(user, price) {
      if (!price) throw new Error('Missing price')

      const subscription = await stripe.subscriptions.retrieve(user.subscriptionId)

      const subscriptionItem = await stripe.subscriptionItems.update(
        subscription.items.data[0].id,
        {
          price: price.id
        }
      )

      await adapter.updateUser({
        id: user.id,
        plan: price.lookup_key,
        priceId: price.id
      })

      return subscriptionItem
    }
  }
}

function absoluteURL(path) {
  return new URL(path, DOMAIN).toString()
}
