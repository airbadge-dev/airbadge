import adapter from '@sveltejs/adapter-auto'
import { mdsvex } from 'mdsvex'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeWrap from 'rehype-wrap'
import { highlighter } from '@repo/shared/highlighter'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],

  preprocess: [
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [
        rehypeSlug,
        rehypeAutolinkHeadings,
        [
          rehypeWrap,
          {
            wrapper: 'div.docs'
          }
        ],
        [
          rehypeToc,
          {
            headings: ['h1', 'h2']
          }
        ]
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
