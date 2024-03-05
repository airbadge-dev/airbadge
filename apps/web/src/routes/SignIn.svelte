<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Mouse from './Mouse.svelte'
  import Icon from '@iconify/svelte'

  const dispatch = createEventDispatcher()

  onMount(() => {
    let timer = setTimeout(() => dispatch('advance'), 1300)

    return () => clearTimeout(timer)
  })
</script>

<div class="container">
  <nav>
    <button class="google">
      <Icon icon="ri:google-fill" height="20" />
      <span>Sign in with Google</span>
    </button>

    <button class="apple">
      <Icon icon="ri:apple-fill" height="20" />
      <span>Sign in with Apple</span>
    </button>
  </nav>

  <Mouse --translate-from="-300% 300%" --translate-to="0 90%" />
</div>

<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
  }
  nav {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  button {
    padding: var(--size-2) var(--size-3);
    color: white;
    border: solid 1px transparent;
    border-radius: var(--radius-2);
    display: flex;
    gap: var(--size-2);
    align-items: center;

    & span {
      font-size: 1rem;
      text-wrap: nowrap;
    }

  }

  button.google {
    background: var(--blue-7);
  }

  button.apple {
    background: var(--gray-8);
    animation: 0.3s blink 1s;
    animation-timing-function: var(--ease-4);
  }
</style>
