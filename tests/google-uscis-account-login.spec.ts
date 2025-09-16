import { test, expect } from '@playwright/test';

test('Google search for uscis case status and click Account Login', async ({ page }) => {
  // Navigate to Google
  await page.goto('https://www.google.com');

  // Handle Google's consent dialog if present BEFORE entering value in search box
  const consentButton = page.locator('button:has-text("I agree"), button:has-text("Accept all"), div[role="none"] button:has-text("Accept")');
  if (await consentButton.first().isVisible({ timeout: 5000 }).catch(() => false)) {
    await consentButton.first().click();
  }

  // Wait for the search box to be visible
  const searchBox = await page.waitForSelector('input[name="q"]', { timeout: 15000 });
  await searchBox.fill('uscis case status');
  await searchBox.press('Enter');

  // Wait for results to load
  await page.waitForSelector('h3');

  // Click on the first result that contains "Account Login"
  const accountLoginLink = page.locator('text=Account Login').first();
  await accountLoginLink.click();

  // Optionally, verify navigation
  await page.waitForLoadState('domcontentloaded');
});
