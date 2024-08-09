# Deployment

This guide will walk you through setting up hosting with [Vercel](https://vercel.com) and [GitHub](https://github.com).

Note that AirBadge works with almost any hosting provider, including [Fly](https://fly.io), [Railway](https://railway.app), [Netlify](https://netlify.com), [Docker](https://docker.com), and many more.

## Before you start

Here's what you'll need:

- A [Stripe account](https://dashboard.stripe.com/register). It's free to create.
- A [Vercel account](https://vercel.com/signup). There's a free plan.
- A database. Create a free one using [Neon](https://pg.new) or [Vercel](https://vercel.com/docs/storage/vercel-postgres).
- OAuth credentials (optional). See [Auth.js Instructions](https://authjs.dev/guides/configuring-oauth-providers).

## Create a database

The production database can be migrated via your local machine. Just specify your production `DATABASE_URL` on the command line:

```bash
DATABASE_URL=... pnpm prisma db push
```

## Setup OAuth Credentials

This step is optional and only required if you are using OAuth.

See [Auth.js's Guide](https://authjs.dev/getting-started/authentication/oauth) for more information about setting up OAuth providers.

## Setup hosting

The easiest way to set up hosting with Vercel is via a GitHub connection.

1. Create a [new project](https://vercel.com/new).
2. Import a GitHub repo.
3. Setup environment variables (detailed below).

### Environment Variables

Select the project in Vercel, and go to Settings -> Environment Variables.

Then you'll need the following variables:

- `DOMAIN`: The base url of your app. For example: `https://example.tld`
- `DATABASE_URL`: The URL to the database. For example: `postgresql://user:password@host:5432/dbname?schema=public`.
- `STRIPE_SECRET_KEY`: Your secret Stripe key. Starts with `sk_prod_...`. Can be found in the Stripe Dashboard under [Developers -> API Keys](https://dashboard.stripe.com/apikeys)
- `STRIPE_WEBHOOK_SECRET`: 
- `AUTH_SECRET`: Generate it with `openssl rand -base64 33`
- `AUTH_*`: OAuth provider credentials. For example, GitHub would need `AUTH_GITHUB_ID` & `AUTH_GITHUB_SECRET`.

## Deploy

Now anytime you push code to GitHub, it will automatically be deployed to Vercel.
