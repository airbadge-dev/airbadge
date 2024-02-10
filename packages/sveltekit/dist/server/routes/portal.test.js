import handler from './portal'

const billing = {
  createPortalSession: vi.fn(() => {
    return {
      url: 'https://portal.stripe.com/ps_1234'
    }
  })
}

describe('portal session', () => {
  test('without user, raise error', async () => {
    const state = { user: null, billing }

    await expect(handler(null, state))
      .toError(401, 'Authentication required')
  })

  test('with user, redirects to portal session', async () => {
    const user = 'fake-user'
    const state = { user, billing }

    await expect(handler(null, state))
      .toRedirect(303, 'https://portal.stripe.com/ps_1234')

    expect(billing.createPortalSession).toHaveBeenCalledWith('fake-user')
  })
})
