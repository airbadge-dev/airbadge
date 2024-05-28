import { spawnSync } from 'node:child_process'
import * as prompt from '@clack/prompts'
import path from 'node:path'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'

function randomString(size = 32) {
  const bytes = crypto.getRandomValues(new Uint8Array(size))
  return Buffer.from(bytes, "base64").toString("base64")
}

async function replaceVar(path, varName, value) {
  const regex = new RegExp(`^${varName}`, 'gm')
  let data = await fs.readFile(path, 'utf8')
  data = data.replace(regex, `${varName}=${value}`)

  await fs.writeFile(path, data)
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const degitPath = path.join(__dirname, '../node_modules/.bin/degit')

let cwd = process.argv[2] || '.'

prompt.intro(`Welcome to AirBadge!`)

if (cwd === '.') {
  const dir = await prompt.text({
    message: 'Where should we create your project?',
    placeholder: '  (hit Enter to use current directory)'
  })

  if (prompt.isCancel(dir)) process.exit(1)

  if (dir) {
    cwd = dir
  }
}

const envPath = path.join(cwd, '.env')
const wait = prompt.spinner()

wait.start('Installing...')

spawnSync(degitPath, ['github:airbadge-dev/airbadge-example', cwd], { stdio: 'ignore' })

const authSecret = randomString(32)
await fs.cp(path.join(cwd, '.env.example'), envPath)
await replaceVar(envPath, 'AUTH_SECRET', authSecret)

wait.stop(`Installed to ${cwd}`)
