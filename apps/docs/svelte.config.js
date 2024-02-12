import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { highlighter } from './src/lib/highlighter.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings
      ],
      highlight: {
        highlighter
      }
    })
  ],

  kit: {
    adapter: adapter()
  }
}

export default config
