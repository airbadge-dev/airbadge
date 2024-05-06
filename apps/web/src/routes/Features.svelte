<script>
  import Payment from './features/Payment.svelte'
  import Fingerprint from './features/Fingerprint.svelte'
  import Cube from './features/Cube.svelte'
  import Team from './features/Team.svelte'
  import MinimalCode from './features/MinimalCode.svelte'

  const features = [
    {
      title: 'Payment integration',
      description: 'Based on Stripe Checkout. AirBadge adds a playment step to the signup flow. It works for subscriptions and one-off purchases.',
      component: Payment
    },
    {
      title: 'Authentication',
      description: 'Built on top of Auth.js, AirBadge supports over 50+ authentication methods, including OAuth, SAML, passwords and passwordless logins.',
      component: Fingerprint
    },
    {
      title: 'Minimal code',
      description: 'It takes very little code to get started. That means less to learn and less to maintain.',
      component: MinimalCode
    },
    {
      title: 'Open Source & Self-hostable',
      description: "Deploys to any hosting platform, including serverless or Docker-based platforms. All data lives in your own database. The code is fully open-source, so it's easy to modify or contribute",
      component: Cube
    },
    {
      title: 'Team support',
      description: 'Coming soon. Share one subscription between multiple users. With the ability to increase the monthly charge based on number of seats used.',
      component: Team
    },
  ]
</script>

<section id="features">
  <div class="container">
    <hgroup>
      <span class="pill"><span>Features</span></span>

      <h2 class="text-gradient">
        Focus on building.<br/>
        Let us handle identity & billing.
      </h2>

      <p>We built AirBadge to save you time. Spend your time writing features or trying more experiments, instead of writing billing and auth code.</p>
    </hgroup>

    <div class="features">
      {#each features as feature}
        <div class="feature"
          on:mouseover={() => feature.active = true}
          on:mouseout={() => feature.active = false}
          on:focus={() => feature.active = true}
          on:blur={() => feature.active = false}
        >
          <h3 class="text-gradient">{feature.title}</h3>
          <p>{feature.description}</p>

          <svelte:component this={feature.component} active={feature.active}/>
        </div>
      {/each}
    </div>

    <img class="star" src="/images/star.svg" aria-hidden alt="shooting star"/>
  </div>

</section>

<style>
  @import 'open-props/media.min.css';

  section {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0 0 4rem 0;
    --flex-gap: var(--size-2);
    --grid-template-columns: 1fr;
    --grid-template-rows: auto;
    --grid-column: auto;

    --star-from-top: 100px;
    --star-from-right: 200px;
    --star-to-top: 400px;
    --star-to-right: 600px;

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
      --grid-template-columns: repeat(2, 1fr);
      --grid-template-rows: auto;
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --pre-padding: var(--size-6);
      --flex-gap: var(--size-9);
      --grid-template-columns: repeat(3, 1fr);
      --grid-column: 1 / 3;
    }
  }

  section {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .star {
    position: absolute;
    top: var(--star-from-top);
    right: var(--star-from-right);
    z-index: var(--layer-1);
    opacity: 0;
    animation-name: entrance;
    animation-duration: 1ms;
    animation-timeline: view(10%);
    animation-range: entry 30% exit 80%;
  }

  .container {
    width: var(--screen-width);
    display: flex;
    flex-direction: column;
    gap: var(--flex-gap);
    padding: 4rem 0;
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }

  .features {
    display: grid;
    grid-template-columns: var(--grid-template-columns);
    grid-template-rows: var(--grid-template-rows);
    width: var(--screen-width);
    padding: var(--size-4);
    gap: var(--size-2);
  }

  .feature {
    position: relative;
    border: solid 1px var(--gray-9);
    border-radius: var(--radius-3);
    background: linear-gradient(180deg, #0A0A0E, #15151F);
    padding: var(--size-6);
    padding-bottom: 10rem;
    display: flex;
    flex-direction: column;
    gap: var(--size-4);
    transition: all 0.2s var(--ease-2);
    z-index: var(--layer-2);
    overflow: hidden;

    &:hover {
      border-color: var(--gray-8);
      background: linear-gradient(180deg, #0A0A0E 40%, #15151F);
    }
  }

  .feature:nth-child(4) {
    grid-column: var(--grid-column);
  }

  .feature h3 {
    font-size: var(--font-size-3);
    line-height: var(--font-size-4);
    background: linear-gradient(180deg, #fff, #676767);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .feature p {
    max-width: 40ch;
    font-size: 0.9rem;
    color: var(--gray-6);
  }

  .feature :global(svg) {
    --transition: all 0.2s var(--ease-in-out-2);
    transition: var(--transition);
  }

  @keyframes entrance {
    from {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    60% {
      opacity: 1;
    }
    to {
      top: var(--star-to-top);
      right: var(--star-to-right);
      opacity: 0;
    }
  }
</style>
