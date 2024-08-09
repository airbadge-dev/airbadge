<img src="logo.svg" alt="logo" width="800"/>

> Stripe + Auth.js + SvelteKit

This project provides an easy way to create a SaaS site.

It is a [Stripe](https://stripe.com) addon for [Auth.js](https://authjs.dev).

Launch a SaaS app without writing any authentiction or payment code!

## Features

- **Integrated Payment**: Stripe Checkout is built into the signup flow.
- **Authentication**: Over 50 OAuth options (Google, Apple, GitHub...), provided by Auth.js.
- **Gating**: Access to routes and components can be restricted based on subscription.
- **Self-service account management**: Changing or canceling plans is accessible via `/billing/portal`.
- **Webhook handling**: All Stripe webhooks are handled for you.
- **Trials & Free plans**: Checkout can be skipped for free plans or trials.
- **Session data**: Subscription and plan data is included in the session.
- **Open source**: https://github.com/airbadge-dev/airbadge
- **BSL Licence**: Free to use. With optional [paid features](https://docs.airbadge.dev/license#paid-features).

## Gating

The session data contains info about the user's subscription & purchase history, so it's easy to gate routes and components in your app.

### Gating Routes

To gate routes, check the `session.subscription` or `session.purchases` for authorization:

```javascript
export async function load({ locals }) {
  const session = await locals.getSession()

  // for a subscription, check session.subscription
  if (session?.subscription?.plan != 'pro') {
    error(401, 'Must be on pro plan')
  }

  // alternatively, for one-time purchases, check session.purchases
  if (session?.purchases.includes('e-book')) {
    error(401, 'Please purchase the e-book to continue')
  }


  // do the gated thing here
}
```

### Components

Gating components is similar to gating routes. The same `session.subscription` & `session.purchases` data is available.

```svelte
<script>
  export let data
</script>

{#if data.session?.subscription?.plan == 'pro'}
  Your on the PRO plan!
{/if}

{#if data.session?.purchases.includes('e-book')}
  <a href="/download">Download e-book</a>
{/if}
```

## Billing Endpoint

This package provides a `/billing` endpoint, similar to how Auth.js provides a `/auth` endpoint.

The following routes are provided:

- `/billing/checkout`: Redirect current user to a Stripe checkout session.
- `/billing/portal`: Opens the billing portal for the current signed-in user.
- `/billing/cancel`: Cancels the current user's subscription.
- `/billing/webhooks`: Handles all Stripe webhooks for you.
- `/billing/modify`: Modify the current user's billing plan.
- `/billing/checkout/complete`: Handles post-checkout housekeeping.

## Setup

Install [@airbadge/sveltekit](https://npmjs.com/package/@airbadge/sveltekit):

```sh
pnpm i -D @airbadge/sveltekit
```

Setup a database provider for Auth.js. For example, follow instructions for Prisma:

https://authjs.dev/reference/adapter/prisma

Add environment variables to `.env`:

```sh
PUBLIC_STRIPE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
DOMAIN=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auth_stripe_sveltekit_dev?schema=public"
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

Configure authentication and billing options in `src/hooks.server.js`:

```javascript
import { SvelteKitAuth } from '@airbadge/sveltekit'

// use any OAuth provider (or multiple)
import GitHub from '@auth/sveltekit/providers/github'

// import prisma client for Auth.js's database adapter
import { PrismaClient } from '@prisma/client'

// init database client
const db = new PrismaClient()

// add Auth.js + Stripe handler
// API is similar to Auth.js
export const { handle } = SvelteKitAuth({
  // configure database adapter
  adapter: PrismaAdapter(db),

  // configure OAuth providers
  providers: [ GitHub ]
})
```

Forward Stripe events to `localhost`:

```sh
stripe listen --forward-to localhost:5173/billing/webhooks
```

## License

BSL - Business Software License.
