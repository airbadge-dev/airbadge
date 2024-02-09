/** @typedef {typeof __propDef.props}  NonSubscriberProps */
/** @typedef {typeof __propDef.events}  NonSubscriberEvents */
/** @typedef {typeof __propDef.slots}  NonSubscriberSlots */
export default class NonSubscriber extends SvelteComponentTyped<{
    [x: string]: never;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type NonSubscriberProps = typeof __propDef.props;
export type NonSubscriberEvents = typeof __propDef.events;
export type NonSubscriberSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: never;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
