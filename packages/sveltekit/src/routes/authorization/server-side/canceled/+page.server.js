import { subscriber } from '$lib/server/guards'

export const load = subscriber.canceled(() => {
  return { value: 'secret' }
})
