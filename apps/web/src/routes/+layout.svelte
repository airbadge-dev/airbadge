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

    <a href="https://docs.airbadge.dev/getting-started" class="cta btn primary">
      Get started
    </a>

    <button class="hamburger" on:click={toggleMenu}>
      <Icon icon={open ? 'ci:close-md' : 'ci:hamburger-md'} height="34" />
    </button>
  </nav>
</header>

<slot />

<footer>
  <div class="container">
    <section class="about">
      <img class="logo" src="/images/logo-white.svg" alt="logo"/>
      <p class="copyright">&copy; {new Date().getFullYear()} &mdash; Copyright</p>
    </section>

    <section>
      <h3>Support</h3>
      <nav>
        <a href="/discord">Discord</a>
        <a href="mailto:info@airbadge.dev">E-mail</a>
        <a href="#link">Contact</a>
      </nav>
    </section>

    <section>
      <h3>Product</h3>
      <nav>
        {#each menus as menu}
          <a href={menu.path}>{menu.title}</a>
        {/each}
      </nav>
    </section>

    <section>
      <h3>Links</h3>
      <nav>
        <a href="https://github.com/joshnuss/airbadge">GitHub</a>
        <a href="https://demo.airbadge.dev">Demo</a>
        <a href="https://github.com/joshnuss/airbadge-example">Template</a>
        <a href="/discord">Discord</a>
      </nav>
    </section>
  </div>
</footer>

<style>
  @import 'open-props/media.min.css';

  :root {
    --logo-height: 22px;
    --border-bottom: solid 1px var(--gray-8);
    --header-background: var(--background-color);
    --hamburger-display: flex;
    --nav-display: none;
    --footer-padding: var(--size-4);
    --footer-direction: column;
    --footer-justify: flex-start;
    --footer-about-direction: row;
    --footer-about-justify: space-between;
    --footer-about-order: unset;

    @media (--sm-n-above) {
      --logo-height: 24px;
      --footer-direction: row;
      --footer-justify: space-between;
      --footer-padding: var(--size-8) var(--size-2);
      --footer-about-direction: column;
      --footer-about-justify: none;
      --footer-about-order: 1;
    }

    @media (--md-n-above) {
      --logo-height: 26px;
      --footer-padding: var(--size-10) var(--size-4);
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
    border-radius: var(--radius-2);
    color: var(--gray-7);
  }

  header .cta:hover {
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

  footer {
    width: 100%;
    background: var(--background-color);
    border-top: solid 1px var(--gray-10);
    display: flex;
    justify-content: center;
    gap: var(--size-4);
    padding: var(--footer-padding);

    & .container {
      width: var(--screen-width);
      display: flex;
      flex-direction: var(--footer-direction);
      justify-content: var(--footer-justify);
      gap: var(--size-4);
    }
  }

  footer .logo {
    width: 120px;
  }

  footer .copyright {
    font-size: 0.7rem;
    color: var(--gray-6);
  }

  footer h3 {
    font-size: 0.8rem;
    font-weight: normal;
    text-transform: uppercase;
    color: var(--gray-6);
  }

  footer section {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  footer .about {
    display: flex;
    flex-direction: var(--footer-about-direction);
    justify-content: var(--footer-about-justify);
    order: var(--footer-about-order);
  }

  footer nav {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  footer a {
    color: var(--gray-2);
  }
</style>
