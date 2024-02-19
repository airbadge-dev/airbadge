import { subscriber } from '$lib/server/guards'

export const load = subscriber(() => {
  return { value: 'secret' }
})
