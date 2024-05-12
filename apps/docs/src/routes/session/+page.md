# Session

AirBadge adds extra attributes to the session.

These are useful for building conditional logic based on the `subscription` and `plan`.

They are available on both the [client](#client-side) and [server](#server-side).

## Attributes

| Attribute                   | Function                                                                                                               |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `subscription.id`           | The user's subscription id.                                                                                            |
| `subscription.status`       | The current [status of the subscription](https://stripe.com/docs/api/subscriptions/object#subscription_object-status). |
| `subscription.customer`     | The user's Stripe customer id.                                                                                         |
| `subscription.plan`         | The lookup key of the Stripe price. Example: `pro_monthly` or `basic_yearly`                                           |
| `subscription.priceId` | The Stripe price id of the plan. Example: `price_1234`                                                                 |

## Server-side

To get session data on the server-side, use `locals.getSession()`:

```javascript
// +page.server.js
export async function load({ locals }) {
  // [!code word:locals]
  // [!code word:getSession]
  const session = await locals.getSession()
}
```

## Client-side

On the client side, use the `data` prop:

```svelte
<!-- +page.svelte -->
<script>
  export let data
</script>

<pre>{data.session}</pre>
```

### Example

This is an example of what session data would look like:

```json
{
  "id": "1234",
  "sessionToken": "uuid",
  "userId": "1234",
  "expires": "2024-03-11T15:01:35.933Z",
  "user": {
    "id": "1234",
    "name": "Joshua Nussbaum",
    "email": "user@example.com",
    "emailVerified": null,
    "image": "https://avatars.githubusercontent.com/u/###"
  },
  "subscription": {
    "id": "sub_1234",
    "customerId": "cus_1234",
    "status": "active",
    "priceId": "price_1234",
    "plan": "basic_monthly"
  }
}
```
