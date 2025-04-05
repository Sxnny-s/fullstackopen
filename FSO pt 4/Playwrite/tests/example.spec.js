// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
    
    // empty the db here
    // create a user for the backend here
    // ...

  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to application')

    await expect(locator).toBeVisible()
    await expect(page.getByText('Username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {
      // ...
    })

    test('fails with wrong credentails', async ({page}) => {
      //...
    })
  })



})