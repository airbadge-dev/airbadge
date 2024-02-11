<div class="container">
<header>AirBadge</header>

<aside>
  <nav>
    <a href="/getting-started">Getting Started</a>
    <a href="/configuration">Configuration</a>
    <a href="/database-adapters">Database adapters</a>
    <a href="/session">Session</a>
    <a href="/authorization">Authorization</a>
    <a href="/endpoints">Endpoints</a>
    <a href="/deployment">Deployment</a>
    <a href="https://demo.airbadge.dev" rel="nofollow">Live Demo</a>
    <a href="https://github.com/joshnuss/airbadge-example" rel="nofollow">Example Code</a>
    <a href="/license">License</a>
  </nav>
</aside>

<main>
  <slot />
</main>

</div>

<style>
  @import './global.css';

  .container {
    min-height: 100vh;
    display: grid;
    grid-template-areas:
      "header header"
      "aside main";
    grid-template-rows: 50px 1fr;
    grid-template-columns: max(240px, 20vw) 1fr;
  }

  header {
    grid-area: header;
    background: var(--violet-4);
    color: var(--gray-2);
    padding: var(--size-3);
    display: flex;
    align-items: center;
  }

  aside {
    grid-area: aside;
    padding: var(--size-4);
    border-right: solid 2px var(--gray-2);
    overflow-y: auto;
    background: var(--gray-1);

    & nav {
      display: flex;
      flex-direction: column;
      gap: var(--size-2);
      font-size: var(--font-size-2);
    }
  }

  main {
    grid-area: main;
    padding: var(--size-3);
    margin: var(--size-4) 0;
    padding-left: var(--size-6);
  }
</style>
