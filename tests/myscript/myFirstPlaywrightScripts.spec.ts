import { test, expect } from '@playwright/test';
import { gotoAndVerifyHomePage } from '../testHelpers/gotoAndVerifyHomePage';

const HOME_URL = 'https://the-internet.herokuapp.com/';
test('test', async ({ page }) => {

    const items = await gotoAndVerifyHomePage(page, HOME_URL);



    for (let i = 0; i < items; i++) {
        const linkText = await page.locator('li').nth(i).textContent() ?? '';

        if (linkText === 'Dynamic Controls') {

            const dynamicControl = page.getByRole('link', { name: 'Dynamic Controls' });
            await dynamicControl.scrollIntoViewIfNeeded();
            await dynamicControl.click();

            await expect(page).toHaveURL(`${HOME_URL}dynamic_controls`);
            await expect(page.getByRole('heading', { name: 'Dynamic Controls' })).toContainText('Dynamic Controls');
            await expect(page.locator('p')).toContainText('This example demonstrates when elements (e.g., checkbox, input field, etc.) are changed asynchronously.');
            await expect(page.getByRole('button', { name: 'Remove' })).toContainText('Remove');
            await page.locator('input[type="checkbox"]').click();
            await expect(page.locator('input[type="checkbox"]')).toBeChecked();


            break;
        }
    }


});


test('verify javascript links', async ({ page }) => {


    const items = await gotoAndVerifyHomePage(page, HOME_URL);


    for (let i = 0; i < items; i++) {


        const linkText = await page.locator('li').nth(i).textContent() ?? '';

        if (linkText === 'JavaScript Alerts') {

            const scriptAlert = page.getByRole('link', { name: 'JavaScript Alerts' });
            await scriptAlert.scrollIntoViewIfNeeded();
            await scriptAlert.click();

            await expect(page).toHaveURL(`${HOME_URL}javascript_alerts`);
            await expect(page.getByRole('heading', { name: 'JavaScript Alerts' })).toContainText('JavaScript Alerts');

            //await expect(page.locator('p')).toContainText('Here are some examples of different JavaScript alerts which can be troublesome for automation');
            const ite = await page.locator('li').count();
            await expect(ite).toBe(3);

            for (let i = 0; i < ite; i++) {

                await expect(page.locator('button').nth(i)).toBeVisible();
                await expect(page.locator('button').nth(i)).toBeEnabled();
                // Explicitly wait for the button to be visible before clicking
                await page.locator('button').nth(i).waitFor({ state: 'visible', timeout: 10000 });
                console.log("button text is " + await page.locator('button').nth(i).textContent());
                await page.locator('button').nth(i).click();
                // Listen for dialog and accept it
                page.once('dialog', async dialog => {
                    await dialog.accept();
                });

            }



        }
        break;
    }

});

test('verify checkboxes', async ({ page }) => {


    const items = await gotoAndVerifyHomePage(page, HOME_URL);


    for (let i = 0; i < items; i++) {


        const linkText = await page.locator('li').nth(i).textContent() ?? '';

        if (linkText === 'Checkboxes') {

            const scriptAlert = page.getByRole('link', { name: 'Checkboxes' });
            await scriptAlert.scrollIntoViewIfNeeded();
            await scriptAlert.click();

            await expect(page).toHaveURL(`${HOME_URL}checkboxes`);
            await expect(page.getByRole('heading', { name: 'Checkboxes' })).toContainText('Checkboxes');

            //await expect(page.locator('p')).toContainText('Here are some examples of different JavaScript alerts which can be troublesome for automation');
            const ite = await page.locator('input[type="checkbox"]').count();
            await expect(ite).toBe(2);

            for (let i = 0; i < ite; i++) {

                await expect(page.locator('input[type="checkbox"]').nth(i)).toBeVisible();
                await expect(page.locator('input[type="checkbox"]').nth(i)).toBeEnabled();
                // Explicitly wait for the button to be visible before clicking
                await page.locator('input[type="checkbox"]').nth(i).waitFor({ state: 'visible', timeout: 10000 });
                //console.log("button text is " + await page.locator('button').nth(i).textContent());
                await expect(page.locator('input[type="checkbox"]').nth(i)).not.toBeChecked();
                await page.locator('input[type="checkbox"]').nth(i).click();
                await expect(page.locator('input[type="checkbox"]').nth(i)).toBeChecked();


            }

            await expect(page.locator('input[type="checkbox"]')).toBeChecked();



        }
        break;
    }

});

