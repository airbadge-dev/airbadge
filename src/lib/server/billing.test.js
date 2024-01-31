import { stripe, createCheckout } from './billing'
import Stripe from 'stripe'

vi.mock('stripe', () => {
  const Stripe = vi.fn(() => {
    return {
      checkout: {
        sessions: {
          create: vi.fn()
        }
      }
    }
  })

  return { default: Stripe }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('createCheckout', () => {
  const user = {
    id: 'user_1234',
    email: 'user@home.com'
  }

  const plan = {
    priceId: 'price_1234'
  }

  test('creates checkout session', async () => {
    stripe.checkout.sessions.create.mockResolvedValue({
      url: 'https://checkout.stripe.com/1234'
    })

    const result = await createCheckout(user, plan)

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
