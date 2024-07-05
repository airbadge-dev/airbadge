<script>
  import { afterNavigate } from '$app/navigation'
  import { page } from '$app/stores'
  import Icon from '@iconify/svelte'

  export let menus

  let popover

  export function toggle() {
    popover.togglePopover()
  }

  afterNavigate(() => {
    popover.hidePopover()
  })
</script>

<div class="menu" popover bind:this={popover}>
  <button on:click={() => popover.hidePopover()}>
    <Icon icon="ic:round-close" width="32" />
  </button>

  <nav>
    {#each menus as menu}
      <a href={menu.url} class:active={menu.url == $page.url.pathname}>
        {menu.name}
      </a>
    {/each}
  </nav>
</div>

<style>
  @import 'open-props/media.min.css';

  .menu[popover] {
    --margin: var(--size-6);

    position: fixed;
    margin: var(--size-10) var(--margin);
    width: calc(100vw - calc(var(--margin) * 2));
    border-radius: var(--radius-2);
    box-shadow: var(--shadow-2);

    @media (--sm-n-above) {
      --margin: var(--size-9);
    }

    & nav {
      display: flex;
      flex-direction: column;
      gap: var(--size-2);
      font-size: var(--font-size-3);
      padding: var(--size-4);
    }
  }

  .menu:popover-open,
  :global(.\:popover-open) {
    animation: var(--animation-slide-in-down) forwards;
    animation-timing-function: var(--ease-1);
  }

  nav a {
    color: var(--gray-7);
  }

  button {
    position: absolute;
    top: var(--size-1);
    right: var(--size-1);
    padding: 1rem;
    background: none;
    color: var(--gray-7);
  }
</style>
