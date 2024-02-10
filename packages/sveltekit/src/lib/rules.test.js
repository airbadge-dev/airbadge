import { isSubscriber, isNonSubscriber } from './rules'

describe('isSubscriber', () => {
  test('when session and no rules, returns true', () => {
    const result = isSubscriber({ subscription: {} })

    expect(result).toEqual(true)
  })

  test('when no session, returns false', () => {
    const result = isSubscriber({})

    expect(result).toEqual(false)
  })

  test('when no subscription, returns false', () => {
    const result = isSubscriber({ subscription: null })

    expect(result).toEqual(false)
  })

  describe('active filter', () => {
    test('when subscription is active, returns true', () => {
      const result = isSubscriber({ subscription: { status: 'ACTIVE' } }, { active: true })

      expect(result).toEqual(true)
    })

    test('when subscription is not active, returns false', () => {
      const result = isSubscriber({ subscription: { status: 'CANCELED' } }, { active: true })

      expect(result).toEqual(false)
    })
  })

  describe('pastDue filter', () => {
    test('when subscription is past due, returns true', () => {
      const result = isSubscriber({ subscription: { status: 'PAST_DUE' } }, { pastDue: true })

      expect(result).toEqual(true)
    })

    test('when subscription is not past due, returns false', () => {
      const result = isSubscriber({ subscription: { status: 'CANCELED' } }, { pastDue: true })

      expect(result).toEqual(false)
    })
  })

  describe('unpaid filter', () => {
    test('when subscription is unpaid, returns true', () => {
      const result = isSubscriber({ subscription: { status: 'UNPAID' } }, { unpaid: true })

      expect(result).toEqual(true)
    })

    test('when subscription is not unpaid, returns false', () => {
      const result = isSubscriber({ subscription: { status: 'CANCELED' } }, { unpaid: true })

      expect(result).toEqual(false)
    })
  })

  describe('trialing filter', () => {
    test('when subscription is trialing, returns true', () => {
      const result = isSubscriber({ subscription: { status: 'TRIALING' } }, { trialing: true })

      expect(result).toEqual(true)
    })

    test('when subscription is not trialing, returns false', () => {
      const result = isSubscriber({ subscription: { status: 'CANCELED' } }, { trialing: true })

      expect(result).toEqual(false)
    })
  })

  describe('canceled filter', () => {
    test('when subscription is canceled, returns true', () => {
      const result = isSubscriber({ subscription: { status: 'CANCELED' } }, { canceled: true })

      expect(result).toEqual(true)
    })

    test('when subscription is not canceled, returns false', () => {
      const result = isSubscriber({ subscription: { status: 'ACTIVE' } }, { canceled: true })

      expect(result).toEqual(false)
    })
  })

  describe('plan filter', () => {
    const session = {
      subscription: {
        plan: {
          id: 'pro'
        }
      }
    }

    test('when subscription plan matches, returns true', () => {
      const result = isSubscriber(session, { plan: 'pro' })

      expect(result).toEqual(true)
    })

    test('when subscription plan doesnt match, returns false', () => {
      const result = isSubscriber(session, { plan: 'basic' })

      expect(result).toEqual(false)
    })
  })

  describe('plans filter', () => {
    const session = {
      subscription: {
        plan: {
          id: 'pro'
        }
      }
    }

    test('when subscription plan matches, returns true', () => {
      const result = isSubscriber(session, { plans: ['basic', 'pro'] })

      expect(result).toEqual(true)
    })

    test('when subscription plan doesnt match, returns false', () => {
      const result = isSubscriber(session, { plan: ['basic', 'enterprise'] })

      expect(result).toEqual(false)
    })
  })
})

describe('isNonSubscriber', () => {
  test('when subscription, returns false', () => {
    const result = isNonSubscriber({ subscription: {} })

    expect(result).toEqual(false)
  })

  test('when no session, returns true', () => {
    const result = isNonSubscriber(null)

    expect(result).toEqual(true)
  })

  test('when no subscription, returns true', () => {
    const result = isNonSubscriber({ subscription: null })

    expect(result).toEqual(true)
  })
})
