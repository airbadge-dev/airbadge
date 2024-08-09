export function redirect(status: number, location: string): Response {
  return new Response('Redirect', {
    status,
    headers: { location }
  })
}

export function error(status: number, message: string): Response {
  return new Response(message, { status })
}

export function json(data: any = {}): Response {
  return Response.json(data)
}
