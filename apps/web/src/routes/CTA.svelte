<section id="cta">
  <img class="globe" src="/images/globe.svg" aria-hidden alt="globe"/>
  <div class="container">
    <hgroup>
      <span class="pill"><span>Get started</span></span>
      <h2 class="text-gradient">Up and running in 5 minutes</h2>
      <p>Launch your experiment with payments, without writing a ton of integration. AirBadge will cut a week or two off your build.</p>

      <a class="btn primary" href="https://docs.airbadge.dev/getting-started">
        Get started
      </a>
    </hgroup>
  </div>
</section>

<style>
  @import 'open-props/media.min.css';

  section {
    --section-padding: var(--size-6);
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0 0 10rem 0;
    --globe-margin: 12rem 0 0 0;
    --globe-right: -200px;
    --globe-bottom: -200px;
    --globe-scale: 1;

    @media (--sm-n-above) {
      --section-padding: var(--size-6) 0;
      --block-padding: 0 0 8rem 0;
      --globe-margin: 0 0 0 0;
      --globe-scale: 1.1;
    }

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
      --block-padding: 0 var(--size-6);
      --globe-right: -80px;
      --globe-bottom: -100px;
      --globe-scale: 1.3;
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --globe-margin: 0;
      --globe-right: -100px;
      --globe-bottom: -145px;
      --globe-scale: 1.7;
      --section-padding: var(--size-8) 0 var(--size-12) 0;
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
    padding: var(--section-padding);
    display: flex;
    align-items: center;
  }

  .container {
    width: var(--screen-width);
    z-index: var(--layer-2);
  }

  .globe {
    position: absolute;
    height: 90%;
    right: var(--globe-right);
    bottom: var(--globe-bottom);
    z-index: var(--layer-1);
    margin: var(--globe-margin);
    scale: var(--globe-scale);
    animation: 290s rotate linear;
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }

  @keyframes rotate {
    from {
      rotate: 0deg
    }
    to {
      rotate: 360deg
    }
  }
</style>
