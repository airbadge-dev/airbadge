export { createCatalog } from './catalog.js'
export { createBillingService } from './billing.js'
export { stripe } from './stripe.js'
export { routes } from './routes/index.js'
export { getEnv, setEnv } from './env.js'

import { initStripe } from './stripe.js'

export function init() {
  initStripe()
}
