export function redirect(status, location) {
  return new Response('Redirect', {
    status,
    headers: { location }
  })
}

export function error(status, message) {
  return new Response(message, { status })
}

export function json(data={}) {
  return Response.json(data)
}
