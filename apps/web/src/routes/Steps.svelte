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
            <line x1="5" y1="0" x2="5" y2="38" />
            <circle class="outline" cx="5" cy="5" r="5" />
            <circle class="core" cx="5" cy="5" r="2" />

            <svg class="check-mark" viewBox="0 0 24 24" width="6" x="2" y="0">
              <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z" />
            </svg>
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
      display: flex;
      padding: var(--size-2);
      border-radius: var(--radius-2);
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
        font-weight: 500;
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

    & .check-mark {
      width: 10px;
      color: white;
      animation: var(--animation-fade-in) forwards;
    }
  }

  .active ~ li {
    & button {
      color: var(--gray-4);
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

    & .check-mark {
      color: transparent;
    }
  }

  .active {
    background: var(--gray-1);

    & button {
      color: var(--gray-8);
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

    & .check-mark {
      color: transparent;
    }
  }

  ul li:last-child svg line {
    display: none;
  }
</style>
