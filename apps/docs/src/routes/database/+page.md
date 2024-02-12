# Database Adapters

AirBadge uses Auth.js standard database adapters.

It requires some extra fields to the `User` schema:

| Name                 | Type   | Description                                                                  |
|:---------------------|:-------|:-----------------------------------------------------------------------------|
| `subscriptionId`     | String | The id of the Stripe subscription.                                           |
| `subscriptionStatus` | String | The status of the Stripe subscription.                                       |
| `customerId`         | String | The customerId of the user in Stripe.                                        |
| `priceId`            | String | The priceId of the subscription.                                             |
| `plan`               | String | The plan the user is on. Maps to [plan configuration](/configuration#plans). |

## Prisma

TBD

## Drizzle

TBD

## Mongo

TBD

## Others

TBD
