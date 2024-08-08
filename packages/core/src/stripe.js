import Stripe from 'stripe'
import { getEnv } from './env'

export let stripe = null

export function initStripe() {
  const privateKey = getEnv('STRIPE_SECRET_KEY')

  stripe = Stripe(privateKey, {
    apiVersion: '2022-11-15'
  })
}
