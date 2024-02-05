import { faker } from '@faker-js/faker'
import { db } from './db.js'

export async function reset() {
  await db.user.deleteMany()
}

export async function createUser(data = {}) {
  return db.user.create({
    data: {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      ...data
    }
  })
}
