import { hasCommand, exec, fail, readEnv, writeEnvVar } from './utils'
import path from 'node:path'
import fs from 'fs/promises'

const templatePath = path.resolve('./test/fixtures/.env.template')
const envPath = path.resolve('./test/fixtures/.env.example')

afterEach(() => vi.resetAllMocks())
beforeEach(async () => {
  await fs.cp(templatePath, envPath)

  console.error = vi.fn()
  process.exit = vi.fn()
})

describe('hasCommand', () => {
  test('when exists, returns true', () => {
    const result = hasCommand('ls')

    expect(result).toBe(true)
  })

  test('when missing, returns false', () => {
    const result = hasCommand('non-existing-cmd')

    expect(result).toBe(false)
  })
})

describe('exec', () => {
  test('returns stdout', () => {
    const result = exec('ls')
    expect(result).toMatch(/^package.json$/gm)
  })

  test('takes parameters', () => {
    const result = exec('ls', ['-al'])
    expect(result).toMatch(/package.json$/gm)
  })
})

test('fail exits and prints error message', () => {
  fail('oops')

  expect(console.error).toHaveBeenCalledWith('oops')
  expect(process.exit).toHaveBeenCalledWith(1)
})

test('readEnv', async () => {
  const env = await readEnv(envPath)

  expect(env.FOO).toBe("1")
  expect(env.BAR).toBe("2")
})

describe('writeEnvVar', () => {
  test('replaces existing var', async () => {
    await writeEnvVar(envPath, 'FOO', 'updated-value')

    const data = await fs.readFile(envPath, 'utf8')

    expect(data).toMatch(/^FOO=updated-value$/gm)
  })

  test('adds new var', async () => {
    await writeEnvVar(envPath, 'BAZ', 'new-value')

    const data = await fs.readFile(envPath, 'utf8')

    expect(data).toMatch(/^BAZ=new-value$/gm)
  })
})
