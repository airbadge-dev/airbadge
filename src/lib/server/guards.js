import { error } from '@sveltejs/kit'

export const nonSubscriber = (handler) => predicate(handler, (session) => !session)
export const subscriber = (handler) => predicate(handler, (session) => !!session?.subscription)

subscriber.active = (handler) => predicate(handler, (session) => session?.subscription?.status == 'ACTIVE')
subscriber.pastDue = (handler) => predicate(handler, (session) => session?.subscription?.status == 'PAST_DUE')
subscriber.unpaid = (handler) => predicate(handler, (session) => session?.subscription?.status == 'UNPAID')
subscriber.trialing = (handler) => predicate(handler, (session) => session?.subscription?.status == 'TRIALING')
subscriber.canceled = (handler) => predicate(handler, (session) => session?.subscription?.status == 'CANCELED')

subscriber.plan = (plan, handler) => predicate(handler, (session) => session?.subscription?.status != 'CANCELED' && session?.subscription?.plan?.id == plan)
subscriber.plans = (plans, handler) => predicate(handler, (session) => session?.subscription?.status != 'CANCELED' && plans.includes(session?.subscription?.plan?.id))

function predicate(handler, filter) {
  return async (event) => {
    const session = event.locals.getSession()

    if (filter(session)) {
      return handler(event)
    }

    error(403, 'Forbidden')
  }
}
