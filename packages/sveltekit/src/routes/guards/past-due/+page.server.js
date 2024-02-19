import { subscriber } from '$lib/server/guards'

export const load = subscriber.pastDue(() => {
  return { value: 'secret' }
})
