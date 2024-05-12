import { stripe } from './stripe'
import { createCatalog } from './catalog'

vi.mock('stripe', () => {
  const Stripe = vi.fn(() => {
    return {
      products: {
        retrieve: vi.fn()
      },
      prices: {
        list: vi.fn(),
        retrieve: vi.fn()
      }
    }
  })

  return { default: Stripe }
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('get', () => {
  const catalog = createCatalog()

  test('when price found, returns price', async () => {
    stripe.prices.retrieve.mockResolvedValue({
      id: 'price_1234'
    })

    const result = await catalog.get('price_1234')

    expect(result).toMatchObject({ id: 'price_1234' })
    expect(stripe.prices.retrieve).toHaveBeenCalledWith('price_1234')
  })

  test('when product found with default price, returns default price', async () => {
    stripe.products.retrieve.mockResolvedValue({
      id: 'prod_1234',
      default_price: 'price_1234'
    })

    stripe.prices.retrieve.mockResolvedValue({
      id: 'price_1234'
    })

    const result = await catalog.get('prod_1234')

    expect(result).toMatchObject({ id: 'price_1234' })

    expect(stripe.products.retrieve).toHaveBeenCalledWith('prod_1234')
    expect(stripe.prices.retrieve).toHaveBeenCalledWith('price_1234')
  })

  test('when product found without default price, returns undefined', async () => {
    stripe.products.retrieve.mockResolvedValue({
      id: 'prod_1234',
      default_price: null
    })

    const result = await catalog.get('prod_1234')

    expect(result).toBeNull()

    expect(stripe.products.retrieve).toHaveBeenCalledWith('prod_1234')
  })


  test('when lookup_key found, returns price', async () => {
    stripe.prices.list.mockResolvedValue({
      data: [
        { id: 'price_1234' }
      ]
    })

    const result = await catalog.get('pro_monthly')

    expect(result).toMatchObject({ id: 'price_1234' })
    expect(stripe.prices.list).toHaveBeenCalledWith({ limit: 1, active: true, lookup_keys: ['pro_monthly']})
  })

  test('when not found, returns null', async () => {
    stripe.prices.list.mockResolvedValue({
      data: []
    })

    const result = await catalog.get('unknown')

    expect(result).toBeNull()
    expect(stripe.prices.list).toHaveBeenCalledWith({ limit: 1, active: true, lookup_keys: ['unknown']})
  })
})
