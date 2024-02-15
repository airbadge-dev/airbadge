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

Specify a list of plans. These map to Stripe Products and Pricing.

### Attributes

| Attribute  | Type    | Description                                                        |
| :--        | :-      | :--                                                                |
| `id`       | String  | A unique value for each plan.                                      |
| `name`     | String  | The name of the plan.                                              |
| `priceId`  | String  | The Stripe price ID.                                               |
| `price`    | Integer | The price of plan in cents. When free, checkout is skipped         |
| `default`  | Boolean | Optional. Whether to use this plan as the default during checkout. |
| `metadata` | Object  | Optional. Attach extra data to the plan.                           |

### Example

```js {5-19}
// in src/hooks.server.js
import { SvelteKitAuth } from '@airbadge/sveltekit'

export const handle = SvelteKitAuth({
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      priceId: 'price_1234',
      price: 1000,
      default: true
    },
    {
      id: 'pro',
      name: 'Pro',
      priceId: 'price_5678',
      price: 2500
    }
  ]
})
```

## Pages

All [page options from Auth.js](https://authjs.dev/guides/basics/pages). With some additional options:

### Additional options

| Attribute          | Description                                                   |
| :--                | :--                                                           |
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
