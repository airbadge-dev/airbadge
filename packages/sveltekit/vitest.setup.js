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
    try {
      await promise

      return { pass: false, message: () => 'Redirect is supposed to raise an error.' }
    } catch (actual) {
      if (actual?.constructor?.name !== 'Redirect') {
        return {
          pass: false,
          message: () => 'Object is not a redirect'
        }
      }

      if (actual.status !== status) {
        return {
          pass: false,
          message: () => `Expected a redirect with status ${status}, but got ${actual.status}`
        }
      }

      if (location && actual.location !== location) {
        return {
          pass: false,
          message: () =>
            `Expected a redirect to location "${location}", but got "${actual.location}"`
        }
      }

      return { pass: true }
    }
  }
})
