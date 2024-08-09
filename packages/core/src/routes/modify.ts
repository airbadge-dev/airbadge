import { json, error } from './utils.js'
import type { Handler } from '../types.ts'

const handler: Handler = async ({ url }, { user, catalog, billing }) => {
  if (!user) return error(401, 'Authentication required')

  const id = url.searchParams.get('id')

  if (!id) return error(406, 'id param is required')

  const price = await catalog.get(id)

  if (!price) return error(406, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')
  if (price.type !== 'recurring') return error(406, 'Modifying a subscription requires a recurring price.')

  await billing.updateSubscription(user, price)

  return json({ updated: true })
}

export default handler
