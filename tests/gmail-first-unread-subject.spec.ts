import { test, expect } from '@playwright/test';

test('Gmail: Print subject of first unread email', async ({ page }) => {
  // Navigate to Gmail inbox
  await page.goto('https://mail.google.com/mail/u/0/#inbox');

  // Wait for the inbox to load (look for Compose button as a sign-in indicator)
  await page.waitForSelector('div[role="button"][gh="cm"], input[type="email"]', { timeout: 30000 });

  // If login is required, print a message and exit
  if (await page.locator('input[type="email"]').isVisible().catch(() => false)) {
    console.log('Login required. Please log in manually and rerun the test.');
    return;
  }

  // Wait for unread emails to appear (unread emails have 'zE' class)
  const unreadEmail = page.locator('tr.zE').first();
  await unreadEmail.waitFor({ timeout: 20000 });

  // Click the first unread email
  await unreadEmail.click();

  // Wait for the subject to be visible (subject is in h2 or h1 with 'hP' class)
  const subject = await page.waitForSelector('h2.hP, h1.hP', { timeout: 10000 });
  const subjectText = await subject.textContent();
  console.log('Subject of first unread email:', subjectText?.trim());
});
