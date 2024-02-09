import handler from './modify'

const billing = {
  updateSubscription: vi.fn()
}

describe('update', () => {
  test('without user, raises error', async () => {
    const state = { user: null, billing }

    await expect(handler({}, state))
      .toError(401, 'Authentication required')
  })

  test('without plan, raises error', async () => {
    const url = new URL('http://localhost/billing/modify')
    const state = { user: 'fake-user', billing }
    const event = { url }

    await expect(handler(event, state))
      .toError(406, 'Plan is required')
  })

  test('with user and plan, updates and returns JSON', async () => {
    const url = new URL('http://localhost/billing/modify?plan=pro')
    const state = { user: 'fake-user', billing }
    const event = { url }

    const response = await handler(event, state)
    const body = await response.json()

    expect(response.status).toEqual(200)
    expect(body).toEqual({ updated: true })
    expect(billing.updateSubscription).toHaveBeenCalledWith('fake-user', 'pro')
  })
})
