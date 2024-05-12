# Configuration

## Database Adapter

Configure an [Auth.js database adapter](https://authjs.dev/reference/core/adapters).

### Example using Prisma

```js
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'

const db = new PrismaClient()

export const handle = SvelteKitAuth({
  // [!code word:adapter]
  adapter: PrismaAdapter(db) // [!code highlight]
})
```

**Note**: This package requires some extra fields in the database. See [Database Guide](/database) for more information on updating your schema.

## Authentication Providers

AirBadge supports all [Auth.js authentication providers](https://authjs.dev/reference/core/providers).

### Example

```js {7-11}
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'
import GitHub from '@auth/core/providers/github'
import { env } from '$env/dynamic/private'

export const handle = SvelteKitAuth({
  providers: [
    GitHub({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET
    })
  ]
})
```

## Pages

All [page options](https://authjs.dev/guides/basics/pages) from Auth.js are supported. With some additional options:

### Additional options

| Attribute          | Description                                                   |
| :----------------- | :------------------------------------------------------------ |
| `checkout.success` | Page user will be sent to after a checkout succeeds.          |
| `checkout.cancel`  | Page user will be sent to after a checkout is canceled.       |
| `portalReturn`     | Page user will be sent to when returning from billing portal. |

### Example

```js {5-11}
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'

export const handle = SvelteKitAuth({
  pages: {
    checkout: {
      success: '/dashboard',
      cancel: '/pricing'
    },
    portalReturn: '/dashboard'
  }
})
```

## Callbacks

All [callback options](https://authjs.dev/guides/basics/callbacks) from Auth.js are supported.

### Example

```js
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },

  async redirect({ url, baseUrl }) {
    return baseUrl
  },

  async session({ session, user, token }) {
    return session
  },

  async jwt({ token, user, account, profile, isNewUser }) {
    return token
  }
}
```
