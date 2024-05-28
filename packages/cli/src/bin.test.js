import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function exec(options) {
  const binPath = path.join(__dirname, 'bin.js')

  return spawnSync('node', [binPath, ...options])
}

test('has "setup stripe" command', async () => {
  const pid = exec(['setup', 'stripe', '--help'])
  console.log(pid.stderr.toString())
  const stdout = pid.stdout.toString()

  expect(stdout).toMatch('Sets up Stripe environment')
})

test('has "--help" option', async () => {
  const pid = exec(['--help'])
  const stdout = pid.stdout.toString()

  expect(stdout).toMatch('Available Commands')
  expect(stdout).toMatch('setup stripe')
})
