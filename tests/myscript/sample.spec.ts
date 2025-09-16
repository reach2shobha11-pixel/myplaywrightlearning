import { test, expect } from '@playwright/test';
import { loginpage } from '../../e2e/pages/loginpage';


test('test', async ({ page }) => {

    const loginPage = new loginpage(page);

    await page.goto('https://the-internet.herokuapp.com');
    await loginPage.enterUsername('chinnu');
    await loginPage.enterPassword('Chinnu@123');
    await loginPage.clickOnLoginButton();

    await expect(page).toHaveURL(/.*dashboard/, { timeout: 10000 });
    await expect(page).toHaveTitle(/.*Dashboard - Heroku/, { timeout: 10000 });

}, 20000); // Set test timeout to 20 seconds
