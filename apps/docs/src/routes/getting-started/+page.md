# Getting Started

This guide uses [Prisma](https://prisma.io) as the database and [GitHub](https://github.com) as the authentication provider.

## Install packages

```sh
pnpm install -D @airbadge/sveltekit @auth/core prisma @prisma/client
```

## Configure environment

Add environment variables to `.env.development`:

- `DATABASE_URL`: The URL to your database.
- `STRIPE_SECRET_KEY`: Your Stripe API key. Used for creating checkouts and verifying webhooks.
- `GITHUB_ID`: The client id of your GitHub OAuth app.
- `GITHUB_SECRET`: The client secret of your GitHub OAuth app.
- `DOMAIN`: The domain of your site. `http://localhost:5173` for development.

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

## Create Stripe plans

## Configure hooks

## Forward webhooks

Webhook handling is built-in. Just forward webhooks via [Stripe's CLI](https://stripe.com/docs/cli).

```sh
stripe listen --forward-to localhost:5173/billing/webhooks
```
