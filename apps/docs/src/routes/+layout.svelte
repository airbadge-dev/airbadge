<header>
  AirBadge
</header>

<main>
  <slot/>
</main>

<style>
  @import "./global.css";

  header {
    background: var(--violet-4);
    color: var(--gray-2);
    padding: var(--size-2);
  }

  main {
    padding: var(--size-3);
    margin: var(--size-4) 0;
  }
</style>
