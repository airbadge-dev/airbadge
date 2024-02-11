# Server-side guards

Guards are helper functions that restrict access to routes based on the subscription status or plan.

There are several options available:

## Require a subscriber

Raises an error if user is not a subscriber:

`subscriber(callback)`

### Example

```javascript
// in +page.server.js
import { subscriber } from '@airbadge/sveltekit'

// route is for subscribers only (including canceled, or late on payment)
export const load = subscriber(callback)
```

## Require a specific status

Raises an error if the user's subscription is not in an expected [status](https://stripe.com/docs/api/subscriptions/object#subscription_object-status).

- `subscriber.active(callback)`
- `subscriber.pastDue(callback)`
- `subscriber.unpaid(callback)`
- `subscriber.trialing(callback)`
- `subscriber.canceled(callback)`

### Examples

```javascript
// in +page.server.js
import { subscriber } from '@airbadge/sveltekit'

// route is for fully paid subscribers only
export const load = subscriber.active(callback)

// route is for past due subscribers only
export const load = subscriber.pastDue(callback)

// route is for unpaid subscribers only
export const load = subscriber.unpaid(callback)

// route is for trailing subscribers only
export const load = subscriber.trialing(callback)

// route is for subscribers that have canceled their subscription
export const load = subscriber.canceled(callback)
```

## Require a specific plan

Raises an error if user doesn't have a specific plan.

`subscriber.plan(plan, callback)`

```javascript
// in +page.server.js
import { subscriber } from '@airbadge/sveltekit'

// route is for subscribers on the "pro" plan
export const load = subscriber.plan('pro', callback)
```

## Require a list of plans

Raises an error if user doesn't have one of several plan.

`subscriber.plans(plans, callback)`

```javascript
// in +page.server.js
import { subscriber } from '@airbadge/sveltekit'

// route is for subscribers on the "pro" or "enterprise" plans
export const load = subscriber.plans(['pro', 'enterprise'], callback)
```

## Require a non-subscriber

Raises an error if user is a subscriber.

`nonSubscriber(callback)`

### Example

```javascript
// in +page.server.js
import { nonSubscriber } from '@airbadge/sveltekit'

// route is for non-subscribers only
export const load = nonSubscriber(callback)
```
