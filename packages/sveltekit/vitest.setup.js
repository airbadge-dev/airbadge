import { expect } from 'vitest'

expect.extend({
  async toError(promise, status, message = null) {
    try {
      await promise

      return { pass: false, message: () => 'Expected an error to be raised.' }
    } catch (actual) {
      if (actual?.constructor?.name !== 'HttpError') {
        return {
          pass: false,
          message: () => 'Object is not an HttpError'
        }
      }

      if (actual.status !== status) {
        return {
          pass: false,
          message: () => `Expected an error with status ${status}, but got ${actual.status}`
        }
      }

      if (message && actual.body.message !== message) {
        return {
          pass: false,
          message: () =>
            `Expected an error with message "${message}", but got "${actual.body.message}"`
        }
      }

      return { pass: true }
    }
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
        message: () =>
          `Expected a redirect to location "${location}", but got "${actual.location}"`
      }
    }

    return { pass: true }
  }
})
