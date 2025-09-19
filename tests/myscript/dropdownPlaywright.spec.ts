import { test, expect } from '@playwright/test';

const HOME_URL = 'https://demoqa.com/select-menu';

test('dropdown selection', async ({ page }) => {
  await page.goto(HOME_URL);

  // Select a value from the old style select menu
  await page.selectOption('#oldSelectMenu', '4'); // Select 'Yellow'
  const selectedValue = await page.locator('#oldSelectMenu').inputValue();
  expect(selectedValue).toBe('4');

  // Select a value from the multi-select drop-down
  await page.click('.css-2b097c-container'); // Click to open the multi-select
  await page.getByText('Green').click();
  await page.getByText('Blue').click();

  // Select a value from the standard select menu
  await page.selectOption('#cars', 'volvo');
  const carValue = await page.locator('#cars').inputValue();
  expect(carValue).toBe('volvo');
});