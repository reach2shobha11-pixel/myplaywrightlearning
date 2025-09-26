import { test as base, expect } from '@playwright/test';

const test = base.extend<{ userName: string, email:string,currentAddress: string ,permanentAddress : string}>({
  userName: async ({}, use) => {
    // Setup: define a value
    await use('shobha');
    // Teardown: (optional) code after test
    console.log('Fixture teardown');
  },

  email:async({},use)=>{

    await use("Shobha@gmail.com");
    console.log('email Fixture teardown');

  },
  currentAddress : async({},use)=>{

    await use('123 Street Avenue,New york,USA');
    console.log('currentAddress Fixture teardown');

  },

  permanentAddress : async({},use)=>{

    await use('456 Street Avenue,New york,USA');
    console.log('permanentAddress Fixture teardown');
  }
});

test('use userName fixture', async ({ page, userName ,email,currentAddress,permanentAddress}) => {
  await page.goto('https://demoqa.com/text-box');
  await page.fill('#userName', userName);
  await page.fill("#userEmail",email);
  await page.fill('#currentAddress',currentAddress);
  await page.fill('#permanentAddress',permanentAddress);
  await expect(page.locator('#userName')).toHaveValue(userName);
  await expect(page.locator('#userEmail')).toHaveValue(email);
  await expect(page.locator('#currentAddress')).toHaveValue(currentAddress);
  await expect(page.locator('#permanentAddress')).toHaveValue(permanentAddress);

await page.screenshot({path : 'screenshot.png'  });
}

);