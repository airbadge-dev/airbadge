<script>
  export let active
</script>

<div class="container" class:active>
	<div class="logo">
		<img src="/logos/stripe.svg" alt="Stripe logo"/>
	</div>

	<svg viewBox="0 0 10 10" height=10 width=120>
		<line x1=30 y1=0 x2=134 y2=0/>
	</svg>

  <div class="circle">
    <div class="ring inner"/>
    <div class="ring outer"/>

    <div class="core">
      <img src="/favicon.svg" alt="AirBadge logo"/>
    </div>
  </div>
</div>

<style>
	.circle {
		position: relative;
    transition: var(--transition);
    filter: grayscale(1);
	}

  .active .circle {
    filter: grayscale(0)
  }

	.ring {
		position: absolute;
		z-index: var(--layer-1);
		aspect-ratio: var(--ratio-square);
		border: solid 1px var(--violet-6);
		border-radius: var(--radius-round);
		background: var(--violet-4);
		opacity: 0;
		width: var(--diameter);
	}

  .active .ring {
		animation-duration: 5s;
		animation-iteration-count: infinite;
		animation-timing-function: var(--ease-out-5);
  }

	.active .ring.inner {
		animation-name: scale-inner, fade-in;
	}

	.active .ring.outer {
		animation-name: scale-outer, fade-in;
	}

	.core {
		position: relative;
		z-index: var(--layer-3);
		display: flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: var(--ratio-square);
		width: var(--diameter);
		font-size: var(--font-size-6);
		background: white;
    background: var(--gray-11);
		border: solid 0.5px var(--gray-8);
		border-radius: var(--radius-round);
	}

	.circle img {
		width: 20px;
	}

	.logo {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: var(--shadow-3);
		aspect-ratio: var(--ratio-square);
		width: 100px;
    height: 100px;
		z-index: var(--layer-2);
		padding: var(--size-2);
    filter: grayscale(1);
    transition: var(--transition);
	}

  .active .logo {
    filter: grayscale(0)
  }

	svg {
		position: absolute;
		top: 50%;
		z-index: var(--layer-1);
		overflow: visible;
	}

	line {
		stroke: var(--gray-6);
		stroke-width: 3;
		stroke-dasharray: 5;
	}

  .active line {
		animation: 2s progress 0.2s linear infinite forwards;
  }

	.container {
		--diameter: 60px;
    --transition: all 0.3s var(--ease-2);

		position: absolute;
    bottom: var(--size-2);

		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--size-4);
    width: 250px;
	}

	@keyframes scale-inner {
		from {
			scale: 100%;
		}
		45% {
			scale: 180%;
		}
		100% {
			scale: 100%;
		}
	}

	@keyframes scale-outer {
		from {
			scale: 100%;
		}

		30% {
			scale: 270%;
		}

		65% {
			scale: 270%;
		}

		100% {
			scale: 50%;
		}
	}

	@keyframes fade-in {
		from { opacity: 0.03 }
		30% { opacity: 0.03 }
		90% { opacity: 0.08 }
		to { opacity: 0 }
	}

	@keyframes progress {
	  from {
	    stroke-dashoffset: 0;
	  }
	  to {
	    stroke-dashoffset: -100;
	  }
	}
</style>
