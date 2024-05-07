import { spawnSync } from 'node:child_process'
import * as prompt from '@clack/prompts'
import path from 'node:path'

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

const wait = prompt.spinner()

wait.start('Installing...')

spawnSync('./node_modules/degit/degit', ['github:joshnuss/airbadge-example', cwd], { stdio: 'ignore' })

wait.stop(`Installed to ${cwd}`)
