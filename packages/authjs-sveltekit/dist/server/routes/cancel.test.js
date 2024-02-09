import handler from './cancel'

const billing = {
  cancelSubscription: vi.fn()
}

describe('cancel', () => {
  test('without user, raises error', async () => {
    const state = { user: null, billing }

    await expect(handler(null, state))
      .toError(401, 'Authentication required')
  })

  test('with user, cancels and redirects', async () => {
    const user = 'fake-user'
    const state = { user, billing }

    await expect(handler(null, state))
      .toRedirect(303, '/?event=subscription-canceled')

    expect(billing.cancelSubscription).toHaveBeenCalledWith('fake-user')
  })
})
