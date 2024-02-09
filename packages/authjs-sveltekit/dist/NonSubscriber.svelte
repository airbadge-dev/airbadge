<script>
  import { isNonSubscriber } from './rules'
  import { page } from '$app/stores'
</script>

{#if isNonSubscriber($page.data.session)}
  <slot/>
{/if}
