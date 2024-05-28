import sade from 'sade'
import fs from 'node:fs'
import { setupStripe } from './commands/setupStripe.js'
import pkg from '../package.json' assert { type: 'json' }

const prog = sade('airbadge').version(pkg.version)
const envPath = '.env'

prog
	.command('setup stripe')
	.describe('Sets up Stripe environment variables')
	.action(() => setupStripe(envPath))

prog.parse(process.argv)
