<script>
  import Icon from '@iconify/svelte'

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'For individuals who want to start building products.',
      price: 0,
      period: 'forever',
      features: [
        'Unlimited users & subscriptions',
        '50+ auth providers',
        'Stripe integration',
        'Self-hosted',
        'Open source',
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For businesses that want to sell B2B software.',
      price: 25000,
      period: 'year',
      recommended: true,
      features: [
        'Teams',
        'Tiered pricing',
        'Per-seat plans',
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For businesses that are building critical billing infrastructure.',
      price: 20000,
      period: 'month',
      features: [
        'E-mail support',
        'Phone support',
        'Onboarding & strategy',
      ]
    }
  ]
</script>

<section id="pricing">
  <div class="container">
    <hgroup>
      <span class="pill"><span>Pricing</span></span>

      <h2 class="text-gradient">Pricing that<br/>scales with you</h2>

      <p>10,000 monthly active users free. Surprisingly simple, exceptionally powerful. Every feature you need now and as you scale.</p>
    </hgroup>

    <div class="plans">
      {#each plans as plan, index}
        <div class="plan" class:recommended={plan.recommended}>
          <div class="title">
            <h3 class="text-gradient">{plan.name}</h3>
            <p>{plan.description}</p>
          </div>

          <div class="price">
            <span class="amount text-gradient">${plan.price/100}</span>
            <span class="period">{ plan.period == 'forever' ? 'Forever' : `Per ${plan.period}` }</span>
          </div>

          <div class="features">
            <h4>{ index == 0 ? "Includes" : `Everything in ${plans[index-1].name}, plus`}:</h4>
            <ul>
              {#each plan.features as feature}
                <li>
                  <Icon icon="ic:twotone-check"/>
                  {feature}
                </li>
              {/each}
            </ul>
          </div>

          <a class="btn"
             class:primary={plan.recommended}
             href={ plan.price == 0 ? 'https://docs.airbadge.dev/getting-started' : `https://app.airbadge.dev/billing/checkout?plan=${plan.id}`}>
            Get started
          </a>
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
    --flex-align: center;
    --plan-direction: column;

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --pre-padding: var(--size-6);
      --flex-gap: var(--size-9);
      --plan-direction: row;
    }
  }

  section {
    width: 100%;
    display: flex;
    justify-content: center;
    background:
      url(/images/cube1.svg) 20% bottom no-repeat,
      url(/images/cube2.svg) 90% 90% no-repeat;
  }

  .container {
    width: var(--screen-width);
    display: flex;
    flex-direction: column;
    align-items: var(--flex-align);
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

  .plans {
    display: flex;
    flex-direction: var(--plan-direction);
    justify-content: center;
    width: var(--screen-width);
    padding: var(--size-4);
    gap: var(--size-4);
  }

  .plan {
    flex: 1;
    background: var(--background-color);
    border-radius: var(--radius-3);
    border: solid 1px var(--gray-8);
    padding: var(--size-6);
    padding-bottom: var(--size-12);
    display: flex;
    flex-direction: column;
    gap: var(--size-7);
    transition: all 0.2s var(--ease-in-out-2);
  }

  .plan:hover {
    border-color: var(--gray-5);
    scale: 1.015;
  }

  .plan.recommended {
    background: linear-gradient(180deg, #0A0A0E, #15151F);
    border: solid 1px var(--indigo-8);
  }
  .plan.recommended:hover {
    border-color: var(--indigo-4);
  }

  .title {
    display: flex;
    flex-direction: column;
    height: 100px;
    gap: var(--size-2);
  }

  .title h3 {
    font-weight: bold;
    font-size: var(--font-size-4);
    line-height: var(--font-size-4);
  }

  .title p {
    color: var(--gray-2);
    font-size: 0.9rem;
  }

  .price {
    display: flex;
    align-items: center;
    gap: var(--size-4);
  }

  .price .amount {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .price .period {
    color: var(--gray-5);
  }

  .features {
    display: flex;
    flex-direction: column;
    gap: var(--size-4);
  }

  .features h4 {
    font-weight: 500;
    font-size: var(--font-size-1);
    color: var(--gray-6);
  }

  .features ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    min-height: 5rem;
  }

  .features li {
    display: flex;
    flex-direction: row;
    gap: var(--size-3);
    color: var(--gray-3);
    padding: 0;
    font-size: 0.9rem;
  }

  .btn {
    font-size: var(--font-size-2);
  }
</style>
