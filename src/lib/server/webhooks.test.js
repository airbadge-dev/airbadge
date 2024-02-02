import { stripe } from './billing'
import { handleWebhook } from './webhooks'

vi.mock('./billing', () => {
  return {
    stripe: {
      webhooks: {
        constructEvent: vi.fn()
      }
    }
  }
})

afterEach(() => vi.resetAllMocks())

describe('handleWebhook', () => {
  const billing = {
    syncSubscription: vi.fn()
  }

  test('when signature fails, raises error', async () => {
    stripe.webhooks.constructEvent.mockImplementationOnce(() => {
      throw new Error('invalid')
    })

    await expect(() => handleWebhook(billing, 'fake-body', 'fake-sig'))
      .rejects
      .toThrowError()

    expect(billing.syncSubscription).not.toHaveBeenCalled()
  })

  test('when subscription.created event, syncs subscription', async () => {
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.created',
      data: {
        object: {
          id: 'sub_1234'
        }
      }
    })

    await handleWebhook(billing, 'fake-body', 'fake-sig')

    expect(billing.syncSubscription).toHaveBeenCalledWith('sub_1234')
  })

  test('when subscription.updated event, syncs subscription', async () => {
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.updated',
      data: {
        object: {
          id: 'sub_1234'
        }
      }
    })

    await handleWebhook(billing, 'fake-body', 'fake-sig')

    expect(billing.syncSubscription).toHaveBeenCalledWith('sub_1234')
  })

  test('when subscription.deleted event, syncs subscription', async () => {
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.deleted',
      data: {
        object: {
          id: 'sub_1234'
        }
      }
    })

    await handleWebhook(billing, 'fake-body', 'fake-sig')

    expect(billing.syncSubscription).toHaveBeenCalledWith('sub_1234')
  })

  test('when subscription.trail_will_end event, syncs subscription', async () => {
    stripe.webhooks.constructEvent.mockReturnValue({
      type: 'customer.subscription.trial_will_end',
      data: {
        object: {
          id: 'sub_1234'
        }
      }
    })

    await handleWebhook(billing, 'fake-body', 'fake-sig')

    expect(billing.syncSubscription).toHaveBeenCalledWith('sub_1234')
  })
})
