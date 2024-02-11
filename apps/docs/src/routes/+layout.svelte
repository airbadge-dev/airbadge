<header>
  <a href="/">AirBadge</a>
</header>

<aside>
  <nav>
    <a href="/getting-started">Getting Started</a>
    <a href="/configuration">Configuration</a>
    <a href="/database">Database</a>
    <a href="/session">Session</a>
    <a href="/authorization">Authorization</a>
    <a href="/endpoints">Endpoints</a>
    <a href="https://demo.airbadge.dev" rel="nofollow">Live Demo</a>
    <a href="https://github.com/joshnuss/airbadge-example" rel="nofollow">Example Code</a>
    <a href="/license">License</a>
  </nav>
</aside>

<main>
  <slot />
</main>

<style>
  @import './global.css';
  @import 'open-props/media.min.css';

  :global(body) {
    min-height: 100vh;
    display: grid;
    grid-template-areas:
      "header"
      "main";
    grid-template-rows: 50px 1fr;
    grid-template-columns: 1fr;

    @media (--md-n-above) {
      grid-template-areas:
        "header header"
        "aside main";
      grid-template-columns: max(240px, 20vw) 1fr;
    }
  }

  header {
    grid-area: header;
    background: var(--violet-4);
    color: var(--gray-2);
    padding: var(--size-3);
    display: flex;
    align-items: center;

    & a {
      color: var(--gray-1);
      font-family: var(--font-heading);
      font-weight: normal;
    }
  }

  aside {
    display: none;
    padding: var(--size-4);
    border-right: solid 2px var(--gray-2);
    overflow-y: auto;
    background: var(--gray-1);

    @media (--md-n-above) {
      display: block;
      grid-area: aside;
    }
  }

  aside nav {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
    font-size: var(--font-size-2);
  }

  main {
    grid-area: main;
    padding: var(--size-3);
    margin: var(--size-4) 0;
  }
</style>
