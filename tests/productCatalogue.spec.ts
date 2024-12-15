import { expect, test } from "@playwright/test";

import { SearchPage } from "../pages/searchPage";

test.describe("Product Catalogue Test Case", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://magento.softwaretestingboard.com");
    await expect(page.getByLabel("store logo")).toBeVisible();
  });

  test("User is able to see the product catalog when searching with a specific keyword without logging in", async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);
    const product: string = "jacket";
    await searchPage.searchProduct(product);
    await expect(
      page.getByText(`Related search terms ${product},`)
    ).toBeVisible();
    let productCatalogue = await page
      .locator("//li[@class='item product product-item']")
      .all();

    console.log("Number of product listed:", productCatalogue.length);

    expect(productCatalogue.length).toBeGreaterThan(0);
  });

  test("User is able to open detail product from catalog after searching without logging in", async ({
    page,
  }) => {
    const searchPage = new SearchPage(page);
    const product: string = "jacket";
    await searchPage.searchProduct(product);
    await expect(
      page.getByText(`Related search terms ${product},`)
    ).toBeVisible();
    let productCatalogue = await page.locator(
      "//li[@class='item product product-item']"
    );

    //open detail product
    await productCatalogue.first().click();
    await page
      .locator(
        "//div[@class='swatch-attribute size']//div[contains(@class, 'swatch-option')]"
      )
      .first()
      .click();
    await page
      .locator(
        "//div[@class='swatch-attribute color']//div[contains(@class, 'swatch-option')]"
      )
      .first()
      .click();
    await page.getByRole("button", { name: "Add to Cart" }).click();
    await searchPage.getNotificationSuccessMessage();
  });
});
