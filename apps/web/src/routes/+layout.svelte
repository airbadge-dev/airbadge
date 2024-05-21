<script>
  import './global.css'
  import Icon from '@iconify/svelte'

  const menus = [
    {
      title: 'How it works',
      path: '/#demo'
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
    },
    {
      title: 'GitHub',
      path: 'https://github.com/airbadge-dev/airbadge'
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

<div class="overlay" class:open on:click={closeMenu} aria-hidden="true" />
<div class="popup-menu" class:open role="dialog">
  <nav>
    {#each menus as menu}
      <a href={menu.path} on:click={closeMenu}>{menu.title}</a>
    {/each}

  </nav>

  <a href="https://docs.airbadge.dev/getting-started" class="cta btn primary" on:click={closeMenu}>
    Get started
  </a>
</div>

<slot />

<footer>
  <div class="container">
    <section class="about">
      <img class="logo" src="/images/logo-white.svg" alt="logo"/>
      <p>AirBadge connects Auth.js with Stripe. Test your next SaaS idea quickly. It's free and open source.</p>
      <p>&copy; {new Date().getFullYear()} &mdash; Copyright</p>
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
        <a href="https://github.com/airbadge-dev/airbadge">GitHub</a>
        <a href="https://demo.airbadge.dev">Demo</a>
        <a href="https://github.com/airbadge-dev/airbadge-example">Template</a>
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
    --footer-about-align: flex-start;
    --footer-about-text-align: left;
    --header-margin-top: 0;

    @media (--sm-n-above) {
      --logo-height: 24px;
      --footer-direction: row;
      --footer-justify: space-between;
      --footer-padding: var(--size-8) var(--size-2);
      --footer-about-direction: column;
      --footer-about-justify: none;
      --footer-about-order: 1;
      --footer-about-align: flex-end;
      --footer-about-text-align: right;
    }

    @media (--md-n-above) {
      --logo-height: 26px;
      --footer-padding: var(--size-10) var(--size-4);
    }

    @media (--lg-n-above) {
      --border-bottom: none;
      --header-background: none;
      --header-margin-top: 5px;
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
    margin-top: var(--header-margin-top);

    & .logo img {
      height: var(--logo-height);
    }
  }

  header nav {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  header nav a {
    font-size: 0.9rem;
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
    flex-direction: column;
    justify-content: var(--footer-about-justify);
    align-items: var(--footer-about-align);
    order: var(--footer-about-order);
  }

  footer .about p {
    text-align: var(--footer-about-text-align);
    max-width: 30ch;
    font-size: 0.7rem;
    color: var(--gray-6);
  }


  footer nav {
    display: flex;
    flex-direction: column;
    gap: var(--size-2);
  }

  footer a {
    color: var(--gray-2);
    font-size: 14px;
  }

  .overlay {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    background: #2226;
    top: 80px;
    backdrop-filter: blur(4px);
    z-index: var(--layer-4);

    @media (--lg-n-above) {
      display: none !important;
    }
  }

  .overlay.open {
    opacity: 0;
    animation: fade-in 0.2s forwards;
  }

  .popup-menu {
    display: none;
    position: absolute;
    top: 82px;
    background: var(--background-color);
    width: 100vw;
    margin: -1rem 1rem 0 1rem;
    padding: 1.25rem 1.5rem;
    border-bottom: solid 1px var(--gray-8);
    box-shadow: var(--shadow-5);
    font-size: var(--font-size-3);
    z-index: var(--layer-4);

    @media (--lg-n-above) {
      display: none !important;
    }
  }

  .popup-menu nav {
    display: flex;
    flex-direction: column;
    gap: var(--size-1);
  }

  .popup-menu nav a {
    padding: var(--size-3) 0;
    color: var(--gray-2);
    border-bottom: solid 0.5px var(--gray-8);
  }

  .popup-menu .cta {
    margin: var(--size-4) 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .open {
    display: block;
  }
</style>
