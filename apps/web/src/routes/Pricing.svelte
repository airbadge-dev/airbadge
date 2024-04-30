<script>
</script>

<section id="#pricing">
  <hgroup>
    <span class="pill"><span>Pricing</span></span>

    <h2 class="text-gradient">Pricing that<br/>scales with you</h2>

    <p>10,000 monthly active users free. Surprisingly simple, exceptionally powerful. Every feature you need now and as you scale.</p>
  </hgroup>

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
    width: var(--screen-width);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: var(--flex-align);
    gap: var(--flex-gap);
    padding: 12rem 0;
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }
</style>
