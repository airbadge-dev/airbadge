export const routes: {
    '/billing/checkout': {
        method: string;
        handler: typeof checkout;
    };
    '/billing/checkout/complete': {
        method: string;
        handler: typeof checkoutComplete;
    };
    '/billing/portal': {
        method: string;
        handler: typeof portal;
    };
    '/billing/modify': {
        method: string;
        handler: typeof modify;
    };
    '/billing/cancel': {
        method: string;
        handler: typeof cancel;
    };
    '/billing/webhooks': {
        method: string;
        handler: typeof webhooks;
    };
    '/billing/plans': {
        method: string;
        handler: typeof plans;
    };
};
import checkout from './checkout';
import checkoutComplete from './checkoutComplete';
import portal from './portal';
import modify from './modify';
import cancel from './cancel';
import webhooks from './webhooks';
import plans from './plans';
