// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const IMAGE_URL_PREFIX = 'https://cataas.com/cat/says'
const title = 'FETCH DATA'

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const appTitle = await page.getByTestId('app-title').textContent()
  await expect(appTitle).toEqual(title)
})

test('has random fact and image', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const text = await page.getByRole('paragraph')
  const image = await page.getByRole('img')

  const textContent = await text.textContent()
  const imageSrc = await image.getAttribute('src')

  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imageSrc?.startsWith(IMAGE_URL_PREFIX)).toBeTruthy()
})

test.only('image changes when click button', async ({ page }) => {
  await page.goto(LOCALHOST_URL)

  const imageSrcBefore = await page.getByRole('img').getAttribute('src')

  await page.getByRole('button').click()
  await page.waitForTimeout(2000)

  const imageSrcAfter = await page.getByRole('img').getAttribute('src')

  await expect(imageSrcBefore).not.toEqual(imageSrcAfter)
})
