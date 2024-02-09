import { expect, test } from '@playwright/test'
import { db } from './db.js'
import { reset, createUser } from './factories.js'

await reset()

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
    plan: 'pro'
  })

  const session = await signIn(page, user)

  expect(session).toMatchObject({
    user: {
      email: user.email,
      name: user.name,
    },
    subscription: {
      id: 'sub_1234',
      customerId: 'cus_1234',
      status: 'ACTIVE',
      plan: {
        id: 'pro',
        name: 'Pro',
        price: 10000
      }
    }
  })
})

async function signIn(page, user) {
  await page.goto('/auth/signin')
  await page.getByLabel('Username').fill(user.email)
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button').click()

  const pre = await page.locator('pre')
  const json = await pre.innerHTML()
  const { session } = JSON.parse(json)

  return session
}
