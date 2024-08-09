import { getStripe } from './stripe.js'
import type { Stripe } from 'stripe'

export interface Catalog {
  get(id: string): Promise<Stripe.Price | null>
}

export function createCatalog(): Catalog {
  const stripe = getStripe()

  return {
    async get(id) {
      if (!id) return null

      if (id.startsWith('prod_')) {
        const product = await stripe.products.retrieve(id)

        if (!product.default_price) return null

        if (typeof(product.default_price) == 'object') {
          id = product.default_price.id
        } else {
          id = product.default_price
        }
      }

      if (id.startsWith('price_')) {
        return await stripe.prices.retrieve(id)
      }

      const { data } = await stripe.prices.list({
        limit: 1,
        active: true,
        lookup_keys: [id],
      })

      return data.length ? data[0] : null
    }
  }
}
