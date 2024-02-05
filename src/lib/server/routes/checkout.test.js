import handler from './checkout'

describe('checkout', () => {
  test('without user, raises error', async () => {
    const response = handler({}, {})

    await expect(response)
      .toError(401, 'Authentication required')
  })

  test('when user already subscribed, raises error', async () => {
    const state = {
      user: {
        subscriptionId: 'sub_1234'
      }
    }
    const response = handler({}, state)

    await expect(response)
      .toError(403, 'User is already subscribed')
  })

  test('when plan not found, raises error', async () => {
    const state = {
      user: {},
      plans: {
        getDefault() {}
      }
    }
    const event = {
      url: new URL('http://localhost/billing/checkout')
    }

    const response = handler(event, state)

    await expect(response)
      .toError(403, 'No default plan, and plan was not specified in URL')
  })

  describe('with plan', () => {
    const plan = {
    }
    const billing = {
      createSubscription: vi.fn(),
      createCheckout: vi.fn()
    }
    const user = {}
    const state = {
      user,
      plans: {
        getDefault() { return plan }
      },
      billing,
      options: {
        pages: {
          newUser: '/welcome'
        }
      }
    }

    const event = {
      url: new URL('http://localhost/billing/checkout')
    }

    test('when plan has trial, creates subscription and redirects', async () => {
      plan.price = 10000
      plan.trial = true

      const response = handler(event, state)

      await expect(response)
        .toRedirect(303, '/welcome')

      expect(billing.createSubscription).toHaveBeenCalledWith(user, plan)
    })

    test('when plan is free, creates subscription and redirects', async () => {
      plan.trial = false
      plan.price = 0

      const response = handler(event, state)

      await expect(response)
        .toRedirect(303, '/welcome')

      expect(billing.createSubscription).toHaveBeenCalledWith(user, plan)
    })

    test('when plan isnt free or trial, redirects to checkout', async () => {
      plan.trial = false
      plan.price = 10000

      billing.createCheckout.mockReturnValueOnce({
        url: 'https://checkout.stripe.com/checkout_1234'
      })

      const response = handler(event, state)

      await expect(response)
        .toRedirect(303, 'https://checkout.stripe.com/checkout_1234')

      expect(billing.createCheckout).toHaveBeenCalledWith(user, plan)
    })
  })
})
