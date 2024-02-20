import { expect, test } from '@playwright/test'
import { createUser } from './factories.js'
import { signIn, updateUser } from './utils'

test.describe('non subscriber', () => {
  let nonSubscriber

  test.beforeEach(async () => {
    nonSubscriber = await createUser()
  })

  test('when subscribed, returns error', async ({ page }) => {
    await updateUser(nonSubscriber, {
      subscriptionId: 'sub_1234',
      subscriptionStatus: 'ACTIVE'
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/server-side/non-subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not subscribed, returns success', async ({ page }) => {
    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/server-side/non-subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not signed in, returns success', async ({ page }) => {
    const response = await page.goto('/authorization/server-side/non-subscriber')

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

  test('when subscribed, returns success', async ({ page }) => {
    await signIn(page, subscriber)

    const response = await page.goto('/authorization/server-side/subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not subscribed, returns error', async ({ page }) => {
    const nonSubscriber = await updateUser(subscriber, {
      subscriptionId: null,
      subscriptionStatus: null
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/authorization/server-side/subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not signed in, returns error', async ({ page }) => {
    const response = await page.goto('/authorization/server-side/subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test.describe('active guard', () => {
    test('when active, returns success', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'ACTIVE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/active')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not active, returns error', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/active')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('past due guard', () => {
    test('when past_due, returns success', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'PAST_DUE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/past-due')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not past_due, returns error', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/past-due')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('unpaid guard', () => {
    test('when unpaid, returns success', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'UNPAID' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/unpaid')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not unpaid, returns error', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/unpaid')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('trialing guard', () => {
    test('when trialing, returns success', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'TRIALING' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/trialing')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not trialing, returns error', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/trialing')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('canceled guard', () => {
    test('when canceled, returns success', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'CANCELED' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/canceled')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not canceled, returns error', async ({ page }) => {
      await updateUser(subscriber, { subscriptionStatus: 'ACTIVE' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/canceled')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('plan guard', () => {
    test('when on matching plan, returns success', async ({ page }) => {
      await updateUser(subscriber, { plan: 'pro' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/plan')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, returns error', async ({ page }) => {
      await updateUser(subscriber, { plan: 'basic' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/plan')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('plans guard', () => {
    test('when on matching plan, returns success', async ({ page }) => {
      await updateUser(subscriber, { plan: 'pro' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/plans')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, returns error', async ({ page }) => {
      await updateUser(subscriber, { plan: 'basic' })
      await signIn(page, subscriber)

      const response = await page.goto('/authorization/server-side/plans')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })
})
