import { stripe, createService } from './billing'

vi.mock('stripe', () => {
  const Stripe = vi.fn(() => {
    return {
      checkout: {
        sessions: {
          create: vi.fn()
        }
      },
      billingPortal: {
        sessions: {
          create: vi.fn()
        }
      },
      subscriptions: {
        retrieve: vi.fn()
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
  email: 'user@home.com',
  customerId: 'cus_1234'
}

let billing

beforeEach(() => {
  billing = createService(adapter, plans)
})

afterEach(() => {
  vi.restoreAllMocks()
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
      success_url: 'http://localhost:5173/welcome?checkout_session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:5173/pricing',
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
      return_url: 'http://localhost:5173/dashboard'
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

    await expect(() => billing.syncSubscription('sub_1234'))
      .rejects
      .toThrowError("Missing user id metadata for subscription 'sub_1234'")
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

    await expect(() => billing.syncSubscription('sub_1234'))
      .rejects
      .toThrowError("Missing plan for price 'price_1234'")
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
