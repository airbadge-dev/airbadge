import { nonSubscriber } from '$lib/server/guards'

export const load = nonSubscriber(() => {
  return { value: 'secret' }
})
