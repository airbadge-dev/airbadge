import type { Stripe } from 'stripe'
import type { Catalog } from './catalog.ts'
import type { Billing } from './billing.ts'

interface Purchase {
  productId: string
  priceId: string
  lookupKey: string
  paymentIntent: string
}

export interface UserExtensions {
  customerId: string | null
  plan: string | null
  priceId: string | null
  purchases: Purchase[]
  subscriptionId: Stripe.Subscription['id'] | null
  subscriptionStatus: string | null
}

export interface User extends UserExtensions {
  id: string
  name: string
  email: string
}

interface Event {
  request: Request
  url: URL
}

export interface Pages {
  checkout: {
    success: string
    cancel: string
  }
  portalReturn: string
}

interface Options {
  pages: Pages
}

interface State {
  user: User
  billing: Billing
  catalog: Catalog
  options: Options
}

export type Handler = (event: Event, state: State) => Response | Promise<Response>
