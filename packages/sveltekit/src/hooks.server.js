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
        const user = await db.user.findFirst({ where: { email: credentials.username } })
        console.log('authorized', { user })

        return user
      }
    })
  ],

  pages: {
    checkout: {
      success: '/welcome'
    }
  },

  // specify plans & pricing
  plans: [
    {
      id: 'basic',
      name: 'Basic',
      priceId: env.BASIC_PRICE_ID,
      price: 1000,
      default: true
    },
    {
      id: 'pro',
      name: 'Pro',
      priceId: env.PRO_PRICE_ID,
      price: 10000
    }
  ]
})
