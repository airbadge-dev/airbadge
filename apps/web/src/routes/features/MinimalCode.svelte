<script>
  export let active
</script>

<svg class:active width="350" viewBox="0 0 88 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x=0 y=6 class="green">+42</text>
  <text x=18 y=6 class="red">-1,527</text>

  <g class="squares">
    <rect class="animate-red" style="--index: 0" x=0 y=0/>
    <rect class="animate-red" style="--index: 1" x=8 y=0/>
    <rect class="animate-red" style="--index: 2" x=16 y=0/>
    <rect class="animate-red" style="--index: 3" x=24 y=0/>
    <rect style="--index: 4" x=32 y=0/>
  </g>
</svg>

<style>
  svg {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 2rem;
  }

  text {
    transition: var(--transition);
    font-size: 8px;
    fill: var(--gray-4);
  }

  .active text {
    fill: var(--gray-8);
  }

  g {
    translate: 48px 0;
  }

  rect {
    transition: var(--transition);
    width: 6px;
    height: 6px;
    fill: var(--gray-6);
  }
  .active rect {
    fill: var(--gray-2);
  }
  .green {
    fill: var(--gray-6);
  }
  .red {
    fill: var(--gray-8);
  }
  .active .green {
    fill: var(--green-4);
  }
  .active .red {
    fill: var(--red-8);
  }

  .active .animate-red {
    --delay: calc(var(--index) * 75ms);
    animation: 0.2s color var(--delay) forwards;
    animation-timing-function: var(--ease-elastic-in-out-2);
  }

  @keyframes color {
    to {
      fill: var(--red-8);
    }
  }
</style>

