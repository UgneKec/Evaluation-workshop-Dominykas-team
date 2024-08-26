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
    await expect(
      this.page.locator('//span[text()="Provider Settings"]')
    ).toBeVisible();
  }

  async navigateToLunchEdit() {
    await page.locator('//a[.//span[text()="Lunch Editing"]]').click();
    await verifyElementVisibility(
      '//span[@style="text-transform: capitalize;" and text()="Lunch Editing"]'
    );
  }
  async enterNewProviderInfo() {
    await this.page
      .locator('//input[@name="Provider Name"]')
      .fill('testas1232');
    await this.page.locator('//input[@name="Provider Color"]').fill('Red');
    await this.page
      .locator(
        '//input[@aria-label="Price" and @name="Sriubos (Soups) category"]'
      )
      .fill('1');
    await this.page
      .locator(
        '//input[@aria-label="Selection Name" and @name="Sriubos (Soups) category"]'
      )
      .fill('wasd');
    await this.page
      .locator(
        '//input[@aria-label="Price" and @name="Pagrindiniai Patiekalai (Main Dishes) category"]'
      )
      .fill('1');

    await this.page
      .locator(
        '//input[@aria-label="Selection Name" and @name="Pagrindiniai Patiekalai (Main Dishes) category"]'
      )
      .fill('wasd');

    await this.page
      .locator('//div[@class="v-btn__content"]/span[text()="Save"]')
      .first()
      .click();
  }
}
