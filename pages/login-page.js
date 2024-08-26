import { expect } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator(
      '//input[@aria-label="Email" and @name="email" and @type="text"]'
    );
    this.passwordInput = page.locator(
      '//input[@aria-label="Password" and @name="password" and @type="password"]'
    );
    this.loginButton = page.locator('.v-btn');
  }

  async goto(url, pageTitle) {
    await this.page.goto(url);
    await expect(this.page).toHaveTitle(pageTitle);
  }

  async verifyUrl(url) {
    await expect(this.page).toHaveURL(url);
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyElementText(locator, text) {
    await expect(this.page.locator(locator)).toHaveText(text);
  }

  async verifyElementVisibility(locator) {
    await expect(this.page.locator(locator)).toBeVisible();
  }

  async closeRateLunch() {
    await this.locator('.v-btn__content').locator('span').click();
  }
}
