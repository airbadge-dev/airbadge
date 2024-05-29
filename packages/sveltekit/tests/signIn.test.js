import { expect, test } from '@playwright/test'
import { createUser } from './factories.js'
import { signIn } from './utils'

test('sign in without subscription', async ({ page }) => {
  const user = await createUser()

  const session = await signIn(page, user)

  expect(session).toMatchObject({
    user: {
      email: user.email,
      name: user.name
    }
  })

  expect(session.subscription).toBeUndefined()
})

test('sign in with subscription', async ({ page }) => {
  const user = await createUser({
    subscriptionId: 'sub_1234',
    subscriptionStatus: 'ACTIVE',
    customerId: 'cus_1234',
    priceId: 'price_1234',
    plan: 'pro'
  })

  const session = await signIn(page, user)

  expect(session).toMatchObject({
    user: {
      email: user.email,
      name: user.name
    },
    customerId: 'cus_1234',
    subscription: {
      id: 'sub_1234',
      status: 'active',
      priceId: 'price_1234',
      plan: 'pro',
    }
  })
})

test('sign in with purchases', async ({ page }) => {
  const user = await createUser({
    customerId: 'cus_1234',
    purchases: [
      { priceId: 'price_123', productId: 'prod_123', lookupKey: 't-shirt'},
      { priceId: 'price_456', productId: 'prod_456', lookupKey: 'socks'}
    ]
  })

  const session = await signIn(page, user)

  expect(session).toMatchObject({
    user: {
      email: user.email,
      name: user.name
    },
    customerId: 'cus_1234',
    purchases: [
      'prod_123',
      'price_123',
      't-shirt',
      'prod_456',
      'price_456',
      'socks'
    ]
  })
})
