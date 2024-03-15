import { error } from '@sveltejs/kit'
import { redirect } from './utils'

export default async function handler(_event, { user, billing }) {
  if (!user) return redirect(303, '/auth/signin?callbackUrl=/billing/portal')

  const session = await billing.createPortalSession(user)

  return redirect(303, session.url)
}
