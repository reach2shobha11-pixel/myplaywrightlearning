import { Page } from "playwright-core";

export class loginpage {
    username: any;
    password: any;
    loginbutton: any;
    page: Page;

    constructor(page: Page)
    {

        this.page = page;
    this.username = page.locator('input[name="username"]');

    this.password = page.locator('input[name="password"]');
    this.loginbutton = page.locator('button[type="submit"]');
    
}

async navigateToUrl(url: string) {






}

async enterUsername(username: string) {

    await this.username.waitForFill(username);
    await this.username.fill(username);
}

    async enterPassword(password: string) {

    await this.password.waitForFill(password);
    await this.password.fill(password);
}

async clickOnLoginButton() {

    await this.loginbutton.click();
}

}
