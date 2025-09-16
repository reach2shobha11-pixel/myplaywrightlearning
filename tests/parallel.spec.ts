import { test, expect } from '@playwright/test';

test("ex1", async ({ page }) => {


    console.log("i am in ex1");
   await new Promise(res => setTimeout(res, 3000));

    console.log("ex1 done");


})


test("ex2", async ({ page }) => {

 console.log("i am in ex2");
    await new Promise(res => setTimeout(res, 3000));

    console.log("ex2 done")
})



test("ex3", async ({ page }) => {


console.log("i am in ex3");
    await new Promise(res => setTimeout(res, 3000));

    console.log("ex3 done");

})




