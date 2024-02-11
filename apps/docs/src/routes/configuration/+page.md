# Configuration

## Adapter

Configure an [Auth.js database adapter](https://authjs.dev/reference/core/adapters).

### Example using Prisma

```js
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const db = new PrismaClient()

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(db)
})
```

**Note**: This package requires some extra fields in the database. See [Database Adapters](/database-adapters) for more information on updating your schema.

## Providers

AirBadge supports all [Auth.js authentication providers](https://authjs.dev/reference/core/providers).

### Example

```js
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'
import GitHub from '@auth/core/providers/github'
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private'

export const handle = SvelteKitAuth({
  providers: [
    GitHub({
      clientId: GITHUB_ID,
      clientSecret: GITHUB_SECRET
    })
  ]
})
```

## Plans

## Pages

## Callbacks
