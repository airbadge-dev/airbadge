import { subscriber } from '$lib/server/guards'

export const load = subscriber.plans(['enterprise', 'pro'], () => {
  return { value: 'secret' }
})
