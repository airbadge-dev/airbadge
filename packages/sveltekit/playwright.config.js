/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'npm run build && npm run preview',
    port: 4173,
    stdout: 'pipe',
    stderr: 'pipe'
  },
  testDir: './tests',
  testMatch: '*.test.js',
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.js/
    },
    {
      name: 'chromium',
      dependencies: ['setup']
    }
  ]
}

export default config
