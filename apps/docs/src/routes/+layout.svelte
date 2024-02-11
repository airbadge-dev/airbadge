<script>
  import { page } from '$app/stores'

  const menus = [
    { url: "/getting-started", name: "Getting Started" },
    { url: "/configuration", name: "Configuration" },
    { url: "/database", name: "Database" },
    { url: "/session", name: "Session" },
    { url: "/authorization", name: "Authorization" },
    { url: "/endpoints", name: "Endpoints" },
    { url: "https://demo.airbadge.dev", name: "Live Demo" },
    { url: "https://github.com/joshnuss/airbadge-example", name: "Example Code" },
    { url: "/license", name: "License" },
  ]
</script>

<header>
  <a href="/">AirBadge</a>
</header>

<aside>
  <nav>
    {#each menus as menu}
      <a href={menu.url} class:active={menu.url == $page.url.pathname}>
        {menu.name}
      </a>
    {/each}
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

    & a {
      color: var(--gray-6);
      border-radius: var(--radius-2);
      padding: var(--size-2) var(--size-4);
      text-decoration: none;
      transition: 0.3s all;

      &:hover {
        background: var(--gray-2);
      }

      &.active {
        background: var(--gray-3);
        color: var(--gray-9);
      }
    }
  }

  main {
    grid-area: main;
    padding: var(--size-3);
    margin: var(--size-4) 0;
  }
</style>
