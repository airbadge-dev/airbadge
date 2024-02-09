import plans from './plans'
import portal from './portal'
import modify from './modify'
import cancel from './cancel'
import checkout from './checkout'
import checkoutComplete from './checkoutComplete'
import webhooks from './webhooks'

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
  },

  '/billing/plans': {
    method: 'GET',
    handler: plans
  }
}
