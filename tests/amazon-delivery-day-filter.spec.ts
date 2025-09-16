import { test, expect } from '@playwright/test';

test('Amazon filter by Delivery Day for women clothing', async ({ page }) => {
  // Navigate to Amazon
  await page.goto('https://www.amazon.com/');

  // Search for "women clothing"
  const searchBox = await page.waitForSelector('#twotabsearchtextbox', { timeout: 15000 });
  await searchBox.fill('women clothing');
  await searchBox.press('Enter');

  // Wait for the search results to appear
  await page.waitForSelector('div.s-main-slot');

  // Wait for the Delivery Day section to appear (more robust selector)
  const deliveryDaySection = await page.waitForSelector('text=Delivery Day', { timeout: 15000 });
  await deliveryDaySection.scrollIntoViewIfNeeded();

  // Select the first checkbox under Delivery Day (using page.locator)
  const deliveryDayCheckbox = page.locator('text=Delivery Day').locator('xpath=../../following-sibling::ul//input[@type="checkbox"]');
  await deliveryDayCheckbox.first().check();

  // Optionally, verify that the filter is applied (e.g., by checking for a filter tag)
});
