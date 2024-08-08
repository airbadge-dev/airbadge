import { error, redirect } from './utils'

const expiredStates = [ 'INCOMPLETE_EXPIRED', 'CANCELED' ]

export default async function handler({ url }, { user, catalog, billing, options }) {
  if (!user) return redirect(303, `/auth/signin?callbackUrl=${url.pathname}${url.search}`)

  const id = url.searchParams.get('id')
  const quantity = +(url.searchParams.get('quantity') || 1)
  const price = await catalog.get(id)

  if (!price) return error(406, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')

  if (user.subscriptionId && price.type == 'recurring' && !expiredStates.includes(user.subscriptionStatus)) return redirect(303, '/?event=already-subscribed')

  if (price.type == 'recurring' && price.unit_amount == 0) {
    await billing.createSubscription(user, price)

    return redirect(303, options.pages.checkout.success)
  } else {
    const checkout = await billing.createCheckout(user, price, quantity)

    return redirect(303, checkout.url)
  }
}
