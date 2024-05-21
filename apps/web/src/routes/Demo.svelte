<script>
  import { highlighter } from '@repo/shared/highlighter'
  import { onMount } from 'svelte'

  const code = `import { SvelteKitAuth } from '@airbadge/sveltekit'
import { PrismaAdapter } from '@auth/prisma-adapter'

export const { handle } = SvelteKitAuth({
  adapter: PrismaAdapter(...),

  providers: [
    Google,
    Apple
  ]
})`
  let formatted

  onMount(async () => {
    formatted = await highlighter(code, 'js')
    console.log({ formatted })
  })
</script>
<section id="demo">
  <hgroup>
    <span class="pill"><span>Demo</span></span>

    <h2 class="text-gradient">Under 10 lines of code</h2>

    <p>Get up and running without writing a lot of code or tests. Integrate from scratch or use a pre-built starter template.</p>

    <div class="buttons">
      <a class="btn primary" href="https://docs.airbadge.dev">
        Setup guide
      </a>

      <a class="btn" href="https://github.com/airbadge-dev/airbadge-example">
        Starter template
      </a>

    </div>
  </hgroup>

  <pre>{@html formatted}</pre>
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
    --pre-padding: var(--size-3);

    @media (--sm-n-above) {
      --block-padding: 0 0 6rem 0;
    }

    @media (--md-n-above) {
      --block-align-items: flex-start;
      --block-align-text: left;
    }

    @media (--lg-n-above) {
      --block-padding: 0;
      --pre-padding: var(--size-6);
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
    margin: var(--size-7) 0;
  }

  hgroup {
    align-items: var(--block-align-items);
    padding: var(--block-padding);

    & * {
      text-align: var(--block-align-text);
    }
  }

  .buttons {
    display: flex;
    gap: var(--size-4);
  }

  pre {
    width: calc(var(--screen-width) - 3rem);
    padding: var(--pre-padding);
    border: solid 1px var(--gray-7);
    border-radius: var(--radius-2);
    background: linear-gradient(180deg, #0A0A0D 5%, #15151F 50%);
    overflow: auto;
    font-size: var(--font-size);
  }

  section :global(button.copy) {
    display: none;
  }
</style>
