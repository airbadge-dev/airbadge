import { error, redirect } from './utils.js'
import type { Handler } from '../types.ts'

const handler: Handler = async (_event, { user, billing }) => {
  if (!user) return error(401, 'Authentication required')

  await billing.cancelSubscription(user)

  return redirect(303, '/?event=subscription-canceled')
}

export default handler
