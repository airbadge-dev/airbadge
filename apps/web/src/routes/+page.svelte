<script>
  import SignIn from './SignIn.svelte'
  import Checkout from './Checkout.svelte'
  import Editor from './Editor.svelte'
  import Browser from './Browser.svelte'
  import Webhooks from './Webhooks.svelte'
  import Steps from './Steps.svelte'
  import Carousel from './Carousel.svelte'
  import Hero from './Hero.svelte'

  const steps = [
    {
      title: 'Add global handler',
      view: 'editor',
      step: 'init',
      source: 'hooks.server.js'
    },
    {
      title: 'Configure database',
      view: 'editor',
      step: 'database',
      source: 'hooks.server.js'
    },
    {
      title: 'Configure auth',
      view: 'editor',
      step: 'provider',
      source: 'hooks.server.js'
    },
    {
      title: 'Configure pricing',
      view: 'editor',
      step: 'pricing',
      source: 'hooks.server.js'
    },
    {
      title: 'User can sign up',
      view: 'browser',
      url: 'https://example.com/auth/signin',
      windowTitle: 'Sign in',
      component: SignIn
    },
    {
      title: 'Payment is integrated',
      view: 'browser',
      url: 'https://checkout.stripe.com/cs_12345',
      windowTitle: 'Stripe',
      component: Checkout
    },
    {
      title: 'Syncs all webhooks',
      view: 'webhooks'
    },
    {
      title: 'Session data',
      view: 'editor',
      source: '+page.server.js'
    }
  ]

  let selectedIndex = 0

  $: selected = steps[selectedIndex]

  function advance() {
    if (selectedIndex < steps.length - 1) {
      selectedIndex = selectedIndex + 1
    } else {
      selectedIndex = 0
    }
  }
</script>

<svelte:head>
  <title>AirBadge</title>
</svelte:head>

<main>
  <Hero/>

  <!--
  <div class="demo-container view-{selected.view}">
    <Steps bind:selectedIndex {selected} {steps} />

    <Carousel bind:selectedIndex {selected} {steps} />

    <section class="demo" on:touchstart={advance}>
      <Editor {selected} />
      <Browser {selected} on:advance={advance} />
      <Webhooks {selected} />
    </section>
  </div>
  -->
</main>

<style lang="postcss">
  @import 'open-props/media.min.css';

  main {
    display: flex;
    flex-direction: column;
    gap: var(--size-6);
    align-items: center;
    justify-content: center;
  }

  .demo-container {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr;

    opacity: 0;
    scale: 0.8;
    animation:
      var(--animation-fade-in) 0.7s forwards,
      var(--animation-slide-in-up) 0.7s forwards,
      var(--animation-scale-up) 0.7s forwards;
    animation-timing-function: var(--ease-5);
  }

  :global(.window) {
    background: var(--gray-1);
    border: solid 1px var(--gray-2);
    aspect-ratio: 2 / 1;
    width: var(--screen-width);
    min-width: calc(var(--screen-width) - 10px);
    border-radius: 10px;
    padding: 0;
    transition: 0.4s all var(--ease-4);

    & .header {
      position: relative;
      gap: var(--size-2);
      height: 25px;

      & .title {
        color: var(--gray-5);
        font-size: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: var(--size-1);
      }

      & .buttons {
        padding: var(--size-2);
        display: flex;
        position: absolute;
        align-items: center;
        gap: 4px;

        & div {
          aspect-ratio: 1 / 1;
          height: 8px;
          background: var(--yellow-4);
          border-radius: var(--radius-round);
        }

        & :first-child {
          background-color: var(--red-4);
        }

        & :last-child {
          background-color: var(--green-4);
        }
      }
    }
  }

  .demo {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    gap: var(--size-2);
    width: var(--screen-width);
    overflow: hidden;
    position: relative;

    @media (--md-n-above) {
      grid-row: 1;
    }
  }

  .demo section {
    overflow: hidden;
    transition: translate 0.4s var(--ease-1);
  }

  .demo :global(.code) {
    background: var(--gray-8);
    font-size: 16px;

    & pre {
      color: var(--gray-3);
    }
  }

  .demo :global(pre),
  .demo :global(.container) {
    padding: var(--size-1) var(--size-3);
  }

  .view-browser :global(.window) {
    translate: -100%;
  }

  .view-webhooks :global(.window) {
    translate: calc(-200% - 10px);
  }
</style>
