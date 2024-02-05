import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

await db.user.create({
  data: {
    email: 'josh@test.com',
    name: 'Josh Nussbaum'
  }
})
