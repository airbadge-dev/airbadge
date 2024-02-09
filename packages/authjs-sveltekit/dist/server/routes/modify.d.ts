export default function handler({ url }: {
    url: any;
}, { user, billing }: {
    user: any;
    billing: any;
}): Promise<Response>;
