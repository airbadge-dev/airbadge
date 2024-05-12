import handler from './checkout'

describe('checkout', () => {
  describe('without user, redirects to sign in', () => {
    test('without id', async () => {
      const event = {
        url: new URL('http://localhost/billing/checkout')
      }
      const response = handler(event, {})

      await expect(response).toRedirect(303, '/auth/signin?callbackUrl=/billing/checkout')
    })

    test('with id', async () => {
      const event = {
        url: new URL('http://localhost/billing/checkout?id=basic')
      }
      const response = handler(event, {})

      await expect(response).toRedirect(303, '/auth/signin?callbackUrl=/billing/checkout?id=basic')
    })
  })

  test('when user already subscribed, raises error', async () => {
    const state = {
      user: {
        subscriptionId: 'sub_1234'
      }
    }
    const response = handler({}, state)

    await expect(response).toRedirect(303, '/?event=already-subscribed')
  })

  test('when price not found, raises error', async () => {
    const state = {
      user: {},
      catalog: {
        get() {}
      }
    }
    const event = {
      url: new URL('http://localhost/billing/checkout')
    }

    const response = handler(event, state)

    await expect(response).toError(403, 'Price could not be found. Please specify a valid Stripe price/product/lookup key in the URL.')
  })

  describe('with product', () => {
    const price = {}
    const billing = {
      createSubscription: vi.fn(),
      createCheckout: vi.fn()
    }
    const user = {}
    const state = {
      user,
      catalog: {
        get() {
          return price
        }
      },
      billing,
      options: {
        pages: {
          checkout: {
            success: '/welcome'
          }
        }
      }
    }

    const event = {
      url: new URL('http://localhost/billing/checkout')
    }

    test('when price is free and recurring, creates subscription and redirects', async () => {
      price.type = 'recurring'
      price.unit_amount = 0

      const response = handler(event, state)

      await expect(response).toRedirect(303, '/welcome')

      expect(billing.createSubscription).toHaveBeenCalledWith(user, price)
    })

    test('when price isnt free or trial, redirects to checkout', async () => {
      price.unit_amount = 10000

      billing.createCheckout.mockReturnValueOnce({
        url: 'https://checkout.stripe.com/checkout_1234'
      })

      const response = handler(event, state)

      await expect(response).toRedirect(303, 'https://checkout.stripe.com/checkout_1234')

      expect(billing.createCheckout).toHaveBeenCalledWith(user, price)
    })
  })
})
