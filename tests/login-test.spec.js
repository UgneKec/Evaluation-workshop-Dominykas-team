import { test } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { LunchEditPage } from '../pages/lunch-edit-page';

const URL = 'https://lunch.devbstaging.com/login-password';

test.describe('Lunch App', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    // Initialize the loginPage before each test
    loginPage = new LoginPage(page);
    await loginPage.goto(URL, 'Lunch App');
  });

  test.describe('When I visit the login page', () => {
    test('Should have the email and password fields', async () => {
      await loginPage.verifyElementVisibility(
        '//input[@aria-label="Email" and @name="email" and @type="text"]'
      );
      await loginPage.verifyElementVisibility(
        '//input[@aria-label="Password" and @name="password" and @type="password"]'
      );
    });
  });
  test.describe('When I login with user valid credentials', () => {
    test('Should navigate to the dashboard', async ({ page }) => {
      await loginPage.login('matas.vazbys@sft.com', 'student693');
      await loginPage.verifyElementVisibility(
        '//div[@class="v-subheader theme--dark" and text()="Matas Vazbys"]'
      );
      await loginPage.verifyElementVisibility(
        '//div[@class="v-card__title v-card__title--primary"]'
      );
    });
  });

  test.describe('When I login with admin valid credentials', () => {
    let lunchEditPage;
    test.beforeEach(async ({ page }) => {
      lunchEditPage = new LunchEditPage(page);
      await loginPage.login('admin6@sft.com', 'admin919');
    });
    test('Should navigate to the admin dashboard', async ({ page }) => {
      await loginPage.verifyElementVisibility(
        '//div[@class="v-subheader theme--dark" and text()="Admin 6"]'
      );
      const locator = page.locator(
        '//div[text()="Select appropriate rating and optionally write a comment."]'
      );
      const isVisible = await locator.isVisible();

      if (isVisible) {
        await loginPage.closeRateLunch();
      }
      await loginPage.verifyElementVisibility(
        '//div[@class="v-card__title v-card__title--primary"]'
      );
    });
    test('Should navigate to Lunch Editing page', async ({ page }) => {
      await page.locator('//a[.//span[text()="Lunch Editing"]]').click();
      await loginPage.verifyElementVisibility(
        '//span[@style="text-transform: capitalize;" and text()="Lunch Editing"]'
      );
    });
    test('Add a new provider', async ({ page }) => {
      await page.locator('//a[.//span[text()="Lunch Editing"]]').click();
      await loginPage.verifyElementVisibility(
        '//span[@style="text-transform: capitalize;" and text()="Lunch Editing"]'
      );
      await lunchEditPage.navigateToProviderSettings();
      await lunchEditPage.enterNewProviderInfo();
    });
  });
});
