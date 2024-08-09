type Var = 'STRIPE_SECRET_KEY' | 'STRIPE_WEBHOOK_SECRET' | 'DOMAIN'

const env = new Map<Var, string>()

export function setEnv(vars: Record<Var, string>) {
  for (let name in vars) {
    const value = vars[name as Var]
    env.set(name as Var, value)
  }
}

export function getEnv(name: Var): string {
  const value = env.get(name)

  if (!value) {
    throw new Error(`Environment variable \`${name}\` is missing`)
  }

  return value
}

export function reset() {
  env.clear()
}
