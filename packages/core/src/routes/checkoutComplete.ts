import { error, redirect } from './utils.js'
import type { Handler } from '../types.ts'

const handler: Handler = async ({ url }, { billing, options }) => {
  const sessionId = url.searchParams.get('checkout_session_id')

  if (!sessionId) return error(406, 'Expected checkout_session_id parameter')

  await billing.syncCheckout(sessionId)

  return redirect(303, options.pages.checkout.success)
}

export default handler
