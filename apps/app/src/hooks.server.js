import { SvelteKitAuth } from '@airbadge/sveltekit'

// use GitHub OAuth provider
import GitHub from '@auth/core/providers/github'

// use Prisma database adapter
import { PrismaAdapter } from '@auth/prisma-adapter'

// import Prisma client for database adapter
import { PrismaClient } from '@prisma/client'

// import env vars for OAuth client
import { env } from '$env/dynamic/private'

// init database client
const db = new PrismaClient()

// add Auth.js + Stripe handler
// API is similar to Auth.js
export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET
    })
  ],

  // configure list of plans.
  plans: [
    { id: 'pro', name: 'Pro', priceId: env.PRO_PRICE_ID, price: 250000 },
    { id: 'enterprise', name: 'Enterprise', priceId: env.ENTERPRISE_PRICE_ID, price: 120000, default: true }
  ]
})
