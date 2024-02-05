export function isMember(session, rules = {}) {
  const subscription = session?.subscription

  if (!subscription) return false

  if (rules.active && subscription.status !== 'ACTIVE') {
    return false
  }

  if (rules.pastDue && subscription.status !== 'PAST_DUE') {
    return false
  }

  if (rules.unpaid && subscription.status !== 'UNPAID') {
    return false
  }

  if (rules.trialing && subscription.status !== 'TRIALING') {
    return false
  }

  if (rules.canceled && subscription.status !== 'CANCELED') {
    return false
  }

  if (rules.plan && subscription.plan.id !== rules.plan) {
    return false
  }

  if (rules.plans && !rules.plans.includes(subscription.plan.id)) {
    return false
  }

  return true
}

export function isNonMember(session) {
  return !session?.subscription
}
