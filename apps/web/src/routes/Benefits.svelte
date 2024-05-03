<script>
  import Icon from '@iconify/svelte'
</script>

<section id="benefits">
  <hgroup class="text-block">
    <span class="pill"><span>Benefits</span></span>
    <h2 class="text-gradient">What if starting was easier?</h2>
    <p>AirBadge eliminates common integration code, so you can focus on the bigger unknowns - marketing, sales, and feature development.</p>
  </hgroup>

  <div class="benefits">
    <article>
      <Icon icon="solar:rocket-outline" width=48/>

      <div class="content">
        <h3>Instant setup</h3>
        <p>Start charging in minutes, instead of days.</p>
      </div>
    </article>

    <article>
      <Icon icon="ant-design:experiment-twotone" width=48/>

      <div class="content">
        <h3>Faster experiments</h3>
        <p>Test your ideas faster by skipping the auth & billing code.</p>
      </div>
    </article>

    <article>
      <Icon icon="ph:hard-hat-duotone" width=48/>

      <div class="content">
        <h3>Less glue code</h3>
        <p>Write less glue code between Stripe and your Authentication system.</p>
      </div>
    </article>
  </div>
</section>

<style>
  @import 'open-props/media.min.css';

  section {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0;
    --article-direction: column;
    --article-padding: 4rem;
    --text-display: inline;
    --content-display: block;

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
      --block-padding: 0 var(--size-6);
      --text-display: block;
      --content-display: flex;
    }

    @media (--lg-n-above) {
      --article-padding: 4rem 0;
      --article-direction: row;
      --block-padding: 0;
    }
  }

  section {
    width: var(--screen-width);
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }

  .benefits {
    display: flex;
    flex-direction: var(--article-direction);
    padding: var(--article-padding);
    gap: var(--size-6);

    & h3, & p {
      display: var(--text-display);
    }
  }

  h3 {
    color: var(--gray-4);
  }

  .benefits p {
    color: var(--gray-6);
  }

  article {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
    flex: 1;
  }

  article :global(svg) {
    color: var(--gray-4);
  }

  .content {
    display: var(--content-display);
    flex-direction: column;
    gap: var(--size-3);
  }
</style>
