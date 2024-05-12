import { SvelteKitAuth } from '$lib'
import { PrismaClient } from '@prisma/client'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Credentials from '@auth/core/providers/credentials'
import { env } from '$env/dynamic/private'

const db = new PrismaClient()

export const handle = SvelteKitAuth({
  trustHost: true,
  adapter: new PrismaAdapter(db),
  session: {
    strategy: 'jwt'
  },
  providers: [
    Credentials({
      name: 'Password',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password', type: 'password' }
      },

      async authorize(credentials) {
        return db.user.findFirst({ where: { email: credentials.username } })
      }
    })
  ],

  pages: {
    checkout: {
      success: '/welcome'
    }
  }
})
