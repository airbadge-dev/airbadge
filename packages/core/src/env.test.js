import { setEnv, getEnv } from './env'

describe('env', () => {
  test('when variable exists, it returns value', () => {
    setEnv('FOO', 'some-value')

    const value = getEnv('FOO')

    expect(value).toEqual('some-value')
  })

  test('when variable doesnt exist, it errors', () => {
    expect(() => {
      getEnv('BAR')
    }).toThrowError('Environment variable `BAR` is missing')
  })
})
