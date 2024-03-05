<script>
  export let steps
  export let selected

  function select(step) {
    selected = step
  }
</script>

<nav>
  {#each steps as step}
    <button
      class:active={step == selected}
      on:mouseover={() => select(step)}
      on:focus={() => select(step)}/>
  {/each}
</nav>

<style lang="postcss">
  @import 'open-props/media.min.css';

  nav {
    display: flex;
    gap: var(--size-2);
    align-items: center;
    justify-content: center;
    grid-row: 2;
    grid-column: 2;
    padding: var(--size-5) var(--size-4);
  }

  button {
    width: 5px;
    aspect-ratio: 1 / 1;
    border-radius: var(--radius-round);
    background: var(--violet-2);
    transition: all 0.2s;
    transition-timing-function: var(--ease-2);

    &.active {
      background: var(--violet-4);
    }
  }

  .active ~ button {
    background: var(--gray-4);
  }

</style>
