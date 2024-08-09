import Stripe from 'stripe'
import { getEnv } from './env.js'

let stripe: Stripe | null = null

export function getStripe(): Stripe {
  const privateKey = getEnv('STRIPE_SECRET_KEY')

  if (!stripe) {
    stripe = new Stripe(privateKey, {
      apiVersion: '2023-10-16'
    })
  }

  return stripe
}
