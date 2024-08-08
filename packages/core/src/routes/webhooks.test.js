import handler from './webhooks'
import { handleWebhook } from '../webhooks'

vi.mock('../webhooks', () => {
  return {
    handleWebhook: vi.fn()
  }
})

const state = {
  billing: Symbol()
}

const event = {
  request: {
    headers: new Map([['stripe-signature', 'fake-signature']]),
    async text() {
      return 'fake-body'
    }
  }
}

describe('webhooks', () => {
  test('when errors, raises', async () => {
    handleWebhook.mockRejectedValueOnce(Error('invalid sig'))

    await expect(handler(event, state)).toError(400, 'Invalid request')

    expect(handleWebhook).toHaveBeenCalledWith(state.billing, 'fake-body', 'fake-signature')
  })

  test('when succeeds, returns 200', async () => {
    handleWebhook.mockResolvedValueOnce({})

    const response = await handler(event, state)

    expect(response.status).toEqual(200)
    expect(handleWebhook).toHaveBeenCalledWith(state.billing, 'fake-body', 'fake-signature')
  })
})
