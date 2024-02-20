export function redirect(status, location) {
  return new Response('Redirect', {
    status,
    headers: { location }
  })
}
