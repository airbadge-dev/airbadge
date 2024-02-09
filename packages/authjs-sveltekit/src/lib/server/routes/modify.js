import { json, error } from '@sveltejs/kit'

export default async function handler({ url }, { user, billing }) {
  if (!user) error(401, 'Authentication required')

  const plan = url.searchParams.get('plan')

  if (!plan) error(406, 'Plan is required')

  await billing.updateSubscription(user, plan)

  return json({ updated: true })
}
