import { stripe, createBillingService } from './billing'

vi.mock('stripe', () => {
  const Stripe = vi.fn(() => {
    return {
      customers: {
        create: vi.fn()
      },
      checkout: {
        sessions: {
          retrieve: vi.fn(),
          create: vi.fn()
        }
      },
      billingPortal: {
        sessions: {
          create: vi.fn()
        }
      },
      subscriptions: {
        create: vi.fn(),
        retrieve: vi.fn(),
        update: vi.fn()
      }
    }
  })

  return { default: Stripe }
})

const adapter = {
  updateUser: vi.fn()
}

const plans = {
  getByPriceId: vi.fn()
}

const user = {
  id: 'user_1234',
  name: 'John Smith',
  email: 'user@home.com',
  customerId: 'cus_1234'
}

const urls = {
  checkout: {
    cancel: '/checkout-cancel'
  },
  portalReturn: '/portal-return'
}

let billing

beforeEach(() => {
  billing = createBillingService(adapter, plans, urls)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('createSubscription', () => {
  const plan = {
    id: 'pro',
    priceId: 'price_1234'
  }

  test('creates subscription', async () => {
    stripe.customers.create.mockResolvedValue({
      id: 'cus_1234'
    })

    stripe.subscriptions.create.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      status: 'active',
    })

    await billing.createSubscription(user, plan)

    expect(stripe.customers.create).toHaveBeenCalledWith({
      name: 'John Smith',
      email: 'user@home.com',
      metadata: {
        userId: 'user_1234'
      },
    })

    expect(stripe.subscriptions.create).toHaveBeenCalledWith({
      customer: 'cus_1234',
      metadata: {
        userId: 'user_1234'
      },
      items: [
        {
          price: 'price_1234',
        }
      ]
    })

    expect(adapter.updateUser).toHaveBeenCalledWith({
      id: 'user_1234',
      customerId: 'cus_1234',
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE',
      plan: 'pro',
      priceId: 'price_1234'
    })
  })
})

describe('createCheckout', () => {
  const plan = {
    priceId: 'price_1234'
  }

  test('creates checkout session', async () => {
    stripe.checkout.sessions.create.mockResolvedValue({
      url: 'https://checkout.stripe.com/1234'
    })

    const result = await billing.createCheckout(user, plan)

    expect(result).toEqual({ url: 'https://checkout.stripe.com/1234' })
    expect(stripe.checkout.sessions.create).toHaveBeenCalledWith({
      success_url:
        'http://localhost:5173/billing/checkout/complete?checkout_session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/checkout-cancel',
      currency: 'usd',
      mode: 'subscription',
      customer_email: 'user@home.com',
      client_reference_id: 'user_1234',
      metadata: {
        userId: 'user_1234'
      },
      subscription_data: {
        metadata: {
          userId: 'user_1234'
        }
      },
      line_items: [
        {
          price: 'price_1234',
          quantity: 1
        }
      ]
    })
  })
})

describe('createPortalSession', () => {
  test('creates portal session', async () => {
    stripe.billingPortal.sessions.create.mockResolvedValue({
      url: 'https://portal.stripe.com/1234'
    })

    const result = await billing.createPortalSession(user)

    expect(result).toEqual({ url: 'https://portal.stripe.com/1234' })
    expect(stripe.billingPortal.sessions.create).toHaveBeenCalledWith({
      customer: 'cus_1234',
      return_url: 'http://localhost:5173/portal-return'
    })
  })
})

describe('syncSubscription', () => {
  test('when user metadata not found, raises', async () => {
    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {},
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await expect(() => billing.syncSubscription('sub_1234')).rejects.toThrowError(
      "Missing user id metadata for subscription 'sub_1234'"
    )
  })

  test('when plan not found, raises', async () => {
    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {
        userId: 'user_1234'
      },
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await expect(() => billing.syncSubscription('sub_1234')).rejects.toThrowError(
      "Missing plan for price 'price_1234'"
    )
  })

  test('when plan found, updates user', async () => {
    plans.getByPriceId.mockReturnValue({ id: 'pro', priceId: 'plan_1234' })

    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {
        userId: 'user_1234'
      },
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await billing.syncSubscription('sub_1234')

    expect(adapter.updateUser).toHaveBeenCalledWith({
      id: 'user_1234',
      customerId: 'cus_1234',
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE',
      plan: 'pro',
      priceId: 'price_1234'
    })
  })
})

describe('syncCheckout', () => {
  beforeEach(() => {
    stripe.checkout.sessions.retrieve.mockResolvedValue({
      subscription: 'sub_1234'
    })
  })

  test('when user metadata not found, raises', async () => {
    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {},
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await expect(() => billing.syncCheckout('checkout_1234')).rejects.toThrowError(
      "Missing user id metadata for subscription 'sub_1234'"
    )

    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith('checkout_1234')
  })

  test('when plan not found, raises', async () => {
    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {
        userId: 'user_1234'
      },
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await expect(() => billing.syncCheckout('checkout_1234')).rejects.toThrowError(
      "Missing plan for price 'price_1234'"
    )

    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith('checkout_1234')
  })

  test('when plan found, updates user', async () => {
    plans.getByPriceId.mockReturnValue({ id: 'pro', priceId: 'plan_1234' })

    stripe.subscriptions.retrieve.mockResolvedValue({
      id: 'sub_1234',
      customer: 'cus_1234',
      metadata: {
        userId: 'user_1234'
      },
      items: {
        data: [
          {
            price: {
              id: 'price_1234'
            }
          }
        ]
      },
      status: 'active'
    })

    await billing.syncCheckout('checkout_1234')

    expect(stripe.checkout.sessions.retrieve).toHaveBeenCalledWith('checkout_1234')
    expect(adapter.updateUser).toHaveBeenCalledWith({
      id: 'user_1234',
      customerId: 'cus_1234',
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE',
      plan: 'pro',
      priceId: 'price_1234'
    })
  })
})

describe('cancelSubscription', () => {
  test('cancels subscription', async () => {
    stripe.subscriptions.update.mockResolvedValue({
      subscription: 'sub_1234'
    })

    const user = {
      subscriptionId: 'sub_1234'
    }

    const result = await billing.cancelSubscription(user)

    expect(result).toMatchObject({
      subscription: 'sub_1234'
    })

    expect(stripe.subscriptions.update).toHaveBeenCalledWith('sub_1234', {
      cancel_at_period_end: true
    })
  })
})
