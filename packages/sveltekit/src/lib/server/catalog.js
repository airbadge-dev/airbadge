import { stripe } from './stripe'

export function createCatalog() {
  return {
    async get(id) {
      if (!id) return null

      if (id.startsWith('prod_')) {
        const product = await stripe.products.retrieve(id)
        if (!product.default_price) return null

        id = product.default_price
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
