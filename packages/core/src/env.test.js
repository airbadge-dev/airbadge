import { setEnv, getEnv, reset } from './env'

describe('env', () => {
  test('when variable exists, it returns value', () => {
    setEnv({ FOO: 'some-value' })

    const value = getEnv('FOO')

    expect(value).toEqual('some-value')
  })

  test('when variable doesnt exist, it errors', () => {
    expect(() => {
      getEnv('BAR')
    }).toThrowError('Environment variable `BAR` is missing')
  })

  test('when variable is empty, it errors', () => {
    setEnv({ BAZ: '' })

    expect(() => {
      getEnv('BAZ')
    }).toThrowError('Environment variable `BAZ` is missing')
  })

  test('can set multple', () => {
    setEnv({ A: '1', B: '2' })

    const a = getEnv('A')
    const b = getEnv('B')

    expect(a).toEqual('1')
    expect(b).toEqual('2')
  })

  test('can reset', () => {
    setEnv({ BAZ: '1' })

    reset()

    expect(() => {
      getEnv('BAZ')
    }).toThrowError('Environment variable `BAZ` is missing')
  })
})
