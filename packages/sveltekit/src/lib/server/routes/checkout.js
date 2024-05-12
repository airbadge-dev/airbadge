import { error } from '@sveltejs/kit'
import { redirect } from './utils'

export default async function handler({ url }, { user, catalog, billing, options }) {
  if (!user) return redirect(303, `/auth/signin?callbackUrl=${url.pathname}${url.search}`)
  if (user.subscriptionId) return redirect(303, '/?event=already-subscribed')

  const id = url.searchParams.get('id')
  const price = await catalog.get(id)

  if (!price) error(406, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')

  if (price.type == 'recurring' && price.unit_amount == 0) {
    await billing.createSubscription(user, price)

    return redirect(303, options.pages.checkout.success)
  } else {
    const checkout = await billing.createCheckout(user, price)

    return redirect(303, checkout.url)
  }
}
