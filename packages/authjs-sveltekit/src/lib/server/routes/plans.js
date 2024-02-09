import { json } from '@sveltejs/kit'

export default function handler(_event, { plans }) {
  const records = plans.getAll()

  return json(records)
}
