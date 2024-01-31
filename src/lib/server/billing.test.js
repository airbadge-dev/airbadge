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
      }
    }
  })

  return { default: Stripe }
})

const user = {
  id: 'user_1234',
  email: 'user@home.com',
  customerId: 'cus_1234'
}

let billing

beforeEach(() => {
  billing = createService()
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
