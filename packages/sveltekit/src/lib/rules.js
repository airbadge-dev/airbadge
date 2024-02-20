export function isSubscriber(session, rules = {}) {
  const subscription = session?.subscription

  if (!subscription) return false

  if (rules.active && subscription.status !== 'active') {
    return false
  }

  if (rules.pastDue && subscription.status !== 'past_due') {
    return false
  }

  if (rules.unpaid && subscription.status !== 'unpaid') {
    return false
  }

  if (rules.trialing && subscription.status !== 'trialing') {
    return false
  }

  if (rules.canceled && subscription.status !== 'canceled') {
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

export function isNonSubscriber(session) {
  return !session?.subscription
}
