<script>
  import { isSubscriber } from './rules'
  import { page } from '$app/stores'

  export let active = undefined
  export let pastDue = undefined
  export let unpaid = undefined
  export let trialing = undefined
  export let canceled = undefined
  export let plan = undefined
  export let plans = undefined

  $: rules = {
    active,
    pastDue,
    unpaid,
    trialing,
    canceled,
    plan,
    plans
  }
</script>

{#if isSubscriber($page.data.session, rules)}
  <slot />
{/if}
