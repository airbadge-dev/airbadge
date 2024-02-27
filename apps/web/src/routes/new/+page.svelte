<script>
  import Icon from '@iconify/svelte'
  import features from '$data/features.json5'
  import benefits from '$data/benefits.json5'
  import frameworks from '$data/frameworks.json5'
  import addons from '$data/addons.json5'
</script>

<section id="hero">
  <h1>Authentication + Payment = SaaS</h1>
  <h1>Authentication + Payment in one package.</h1>
  <p>Set up a SaaS with Stripe & Auth.js in minutes. Free, Open Source & self-hostable.</p>
  <a href="https://docs.airbadge.dev/getting-started">Get started</a>
</section>

<section id="story">
  <p>When I built my last startup, I launched without payments. I figured it could always be added later.</p>
  <p>But that ended up being really painful. I had to manually send invoices and track down people to get paid. Some never even paid and basically used the app for free.</p>
  <p>In hindsight, I wish I would have set up payment from day one. I wish it didn't compete with time I needed to build features.</p>
  <p>This is why I created AirBadge. As a way to set up authentication and payment in an hour. So that I can launch a SaaS experiment, without a ton of work.<p>
  <p>Being a developer, I'm hesitant get locked in to an auth provider, that's why this solution is completely open-source and self-hostable. All the data lives inside your database.</p>
  <p>And it's completely free to use. There are some optional <a href="#addons">paid add-ons</a>, but the basics will always be free to use.</p>
</section>

<section id="benefits">
  <h2>Benefits</h2>

  {#each benefits as benefit}
    <article>
      <Icon icon={benefit.icon}/>
      <h3>{benefit.title}</h3>
      <p>{benefit.description}</p>
    </article>
  {/each}
</section>

<section id="demo">
  <h2>Demo</h2>
  <p>TBD.</p>
</section>

<section id="features">
  <h2>Features</h2>

  {#each features as feature}
    <article>
      <Icon icon={feature.icon}/>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
    </article>
  {/each}
</section>

<section id="frameworks">
  <h2>Frameworks</h2>

  {#each frameworks as framework}
    <article class:coming-soon={!framework.available}>
      <img src={framework.image} alt="{framework.name} logo"/>

      <h3>{framework.name}</h3>

      {#if framework.available}
        <a href={framework.url}>Package</a>
      {:else}
        Request beta access
      {/if}
    </article>
  {/each}
</section>

<section id="addons">
  <h2>Paid Add-ons</h2>

  <p>$200 USD / year</p>

  {#each addons as addon}
    <article class:coming-soon={!addon.available}>
      <Icon icon={addon.icon}/>

      <h3>{addon.name}</h3>

      {#if addon.available}
        <a href={addon.url}>Package</a>
      {:else}
        Request beta access
      {/if}
    </article>
  {/each}

  <a href="">Buy Now</a>
</section>
