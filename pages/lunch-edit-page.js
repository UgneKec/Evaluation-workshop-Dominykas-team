import { expect } from '@playwright/test';

export class LunchEditPage {
  constructor(page) {
    this.page = page;
  }
  async navigateToProviderSettings() {
    this.page
      .locator(
        '//i[@aria-hidden="true" and @class="v-icon material-icons theme--dark" and text()="build"]'
      )
      .hover();
    this.page
      .locator(
        '//i[@aria-hidden="true" and @class="v-icon material-icons theme--dark" and text()="add"]'
      )
      .click();
  }

  async navigateToLunchEdit() {
    await page.locator('//a[.//span[text()="Lunch Editing"]]').click();
    await verifyElementVisibility(
      '//span[@style="text-transform: capitalize;" and text()="Lunch Editing"]'
    );
  }
}
