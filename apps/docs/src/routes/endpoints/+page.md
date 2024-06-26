# Endpoints

AirBadge mounts a `/billing` endpoint on your site that provides some handy utilities.

The following routes are provided:

| Endpoint                   | Description                                                    |
| :------------------------- | :------------------------------------------------------------- |
| `/billing/checkout`          | Redirects current signed-in user to a Stripe checkout session. |
| `/billing/portal`            | Opens the billing portal for the current signed-in user.       |
| `/billing/modify`            | Modify the current user's billing plan.                        |
| `/billing/cancel`            | Cancels the current user's subscription.                       |
| `/billing/checkout/complete` | Handles post-checkout housekeeping.                            |
| `/billing/webhooks`          | Handles all Stripe webhooks for you.                           |

## Use cases

### Open billing portal UI

Just link to `/billing/portal`

```svelte
<a href="/billing/portal">Update Account</a>
```

### Create an upgrade button

When a user clicks the button, `POST` to `/billing/modify` and pass `id` as a query param. The `id` can be either a price id, product id or lookup key.

```svelte
<script>
  function upgrade() {
    return fetch('/billing/modify?id=price_1234', {
      method: 'POST'
    })
  }
</script>

<button on:click={upgrade}>Upgrade</button>
```

### Create an cancel button

When user clicks the button, `POST` to `/billing/cancel`:

```svelte
<script>
  function cancel() {
    return fetch('/billing/cancel', {
      method: 'POST'
    })
  }
</script>

<button on:click={cancel}>Cancel</button>
```

### Create a pricing page

Pull pricing from Stripe in `src/routes/pricing/+page.js`:

```javascript
import { SECRET_STRIPE_KEY } from '$env/static/private'

const stripe = new Stripe(SECRET_STRIPE_KEY)

export async function load({ fetch }) {
  const { data } = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  })

  return {
    products: data
  }
}
```

Data bind the products in `src/routes/pricing/+page.svelte`:

```svelte
<script>
  export let data
</script>

<h1>Pricing</h1>

{#each data.products as product}
  <section>
    <h2>{product.name}</h2>
    <p>
      Price: {product.default_price.unit_amount / 100}
    </p>

    <a href="/billing/checkout?id={product.default_price.id}">
      Subscribe
    </a>
  </section>
{/each}
```
