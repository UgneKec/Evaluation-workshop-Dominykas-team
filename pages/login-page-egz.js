import { expect } from "@playwright/test";

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('//input[@id="email"]');
        this.passwordInput = page.locator('//input[@id="password"]');
        this.loginButton = page.locator('//button[@id="loginButton"]');
        this.welcomeBanner = page.locator('//div[@id="cdk-overlay-1"]')
        this.cookieConsent = page.locator('//div[@aria-label="cookieconsent"]')
        this.languageNotification = page.locator('//snack-bar-container')
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
        await this.dismissWelcomeBanner();
        await this.loginButton.click();
    }

    async dismissWelcomeBanner() {
        if (await this.welcomeBanner.isVisible()){
            await this.page.locator('//button[@aria-label="Close Welcome Banner"]').click();
        }
    }

    async dismissCookieConsent() {
        if (await this.cookieConsent.isVisible()){
            await this.page.locator('//a[@aria-label="dismiss cookie message"]').click();
        }
    }
    async dismissLanguageNotification() {
        if (await this.languageNotification.isVisible()){

            //naudojant java script - isjungia notification
            await this.page.evaluate(() => {
                const snackBar = document.querySelector('snack-bar-container');
                if (snackBar) {
                    snackBar.remove(); 
                }
            });
        }
    }

    async verifyElementText(locator, text) {                     
        await expect(this.page.locator(locator)).toHaveText(text);   
    }

    async verifyElementVisibility(locator) {             
        await expect(this.page.locator(locator)).toBeVisible();   
    }
}