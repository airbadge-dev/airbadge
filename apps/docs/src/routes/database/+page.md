# Database Adapters

AirBadge uses Auth.js's database adapters.

It requires some extra fields to the `User` schema.

## Extra fields

| Name                 | Type   | Description                                                                  |
| :------------------- | :----- | :--------------------------------------------------------------------------- |
| `subscriptionId`     | String | The id of the Stripe subscription.                                           |
| `subscriptionStatus` | String | The status of the Stripe subscription.                                       |
| `customerId`         | String | The customerId of the user in Stripe.                                        |
| `priceId`            | String | The priceId of the subscription.                                             |
| `plan`               | String | The plan the user is on. Maps to [plan configuration](/configuration#plans). |

## Prisma

Update your `prisma/schema.prisma`, then run `pnpm prisma generate`:

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

// customization for AirBadge
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

### Example

```js
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const db = new PrismaClient()

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(db) // [!code highlight]
})
```

## Drizzle

TBD

## Mongo

TBD

## Others

All others should work by added the [extra fields](#extra-fields).
