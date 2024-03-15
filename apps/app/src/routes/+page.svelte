<script>
  export let data

  $: ({ session } = data)
</script>

<h1>Coming soon</h1>

<p>This will contains docs & resources for paid plans.</p>

{#if session?.subscription}
  <nav>
    <a href="/billing/portal">Billing Portal</a>
    <a href="/auth/signout">Signout</a>
  </nav>
{/if}
