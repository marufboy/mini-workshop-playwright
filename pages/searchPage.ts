import { expect, type Locator, type Page } from "@playwright/test";

export class SearchPage {
  readonly searchField: Locator;
  readonly searchButton: Locator;
  readonly messageAlert: Locator

  constructor(page: Page) {
    this.searchField = page.getByPlaceholder("Search entire store here...");
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.messageAlert = page.getByRole('alert').locator('div')
  }

  async searchProduct(productName: string){
    await this.searchField.click()
    await this.searchField.fill(productName)
    await this.searchButton.click()
  }

  async getNotificationSuccessMessage() {
    await this.messageAlert.first().click();
  }
}
