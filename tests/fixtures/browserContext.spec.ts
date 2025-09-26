import { test, expect } from '@playwright/test';

test('handle window popup', async ({ page, context }) => {
  await page.goto('https://demoqa.com/browser-windows');

  // Listen for the new page (popup)
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    await page.click('#messageWindowButton') // This button opens a new window
  ]);

  // Interact with the new window/tab
  await newPage.waitForLoadState();
  expect(await newPage.textContent('body')).toContain('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
  await newPage.close();
});