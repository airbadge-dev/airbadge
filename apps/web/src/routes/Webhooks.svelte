<script>
  export let selected
</script>

<section class="window">
  {#key selected}
    <div class="container">
      <div class="title">
        <h2>Webhooks</h2>
      </div>

      <svg viewBox="0 0 100 15">
        <defs>
          <svg id="chevron" height="4px" viewBox="0 0 512 512">
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="48"
              d="m184 112l144 144l-144 144"
            />
          </svg>
        </defs>
        <image
          class="stripe"
          href="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg"
        />
        <image
          class="svelte"
          href="https://upload.wikimedia.org/wikipedia/commons/1/1b/Svelte_Logo.svg"
        />

        {#each { length: 20 } as _, n}
          <use class="chevron" href="#chevron" style:--index={n} />
        {/each}

        <g class="check-mark">
          <circle fill="white" cx="12" cy="12" r="11" />
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2M9.29 16.29L5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0"
          />
        </g>
      </svg>

      <p>
        AirBadge handles all Stripe webhooks <b>for you</b>
        .
      </p>
    </div>
  {/key}
</section>

<style>
  .window {
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    width: 100%;
  }

  .stripe {
    height: 10px;
    y: 2px;
  }

  .svelte {
    x: 90px;
    width: 10px;
  }

  .chevron {
    y: 5px;
    --offset: calc(var(--index) * 0.04s);
    color: var(--violet-4);
    x: calc(-25px + calc(var(--index) * 3px));
    opacity: 0;
    animation: 0.5s blink var(--offset) infinite;
    animation-delay: var(--offset);
  }

  .check-mark {
    scale: 0.3;
    translate: 15px -2px;
    transform-origin: center;
    color: var(--green-7);
    opacity: 0;
    animation:
      0.3s fade-in 0.8s forwards,
      0.3s scale-up 0.8s forwards,
      0.3s slide-in-up 0.8s forwards;
    animation-timing-function: var(--easing-4);
  }

  .container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: center;

    margin: 2rem;
  }

  .title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--size-3);

    & h2 {
      font-size: var(--font-size-3);
      font-weight: 500;
      opacity: 0;
      animation:
        var(--animation-fade-in) 0s forwards,
        var(--animation-slide-in-down) 0s forwards;
      margin: 0;
      padding: 0;
      letter-spacing: -0.8px;
      color: var(--gray-8);
    }
  }

  p {
    padding: 10px 5px;
    border: solid 1px var(--gray-2);
    border-radius: var(--radius-2);
    background: var(--gray-1);
    color: var(--gray-9);
    font-size: 0.9rem;
    margin: 0;
    max-width: 30ch;
    box-shadow: var(--shadow-1);
    text-align: center;
    opacity: 0;
    animation:
      var(--animation-fade-in) 0.1s forwards,
      var(--animation-slide-in-up) 0.1s forwards;
    animation-timing-function: linear, var(--easing-4);
  }
</style>
