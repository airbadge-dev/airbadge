import fs from 'node:fs'
import TOML from '@iarna/toml'
import { exec, hasCommand, fail, writeEnvVar, readEnv } from '../utils.js'

export async function setupStripe(envPath) {
  const cli = hasCommand('stripe')

  if (!cli) {
    fail("Stripe's CLI is missing\n\nTo install, follow setup instructions:\nhttps://stripe.com/cli")
  }

  let env = {}
  const exists = fs.existsSync(envPath)

  if (exists) {
    env = await readEnv(envPath)
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

  await writeEnvVar(envPath, 'SECRET_STRIPE_KEY', data.default.test_mode_api_key)
  await writeEnvVar(envPath, 'PUBLIC_STRIPE_KEY', data.default.test_mode_pub_key)
  await writeEnvVar(envPath, 'STRIPE_WEBHOOK_SECRET', webhookSecret)

  if (!env.DOMAIN) {
    await writeEnvVar(envPath, 'DOMAIN', 'http://localhost:5173')
  }

  console.log(`${exists ? 'Updated' : 'Created'} ${envPath}`)
}
