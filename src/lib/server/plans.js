export function createPlans(plans) {
  return {
    getByPriceId(priceId) {
      return plans.find(plan => plan.priceId == priceId)
    }
  }
}
