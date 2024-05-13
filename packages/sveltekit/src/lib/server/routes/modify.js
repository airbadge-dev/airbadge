import { json, error } from '@sveltejs/kit'

export default async function handler({ url }, { user, catalog, billing }) {
  if (!user) error(401, 'Authentication required')

  const id = url.searchParams.get('id')

  if (!id) error(406, 'id param is required')

  const price = await catalog.get(id)

  if (!price) error(406, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')
  if (price.type !== 'recurring') error(406, 'Modifying a subscription requires a recurring price.')

  await billing.updateSubscription(user, price)

  return json({ updated: true })
}
