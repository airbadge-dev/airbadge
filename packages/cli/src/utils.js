import { spawnSync } from 'node:child_process'
import * as envfile from 'envfile'
import fs from 'fs/promises'

export function hasCommand(cmd) {
  const pid = spawnSync('which', [cmd])

  return pid.status === 0
}

export function exec(cmd, params = []) {
  const result = spawnSync(cmd, params)

  return result.stdout.toString().trim()
}

export function fail(message) {
  console.error(message)
  process.exit(1)
}

export async function writeEnvVar(path, varName, value) {
  const regex = new RegExp(`^${varName}=.*$`, 'gm')
  let data = await fs.readFile(path, 'utf8')

  if (data.match(regex)) {
    data = data.replace(regex, `${varName}=${value}`)
  } else {
    data += `\n${varName}=${value}\n`
  }

  await fs.writeFile(path, data)
}

export async function readEnv(path) {
  const data = await fs.readFile(path, 'utf8')
  return envfile.parse(data)
}
