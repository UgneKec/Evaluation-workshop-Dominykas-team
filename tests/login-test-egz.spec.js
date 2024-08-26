import { test } from "@playwright/test";
import { LoginPage } from "../pages/login-page-egz";

const URL = 'https://juice-shop-ugnekec-12345.onrender.com/';
let loginPage;

test.describe("Login Page", () => {
  // Before each test, navigate to the login page
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto(URL + '#/login', "OWASP Juice Shop");
    await loginPage.dismissWelcomeBanner();
  });

  test.describe("When I visit the login page", () => {
    test("Should display the correct heading", async () => {
      await loginPage.verifyElementText('//h1[text()="Login"]', "Login");
    });
    
    test("Should have the email and password fields", async () => {
      await loginPage.verifyElementVisibility('//input[@id="email"]');
      await loginPage.verifyElementVisibility('//input[@id="password"]');
    });
  });

  test.describe("When I login with valid credentials", () => {
    test("Should navigate to the dashboard", async () => {
      await loginPage.login("admin@juice-sh.op", "admin123");
      await loginPage.verifyUrl(URL + "#/search");
    });
  });

  test.describe("When I login with invalid credentials", () => {
    test("Should display an error message", async ({ page }) => {
      await loginPage.login("invalidUser", "invalidPassword");      
      await loginPage.verifyElementVisibility("//div[@class='error ng-star-inserted']");
      await loginPage.verifyElementText("//div[@class='error ng-star-inserted']", "Invalid email or password.")      
    });
  });
});
