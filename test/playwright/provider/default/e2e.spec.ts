import { test, expect } from '@playwright/test'

test('Charites Live Preview with maplibre', async ({ page }) => {
  // collect errors on the page
  const pageErrors: Error[] = []
  page.on('pageerror', (exception) => pageErrors.push(exception))

  await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' })
  await page.waitForTimeout(1000)
  const title = await page.title()
  expect(title).toBe('Charites Live Preview')
  expect(pageErrors).toMatchObject([])
})
