<script>
  export let steps
  export let selected
  export let selectedIndex

  function select(index) {
    selectedIndex = index
  }
</script>

<nav>
  {#each steps as step, index}
    <button
      class:active={step == selected}
      on:mouseover={() => select(index)}
      on:focus={() => select(index)}
    />
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
