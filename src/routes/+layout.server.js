export async function load({ locals }) {
  return {
    session: await locals.getSession()
  }
}
