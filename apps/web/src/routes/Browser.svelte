<script>
  export let selected
</script>

<section class="window browser">
  <div class="header">
    <div class="buttons">
      <div />
      <div />
      <div />
    </div>
    <div class="border" />
    <div class="tab">{selected.windowTitle}</div>
  </div>

  <div class="address-bar">
    <div class="icons">
      <span class="left">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14m6-8l-6-6m-6 6l6-6"
          />
        </svg>
      </span>
      <span class="right">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 5v14m6-8l-6-6m-6 6l6-6"
          />
        </svg>
      </span>
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <g
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          >
            <path d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747" />
            <path d="M20 4v5h-5" />
          </g>
        </svg>
      </span>
    </div>
    <div class="text">{selected.url}</div>
  </div>

  <div class="container">
    <svelte:component this={selected.component} on:advance />
  </div>
</section>

<style>
  .header {
    & .tab {
      border: solid 1px var(--gray-3);
      width: min-content;
      margin-top: 3px;
      margin-left: 50px;
      padding: 2px;
      height: 22px;
      font-size: 0.6rem;
      border-radius: 7px 7px 0 0;
      border-bottom: none;
      background: #fff;
      min-width: 60px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      z-index: var(--layer-2);
    }

    & .border {
      position: absolute;
      background: var(--gray-2);
      z-index: var(--layer-1);
      height: 1px;
      width: 100%;
      margin-top: 23px;
    }
  }

  .container {
    background: white;
    height: 100%;
  }

  .address-bar {
    background: white;
    display: flex;
    padding: 5px;
    gap: 10px;
    border-bottom: solid 1px var(--gray-1);

    & .icons {
      display: flex;
      gap: 8px;
      color: var(--gray-4);
      align-items: center;

      & svg {
        transform-origin: center;
        width: 14px;
      }

      & .left {
        rotate: -90deg;
      }

      & .right {
        rotate: 90deg;
      }
    }

    & .text {
      flex: auto;
      border: solid 1px var(--gray-2);
      border-radius: var(--radius-3);
      background: var(--gray-1);
      color: var(--gray-7);
      padding: 5px 10px;
      font-size: 10px;
    }
  }
</style>
