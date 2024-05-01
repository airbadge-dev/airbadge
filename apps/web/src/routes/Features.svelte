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

<section id="features">
  <div class="container">
    <hgroup>
      <span class="pill"><span>Features</span></span>

      <h2 class="text-gradient">Everything you need for authentication</h2>

      <p>Ever feel like authentication requirements change with the season? Clerk keeps up with the latest trends and security best practices.</p>
    </hgroup>

    <div class="features">

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

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --pre-padding: var(--size-6);
      --flex-gap: var(--size-9);
    }
  }

  section {
    width: 100%;
    display: flex;
    justify-content: center;
    background:
      url(/images/star.svg) 90% 90% no-repeat;
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

  .features {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: var(--screen-width);
    padding: var(--size-4);
    gap: var(--size-4);
  }
</style>
