type Var = 'STRIPE_SECRET_KEY' | 'STRIPE_WEBHOOK_SECRET'

const env = new Map<Var, string>()

export function setEnv(name: Var, value: string) {
  env.set(name, value)
}

export function getEnv(name: Var): string {
  const value = env.get(name)

  if (!value) {
    throw new Error(`Environment variable \`${name}\` is missing`)
  }

  return value
}
