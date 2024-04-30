<script>
  import Icon from '@iconify/svelte'

  const plans = [
    {
      id: 'free',
      name: 'Free',
      description: 'For individuals and teams who want to start building products',
      price: 0,
      features: [
        'Feature #1',
        'Feature #2',
        'Feature #3',
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For individuals and teams who want to start building products',
      price: 9900,
      recommended: true,
      features: [
        'Feature #1',
        'Feature #2',
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For individuals and teams who want to start building products',
      price: 20000,
      features: [
        'Feature #1',
        'Feature #2',
        'Feature #3',
      ]
    }
  ]
</script>

<section id="#pricing">
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
          <span class="period">{ plan.price == 0 ? 'Forever' : 'Monthly' }</span>
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

        <a class="btn" class:primary={plan.recommended} href="https://app.airbadge.dev/billing/checkout?plan={plan.id}">Get started</a>
      </div>
    {/each}
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
    width: var(--screen-width);
    position: relative;
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
    border-radius: var(--radius-3);
    border: solid 1px var(--gray-8);
    padding: var(--size-6);
    padding-bottom: var(--size-12);
    display: flex;
    flex-direction: column;
    gap: var(--size-7);

    &.recommended {
      background: linear-gradient(180deg, #0A0A0E, #15151F);
      border: solid 1px var(--indigo-8);
    }
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
