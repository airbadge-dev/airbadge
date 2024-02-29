<script>
	import SignIn from './SignIn.svelte'
	import Checkout from './Checkout.svelte'
	import Editor from './Editor.svelte'
	import Browser from './Browser.svelte'
	import Webhooks from './Webhooks.svelte'
	import Icon from '@iconify/svelte'

	import { fly } from 'svelte/transition'
	
	const steps = [
		{ title: 'Configure hooks', view: 'editor', description: 'Add a handle function', step: 'init', source: 'hooks.server.js' },
		{ title: 'Add database adapter', view: 'editor', description: 'Setup a database adapter', step: 'database', source: 'hooks.server.js' },
		{ title: 'Add auth providers', view: 'editor', description: 'Configure OAuth providers', step: 'provider', source: 'hooks.server.js' },
		{ title: 'Add pricing', view: 'editor', description: 'Add pricing plans', step: 'pricing', source: 'hooks.server.js' },
		{ title: 'Sign up', view: 'browser', description: 'User can sign in with OAuth', url: 'https://example.com/auth/signin', windowTitle: 'Sign in', component: SignIn },
		{ title: 'Checkout', view: 'browser', description: 'User is redirected to pay with Stripe Checkout', url: 'https://checkout.stripe.com/cs_12345', windowTitle: 'Stripe', component: Checkout },
		{ title: 'Webhooks', view: 'webhooks', description: 'All Stripe webhooks are handled for you.' },
		{ title: 'Session data', view: 'editor', description: 'Use session data customize your app', source: '+page.server.js' },
	]
	
	let selected = steps[5]

	$: selectedIndex = steps.findIndex(c => c == selected)
</script>

<main>
	<section class="hero">
		<img src="/images/logo-violet.svg" alt="AirBadge logo"/>
		<h1>Auth & Payment <em>ready in minutes</em>.</h1>
		<p><b>AirBadge</b> is open source and free</p>

		<div class="buttons">
			<a class="start" href="https://docs.airbadge.dev/getting-started">
				<span>Get started</span>
				<Icon icon="ic:round-chevron-right"/>
			</a>

			<a class="docs" href="https://docs.airbadge.dev">
				<Icon icon="tabler:book"/>
				<span>Docs</span>
			</a>
		</div>
	</section>

	<div class="demo-container view-{selected.view}">
		<section class="explanation">
			<ul>
				{#each steps as step}
					<li class:active={selected == step}>
						<button on:mouseover={() => selected = step} on:focus={() => selected = step}>
							{step.title}
						</button>
					</li>
				{/each}
			</ul>
		</section>

		<section class="demo">
			<Editor {selected}/>
			<Browser {selected} on:advance={() => selected = steps[selectedIndex+1]}/>
			<Webhooks {selected}/>
		</section>

		<div class="caption">
			{#key selected}
				<div in:fly={{y: '100%', delay: 200}} class="text">{selected.description}</div>
			{/key}
		</div>
	</div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		gap: var(--size-6);
		align-items: center;
		justify-content: center;
	}

	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: var(--size-10);
		gap: var(--size-6);

		& img {
			height: 28px;
		}

		& p {
			font-size: var(--font-size-3);
			color: var(--gray-7);

			& b {
				font-weight: 500;
				color: var(--gray-9);
			}
		}

		& .buttons {
			display: flex;
			gap: var(--size-4);
		}

		& a {
			display: flex;
			flex-direction: row;
			gap: var(--size-1);
			font-size: var(--font-size-2);
			padding: var(--size-2) var(--size-4);
			border-radius: var(--radius-5);
			text-decoration: none;
		}

		& .start {
			background: var(--violet-6);
			color: var(--gray-1);

			&:hover {
				background: var(--violet-5);
			}
		}

		& .docs {
			background: var(--gray-7);
			color: var(--gray-1);

			&:hover {
				background: var(--gray-6);
			}
		}
	}

	h1 {
		color: var(--gray-8);
		font-size: 3rem;
		font-weight: 500;
		letter-spacing: -0.07em;
		line-height: var(--font-lineheight-0);
		text-align: center;
		max-width: 40ch;

		& em {
			color: var(--violet-8);
			font-style: normal;
			text-decoration: underline;
			text-decoration-color: var(--violet-1);
			text-decoration-thickness: 5px;
			text-underline-offset: 5px;
		}
	}

	.demo-container {
		--screen-width: 400px;

		display: grid;
		grid-template-columns: 200px 1fr;
	}

	.explanation {
		grid-column: 1;
	}

	.explanation ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--size-2);

		& li {
			font-size: 0.9rem;

			& button {
				background: none;
				border: none;
				padding: var(--size-2) var(--size-4);
			  border-radius: var(--radius-2);
				width: 100%;
				display: flex;
				text-wrap: nowrap;
			}
		}

		& li:hover button {
			color: var(--gray-9);
			background: var(--gray-1);			
		}

		& .active button {
			background: var(--gray-2);			
		}
	}
	
	:global(.window) {
		background: var(--gray-1);
		border: solid 1px var(--gray-2);
		aspect-ratio: 1 / 1;
		width: var(--screen-width);
		min-width: calc(var(--screen-width) - 10px);
		border-radius: 10px;
		padding: 0;

		& .header {
			position: relative;
			gap: var(--size-2);
			height: 25px;

			& .title {
				color: var(--gray-5);
				font-size: 0.7rem;
				display: flex;
				align-items: center;
				justify-content: center;
				padding: var(--size-1);
			}

			& .buttons {
				padding: var(--size-2);
				display: flex;
				position: absolute;
				align-items: center;
				gap: 4px;

				& div {
					aspect-ratio: 1 / 1;
					height: 8px;
					background: var(--yellow-4);
					border-radius: var(--radius-round);
				}

				& :first-child {
					background-color: var(--red-4)
				}

				& :last-child {
					background-color: var(--green-4)
				}
			}
		}
	}

	.demo {		
		grid-column: 2;
		display: flex;
		gap: var(--size-2);
		width: var(--screen-width);
		overflow: hidden;
		position: relative;

		& section {
			overflow: hidden;
			transition: translate 0.4s var(--ease-1);
		}

		& .code {
			background: var(--gray-8);

			& pre {
				color: var(--gray-3);
			}
		}

		& pre, & .container {
			padding: 0 var(--size-2);
		}

	}

	.caption {
		position: absolute;
		z-index: var(--layer-2);
		bottom: 50px;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		width: 100%;
		display: none;
		
		& .text {
			font-size: 0.8rem;
			color: var(--gray-3);
			border: solid 1px var(--gray-5);
			background: var(--gray-7);
			border-radius: var(--radius-2);
			padding: var(--size-1) var(--size-2);	
			border: solid 1px var(--gray-5);
			box-shadow: var(--shadow-1);
		}
	}

	.view-browser :global(.window) {
		translate: -100%;
	}
	
	.view-webhooks :global(.window) {
		translate: calc(-200% - 10px);
	}
</style>
