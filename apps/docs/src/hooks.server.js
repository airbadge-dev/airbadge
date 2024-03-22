import { sequence } from '@sveltejs/kit/hooks'
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit'
import * as Sentry from '@sentry/sveltekit'

Sentry.init({
  dsn: 'https://43223178b75500932cfb422debe9a969@o4506863366832128.ingest.us.sentry.io/4506863374041088',
  enableTracing: false,
  tracesSampleRate: 1.0
})

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle())

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
