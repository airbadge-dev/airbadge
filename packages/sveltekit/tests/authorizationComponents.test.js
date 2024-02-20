import { expect, test } from '@playwright/test'
import { createUser } from './factories.js'
import { signIn, updateUser } from './utils'

test.describe('non subscriber', () => {
  let nonSubscriber

  test.beforeEach(async () => {
    nonSubscriber = await createUser()
  })

  test('when subscribed, hides protected data', async ({ page }) => {
    await updateUser(nonSubscriber, {
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE'
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/components/non-subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not subscribed, shows protected data', async ({ page }) => {
    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/components/non-subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not signed in, shows protected data', async ({ page }) => {
    const response = await page.goto('/authorization/components/non-subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })
})

test.describe('subscriber', () => {
  let subscriber

  test.beforeEach(async () => {
    subscriber = await createUser({
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE'
    })
  })

  test('when subscribed, shows protected data', async ({ page }) => {
    await signIn(page, subscriber)

    const response = await page.goto('/authorization/components/subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not subscribed, hides protected data', async ({ page }) => {
    const nonSubscriber = await updateUser(subscriber, {
      subscriptionId: null,
      subscriptionStatus: null
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/components/subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not signed in, hides protected data', async ({ page }) => {
    const response = await page.goto('/authorization/components/subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test.describe('active guard', () => {
    test('when active, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'ACTIVE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/active')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not active, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/active')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('past due guard', () => {
    test('when past_due, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'PAST_DUE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/past-due')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not past_due, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/past-due')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('unpaid guard', () => {
    test('when unpaid, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'UNPAID' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/unpaid')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not unpaid, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/unpaid')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('trialing guard', () => {
    test('when trialing, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'TRIALING' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/trialing')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not trialing, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/trialing')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('canceled guard', () => {
    test('when canceled, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/canceled')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not canceled, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'ACTIVE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/canceled')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('plan guard', () => {
    test('when on matching plan, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { plan: 'pro' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/plan')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { plan: 'basic' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/plan')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('plans guard', () => {
    test('when on matching plan, shows protected data', async ({ page }) => {
      await updateUser(subscriber, { plan: 'pro' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/plans')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, hides protected data', async ({ page }) => {
      await updateUser(subscriber, { plan: 'basic' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/components/plans')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })
})
