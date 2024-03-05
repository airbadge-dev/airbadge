<script>
  import ConfigCode from './ConfigCode.svelte'
  import SessionCode from './SessionCode.svelte'

  export let selected
</script>

<section class="window code">
  <div class="header">
    <div class="buttons">
      <div />
      <div />
      <div />
    </div>
    <div class="title">{selected.source}</div>
  </div>

  {#if selected.source == 'hooks.server.js'}
    <ConfigCode step={selected.step} />
  {:else}
    <SessionCode />
  {/if}
</section>

<style>
  .window :global(.container) {
    color: var(--gray-2);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    margin: var(--size-3) 0;
    color: var(--gray-3);
  }

  .window :global(.line) {
    text-wrap: nowrap;
  }

  .window :global(.keyword) {
    color: var(--purple-2);
  }

  .window :global(.highlight-inline) {
    color: var(--violet-3);
  }

  .window :global(.comment) {
    color: var(--gray-6);
  }

  .window :global(.highlight) {
    animation: 0.3s entrance forwards;
    animation-timing-function: var(--ease-2);
  }

  @keyframes -global-entrance {
    from {
      translate: -5% 0;
      opacity: 0;
    }
    to {
      translate: 0 0;
      opacity: 1;
    }
  }
</style>
