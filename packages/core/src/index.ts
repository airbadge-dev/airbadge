export { createCatalog } from './catalog'
export { createBillingService } from './billing'
export { stripe } from './stripe'
export { routes } from './routes/index'
export { getEnv, setEnv } from './env'

import { initStripe } from './stripe'

export function init() {
  initStripe()
}
