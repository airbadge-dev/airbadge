import { sentrySvelteKit } from '@sentry/sveltekit'
import { sveltekit } from '@sveltejs/kit/vite'
import json5 from 'vite-plugin-json5'
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: 'airbadge',
        project: 'web'
      }
    }),
    json5(),
    sveltekit()
  ],
  resolve: {
    alias: {
      $data: path.resolve('./src/data')
    }
  }
})
