import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import TOML from '@iarna/toml'
import * as envfile from 'envfile'

const envPath = '.env.local'

export async function setupStripe() {
  const cli = spawnSync('which', ['stripe']).status === 0;

  if (!cli) {
    console.error("Stripe's CLI is missing\n\nTo install, follow setup instructions:\nhttps://stripe.com/cli")
    process.exit(-1)
  }

  let env = {}
  const exists = fs.existsSync(envPath)

  if (exists) {
    env = envfile.parse(fs.readFileSync(envPath, 'utf8'))
  }

  if (env.SECRET_STRIPE_KEY || env.PUBLIC_STRIPE_KEY) {
    console.error('SECRET_STRIPE_KEY or PUBLIC_STRIPE_KEY is already configured in .env.local')
    process.exit(0)
  }

  let result = spawnSync('stripe', ['config', '--list'])
  let data = TOML.parse(result.stdout.toString())

  if (!data.default) {
    spawnSync('stripe', ['login'])
    result = spawnSync('stripe', ['config', '--list'])
    data = TOML.parse(result.stdout.toString())
  }

  result = spawnSync('stripe', ['listen', '--print-secret'])
  const webhookSecret = result.stdout.toString().trim()

  env.SECRET_STRIPE_KEY = data.default.test_mode_api_key
  env.PUBLIC_STRIPE_KEY = data.default.test_mode_pub_key
  env.STRIPE_WEBHOOK_SECRET = webhookSecret

  if (!env.DOMAIN) {
    env.DOMAIN = 'http://localhost:5173'
  }

  fs.writeFileSync(envPath, envfile.stringify(env))

  console.log(`${exists ? 'Updated' : 'Created'} ${envPath}`)
}
