export function createBillingService(adapter: any, plans: any, urls: any): {
    createSubscription(user: any, plan: any): Promise<void>;
    createCheckout(user: any, plan: any): Promise<any>;
    createPortalSession(user: any): Promise<any>;
    syncCheckout(sessionId: any): Promise<void>;
    syncSubscription(subscriptionId: any): Promise<void>;
    cancelSubscription(user: any): Promise<any>;
    updateSubscription(user: any, planId: any): Promise<any>;
};
export const stripe: any;
