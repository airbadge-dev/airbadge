<script>
  import Icon from '@iconify/svelte'
  import { page } from '$app/stores'
  import { syncToc } from '$lib/toc'

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

  syncToc('main .toc')
</script>

<header>
  <a href="/">AirBadge</a>

  <nav>
    <a href="https://discord.gg/KjGNepeChg" target="_blank">
      <Icon icon="bi-discord"/>
    </a>

    <a href="https://github.com/joshnuss/airbadge">
      <Icon icon="bi-github"/>
    </a>
  </nav>
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
      grid-template-columns: max(240px, 20vw) auto;
    }
  }

  header {
    grid-area: header;
    background: var(--violet-4);
    color: var(--gray-2);
    padding: var(--size-3);
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;

    & a {
      color: var(--gray-1);
      font-family: var(--font-heading);
      font-weight: normal;
    }
  }

  header nav {
    display: flex;
    flex-direction: row;
    gap: var(--size-2);
  }

  header nav :global(svg) {
    width: 24px;
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
    display: grid;
    grid-template-areas: "docs";
    margin: var(--size-4) 0;
  }

  main :global(.docs) {
    grid-area: docs;
    padding: var(--size-3) var(--size-6);
  }

  main :global(.toc) {
    display: none;
    border-left: solid 2px var(--gray-2);
    padding: var(--size-4);

    & ol {
      list-style-type: none;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: var(--size-2);
    }
  }

  main :global(.toc > ol) {
    position: fixed;
  }

  main :global(.toc li) {
    padding: 0;
  }

  main :global(.toc .toc-link-h1) {
    font-weight: bold;
  }

  main :global(.toc li ol) {
    margin-top: var(--size-2);
  }

  main :global(.toc li a) {
    color: var(--gray-7);
    text-wrap: nowrap;
    text-decoration: none;

    &:hover {
      color: var(--violet-8);
    }
  }

  main :global(.toc a.active) {
    color: var(--violet-8);
  }

  @media (--lg-n-above) {
    main {
      grid-template-areas: "docs toc";
      grid-template-columns: 1fr minmax(240px, auto);
      gap: var(--size-3);
    }

    main :global(.toc) {
      display: flex;
      grid-area: toc;
    }
  }
</style>
