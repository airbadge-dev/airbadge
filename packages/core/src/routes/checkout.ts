import { error, redirect } from './utils.js'
import type { Handler } from '../types.ts'

const expiredStates = [ 'INCOMPLETE_EXPIRED', 'CANCELED' ]

const handler: Handler = async ({ url }, { user, catalog, billing, options }) => {
  const id = url.searchParams.get('id')

  if (!user || !id) return redirect(303, `/auth/signin?callbackUrl=${url.pathname}${url.search}`)

  const quantity = +(url.searchParams.get('quantity') || 1)
  const price = await catalog.get(id)

  if (!price) return error(406, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')

  if (user.subscriptionId && user.subscriptionStatus && price.type == 'recurring' && !expiredStates.includes(user.subscriptionStatus)) return redirect(303, '/?event=already-subscribed')

  if (price.type == 'recurring' && price.unit_amount == 0) {
    await billing.createSubscription(user, price)

    return redirect(303, options.pages.checkout.success)
  } else {
    const checkout = await billing.createCheckout(user, price, quantity)

    return redirect(303, checkout.url || '/')
  }
}

export default handler
