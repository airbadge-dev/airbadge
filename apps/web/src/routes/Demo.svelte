<script>
  const code = `import { SvelteKitAuth } from '@airbadge/sveltekit'

export const handle = SvelteKitAuth({
  adapter: PrismaAdapter(...),

  providers: [
    Google(...),
    Apple(...),
  ],

  plans: [
    { id: "basic", priceId: 'price_X213DS3'},
    { id: "pro", priceId: 'price_4F32FA6'}
  ]
})
`
</script>
<section id="#demo">
  <hgroup>
    <span class="pill"><span>Demo</span></span>

    <h2 class="text-gradient">Implement AirBadge in any application in just five minutes</h2>

    <p>With a few lines of code you can have Auth0 integrated in any app written in any language, and any framework. We provide 30+ SDKs & Quickstarts to help you succeed on your implementation</p>

    <a class="btn" href="https://docs.airbadge.dev">
      Go to documentation
    </a>
  </hgroup>

  <pre>{code}</pre>
</section>

<style>
  @import 'open-props/media.min.css';

  section {
    --block-align-items: center;
    --block-align-text: center;
    --block-padding: 0 0 4rem 0;

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
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

  pre {
    width: calc(var(--screen-width) - 3rem);
    padding: var(--size-3);
    border: solid 1px var(--gray-7);
    border-radius: var(--radius-2);
    background: linear-gradient(180deg, #0A0A0D 5%, #15151F 50%);
    overflow: scroll;
  }
</style>
