import { error } from '@sveltejs/kit'

export const nonSubscriber = predicate((session) => !session)
export const subscriber = predicate((session) => !!session?.subscription)

subscriber.active = predicate((session) => session?.subscription?.status == 'ACTIVE')
subscriber.pastDue = predicate((session) => session?.subscription?.status == 'PAST_DUE')
subscriber.unpaid = predicate((session) => session?.subscription?.status == 'UNPAID')
subscriber.trialing = predicate((session) => session?.subscription?.status == 'TRIALING')
subscriber.canceled = predicate((session) => session?.subscription?.status == 'CANCELED')

function predicate(filter) {
  return (handler) => {
    return async (event) => {
      const session = event.locals.getSession()

      if (filter(session)) {
        return handler(event)
      }

      error(403, 'Forbidden')
    }
  }
}
