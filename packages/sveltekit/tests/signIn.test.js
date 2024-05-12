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
    subscription: {
      id: 'sub_1234',
      customerId: 'cus_1234',
      status: 'active',
      priceId: 'price_1234',
      plan: 'pro',
    }
  })
})
