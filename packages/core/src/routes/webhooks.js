import { handleWebhook } from '../webhooks'
import { json, error } from './utils'

export default async function handler({ request }, { billing }) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  try {
    await handleWebhook(billing, body, signature)
  } catch (err) {
    console.warn('⚠️  Webhook signature verification failed.', err.message)

    return error(400, 'Invalid request')
  }

  return json()
}
