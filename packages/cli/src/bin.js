import sade from 'sade'
import fs from 'node:fs'
import { setupStripe } from './commands/setupStripe.js'

const pkg = JSON.parse(fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8'))
const prog = sade('airbadge').version(pkg.version)

prog
	.command('setup stripe')
	.describe('sets up stripe environment variables')
	.action(setupStripe)

prog.parse(process.argv)
