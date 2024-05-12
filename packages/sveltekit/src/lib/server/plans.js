export function createPlanList(plans) {
  return {
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
