import { error, redirect } from './utils'

export default async function handler(_event, { user, billing }) {
  if (!user) return error(401, 'Authentication required')

  await billing.cancelSubscription(user)

  return redirect(303, '/?event=subscription-canceled')
}
