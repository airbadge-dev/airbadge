<script>
  export let active
</script>

<svg class:active width="393" viewBox="0 0 85 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <text x=0 y=6 class="green">+42</text>
  <text x=18 y=6 class="red">-1,527</text>

  <g class="squares">
    <rect class="red" x=0 y=0/>
    <rect class="red" x=8 y=0/>
    <rect class="red" x=16 y=0/>
    <rect class="red" x=24 y=0/>
    <rect x=32 y=0/>
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
</style>

