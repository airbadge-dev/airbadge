import { sveltekit } from '@sveltejs/kit/vite'
import json5 from 'vite-plugin-json5'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [json5(), sveltekit()],
  resolve: {
    alias: {
      $data: path.resolve('./src/data')
    }
  }
})
