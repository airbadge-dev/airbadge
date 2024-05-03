<script>
  const features = [
    {
      title: 'Payment integration',
      description: 'Based on Stripe Checkout. AirBadge adds a playment step to the signup flow. It works for subscriptions and one-off purchases.'
    },
    {
      title: 'Authentication',
      description: 'Built on top of Auth.js, AirBadge supports over 50+ authentication methods, including OAuth, SAML, passwords and passwordless logins.',
      image: '/images/fingerprint.svg'
    },
    {
      title: 'Minimal code',
      description: 'It takes very little code to get started. That means less to learn and less to maintain.'
    },
    {
      title: 'Open Source & Self-hostable',
      description: "Deploys to any hosting platform, including serverless or Docker-based platforms. All data lives in your own database. The code is fully open-source, so it's easy to modify or contribute"
    },
    {
      title: 'Team support',
      description: 'Coming soon. Share one subscription between multiple users. With the ability to increase the monthly charge based on number of seats used.'
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

      <p>Ever feel like authentication requirements change with the season? Clerk keeps up with the latest trends and security best practices.</p>
    </hgroup>

    <div class="features">
      {#each features as feature}
        <div class="feature">
          <h3 class="text-shadow">{feature.title}</h3>
          <p>{feature.description}</p>
        </div>
      {/each}
    </div>
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
    --grid-column: 1;

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
      --grid-template-columns: repeat(2, 1fr);
      --grid-template-rows: auto;
      --grid-column: 1 / 3;
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
    width: 100%;
    display: flex;
    justify-content: center;
    background:
      url(/images/star.svg) 90% 70% no-repeat;
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
    border: solid 1px var(--gray-9);
    border-radius: var(--radius-3);
    background: linear-gradient(180deg, #0A0A0E, #15151F);
    padding: var(--size-6);
    display: flex;
    flex-direction: column;
    gap: var(--size-4);
  }

  .feature:nth-child(4) {
    grid-column: var(--grid-column);
  }

  .feature h3 {
    font-size: var(--font-size-3);
  }

  .feature p {
    max-width: 40ch;
    font-size: 0.9rem;
  }
</style>
