import { subscriber, nonSubscriber } from './guards'

const callback = vi.fn()

beforeEach(() => vi.restoreAllMocks())

describe('nonSubscriber()', () => {
  test('when subscription, returns error', async () => {
    const handler = nonSubscriber(callback)
    const event = {
      locals: {
        getSession() { return {} }
      }
    }

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })

  test('when no subscription, calls callback', async () => {
    const handler = nonSubscriber(callback)
    const event = {
      locals: {
        getSession() { return null }
      }
    }

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })
})

describe('subscriber()', () => {
  test('when subscription, calls callback', async () => {
    const handler = subscriber(callback)
    const session = {
      subscription: {}
    }
    const event = {
      locals: {
        getSession() { return session }
      }
    }

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)

  })

  test('when no subscription, raises error', async () => {
    const handler = subscriber(callback)
    const event = {
      locals: {
        getSession() { return {} }
      }
    }

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.active()', () => {
  test('when subscription is active, calls callback', async () => {
    const event = mockEvent({ status: 'ACTIVE'})
    const handler = subscriber.active(callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription is not active, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED'})
    const handler = subscriber.active(callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.pastDue()', () => {
  test('when subscription is past_due, calls callback', async () => {
    const event = mockEvent({ status: 'PAST_DUE'})
    const handler = subscriber.pastDue(callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription is not past_due, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED'})
    const handler = subscriber.pastDue(callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.unpaid()', () => {
  test('when subscription is unpaid, calls callback', async () => {
    const event = mockEvent({ status: 'UNPAID'})
    const handler = subscriber.unpaid(callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription is not unpaid, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED'})
    const handler = subscriber.unpaid(callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.canceled()', () => {
  test('when subscription is canceled, calls callback', async () => {
    const event = mockEvent({ status: 'CANCELED'})
    const handler = subscriber.canceled(callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription is not canceled, raises error', async () => {
    const event = mockEvent({ status: 'ACTIVE'})
    const handler = subscriber.canceled(callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.trialing()', () => {
  test('when subscription is trialing, calls callback', async () => {
    const event = mockEvent({ status: 'TRIALING'})
    const handler = subscriber.trialing(callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription is not trialing, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED'})
    const handler = subscriber.trialing(callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.plan()', () => {
  const plan = {
    id: 'pro'
  }

  test('when subscription plan matches, calls callback', async () => {
    const event = mockEvent({ status: 'ACTIVE', plan })
    const handler = subscriber.plan('pro', callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription plan doesnt match, calls callback', async () => {
    const event = mockEvent({ status: 'ACTIVE', plan })
    const handler = subscriber.plan('basic', callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })

  test('when subscription is canceled, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED', plan })
    const handler = subscriber.plan('pro', callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

describe('subscriber.plans()', () => {
  const plan = {
    id: 'pro'
  }

  test('when subscription plan matches, calls callback', async () => {
    const event = mockEvent({ status: 'ACTIVE', plan })
    const handler = subscriber.plans(['basic', 'pro'], callback)

    await handler(event)

    expect(callback).toHaveBeenCalledWith(event)
  })

  test('when subscription plan doesnt match, calls callback', async () => {
    const event = mockEvent({ status: 'ACTIVE', plan })
    const handler = subscriber.plans(['basic'], callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })

  test('when subscription is canceled, raises error', async () => {
    const event = mockEvent({ status: 'CANCELED', plan })
    const handler = subscriber.plan(['pro'], callback)

    const response = handler(event)

    await expect(response)
      .toError(403, 'Forbidden')

    expect(callback).not.toHaveBeenCalled()
  })
})

function mockEvent(subscription = null) {
  const session = { subscription }

  return {
    locals: {
      getSession() { return session }
    }
  }
}
