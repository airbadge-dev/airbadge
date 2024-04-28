<script>
  import Icon from '@iconify/svelte'
</script>

<section id="#cta">
  <hgroup>
    <span class="pill"><span>Get started</span></span>
    <h2 class="text-gradient">Last CTA section title goes here</h2>
    <p>With a few lines of code you can have Auth0 integrated in any app written in any language, and any framework. We provide 30+ SDKs & Quickstarts to help you succeed on your implementation</p>
  </hgroup>

</section>

<style>
  @import 'open-props/media.min.css';

  :root {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0;

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
      --block-padding: 0 var(--size-6);
    }

    @media (--lg-n-above) {
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
</style>
