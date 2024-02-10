export function nonSubscriber(handler: any): (event: any) => Promise<any>;
export function subscriber(handler: any): (event: any) => Promise<any>;
export namespace subscriber {
    function active(handler: any): (event: any) => Promise<any>;
    function pastDue(handler: any): (event: any) => Promise<any>;
    function unpaid(handler: any): (event: any) => Promise<any>;
    function trialing(handler: any): (event: any) => Promise<any>;
    function canceled(handler: any): (event: any) => Promise<any>;
    function plan(plan: any, handler: any): (event: any) => Promise<any>;
    function plans(plans: any, handler: any): (event: any) => Promise<any>;
}
