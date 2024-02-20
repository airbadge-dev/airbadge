import { error } from '@sveltejs/kit'
import { redirect } from './utils'

export default async function handler(_event, { user, billing }) {
  if (!user) error(401, 'Authentication required')

  const session = await billing.createPortalSession(user)

  return redirect(303, session.url)
}
