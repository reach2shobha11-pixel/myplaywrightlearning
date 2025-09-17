import {expect, test} from '@playwright/test';  

const HOME_URL = 'https://demoqa.com/';
test.only('textbox input', async ({page})=>{

    await page.goto(`${HOME_URL}`); 
    await page.getByRole('heading',{name:'Elements'}).click();
    //get count of left panel items
    const items = await page.locator('li').count();
    const ele = page.click('id=item-0');
   // await ele.waitFor({ state: 'visible', timeout: 5000 });
    await expect(page.getByRole('heading',{name:'Text Box'})).toBeVisible();
    //await ele.click();
    await expect(page).toHaveURL(`${HOME_URL}text-box`);

    //fill textboxes
    await page.fill('id=userName','shobha');
    await page.fill('id=userEmail','shobha@example.com');
    await page.fill('id=currentAddress','123, main street, Lathrop, united states');
    await page.fill('id=permanentAddress','123, main street, Lathrop, united states');
    await page.click('id=submit');
    const outputCount = await page.locator('//div[@id="output"]//p').count();
    expect(outputCount).toBe(4);
     const name = await page.locator('//div[@id="output"]//p').first().textContent();
   await expect(name).toEqual('shobha');
   const email =await page.locator('//div[@id="output"]//p').nth(1).textContent();
   await expect(email).toEqual('shobha@example.com');
   const currentAddress=await page.locator('//div[@id="output"]//p').nth(2).textContent();
   await expect(currentAddress).toEqual('123, main street, Lathrop, united states');
   const permanentAddress=await page.locator('//div[@id="output"]//p').nth(3).textContent();
   await expect(permanentAddress).toEqual('123, main street, Lathrop, united states');


});


test('checkbox input', async ({page})=>{
});