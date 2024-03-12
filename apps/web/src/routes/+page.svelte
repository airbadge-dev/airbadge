<script>
  import SignIn from './SignIn.svelte'
  import Checkout from './Checkout.svelte'
  import Editor from './Editor.svelte'
  import Browser from './Browser.svelte'
  import Webhooks from './Webhooks.svelte'
  import Steps from './Steps.svelte'
  import Carousel from './Carousel.svelte'
  import Icon from '@iconify/svelte'

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
  <section class="hero">
    <img src="/images/logo-violet.svg" alt="AirBadge logo" />

    <div class="text">
      <h1>
        Auth & Payment <em>ready in minutes</em>.
      </h1>
      <p>
        <b>AirBadge</b> connects <b>Auth.js</b> with <b>Stripe</b>.
        Test your next SaaS idea quickly. It's free and open source.
      </p>
    </div>

    <div class="buttons">
      <a class="docs" href="https://docs.airbadge.dev">
        <Icon icon="tabler:book" />
        <span>Docs</span>
      </a>

      <a class="start" href="https://docs.airbadge.dev/getting-started">
        <span>Get started</span>
        <Icon icon="ic:round-chevron-right" />
      </a>
    </div>
  </section>

  <div class="demo-container view-{selected.view}">
    <Steps bind:selectedIndex {selected} {steps} />

    <Carousel bind:selectedIndex {selected} {steps} />

    <section class="demo" on:touchstart={advance}>
      <Editor {selected} />
      <Browser {selected} on:advance={advance} />
      <Webhooks {selected} />
    </section>
  </div>
</main>

<style lang="postcss">
  @import 'open-props/media.min.css';

  :root {
    --logo-height: 22px;
    --heading-size: 2rem;
    --subhead-size: var(--font-size-1);
    --hero-margin: var(--size-9) var(--size-7) var(--size-7);
    --hero-gap: var(--size-7);
    --text-gap: var(--size-5);
    --screen-width: 98vw;

    @media (--sm-n-above) {
      --logo-height: 24px;
      --heading-size: 2.4rem;
      --subhead-size: var(--font-size-2);
      --hero-gap: var(--size-7);
      --screen-width: 90vw;
    }

    @media (--md-n-above) {
      --logo-height: 26px;
      --heading-size: 2.8rem;
      --subhead-size: var(--font-size-3);
      --hero-margin: var(--size-10);
      --hero-gap: var(--size-8);
      --screen-width: 480px;
    }

    @media (--lg-n-above) {
      --logo-height: 28px;
      --heading-size: 3.2rem;
      --subhead-size: var(--font-size-3);
      --hero-margin: var(--size-11);
      --hero-gap: var(--size-9);
      --screen-width: 580px;
    }
  }

  main {
    display: flex;
    flex-direction: column;
    gap: var(--size-6);
    align-items: center;
    justify-content: center;
  }

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: var(--hero-margin);
    gap: var(--hero-gap);
  }

  .hero img {
    height: var(--logo-height);
    animation:
      var(--animation-slide-in-down) forwards,
      var(--animation-scale-up) forwards;
  }

  .hero .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--text-gap);
  }


  .hero p {
    font-size: var(--subhead-size);
    letter-spacing: -0.02em;
    color: var(--gray-7);
    max-width: 45ch;
    text-align: center;
    opacity: 0;
    animation:
      var(--animation-fade-in) 0.3s forwards,
      var(--animation-slide-in-up) 0.3s forwards;

    & b {
      font-weight: 500;
      color: var(--gray-7);
    }
  }

  .hero .buttons {
    display: flex;
    gap: var(--size-4);
  }

  .hero a {
    display: flex;
    flex-direction: row;
    gap: var(--size-1);
    font-size: var(--font-size-2);
    padding: var(--size-2) var(--size-4);
    border-radius: var(--radius-5);
    text-decoration: none;
    opacity: 0;
    text-wrap: nowrap;
  }

  .hero .start {
    background: var(--violet-6);
    color: var(--gray-1);
    scale: 0.8;
    animation:
      var(--animation-fade-in) 0.5s forwards,
      var(--animation-slide-in-up) 0.5s forwards,
      var(--animation-scale-up) 0.5s forwards;

    &:hover {
      background: var(--violet-5);
    }
  }

  .hero .docs {
    background: var(--gray-7);
    color: var(--gray-1);
    animation:
      var(--animation-fade-in) 0.4s forwards,
      var(--animation-slide-in-up) 0.4s forwards;

    &:hover {
      background: var(--gray-6);
    }
  }

  h1 {
    color: var(--gray-8);
    font-size: var(--heading-size);
    font-weight: 500;
    letter-spacing: -0.07em;
    line-height: var(--font-lineheight-0);
    text-align: center;
    text-wrap: pretty;
    max-width: 40ch;
    opacity: 0;
    animation:
      var(--animation-fade-in) 0.2s forwards,
      var(--animation-slide-in-up) 0.2s forwards;

    & em {
      color: var(--violet-8);
      font-style: normal;
      text-decoration: underline;
      text-decoration-color: var(--violet-1);
      text-decoration-thickness: 5px;
      text-underline-offset: 5px;
    }
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
