import { subscriber } from '$lib/server/guards'

export const load = subscriber.active(() => {
  return { value: 'secret' }
})
