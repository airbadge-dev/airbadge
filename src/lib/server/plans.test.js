import { createPlans } from './plans'

describe('getByPriceId', () => {
  const plans = createPlans([{ priceId: 'price_1234', name: 'Pro' }])

  test('when found, returns plan', () => {
    const result = plans.getByPriceId('price_1234')

    expect(result).toMatchObject({ name: 'Pro' })
  })

  test('when not found, returns null', () => {
    const result = plans.getByPriceId('price_unknown')

    expect(result).toBeUndefined()
  })
})

describe('getDefault', () => {
  test('when found, returns plan', () => {
    const plans = createPlans([{ priceId: 'price_1234', name: 'Pro', default: true }])
    const result = plans.getDefault()

    expect(result).toMatchObject({ name: 'Pro' })
  })

  test('when not found, returns null', () => {
    const plans = createPlans([{ priceId: 'price_1234', name: 'Pro' }])
    const result = plans.getDefault()

    expect(result).toBeUndefined()
  })
})
