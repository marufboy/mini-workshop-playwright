import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com")
    await expect(page.getByLabel('store logo')).toBeVisible()
})


test('User are able to navigate to the Homepage', async ({ page }) => {
    await expect(page.getByText('Home Page')).toBeVisible()
})

test('User are able to navigate to the Men Section', async ({ page }) => {
    await page.locator("//span[contains(text(), 'Men')]").click()
    await expect(page.locator("//h1/span")).toHaveText("Men")
})
