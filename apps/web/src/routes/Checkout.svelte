<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Mouse from './Mouse.svelte'

  const dispatch = createEventDispatcher()

  onMount(() => {
    let timer = setTimeout(() => dispatch('advance'), 1500)

    return () => clearTimeout(timer)
  })
</script>

<div class="container">
  <h2>Stripe Checkout</h2>
  <label>
    <span>E-mail</span>
    <output>you@apple.com</output>
  </label>

  <label for="card"><span>Card</span></label>

  <div class="card-group">
    <input class="card" readonly disabled name="card" value="4242 4242 4242 4242" />
    <input class="expiration" readonly disabled placeholder="MM/YY" />
    <input class="expiration" readonly disabled placeholder="CVV" />
  </div>

  <button>
    <b>Subscribe</b>
    $10/mo
  </button>

  <Mouse --translate-from="75% 300%" --translate-to="50% 500%" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    gap: 10px;
    margin: 0 2rem;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 0.7rem;
    gap: 3px;
    color: var(--gray-7);

    & span {
      font-weight: bold;
    }
  }

  .card-group {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    gap: var(--size-1);
  }

  output,
  input {
    border: solid 1px var(--gray-5);
    padding: 5px;
    border-radius: 3px;
    min-width: 0;
  }

  input {
    background: white;
  }

  .card {
    grid-column: 1 / 3;
  }

  button {
    margin-top: 20px;
    color: white;
    background: var(--violet-7);
    border: solid 1px var(--violet-8);
    padding: var(--size-2);
    border-radius: var(--radius-2);
    font-size: 1.1rem;

    animation: 0.3s blink 1s;
    animation-timing-function: var(--ease-4);

    & b {
      font-weight: 500;
    }
  }

  h2 {
    font-size: var(--font-size-1);
    margin: 1rem 0;
  }
</style>
