import handler from './checkoutComplete'

const state = {
  billing: {
    syncCheckout: vi.fn()
  },
  options: {
    pages: {
      checkout: {
        success: '/welcome'
      }
    }
  }
}

describe('checkoutComplete', () => {
  test('without user, raises error', async () => {
    const event = {
      url: new URL('http://localhost/billing/checkout/complete')
    }

    await expect(handler(event, state))
      .toError(406, 'Expected checkout_session_id parameter')
  })

  test('with user, cancels and redirects', async () => {
    const event = {
      url: new URL('http://localhost/billing/checkout/complete?checkout_session_id=fake-session-id')
    }

    await expect(handler(event, state))
      .toRedirect(303, '/welcome')

    expect(state.billing.syncCheckout).toHaveBeenCalledWith('fake-session-id')
  })
})
