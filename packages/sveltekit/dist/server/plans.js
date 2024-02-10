export function createPlanList(plans) {
  return {
    getAll() {
      return plans
    },

    getDefault() {
      return plans.find((plan) => plan.default)
    },

    getById(id) {
      return plans.find((plan) => plan.id == id)
    },

    getByPriceId(priceId) {
      return plans.find((plan) => plan.priceId == priceId)
    }
  }
}
