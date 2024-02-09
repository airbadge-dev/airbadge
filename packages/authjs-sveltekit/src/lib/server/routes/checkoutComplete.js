import { redirect, error } from '@sveltejs/kit'

export default async function handler({ url }, { billing, options }) {
  const sessionId = url.searchParams.get('checkout_session_id')

  if (!sessionId) error(406, 'Expected checkout_session_id parameter')

  await billing.syncCheckout(sessionId)

  throw redirect(303, options.pages.checkout.success)
}
