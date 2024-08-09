import { redirect } from './utils.js'
import type { Handler } from '../types.ts'

const handler: Handler = async (_event, { user, billing }) => {
  if (!user) return redirect(303, '/auth/signin?callbackUrl=/billing/portal')

  const session = await billing.createPortalSession(user)

  return redirect(303, session.url)
}

export default handler
