import { test, expect } from '@playwright/test';

test("seq1", async ({ page }) => {


    console.log("i am in seq1");
   await new Promise(res => setTimeout(res, 3000));

    console.log("seq1 done");


})


test("seq2", async ({ page }) => {

 console.log("i am in seq2");
    await new Promise(res => setTimeout(res, 3000));

    console.log("seq2 done")
})



test("seq3", async ({ page }) => {


console.log("i am in seq3");
    await new Promise(res => setTimeout(res, 3000));

    console.log("seq3 done");

})




