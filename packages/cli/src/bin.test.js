import { spawnSync } from 'node:child_process'

function exec(options) {
  return spawnSync('node', ['./src/bin.js', ...options])
}

test('has setup stripe command', async () => {
  const pid = exec(['setup', 'stripe', '--help'])
  const stdout = pid.stdout.toString()

  expect(stdout).toMatch('Sets up Stripe environment')
})

test('has help command', async () => {
  const pid = exec(['--help'])
  const stdout = pid.stdout.toString()

  expect(stdout).toMatch('Available Commands')
  expect(stdout).toMatch('setup stripe')
})
