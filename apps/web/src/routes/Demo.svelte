<section id="#demo">
  <hgroup>
  <span class="pill"><span>Demo</span></span>
  <h2 class="text-gradient">Implement AirBadge in any application in just five minutes</h2>
  <p>With a few lines of code you can have Auth0 integrated in any app written in any language, and any framework. We provide 30+ SDKs & Quickstarts to help you succeed on your implementation</p>

  <a class="btn" href="https://docs.airbadge.dev">
    Go to documentation
  </a>
  </hgroup>
</section>

<style>
  @import 'open-props/media.min.css';

  :root {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0 0 10rem 0;

    @media (--sm-n-above) {
      --block-padding: 0 0 8rem 0;
    }

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
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
    padding: 12rem 0;
    display: flex;
    align-items: center;
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }
</style>
