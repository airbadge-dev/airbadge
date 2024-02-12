# Getting Started

This guide uses [Prisma](https://prisma.io) as the database and [GitHub](https://github.com) as the authentication provider.

## Install packages

For Auth & Payment:

```sh
pnpm install -D @auth/core @airbadge/sveltekit
```

For Prisma:

```sh
pnpm install -D prisma @prisma/client @auth/prisma-adapter
```

## Configure environment

Add environment variables to `.env.development`:

```sh
# Stripe private key
# Find it here: https://dashboard.stripe.com/test/apikeys
SECRET_STRIPE_KEY=sk_...

# Domain to use for URLs:
DOMAIN=http://localhost:5173

# Database URL for the Auth.js database adapter
# For examples, see: https://www.prisma.io/docs/orm/reference/connection-urls
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/mydb?schema=public"

# Client Id and Client Secret of GitHub OAuth app
# In GitHub: Settings -> Developer Settings -> OAuth Apps
GITHUB_ID=
GITHUB_SECRET=
```

## Setup database

First, initialize Prisma:

```sh
pnpm prisma init
```

Then, update your `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]

  // customizations for AirBadge
  customerId         String?
  subscriptionId     String?
  subscriptionStatus SubscriptionStatus?
  plan               String?
  priceId            String?
}

enum SubscriptionStatus {
  INCOMPLETE
  INCOMPLETE_EXPIRED
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```

Finally, push the schema:

```sh
pnpm prisma db push
```

## Create pricing

Create some plans and pricing. This can be done via the [Stripe Dashboard](https://dashboard.stripe.com) or via the [Stripe CLI](https://docs.stripe.com/cli).

To create them via the CLI:

```sh
# login to Stripe
stripe login

# create products & pricing
stripe prices create \
  --product-data.name="Basic Plan" \
  --currency=usd \
  --unit-amount=1000 \
  --recurring.interval=month

stripe prices create \
  --product-data.name="Pro Plan" \
  --currency=usd \
  --unit-amount=2500 \
  --recurring.interval=month

stripe prices create \
  --product-data.name="Enterprise Plan" \
  --currency=usd \
  --unit-amount=10000 \
  --recurring.interval=month
```

## Configure SvelteKit

Configure authentication and billing options in `src/hooks.server.js`:

```javascript
import { SvelteKitAuth } from '@airbadge/sveltekit'

// use GitHub OAuth provider
import GitHub from '@auth/core/providers/github'

// use Prisma database adapter
import { PrismaAdapter } from '@auth/prisma-adapter'

// import Prisma client for database adapter
import { PrismaClient } from '@prisma/client'

// import env vars for OAuth client
import { GITHUB_ID, GITHUB_SECRET } from '$env/dynamic/private'

// init database client
const db = new PrismaClient()

// add Auth.js + Stripe handler
// API is similar to Auth.js
export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET
    })
  ],

  // configure list of plans.
  plans: [
    { id: 'basic', name: 'Basic', default: true },
    { id: 'pro', name: 'Pro' }
    { id: 'enterprise', name: 'Enterprise' }
  ]
})
```

## Forward webhooks

Webhook handling is built-in. Just forward webhooks via [Stripe's CLI](https://stripe.com/docs/cli).

```sh
stripe listen --forward-to localhost:5173/billing/webhooks
```

## Celebrate! 🎉

You now have a working SaaS app!

Visit [http://localhost:5173/auth/signin](http://localhost:5173/auth/signin) to sign up and pay.
