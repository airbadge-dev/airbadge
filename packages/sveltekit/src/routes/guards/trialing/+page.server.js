import { subscriber } from '$lib/server/guards'

export const load = subscriber.trialing(() => {
  return { value: 'secret' }
})
