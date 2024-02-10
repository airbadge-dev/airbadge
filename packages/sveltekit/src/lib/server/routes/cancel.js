import { redirect, error } from '@sveltejs/kit'

export default async function handler(_event, { user, billing }) {
  if (!user) error(401, 'Authentication required')

  await billing.cancelSubscription(user)

  redirect(303, '/?event=subscription-canceled')
}
