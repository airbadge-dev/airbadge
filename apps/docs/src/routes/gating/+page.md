# Gating

To control access to paid features, use the [session data](/session) to check the user's subscription or purchase history.

## Gating Routes

To gate routes, check the `session.subscription` or `session.purchases`:

**Subscription Example**

```javascript
export async function load({ locals }) {
  const session = await locals.getSession()

  // check if user is on pro plan
  if (session?.subscription?.plan != 'pro_monthly') {
    return error(403, 'Access denied')
  }

  // do the gated thing here
}
```

**Purchase Example**

```javascript
export async function load({ locals }) {
  const session = await locals.getSession()

  // check if user bought the item
  if (!session?.purchases.includes('e-book')) {
    return error(403, 'Access denied')
  }

  // do the gated thing here
}
```

## Gating Components

UI can be conditional, similar to gating routes. The session data is available in `data.session` and has the same data as the server.

**Example**

```svelte
<script>
  export let data

  $: ({ session } = data)
</script>

{#if session?.subscription?.plan == 'pro_monthly'}
  Your on the PRO plan!
{/if}

{#if session?.purchases.includes('e-book')}
  <a href="/download">Download E-Book</a>
{/if}
```
