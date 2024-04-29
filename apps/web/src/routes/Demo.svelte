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
    --flex-direction: column;
    --flex-gap: var(--size-2);
    --flex-align: center;
    --font-size: 1rem;

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --flex-direction: row-reverse;
      --flex-gap: var(--size-9);
      --flex-align: flex-start;
      --font-size: 1.05rem;
    }
  }

  section {
    width: var(--screen-width);
    position: relative;
    display: flex;
    flex-direction: var(--flex-direction);
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

  pre {
    width: calc(var(--screen-width) - 3rem);
    padding: var(--size-3);
    border: solid 1px var(--gray-7);
    border-radius: var(--radius-2);
    background: linear-gradient(180deg, #0A0A0D 5%, #15151F 50%);
    overflow: auto;
    font-size: var(--font-size);
  }
</style>
