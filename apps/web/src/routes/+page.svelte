<script>
  import Hero from './Hero.svelte'
  import Benefits from './Benefits.svelte'
  import Demo from './Demo.svelte'
  import Pricing from './Pricing.svelte'
  import Features from './Features.svelte'
  import CTA from './CTA.svelte'
</script>

<svelte:head>
  <title>AirBadge</title>
</svelte:head>

<main>
  <Hero/>
  <Benefits/>
  <Features/>
  <Demo/>
  <Pricing/>
  <CTA/>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    gap: var(--size-6);
    align-items: center;
    justify-content: center;
  }
</style>
