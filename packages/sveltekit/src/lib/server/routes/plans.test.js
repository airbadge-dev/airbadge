import handler from './plans'

const state = {
  plans: {
    getAll() {
      return 'plans'
    }
  }
}

test('handler returns all plans', async () => {
  const response = handler(null, state)

  expect(response.status).toBe(200)
  expect(await response.json()).toEqual('plans')
})
