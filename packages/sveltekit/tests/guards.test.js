import { expect, test } from '@playwright/test'
import { db } from './db.js'
import { createUser } from './factories.js'
import { signIn } from './utils'

test.describe('non subscriber', () => {
  let nonSubscriber

  test.beforeEach(async () => {
    nonSubscriber = await createUser()
  })

  test('when subscribed, returns error', async ({ page }) => {
    await db.user.update({
      where: { id: nonSubscriber.id },
      data: {
        subscriptionId: 'sub_1234',
        subscriptionStatus: 'ACTIVE'
      }
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/guards/non-subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not subscribed, returns success', async ({ page }) => {
    await signIn(page, nonSubscriber)

    const response = await page.goto('/guards/non-subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not signed in, returns success', async ({ page }) => {
    const response = await page.goto('/guards/non-subscriber')

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

    const response = await page.goto('/guards/subscriber')

    await expect(response.status()).toEqual(200)
    await expect(page.locator('body')).toContainText('secret')
  })

  test('when not subscribed, returns error', async ({ page }) => {
    const nonSubscriber = await db.user.update({
      where: { id: subscriber.id },
      data: {
        subscriptionId: null,
        subscriptionStatus: null
      }
    })

    await signIn(page, nonSubscriber)

    const response = await page.goto('/guards/subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test('when not signed in, returns error', async ({ page }) => {
    const response = await page.goto('/guards/subscriber')

    await expect(response.status()).toEqual(403)
    await expect(page.locator('body')).not.toContainText('secret')
  })

  test.describe('active guard', () => {
    test('when active, returns success', async ({ page }) => {
      await updateStatus(subscriber, 'ACTIVE')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/active')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not active, returns error', async ({ page }) => {
      await updateStatus(subscriber, 'CANCELED')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/active')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('past due guard', () => {
    test('when past_due, returns success', async ({ page }) => {
      await updateStatus(subscriber, 'PAST_DUE')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/past-due')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not past_due, returns error', async ({ page }) => {
      await updateStatus(subscriber, 'CANCELED')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/past-due')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('unpaid guard', () => {
    test('when unpaid, returns success', async ({ page }) => {
      await updateStatus(subscriber, 'UNPAID')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/unpaid')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not unpaid, returns error', async ({ page }) => {
      await updateStatus(subscriber, 'CANCELED')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/unpaid')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('trialing guard', () => {
    test('when trialing, returns success', async ({ page }) => {
      await updateStatus(subscriber, 'TRIALING')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/trialing')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not trialing, returns error', async ({ page }) => {
      await updateStatus(subscriber, 'CANCELED')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/trialing')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('canceled guard', () => {
    test('when canceled, returns success', async ({ page }) => {
      await updateStatus(subscriber, 'CANCELED')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/canceled')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not canceled, returns error', async ({ page }) => {
      await updateStatus(subscriber, 'ACTIVE')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/canceled')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe('plan guard', () => {
    test('when on matching plan, returns success', async ({ page }) => {
      await updatePlan(subscriber, 'pro')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/plan')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, returns error', async ({ page }) => {
      await updatePlan(subscriber, 'basic')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/plan')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })

  test.describe.only('plans guard', () => {
    test('when on matching plan, returns success', async ({ page }) => {
      await updatePlan(subscriber, 'pro')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/plans')

      await expect(response.status()).toEqual(200)
      await expect(page.locator('body')).toContainText('secret')
    })

    test('when not on matching plan, returns error', async ({ page }) => {
      await updatePlan(subscriber, 'basic')
      await signIn(page, subscriber)

      const response = await page.goto('/guards/plans')

      await expect(response.status()).toEqual(403)
      await expect(page.locator('body')).not.toContainText('secret')
    })
  })
})

async function updateStatus(user, subscriptionStatus) {
  return db.user.update({
    where: { id: user.id },
    data: {
      subscriptionStatus
    }
  })
}

async function updatePlan(user, plan) {
  return db.user.update({
    where: { id: user.id },
    data: {
      plan
    }
  })
}
