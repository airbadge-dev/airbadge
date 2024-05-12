# Gating

There are two ways to do gating.

## Gating Routes

To gate routes, check the `session.subscription` for authorization:

**Example**

```javascript
export async function load({ locals }) {
  const session = await locals.getSession()

  // check if user is on pro plan
  if (session?.subscription?.plan?.id != 'pro') {
    return error(401, 'Must be on pro plan')
  }

  // do the gated thing here
}
```

## Gating Components

Gating components is similar to gating routes. The subscription data is available in `data.session.subscription`.

**Example**

```svelte
<script>
  export let data

  $: ({ session } = data)
</script>

{#if session?.subscription?.plan?.id == 'pro'}
  Your on the PRO plan!
{/if}
```
