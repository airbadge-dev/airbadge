import { getStripe } from './stripe.js'
import { getEnv } from './env.js'
import type { User, Pages, UserExtensions } from './types.ts'
import type { Stripe } from 'stripe'
import type { Adapter, AdapterUser } from '@auth/core/adapters'
import type { Awaitable } from '@auth/core/types'

type ExtendedAdapterUser = AdapterUser & UserExtensions

interface ExtendedAdapter extends Adapter {
  getUser(id: string): Awaitable<ExtendedAdapterUser | null>
  updateUser(
    user: Partial<ExtendedAdapterUser> & Pick<ExtendedAdapterUser, 'id'>
  ): Awaitable<ExtendedAdapterUser>
}

export interface Billing {
  createSubscription(user: User, price: Stripe.Price): Promise<Stripe.Subscription>
  updateSubscription(user: User, price: Stripe.Price): Promise<Stripe.SubscriptionItem>
  cancelSubscription(user: User): Promise<Stripe.Subscription>
  syncSubscription(subscriptionId: string): Promise<void>

  createCheckout(
    user: User,
    price: Stripe.Price,
    quantity: number
  ): Promise<Stripe.Checkout.Session>

  syncCheckout(sessionId: string): Promise<void>
  createPortalSession(user: User): Promise<Stripe.BillingPortal.Session>
}

export function createBillingService(adapter: ExtendedAdapter, pages: Pages): Billing {
  const stripe = getStripe()

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
        customerId: getId<Stripe.Customer | Stripe.DeletedCustomer>(subscription.customer),
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status.toUpperCase(),
        plan: price.lookup_key,
        priceId: price.id
      })

      return subscription
    },

    async createCheckout(user, price, quantity = 1) {
      const metadata = {
        userId: String(user.id),
        productId: String(price.product),
        priceId: price.id,
        lookupKey: price.lookup_key
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
        cancel_url: absoluteURL(pages.checkout.cancel),
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
      if (!user.customerId) throw new Error('Missing customer id')

      const domain = getEnv('DOMAIN')

      return stripe.billingPortal.sessions.create({
        customer: user.customerId,
        return_url: absoluteURL(pages.portalReturn)
      })
    },

    async syncCheckout(sessionId) {
      const checkout = await stripe.checkout.sessions.retrieve(sessionId)
      const { metadata } = checkout
      const { userId, productId, priceId, lookupKey } = metadata as any

      if (!userId) throw new Error(`Missing user id metadata for checkout '${sessionId}'`)

      const user = (await adapter.getUser(userId)) as User | null

      if (!user) throw new Error(`User id \`${userId}\` not found`)

      const purchase = {
        productId: productId as string,
        priceId: priceId as string,
        lookupKey: lookupKey as string,
        paymentIntent: getId<Stripe.PaymentIntent>(checkout.payment_intent)
      }

      if (!hasPurchase(user, checkout.payment_intent)) {
        await adapter.updateUser({
          id: userId,
          customerId: checkout.customer as string,
          purchases: [...user.purchases, purchase]
        })
      }

      if (checkout.mode == 'subscription') {
        return this.syncSubscription(checkout.subscription as string)
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
        customerId: subscription.customer as string,
        subscriptionId: subscription.id,
        subscriptionStatus: subscription.status.toUpperCase(),
        plan: price.lookup_key,
        priceId: price.id
      })
    },

    async cancelSubscription(user) {
      if (!user.subscriptionId) throw new Error('Missing subscription id')

      return stripe.subscriptions.update(user.subscriptionId, { cancel_at_period_end: true })
    },

    async updateSubscription(user, price) {
      if (!price) throw new Error('Missing price')
      if (!user.subscriptionId) throw new Error('Missing subscription id')

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

function hasPurchase(user: User, paymentIntent: Stripe.PaymentIntent | string | null) {
  const paymentIntentId = getId<Stripe.PaymentIntent>(paymentIntent)

  return user.purchases.find((purchase) => purchase.paymentIntent == paymentIntentId)
}

function absoluteURL(path: string) {
  const domain = getEnv('DOMAIN')

  return new URL(path, domain).toString()
}

function getId<T>(object: T | string | null): string {
  if (!object) throw Error('Expected id, got null')

  if (typeof object == 'string') return object as string

  if (typeof object == 'object' && 'id' in object) return String(object.id)

  throw Error(`Expected id, got ${object}`)
}
