import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

// Login page class handles the locators and associated functions related to Login Page

export class LoginPage extends BasePage {
    readonly page: Page;
    private readonly userNameTextBox: Locator;
    private readonly passwordTextBox: Locator;
    private readonly loginButton: Locator;
    private readonly failedLogin:Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.userNameTextBox = page.locator('#user-name');
        this.passwordTextBox = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.failedLogin = page.locator('//h3[contains(@data-test,"error")]');
    }

    // Enters user name in the username textbox
    async enterUserName(username: string): Promise<void> {
        await this.fillText(this.userNameTextBox, username);
    }

    // Enters password in the password textbox
    async enterPassword(password: string): Promise<void> {
        await this.fillText(this.passwordTextBox, password);
    }

    // Clicks on the Login button
    async clickLogin(): Promise<void> {
        await this.clickElement(this.loginButton);
    }

    // Completes login process
    async completeLogin(username: string, password: string): Promise<void> {
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    // Login with invalid credentials
       async getFailedLoginText(username: string, password: string): Promise<String> {
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLogin();
        return await this.getElementText(this.failedLogin);
    }

}
