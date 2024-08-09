import { expect } from 'vitest'
import { setEnv } from './src/env'

setEnv({
  STRIPE_SECRET_KEY: 'sk_test',
  STRIPE_WEBHOOK_SECRET: 'wh_test',
  DOMAIN: 'http://localhost:5173'
})

expect.extend({
  async toError(promise, status, message = null) {
    const actual = await promise

    if (actual?.constructor?.name !== 'Response') {
      return {
        pass: false,
        message: () => 'Expected a Response object'
      }
    }

    if (actual.status !== status) {
      return {
        pass: false,
        message: () => `Expected an error with status ${status}, but got ${actual.status}`
      }
    }

    if (message) {
      const body = await actual.text()

      if (body !== message) {
        return {
          pass: false,
          message: () => `Expected an error with message "${message}", but got "${body}"`
        }
      }
    }

    return { pass: true }
  },

  async toRedirect(promise, status, location) {
    const actual = await promise

    if (actual.status !== status) {
      return {
        pass: false,
        message: () => `Expected a redirect with status ${status}, but got ${actual.status}`
      }
    }

    const actualLocation = actual.headers.get('location')

    if (location && actualLocation !== location) {
      return {
        pass: false,
        message: () => `Expected a redirect to location "${location}", but got "${actual.location}"`
      }
    }

    return { pass: true }
  }
})
