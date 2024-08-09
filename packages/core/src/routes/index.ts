import portal from './portal.js'
import modify from './modify.js'
import cancel from './cancel.js'
import checkout from './checkout.js'
import checkoutComplete from './checkoutComplete.js'
import webhooks from './webhooks.js'
import type { Handler } from '../types.js'

interface RouteDef {
  method: 'GET' | 'POST'
  handler: Handler
}

type RoutesMap = Record<string, RouteDef>

export const routes = {
  '/billing/checkout': {
    method: 'GET',
    handler: checkout
  },

  '/billing/checkout/complete': {
    method: 'GET',
    handler: checkoutComplete
  },

  '/billing/portal': {
    method: 'GET',
    handler: portal
  },

  '/billing/modify': {
    method: 'POST',
    handler: modify
  },

  '/billing/cancel': {
    method: 'POST',
    handler: cancel
  },

  '/billing/webhooks': {
    method: 'POST',
    handler: webhooks
  }
}
