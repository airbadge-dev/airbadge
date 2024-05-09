<script>
  export let active
</script>

<svg class:active viewBox="0 0 218 257" xmlns="http://www.w3.org/2000/svg">
  <path d="M250.793 73.1307L126.016 145.342L0.413574 73.1307L125.19 0.948975L250.793 73.1307Z" fill="#D9D0FF"/>
  <path d="M250.379 216.818L125.603 289V145.422L250.792 73.1306L250.379 216.818Z" fill="#C5BFDF"/>
  <path d="M126.016 145.342L125.603 289L0 216.818L0.413167 73.1306L126.016 145.342Z" fill="#9F96C4"/>
  <path d="M190.04 108.371L125.869 145.357L61.2734 108.371L125.444 71.4001L190.04 108.371Z" fill="#A893FF"/>
  <path d="M189.828 181.967L125.657 218.938V145.398L190.04 108.371L189.828 181.967Z" fill="#8468F6"/>
  <path d="M125.87 145.357L125.657 218.938L61.0615 181.967L61.274 108.371L125.87 145.357Z" fill="#6741D9"/>
</svg>

<style>
  @import 'open-props/media.min.css';

  svg {
    position: absolute;
    bottom: 0;
    right: 0;

    width: 130px;

    @media (--sm-n-above) {
      width: 160px;
    }
    @media (--md-n-above) {
      width: 180px;
    }
    @media (--lg-n-above) {
      width: 200px;
    }
  }

  svg.active {
    scale: 1.1
  }

  path {
    filter: grayscale(1) brightness(0.9);
    transition: var(--transition);
  }
  .active path {
    filter: brightness(1);
  }
</style>
