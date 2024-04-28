<script>
  import './global.css'
  import Icon from '@iconify/svelte'

  const menus = [
    {
      title: 'How it works',
      path: '/#how-it-works'
    },
    {
      title: 'Features',
      path: '/#features'
    },
    {
      title: 'Pricing',
      path: '/#pricing'
    },
    {
      title: 'Documentation',
      path: 'https://docs.airbadge.dev'
    }
  ]

  let open = false

  function toggleMenu() {
    open = !open
  }

  function closeMenu() {
    open = false
  }
</script>

<header>
  <a class="logo" href="/">
    <img src="/images/logo-white.svg" alt="AirBadge logo" />
  </a>

  <nav>
    {#each menus as menu}
      <a class="action" href={menu.path}>{menu.title}</a>
    {/each}

    <a href="https://docs.airbadge.dev/getting-started" class="cta">
      Get started
    </a>

    <button class="hamburger" on:click={toggleMenu}>
      <Icon icon={open ? 'ci:close-md' : 'ci:hamburger-md'} height="34" />
    </button>
  </nav>
</header>

<slot />

<style>
  @import 'open-props/media.min.css';

  :root {
    --logo-height: 22px;
    --border-bottom: solid 1px var(--gray-8);
    --header-background: var(--background-color);
    --hamburger-display: flex;
    --nav-display: none;

    @media (--sm-n-above) {
      --logo-height: 24px;
    }

    @media (--md-n-above) {
      --logo-height: 26px;
    }

    @media (--lg-n-above) {
      --border-bottom: none;
      --header-background: none;
      --hamburger-display: none;
      --nav-display: flex;
    }
  }

  header {
    padding: 1rem 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: var(--border-bottom);
    background: var(--header-background);
    opacity: 0;
    animation: 2s fade-in 1s forwards var(--ease-4);
    width: var(--screen-width);

    & .logo img {
      height: var(--logo-height);
    }
  }

  header nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  header .action, header .cta {
    display: var(--nav-display);
  }

  header a {
    text-wrap: nowrap;
  }

  header a {
    color: var(--gray-1);
    padding: 0.5rem 0.75rem;
    border-radius: 7px;
  }

  header a:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
    text-decoration-thickness: 2px;
    text-decoration-color: var(--gray-5);
  }

  header .cta {
    padding: 0.3rem 1rem;
    color: var(--gray-10);
    border-radius: var(--radius-2);
    background: var(--gray-1);
    font-weight: 500;
    transition: all 0.1s var(--ease-in-out-3);
  }

  header .cta:hover {
    background: var(--violet-4);
    color: var(--gray-1);
    text-decoration: none;
  }

  .hamburger {
    z-index: var(--layer-4);
    border: solid 1px var(--gray-8);
    border-radius: var(--radius-2);
    background: none;
    color: var(--gray-4);
    display: var(--hamburger-display);
    align-items: center;
  }

</style>
