import { test, expect } from '@playwright/test';

test('login and save auth state', async ({ page }) => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'yourUsername');
  await page.fill('#password', 'yourPassword');
  await page.click('#loginButton');
  await expect(page).toHaveURL('https://example.com/dashboard');

  // Save authentication state to a file
  await page.context().storageState({ path: 'auth.json' });
});



test.use({ storageState: 'auth.json' });

test('access dashboard with saved auth', async ({ page }) => {
  await page.goto('https://example.com/dashboard');
  await expect(page.locator('h1')).toHaveText('Welcome');
});