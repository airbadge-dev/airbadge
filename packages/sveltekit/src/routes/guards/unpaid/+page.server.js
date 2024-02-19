import { subscriber } from '$lib/server/guards'

export const load = subscriber.unpaid(() => {
  return { value: 'secret' }
})
