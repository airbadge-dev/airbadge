import { subscriber } from '$lib/server/guards'

export const load = subscriber.plan('pro', () => {
  return { value: 'secret' }
})
