import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page.js';

const URL = 'https://lunch.devbstaging.com/login-password';
let loginPage;

test.describe('Lunch App', () => { 

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(URL, 'Lunch App');
    await loginPage.login('ugne.kecioryte@sft.com', 'student694');
  });

  test.describe('When I open Lunch app as a user', () => {

    test('Should find weekdays tabs visible and active', async () => {
      // Verify visibility and active state of weekday tabs
      const weekdayTabs = await loginPage.page.$$('.v-list__tile__title span');
      for (const tab of weekdayTabs) {
        const isVisible = await tab.isVisible();
        const isActive = await tab.evaluate(el => el.style.textDecoration !== 'line-through');
        await expect(isVisible).toBe(true);
        await expect(isActive).toBe(true);
      }
    });

    test('Should find and click on Dom team supplier', async () => {
        // Click on the Friday tab to reveal suppliers
        const fridayTabSelector = 'text=Friday'; // Using text selector for Friday
        await loginPage.page.locator(fridayTabSelector).click();
  
        // Use XPath to find the "Dom team" supplier
        const domTeamXPath = '//div[contains(@class, "v-list__tile__title")]/span[text()="Dom team"]';
        const domTeamSupplier = loginPage.page.locator(domTeamXPath);
  
        // Wait for the supplier to be visible
        await domTeamSupplier.waitFor({ state: 'visible' });
  
        // Click on the "Dom team" supplier
        await domTeamSupplier.click();    

        loginPage.verifyElementVisibility('//div[contains(@class, "dish-card") and .//div[text()="Šaltibarščiai"]]');
      });

    test('Should be able to order an item', async () => {
        // Click on the Friday tab to reveal suppliers
        const fridayTabSelector = 'text=Friday';
        await loginPage.page.locator(fridayTabSelector).click();

        // Use XPath to find the "Dom team" supplier
        const domTeamXPath = '//div[contains(@class, "v-list__tile__title")]/span[text()="Dom team"]';
        const domTeamSupplier = loginPage.page.locator(domTeamXPath);
        // Click on the "Dom team" supplier
        await domTeamSupplier.click();   

        // Use XPath to find the first dish card by the name "Šaltibarščiai"
        const dishCardXPath = '//div[contains(@class, "dish-card") and .//div[text()="Šaltibarščiai"]]';
        const dishCard = loginPage.page.locator(dishCardXPath);

        // Wait for the dish card to be visible and click on it
        await dishCard.waitFor({ state: 'visible' });
        await dishCard.click();

        // Use XPath to find the order button that appears after clicking the dish card
        const orderButtonXPath = '//button[contains(@class, "orders-list-button")]/div/span[text()="1.00 €"]';
        const orderButton = loginPage.page.locator(orderButtonXPath);

        // Wait for the order button to be visible
        await orderButton.waitFor({ state: 'visible' });

        // Click on the order button
        await orderButton.click();

        // Assert that the chip with "Šaltibarščiai" appears
        const chipXPath = '//span[contains(@class, "v-chip__content") and text()="Šaltibarščiai"]';
        const chip = loginPage.page.locator(chipXPath);

        // Wait for the chip to be visible
        await chip.waitFor({ state: 'visible' });

        // Verify the chip is visible
        const isChipVisible = await chip.isVisible();
        await expect(isChipVisible).toBe(true); // Assert that the chip is visible  
      
    });

  });
});