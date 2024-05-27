import { spawnSync } from 'node:child_process'

export function hasCommand(cmd) {
  const pid = spawnSync('which', [cmd])

  return pid.status === 0
}

export function exec(cmd, params) {
  const result = spawnSync(cmd, params)

  return result.stdout.toString().trim()
}

export function fail(message) {
  console.error(message)
  process.exit(1)
}
