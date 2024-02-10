# Session

## Server-side

To get session data on the server-side, use `locals.getSession()`:

```javascript
// +page.server.js
export async function load({ locals }) {
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

## Subscription data

AirBadge adds more attributes to the session:

| Attribute                   | Function                                                                                                               |
|:----------------------------|:-----------------------------------------------------------------------------------------------------------------------|
| `subscription.id`           | The user's subscription id.                                                                                            |
| `subscription.status`       | The current [status of the subscription](https://stripe.com/docs/api/subscriptions/object#subscription_object-status). |
| `subscription.customer`     | The user's Stripe customer id.                                                                                         |
| `subscription.plan.id`      | The id of the plan. Example: `pro` or `enterprise`                                                                     |
| `subscription.plan.name`    | The name of the plan. Example: `Pro` or `Enterprise`                                                                   |
| `subscription.plan.priceId` | The Stripe price id of the plan. Example: `price_1234`                                                                 |
| `subscription.plan.price`   | The price of the plan in cents. Example: `1000`                                                                        |

## Example

Here's an example of what session would look like:

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
    "plan": {
      "id": "basic",
      "name": "Basic",
      "priceId": "price_1234",
      "price": 1000
    }
  }
}
```
