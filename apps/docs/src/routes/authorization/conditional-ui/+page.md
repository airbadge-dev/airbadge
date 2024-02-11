# Conditional UI

These components can conditionally display UI based on the user's subscription status or plan.

Two components are provided:

- `<NonSubscriber/>`: Display content when user doesn't have a subscription.
- `<Subscriber/>`: Display content when user has a subscription. Can also filter by plan or subscription state.

### Examples

```svelte
<script>
  import { Subscriber, NonSubscriber } from '@airbadge/sveltekit'
</script>

<!-- show to all subscribers -->
<Subscriber>
  <p>Welcome back subscriber!</p>
</Subscriber>

<!-- show to unpaid subscribers -->
<Subscriber unpaid>
  <p>Whoops, we couldn't collect a payment.</p>

  <a href="/billing/portal">Upgrade</a>
</Subscriber>

<!-- show to subscribers with canceled subscriptions -->
<Subscriber canceled>
  <p>Your account has been canceled</p>
  <a href="/billing/checkout">Sign up</a>
</Subscriber>

<!-- show to subscribers on the "pro" plan -->
<Subscriber plan="pro">You're on the Pro plan!!</Subscriber>

<!-- show to subscribers on the "pro" or "enterprise" plan -->
<Subscriber plans={['pro', 'enterprise']}>You're a real player!!</Subscriber>

<!-- show to non-subscribers -->
<NonSubscriber>
  <a href="/billing/checkout">Sign up</a>
</NonSubscriber>
```
