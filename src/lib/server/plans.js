export function createPlanList(plans) {
  return {
    getDefault() {
      return plans.find((plan) => plan.default)
    },

    getByPriceId(priceId) {
      return plans.find((plan) => plan.priceId == priceId)
    }
  }
}
