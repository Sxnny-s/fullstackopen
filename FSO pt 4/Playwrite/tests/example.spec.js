// @ts-check
const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {

  beforeEach(async ({ page, request }) => {
    // empty the db here
     await request.post('http://localhost:3003/api/testing/reset')
    
    // create a user for the backend here
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'COX',
        username: 'COX',
        password: 'COX'
      }
    })
    
    await page.goto('http://localhost:5173')
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

      await page.getByTestId('username').fill('COX')
      await page.getByTestId('password').fill('COX')

      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByRole('button', {name: 'Logout'})).toBeVisible()
    })

    test('fails with wrong credentails', async ({page}) => {
      //...

      await page.getByTestId('username').fill('wrong')
      await page.getByTestId('password').fill('wrong')

      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Wrong Credentials')).toBeVisible()
    })

  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      // ...

      await page.getByTestId('username').fill('COX')
      await page.getByTestId('password').fill('COX')

      await page.getByRole('button', {name: 'login'}).click()
    })
    
    test('a new blog can be created', async ({ page }) => {
      // ...
      await page.getByRole('button', {name: 'create new blog'}).click()

      await page.getByTestId('title').fill('test title')
      await page.getByTestId('author').fill('test author')
      await page.getByTestId('url').fill('test url')

      await page.getByTestId('submit').click()

      await expect(page.getByText('test title test author')).toBeVisible()
      
    })})

    describe('When blog Created' , () => {

      beforeEach(async ({page, request}) => {
        //second user created
        await request.post('http://localhost:3003/api/users', {
          data: {
            name: 'WISE',
            username: 'WISE',
            password: 'WISE'
          }
        })

        //login
        await page.getByTestId('username').fill('COX')
        await page.getByTestId('password').fill('COX')
  
        await page.getByRole('button', {name: 'login'}).click()

        await page.getByRole('button', {name: 'create new blog'}).click()

        // create blog
        await page.getByTestId('title').fill('test title')
        await page.getByTestId('author').fill('test author')
        await page.getByTestId('url').fill('test url')
  
        await page.getByTestId('submit').click()
      })

      test('can like blog', async ({page}) => {
        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'like'}).click()
        await expect(page.getByText('likes: 1')).toBeVisible()
      })
  
      test('can delete blog', async ({page}) => {
        await page.getByRole('button', {name: 'view'}).click()
        await page.getByRole('button', {name: 'Delete'}).click()

        const blog = page.locator('text=test title test author');

        await expect(blog).toHaveCount(0);
      
      })
  
      test('only the user who added the blog sees the blogs delete button', async ({page}) => {
        // log out
        await page.getByRole('button', {name: 'Logout'}).click()
        // log in different user
        await page.getByTestId('username').fill('WISE')
        await page.getByTestId('password').fill('WISE')
        await page.getByRole('button', {name: 'login'}).click()
        // view blog by differnt user
        await page.getByRole('button', {name: 'view'}).click()
        await expect(page.getByRole('button', {name: 'Delete'})).not.toBeVisible()
        
      })
      
      test('blogs are arranged in the order according to the likes', async ({page}) => {
        await page.pause()
        // create second blog
        await page.getByRole('button', {name: 'create new blog'}).click()

        await page.getByTestId('title').fill('test Second')
        await page.getByTestId('author').fill('test Second')
        await page.getByTestId('url').fill('test Second')
  
        await page.getByTestId('submit').click()

        // like the newest blog 

        const viewButtons = await page.getByRole('button', {name: 'view'}).all()

        await viewButtons[1].click()
        await page.getByRole('button', {name: 'like'}).click()

        const previews = await page.locator('.preview').all()

        await expect(previews[0]).toHaveText('test Second test Secondhide')

      })

    })
    
})