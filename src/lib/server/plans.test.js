import { createPlanList } from './plans'

test('getAll() returns all plans', async () => {
  const list = [1,2,3]
  const plans = createPlanList(list)

  const result = plans.getAll()

  expect(result).toEqual(list)
})

describe('getByPriceId', () => {
  const plans = createPlanList([{ priceId: 'price_1234', name: 'Pro' }])

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
    const plans = createPlanList([{ priceId: 'price_1234', name: 'Pro', default: true }])
    const result = plans.getDefault()

    expect(result).toMatchObject({ name: 'Pro' })
  })

  test('when not found, returns null', () => {
    const plans = createPlanList([{ priceId: 'price_1234', name: 'Pro' }])
    const result = plans.getDefault()

    expect(result).toBeUndefined()
  })
})

describe('getById', () => {
  test('when found, returns plan', () => {
    const plans = createPlanList([{ priceId: 'price_1234', id: 'pro', name: 'Pro', default: true }])
    const result = plans.getById('pro')

    expect(result).toMatchObject({ name: 'Pro' })
  })

  test('when not found, returns null', () => {
    const plans = createPlanList([{ priceId: 'price_1234', id: 'enterprise' }])
    const result = plans.getById('pro')

    expect(result).toBeUndefined()
  })
})
