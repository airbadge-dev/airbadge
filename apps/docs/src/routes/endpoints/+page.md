# Endpoints

AirBadge mounts a `/billing` endpoint on your site that provides some handy utilities.

The following routes are provided:

| Endpoint                   | Description                                                    |
| :------------------------- | :------------------------------------------------------------- |
| /billing/checkout          | Redirects current signed-in user to a Stripe checkout session. |
| /billing/portal            | Opens the billing portal for the current signed-in user.       |
| /billing/modify            | Modify the current user's billing plan.                        |
| /billing/cancel            | Cancels the current user's subscription.                       |
| /billing/checkout/complete | Handles post-checkout housekeeping.                            |
| /billing/plans             | Lists plans in JSON format.                                    |
| /billing/webhooks          | Handles all Stripe webhooks for you.                           |

## Use cases

### Open billing portal UI

Just link to `/billing/portal`

```svelte
<a href="/billing/portal">Update Account</a>
```

### Create an upgrade button

When user clicks the button, `POST` to `/billing/modify` and pass `plan=pro` as a query param:

```svelte
<script>
  function upgrade() {
    return fetch('/billing/modify?plan=pro', {
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

Pull JSON data from `/billing/plans` in `src/routes/pricing/+page.js`:

```javascript
export async function load({ fetch }) {
  const response = await fetch('/billing/plans')

  return {
    plans: await response.json()
  }
}
```

Data bind the plans in `src/routes/pricing/+page.svelte`:

```svelte
<script>
  export let data
</script>

<h1>Pricing</h1>

{#each data.plans as plan}
  <section>
    <h2>{plan.name}</h2>

    <a href="/billing/checkout?plan={plan.id}">
      Buy {plan.name}
    </a>
  </section>
{/each}
```
