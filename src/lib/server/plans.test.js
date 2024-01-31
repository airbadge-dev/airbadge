import { createPlans } from './plans'

const plans = createPlans([
  { priceId: 'price_1234', name: 'Pro' }
])

describe('getByPriceId', () => {
  test('when found, returns plan', () => {
    const result = plans.getByPriceId('price_1234')

    expect(result).toMatchObject({ name: 'Pro' })
  })

  test('when not found, returns null', () => {
    const result = plans.getByPriceId('price_unknown')

    expect(result).toBeUndefined()
  })
})
