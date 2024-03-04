<script>
  export let steps
  export let selected

  function select(step) {
    selected = step
  }
</script>

<section>
  <ul>
    {#each steps as step}
      <li class:active={step == selected}>
        <button on:mouseover={() => select(step)} on:focus={() => select(step)}>
          <svg class="icon" viewBox="0 0 10 10" width="20">
            <line x1="5" y1="2" x2="5" y2="36" />
            <circle class="outline" cx="5" cy="5" r="3" />
            <circle class="core" cx="5" cy="5" r="1.5" />
          </svg>

          <div class="content">
            <span class="title">{step.title}</span>
            <span class="description">{step.description}</span>
          </div>
        </button>
      </li>
    {/each}
  </ul>
</section>

<style>
  section {
    padding: 2rem 0;
  }

  svg.icon {
    overflow: visible;
    z-index: var(--layer-2);
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: var(--size-2);

    & li {
      --radius: var(--radius-2);
      display: flex;
      padding: var(--size-2);
      border-radius: var(--radius) 0 0 var(--radius);
      border: solid 1px transparent;
      border-right: none;
    }

    & button {
      color: var(--gray-6);
      font-size: var(--font-size-2);
      flex-grow: 1;
      display: flex;
      gap: var(--size-3);
      align-items: center;
      background: none;
      border: none;
      text-align: left;
      transition: all 0.1s var(--ease-2);

      & .content {
        display: flex;
        flex-direction: column;
        gap: var(--size-2);
      }

      & .title {
        font-weight: 400;
      }

      & .description {
        display: none;
      }
    }

    & circle.outline {
      fill: var(--violet-2);
      stroke: var(--violet-2);
      stroke-width: 0.5px;
      transition: all 0.1s var(--ease-2);
    }

    & circle.core {
      fill: var(--violet-2);
      stroke: var(--violet-2);
      transition: all 0.1s var(--ease-2);
    }

    & line {
      stroke: var(--violet-2);
    }
  }

  .active ~ li {
    & button {
      color: var(--gray-5);
    }

    & circle.outline {
      stroke: var(--gray-2);
      fill: white;
    }

    & circle.core {
      fill: white;
      stroke: white;
    }

    & line {
      stroke: var(--gray-2);
    }
  }

  .active {
    background: var(--violet-1);
    border-color: var(--violet-2);

    & button {
      & .title {
        color: var(--gray-7);
      }
    }

    & circle.outline {
      stroke: var(--violet-4);
      fill: white;
    }

    & circle.core {
      stroke: white;
      fill: var(--violet-4);
    }

    & line {
      stroke: var(--gray-2);
    }
  }

  ul li:last-child svg line {
    display: none;
  }
</style>
