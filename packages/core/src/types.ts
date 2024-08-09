import type { Stripe } from "stripe"

interface User {
  subscriptionId: Stripe.Subscription["id"]
  subscriptionStatus: Stripe.Subscription["status"]
}

interface BillingService {
  createPortalSession(user: User): Promise<Stripe.BillingPortal.Session>
  updateSubscription(user: User, price: Stripe.Price): Promise<void>
  createSubscription(user: User, price: Stripe.Price): Promise<Stripe.Subscription>
  createCheckout(user: User, price: Stripe.Price, quantity: number): Promise<Stripe.Checkout.Session>
  syncCheckout(sessionId: string): Promise<void>
  cancelSubscription(user: User): Promise<void>
}

interface CatalogService {
  get(id: string): Stripe.Price
}

interface Event {
  request: Request
  url: URL
}

interface Pages {
  checkout: {
    success: string
  }
}

interface Options {
  pages: Pages
}

interface State {
  user: User,
  billing: BillingService,
  catalog: CatalogService
  options: Options
}

export type Handler = (event: Event, state: State) => Response | Promise<Response>
