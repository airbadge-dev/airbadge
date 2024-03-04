import { tweened } from 'svelte/motion'
import { derived } from 'svelte/store'
import { interpolateRound } from 'd3-interpolate'

export function typewriter(text, options = {}) {
  const length = tweened(0, { ...options, interpolate: interpolateRound })
  const slice = derived(length, (length) => {
    return text.slice(0, length)
  })

  length.set(text.length)

  return slice
}
