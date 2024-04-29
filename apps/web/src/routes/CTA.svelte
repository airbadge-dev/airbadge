<script>
  import Icon from '@iconify/svelte'
</script>

<section id="#cta">
  <img class="globe" src="/images/globe.svg" aria-hidden alt="globe"/>
  <div class="container">
    <hgroup>
      <span class="pill"><span>Get started</span></span>
      <h2 class="text-gradient">Last CTA section title goes here</h2>
      <p>With a few lines of code you can have Auth0 integrated in any app written in any language, and any framework. We provide 30+ SDKs & Quickstarts to help you succeed on your implementation</p>
    </hgroup>
  </div>
</section>

<style>
  @import 'open-props/media.min.css';

  :root {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0 0 10rem 0;
    --globe-margin: 18rem 0 0 0;

    @media (--sm-n-above) {
      --block-padding: 0 0 8rem 0;
      --globe-margin: 10rem 0 0 0;
    }

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
      --block-padding: 0 var(--size-6);
      --globe-margin: 5rem 0 0 0;
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --globe-margin: 0;
    }
  }

  section {
    width: calc(100vw - 1rem);
    background: linear-gradient(180deg, #0A0A0E 0%, #0B061A 44%, #0C061C 89%);
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
    padding: 12rem 0;
    display: flex;
    align-items: center;
  }

  .container {
    width: var(--screen-width);
    z-index: var(--layer-2);
  }

  .globe {
    position: absolute;
    height: 100%;
    right: 0;
    z-index: var(--layer-1);
    margin: var(--globe-margin);
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }
</style>
