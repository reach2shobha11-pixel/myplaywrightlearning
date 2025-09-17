import { Page, expect } from '@playwright/test';

export async function gotoAndVerifyHomePage(page: Page, HOME_URL: string): Promise<number> {
    await page.goto(`${HOME_URL}`);
    await expect(page.locator('h1')).toHaveText('Welcome to the-internet');
    await expect(page.locator('h2')).toHaveText('Available Examples ');
    const items = await page.locator('li').count();
    await expect(items).toBe(44);
    return items;
}
