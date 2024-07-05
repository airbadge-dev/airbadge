import sade from 'sade'
import fs from 'node:fs/promises'
import { setupStripe } from './commands/setupStripe.js'

const data = await fs.readFile('./package.json', 'utf8')
const pkg = JSON.parse(data)

const prog = sade('airbadge').version(pkg.version)
const envPath = '.env'

prog
	.command('setup stripe')
	.describe('Sets up Stripe environment variables')
	.action(() => setupStripe(envPath))

prog.parse(process.argv)
