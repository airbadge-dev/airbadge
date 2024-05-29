import { SvelteKitAuth as BaseAuth } from '@auth/sveltekit'
import { createCatalog } from '$lib/server/catalog'
import { createBillingService } from '$lib/server/billing'
import { sequence } from '@sveltejs/kit/hooks'
import { routes } from '$lib/server/routes'

export function SvelteKitAuth(options = {}) {
  if (!options.providers || options.providers.length == 0)
    throw new Error('Must have at least one provider')

  if (!options.adapter) throw new Error('An adapter is required')

  options.pages ||= {}
  options.pages.newUser ||= '/billing/checkout'
  options.pages.checkout ||= {}
  options.pages.checkout.success = '/?event=checkout-success'
  options.pages.checkout.cancel = '/?event=checkout-cancel'
  options.pages.portalReturn ||= '/?event=portal-return'

  const catalog = createCatalog()
  const billing = createBillingService(options.adapter, options.pages)
  const state = {
    catalog,
    billing,
    options
  }
  const { handle, ...rest } = authHandler(options)

  return { ...rest, handle: sequence(handle, paymentHandler(state)) }
}

function authHandler(options) {
  return BaseAuth({
    ...options,

    callbacks: {
      async session({ session }) {
        const user = await options.adapter.getUserByEmail(session.user.email)

        if (user?.customerId) {
          session.customerId = user.customerId
        }

        if (user?.subscriptionId) {
          session.subscription = {
            id: user.subscriptionId,
            priceId: user.priceId,
            plan: user.plan,
            status: user.subscriptionStatus.toLowerCase()
          }
        }

        if (user?.purchases) {
          let purchases = []

          user.purchases.forEach(({ productId, priceId, lookupKey }) => {
            purchases.push(productId)
            purchases.push(priceId)
            purchases.push(lookupKey)
          })

          session.purchases = purchases
        }

        if (options?.callbacks?.session) {
          return await options.callbacks.session(arguments)
        }

        return session
      },

      ...(options.callbacks || {})
    }
  })
}

function paymentHandler(state) {
  return async ({ event, resolve }) => {
    const session = await event.locals.getSession()
    const route = routes[event.url.pathname]

    if (route && route.method == event.request.method) {
      const user = session ? await state.options.adapter.getUserByEmail(session.user.email) : null

      return await route.handler(event, { ...state, session, user })
    }

    return await resolve(event)
  }
}
