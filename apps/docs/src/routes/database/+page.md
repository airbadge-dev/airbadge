# Database Adapters

AirBadge uses Auth.js's database adapters.

It requires some extra fields to the `User` schema.

## Extra fields

| Name                 | Type   | Description                                                                  |
| :------------------- | :----- | :--------------------------------------------------------------------------- |
| `subscriptionId`     | String | The id of the Stripe subscription.                                           |
| `subscriptionStatus` | String | The status of the Stripe subscription.                                       |
| `customerId`         | String | The customerId of the user in Stripe.                                        |
| `priceId`            | String | The priceId of the subscription.                                             |
| `plan`               | String | The plan the user is on. Maps to [plan configuration](/configuration#plans). |

## Prisma

Follow the [Auth.js setup instructions](https://authjs.dev/reference/adapter/mongodb).

Then adjust the `User` schema in `prisma/schema.prisma`:

```prisma
model User {
  // existing fields, id, name etc...

  // add these fields
  customerId         String?
  subscriptionId     String?
  subscriptionStatus SubscriptionStatus?
  plan               String?
  priceId            String?
}

// add this enum
enum SubscriptionStatus {
  INCOMPLETE
  INCOMPLETE_EXPIRED
  TRIALING
  ACTIVE
  PAST_DUE
  CANCELED
  UNPAID
}
```

Then, run `prisma db push` to sync the database.

## Drizzle

TBD

## Mongo

The Mongo adapter works without any changes.
See [Auth.js setup instructions](https://authjs.dev/reference/adapter/mongodb).

## Others

All others should work by adding the [extra fields](#extra-fields).
