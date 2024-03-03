<script>
  import SignIn from './SignIn.svelte'
  import Checkout from './Checkout.svelte'
  import Editor from './Editor.svelte'
  import Browser from './Browser.svelte'
  import Webhooks from './Webhooks.svelte'
  import Steps from './Steps.svelte'
  import Icon from '@iconify/svelte'

  import { fly } from 'svelte/transition'

  const steps = [
    {
      title: 'Configure hooks',
      view: 'editor',
      description: 'Add a handle function',
      step: 'init',
      source: 'hooks.server.js'
    },
    {
      title: 'Add database adapter',
      view: 'editor',
      description: 'Setup a database adapter',
      step: 'database',
      source: 'hooks.server.js'
    },
    {
      title: 'Add auth providers',
      view: 'editor',
      description: 'Configure OAuth providers',
      step: 'provider',
      source: 'hooks.server.js'
    },
    {
      title: 'Add pricing',
      view: 'editor',
      description: 'Add pricing plans',
      step: 'pricing',
      source: 'hooks.server.js'
    },
    {
      title: 'Sign up',
      view: 'browser',
      description: 'User can sign in with OAuth',
      url: 'https://example.com/auth/signin',
      windowTitle: 'Sign in',
      component: SignIn
    },
    {
      title: 'Checkout',
      view: 'browser',
      description: 'User is redirected to pay with Stripe Checkout',
      url: 'https://checkout.stripe.com/cs_12345',
      windowTitle: 'Stripe',
      component: Checkout
    },
    {
      title: 'Webhooks',
      view: 'webhooks',
      description: 'All Stripe webhooks are handled for you.'
    },
    {
      title: 'Session data',
      view: 'editor',
      description: 'Use session data customize your app',
      source: '+page.server.js'
    }
  ]

  let selected = steps[0]

  $: selectedIndex = steps.findIndex((c) => c == selected)
</script>

<svelte:head>
  <title>AirBadge</title>
</svelte:head>

<main>
  <section class="hero">
    <img src="/images/logo-violet.svg" alt="AirBadge logo" />
    <h1>
      Auth & Payment <em>ready in minutes</em>
      .
    </h1>
    <p>
      <b>AirBadge</b>
      connects
      <b>Auth.js</b>
      with
      <b>Stripe</b>
      . Test your next SaaS idea quickly. It's free and open source.
    </p>

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
    <Steps bind:selected {steps} />

    <section class="demo">
      <Editor {selected} />
      <Browser {selected} on:advance={() => (selected = steps[selectedIndex + 1])} />
      <Webhooks {selected} />
    </section>

    <div class="caption">
      {#key selected}
        <div in:fly={{ y: '100%', delay: 200 }} class="text">{selected.description}</div>
      {/key}
    </div>
  </div>
</main>

<style>
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
    margin: var(--size-10);
    gap: var(--size-8);

    & img {
      height: 28px;
      animation:
        var(--animation-slide-in-down) forwards,
        var(--animation-scale-up) forwards;
    }

    & p {
      font-size: var(--font-size-3);
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

    & .buttons {
      display: flex;
      gap: var(--size-4);
    }

    & a {
      display: flex;
      flex-direction: row;
      gap: var(--size-1);
      font-size: var(--font-size-2);
      padding: var(--size-2) var(--size-4);
      border-radius: var(--radius-5);
      text-decoration: none;
      opacity: 0;
    }

    & .start {
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

    & .docs {
      background: var(--gray-7);
      color: var(--gray-1);
      animation:
        var(--animation-fade-in) 0.4s forwards,
        var(--animation-slide-in-up) 0.4s forwards;

      &:hover {
        background: var(--gray-6);
      }
    }
  }

  h1 {
    color: var(--gray-8);
    font-size: 3rem;
    font-weight: 500;
    letter-spacing: -0.07em;
    line-height: var(--font-lineheight-0);
    text-align: center;
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
    --screen-width: 480px;

    display: grid;
    grid-template-columns: auto 1fr;

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
    display: flex;
    gap: var(--size-2);
    width: var(--screen-width);
    overflow: hidden;
    position: relative;

    & section {
      overflow: hidden;
      transition: translate 0.4s var(--ease-1);
    }

    & .code {
      background: var(--gray-8);
      font-size: 16px;

      & pre {
        color: var(--gray-3);
      }
    }

    & pre,
    & .container {
      padding: 0 var(--size-2);
    }
  }

  .caption {
    position: absolute;
    z-index: var(--layer-2);
    bottom: 50px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 100%;
    display: none;

    & .text {
      font-size: 0.8rem;
      color: var(--gray-3);
      border: solid 1px var(--gray-5);
      background: var(--gray-7);
      border-radius: var(--radius-2);
      padding: var(--size-1) var(--size-2);
      border: solid 1px var(--gray-5);
      box-shadow: var(--shadow-1);
    }
  }

  .view-browser :global(.window) {
    translate: -100%;
  }

  .view-webhooks :global(.window) {
    translate: calc(-200% - 10px);
  }
</style>
