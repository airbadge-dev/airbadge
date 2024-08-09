import { handleWebhook } from '../webhooks.js'
import { json, error } from './utils.js'
import type { Handler } from '../types.ts'
import type { Stripe } from 'stripe'

const handler: Handler = async ({ request }, { billing }) => {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') || ''

  try {
    await handleWebhook(billing, body, signature)
  } catch (err) {
    const verificationError = err as Stripe.errors.StripeSignatureVerificationError
    console.warn('⚠️  Webhook signature verification failed.', verificationError.message)

    return error(400, 'Invalid request')
  }

  return json()
}

export default handler
