import { test , expect } from '@playwright/test';
import testData from '../../testcontext/testData.json';
// Ensure testData is an array
const testDataArray: Array<{
  url: string;
  userName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}> = Array.isArray(testData) ? testData : [testData];



testDataArray.forEach(data => {
  test(`fill form for ${data.userName}`, async ({ page }) => {
    console.log(data);
    await page.goto(data.url);
    await page.fill('#userName', data.userName);
    await page.fill("#userEmail", data.email);
    await page.fill('#currentAddress', data.currentAddress);
    await page.fill('#permanentAddress', data.permanentAddress);
    await expect(page.locator('#userName')).toHaveValue(data.userName);
    await expect(page.locator('#userEmail')).toHaveValue(data.email);
    await expect(page.locator('#currentAddress')).toHaveValue(data.currentAddress);
    await expect(page.locator('#permanentAddress')).toHaveValue(data.permanentAddress);
  });
});

// To run this file use the command npx playwright test tests/fixtures/testFixtures.spec.ts --headed
// To run a particular test use the command npx playwright test tests/fixtures/testFixtures.spec.ts --headed -g "fill form for john"