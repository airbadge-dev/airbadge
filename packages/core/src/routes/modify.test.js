import handler from './modify'

const catalog = {
  get: vi.fn()
}

const billing = {
  updateSubscription: vi.fn()
}

describe('update', () => {
  test('without user, raises error', async () => {
    const state = { user: null, billing }

    await expect(handler({}, state)).toError(401, 'Authentication required')
  })

  test('without price, raises error', async () => {
    const url = new URL('http://localhost/billing/modify')
    const state = { user: 'fake-user', billing }
    const event = { url }

    await expect(handler(event, state)).toError(406, 'id param is required')
  })

  test('when price isnt found, raises error', async () => {
    const url = new URL('http://localhost/billing/modify?id=price_1234')
    const state = { user: 'fake-user', billing, catalog }
    const event = { url }

    catalog.get.mockResolvedValue(null)

    await expect(handler(event, state)).toError(
      406,
      'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.'
    )
  })

  test('when price isnt recurring, raises error', async () => {
    const price = { id: 'price_1234', type: 'one_time' }
    const url = new URL('http://localhost/billing/modify?id=price_1234')
    const state = { user: 'fake-user', billing, catalog }
    const event = { url }

    catalog.get.mockResolvedValue(price)

    await expect(handler(event, state)).toError(
      406,
      'Modifying a subscription requires a recurring price.'
    )
  })

  test('with user and price, updates and returns JSON', async () => {
    const price = { id: 'price_1234', type: 'recurring' }
    const url = new URL('http://localhost/billing/modify?id=price_1234')
    const state = { user: 'fake-user', billing, catalog }
    const event = { url }

    catalog.get.mockResolvedValue(price)

    const response = await handler(event, state)
    const body = await response.json()

    expect(response.status).toEqual(200)
    expect(body).toEqual({ updated: true })
    expect(billing.updateSubscription).toHaveBeenCalledWith('fake-user', price)
    expect(catalog.get).toHaveBeenCalledWith('price_1234')
  })
})
