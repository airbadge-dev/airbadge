export default function handler({ url }: {
    url: any;
}, { user, plans, billing, options }: {
    user: any;
    plans: any;
    billing: any;
    options: any;
}): Promise<void>;
