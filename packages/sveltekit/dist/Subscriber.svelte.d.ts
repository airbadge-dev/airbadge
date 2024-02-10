/** @typedef {typeof __propDef.props}  SubscriberProps */
/** @typedef {typeof __propDef.events}  SubscriberEvents */
/** @typedef {typeof __propDef.slots}  SubscriberSlots */
export default class Subscriber extends SvelteComponentTyped<{
    active?: any;
    pastDue?: any;
    unpaid?: any;
    trialing?: any;
    canceled?: any;
    plan?: any;
    plans?: any;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type SubscriberProps = typeof __propDef.props;
export type SubscriberEvents = typeof __propDef.events;
export type SubscriberSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        active?: any;
        pastDue?: any;
        unpaid?: any;
        trialing?: any;
        canceled?: any;
        plan?: any;
        plans?: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
