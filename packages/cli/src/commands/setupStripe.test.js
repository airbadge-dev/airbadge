import { setupStripe } from './setupStripe'
import { hasCommand, fail, exec, readEnv, writeEnvVar } from '../utils'
import fs from 'node:fs'

vi.mock('node:fs', () => {
  return {
    default: {
      existsSync: vi.fn()
    }
  }
})

vi.mock('../utils', () => {
  return {
    hasCommand: vi.fn(),
    fail: vi.fn(),
    exec: vi.fn(),
    readEnv: vi.fn(),
    writeEnvVar: vi.fn()
  }
})

beforeEach(() => vi.spyOn(console, 'log'))
afterEach(() => vi.resetAllMocks())

describe('setupStripe', () => {
  test('when stripe cli is missing, errors', async () => {
    hasCommand.mockReturnValue(false)

    await setupStripe('.env')

    expect(hasCommand).toBeCalledWith('stripe')
    expect(fail).toBeCalledWith(expect.stringMatching(/setup instructions/gm))
  })

  describe('when stripe cli exists', () => {
    beforeEach(() => hasCommand.mockReturnValue(true))

    test("when .env doesn't exist, writes env vars", async () => {
      fs.existsSync.mockReturnValue(false)
      exec.mockImplementationOnce(() => '[default]\ntest_mode_api_key = "sk_test_1234"')
      exec.mockImplementationOnce(() => 'whsec_1234')
      writeEnvVar.mockResolvedValue()

      await setupStripe('.env')

      expect(exec).toBeCalledWith('stripe', ['config', '--list'])
      expect(writeEnvVar).toBeCalledWith('.env', 'SECRET_STRIPE_KEY', 'sk_test_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'STRIPE_WEBHOOK_SECRET', 'whsec_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'DOMAIN', 'http://localhost:5173')
      expect(console.log).toBeCalledWith('Created .env')
    })

    test("when .env exists, writes env vars", async () => {
      fs.existsSync.mockReturnValue(true)
      exec.mockImplementationOnce(() => '[default]\ntest_mode_api_key = "sk_test_1234"')
      exec.mockImplementationOnce(() => 'whsec_1234')
      readEnv.mockResolvedValue({})
      writeEnvVar.mockResolvedValue()

      await setupStripe('.env')

      expect(exec).toBeCalledWith('stripe', ['config', '--list'])
      expect(exec).toBeCalledWith('stripe', ['listen', '--print-secret'])
      expect(writeEnvVar).toBeCalledWith('.env', 'SECRET_STRIPE_KEY', 'sk_test_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'STRIPE_WEBHOOK_SECRET', 'whsec_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'DOMAIN', 'http://localhost:5173')
      expect(console.log).toBeCalledWith('Updated .env')
    })

    test("when not logged in, logs in", async () => {
      fs.existsSync.mockReturnValue(true)
      exec.mockImplementationOnce(() => '')
      exec.mockImplementationOnce(() => '')
      exec.mockImplementationOnce(() => '[default]\ntest_mode_api_key = "sk_test_1234"')
      exec.mockImplementationOnce(() => 'whsec_1234')
      readEnv.mockResolvedValue({})
      writeEnvVar.mockResolvedValue()

      await setupStripe('.env')

      expect(exec).toBeCalledTimes(4)
      expect(exec).toBeCalledWith('stripe', ['config', '--list'])
      expect(exec).toBeCalledWith('stripe', ['login'])
      expect(exec).toBeCalledWith('stripe', ['listen', '--print-secret'])
      expect(writeEnvVar).toBeCalledWith('.env', 'SECRET_STRIPE_KEY', 'sk_test_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'STRIPE_WEBHOOK_SECRET', 'whsec_1234')
      expect(writeEnvVar).toBeCalledWith('.env', 'DOMAIN', 'http://localhost:5173')
      expect(console.log).toBeCalledWith('Updated .env')
    })
  })
})
