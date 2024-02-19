export async function signIn(page, user) {
  await page.goto('/auth/signin')
  await page.getByLabel('Username').fill(user.email)
  await page.getByLabel('Password').fill('123456')
  await page.getByRole('button').click()

  const pre = await page.locator('pre')
  const json = await pre.innerHTML()
  const { session } = JSON.parse(json)

  return session
}
