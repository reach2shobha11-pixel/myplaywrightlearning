import {expect, test} from '@playwright/test';  

const HOME_URL = 'https://demoqa.com/';
test('textbox input', async ({page})=>{

    try {
        await page.goto(HOME_URL);
        await page.getByRole('heading', { name: 'Elements' }).click();
        
    try {
        await page.click('#item');
    } catch (error) {
        console.error('Could not click #item-20:', error);
        await page.screenshot({ path: 'error-item-20.png' }); // Optional: take screenshot
        throw error; // Rethrow to fail the test
    }
        await expect(page.getByRole('heading', { name: 'Text Box' })).toBeVisible();
        await expect(page).toHaveURL(`${HOME_URL}text-box`);

        await page.fill('#userName', 'shobha');
        await page.fill('#userEmail', 'shobha@example.com');
        await page.fill('#currentAddress', '123, main street, Lathrop, united states');
        await page.fill('#permanentAddress', '123, main street, Lathrop, united states');
        await page.click('#submit');
        const outputCount = await page.locator('//div[@id="output"]//p').count();
        expect(outputCount).toBe(4);
        const name = await page.locator('//div[@id="output"]//p').first().textContent();
        await expect(name).toContain('shobha');
    } catch (error) {
        console.error('Test failed with error:', error);
        throw error; // rethrow to mark the test as failed
    }

});


test('checkbox input', async ({page})=>{

await page.goto(`${HOME_URL}`);
await page.getByRole('heading',{name:'Elements'}).click();
await page.click('id=item-1');
await expect(page.getByRole('heading',{name:'Check Box'})).toBeVisible();
await expect(page).toHaveURL(`${HOME_URL}checkbox`);
const expandAll = page.locator('button[title="Expand all"]');
await expandAll.click();
const collapseAll = page.locator('button[title="Collapse all"]');
await collapseAll.click();
await expandAll.click();
const homeCheckbox = page.locator('label[for="tree-node-home"] span[class="rct-checkbox"]');
await homeCheckbox.click();
//verify if all checkboxes are selected
const checkedItems = await page.locator('span[class="rct-checkbox"]').count();
console.log("number of checked items are "+checkedItems);
await expect(checkedItems).toBe(17);
//deselect home checkbox
await homeCheckbox.click();
const uncheckedItems = await page.locator('span[class="rct-checkbox"] svg[class="rct-icon rct-icon-uncheck"]').count();
console.log("number of unchecked items are "+uncheckedItems);
await expect(uncheckedItems).toBe(17);

});