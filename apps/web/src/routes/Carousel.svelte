<script>
  import { onMount } from 'svelte'

  export let steps
  export let selectedIndex
  export let selected

  let carousel
  let observer

  onMount(() => {
    const options = {
      root: carousel,
      threshold: 0.8
    }

    observer = new IntersectionObserver((entries) => {
      const activated = entries.reduce((max, entry) => {
        return entry.intersectionRatio > max.intersectionRatio ? entry : max
      })

      if (activated.intersectionRatio > 0) {
        selectedIndex = +activated.target.dataset.index
      }
    }, options)

    observe()

    return () => observer.disconnect()
  })

  $: scrollToIndex(selectedIndex)

  function observe() {
    steps.forEach((step) => observer.observe(step.node))
  }

  function scrollToIndex(index) {
    if (!carousel) return

    observer.disconnect()

    steps[index].node.scrollIntoView({
      inline: 'start',
      behavior: 'smooth'
    })

    carousel.addEventListener('scrollend', observe, {
      once: true
    })
  }

  function select(index) {
    if (index == selectedIndex && selectedIndex < steps.length - 1) {
      selectedIndex++
    } else {
      selectedIndex = index
    }
    scrollToIndex(index)
  }
</script>

<section bind:this={carousel}>
  {#each steps as step, index}
    <button
      bind:this={step.node}
      data-index={index}
      class:active={step == selected}
      on:click={() => select(index)}
    >
      <span class="count">{index + 1}</span> <span>{step.title}</span>
    </button>
  {/each}
</section>

<style lang="postcss">
  @import 'open-props/media.min.css';

  section {
    grid-column: 2;
    grid-row: 1;
    display: flex;
    gap: var(--size-3);
    overflow: scroll;
    scroll-snap-type: x mandatory;
    width: 100vw;
    max-width: 100%;
    padding: var(--size-2);

    @media (--md-n-above) {
      display: none;
    }
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  section::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  section {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  button {
    scroll-snap-align: start;
    text-wrap: nowrap;
    min-width: 85%;
    border: none;
    background: var(--gray-2);
    padding: var(--size-3);
    border-radius: var(--radius-2);
    color: var(--gray-8);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: var(--size-3);
    opacity: 0.7;
    transition: all 0.3s var(--ease-5);
  }

  button:last-child {
    min-width: 100%;
  }

  button.active {
    opacity: 1;
  }

  .count {
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: var(--ratio-square);
    background: white;
    border: solid 1px var(--gray-3);
    border-radius: var(--radius-round);
    width: 24px;
    font-size: 0.7rem;
    transition: all 0.3s var(--ease-5);
  }

  .active .count {
    border-color: var(--violet-4);
    background-color: var(--violet-4);
    color: white;
  }
</style>
