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

    & .line {
      text-wrap: nowrap;
    }

    & .keyword {
      color: var(--purple-2);
    }

    & .highlight-inline {
      color: var(--violet-3);
      text-decoration: underline;
      text-underline-offset: 2px;
      text-decoration-color: var(--violet-6);
    }

    & .comment {
      color: var(--gray-6);
    }

    & .highlight {
      animation: 0.3s entrance forwards;
      animation-timing-function: var(--ease-2);
    }
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
