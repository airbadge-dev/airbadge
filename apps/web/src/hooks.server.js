import { sequence } from '@sveltejs/kit/hooks'
import { redirections } from 'sveltekit-redirections'
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit'
import * as Sentry from '@sentry/sveltekit'

Sentry.init({
  dsn: 'https://18b3e85dc85198517e2928a07741e975@o4506863366832128.ingest.us.sentry.io/4506863367028736',
  enableTracing: false,
  tracesSampleRate: 1.0
})

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(
  sentryHandle(),
  redirections({
    '/discord': 'https://discord.gg/KjGNepeChg',
    '/docs': 'https://docs.airbadge.dev',
    '/github': 'https://github.com/airbadge-dev/airbadge',
    '/start': 'https://docs.airbadge.dev/getting-started',
    '/get-started': 'https://docs.airbadge.dev/getting-started',
    '/getting-started': 'https://docs.airbadge.dev/getting-started',
  })
)

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry()
