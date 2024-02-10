import adapter from '@sveltejs/adapter-auto';
import { mdsvex } from 'mdsvex';
import { highlighter } from './src/lib/highlighter.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],

	preprocess: [
		mdsvex({
			extensions: ['.md'],
			highlight: {
				highlighter
			}
		})
	],

	kit: {
		adapter: adapter()
	}
};

export default config;
