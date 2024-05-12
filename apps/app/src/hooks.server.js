import { sequence } from '@sveltejs/kit/hooks'
import * as Sentry from '@sentry/sveltekit'
import { SvelteKitAuth } from '@airbadge/sveltekit'

// use GitHub OAuth provider
import GitHub from '@auth/core/providers/github'

// use Prisma database adapter
import { PrismaAdapter } from '@auth/prisma-adapter'

// import Prisma client for database adapter
import { PrismaClient } from '@prisma/client'

// import env vars for OAuth client
import { env } from '$env/dynamic/private'

Sentry.init({
  dsn: 'https://f0853627ab1eb2822f1a2aa3b572cdd7@o4506863366832128.ingest.us.sentry.io/4506953208954880',
  enableTracing: false,
  tracesSampleRate: 1
})

// init database client
const db = new PrismaClient()

// add Auth.js + Stripe handler
// API is similar to Auth.js
export const handle = sequence(
  Sentry.sentryHandle(),
  SvelteKitAuth({
    adapter: PrismaAdapter(db),
    providers: [
      GitHub({
        clientId: env.GITHUB_ID,
        clientSecret: env.GITHUB_SECRET
      })
    ],
  })
)
export const handleError = Sentry.handleErrorWithSentry()
