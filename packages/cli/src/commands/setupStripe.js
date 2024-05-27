import fs from 'node:fs'
import TOML from '@iarna/toml'
import * as envfile from 'envfile'
import { exec, hasCommand, fail } from '../utils.js'

const envPath = '.env.local'

export async function setupStripe() {
  const cli = hasCommand('stripe')

  if (!cli) {
    console.error("Stripe's CLI is missing\n\nTo install, follow setup instructions:\nhttps://stripe.com/cli")
    process.exit(-1)
  }

  let env = {}
  const exists = fs.existsSync(envPath)

  if (exists) {
    env = readEnv(envPath)
  }

  if (env.SECRET_STRIPE_KEY || env.PUBLIC_STRIPE_KEY) {
    fail('SECRET_STRIPE_KEY or PUBLIC_STRIPE_KEY is already configured in .env.local')
  }

  let result = exec('stripe', ['config', '--list'])
  let data = TOML.parse(result)

  if (!data.default) {
    exec('stripe', ['login'])
    result = exec('stripe', ['config', '--list'])
    data = TOML.parse(result)
  }

  const webhookSecret = exec('stripe', ['listen', '--print-secret'])

  env.SECRET_STRIPE_KEY = data.default.test_mode_api_key
  env.PUBLIC_STRIPE_KEY = data.default.test_mode_pub_key
  env.STRIPE_WEBHOOK_SECRET = webhookSecret

  if (!env.DOMAIN) {
    env.DOMAIN = 'http://localhost:5173'
  }

  writeEnv(envPath, env)

  console.log(`${exists ? 'Updated' : 'Created'} ${envPath}`)
}

function writeEnv(path, env) {
  fs.writeFileSync(path, envfile.stringify(env))
}

function readEnv(path) {
  return envfile.parse(fs.readFileSync(path, 'utf8'))
}
