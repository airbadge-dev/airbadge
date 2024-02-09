import { error, redirect } from '@sveltejs/kit'

export default async function handler(_event, { user, billing }) {
  if (!user) error(401, 'Authentication required')

  const session = await billing.createPortalSession(user)

  redirect(303, session.url)
}
