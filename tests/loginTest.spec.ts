import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import * as constants from './testData/constants.json';

let loginPage: LoginPage;

test.beforeEach('Sauce demo launch page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo(process.env.url);
})

test('Sauce demo login success', async ({ page }) => {
    await loginPage.completeLogin(process.env.validUserName, process.env.validPassword);
    expect(page.url()).toContain('/inventory');
})

test('Sauce demo login failure', async ({ page }) => {
    await page.waitForTimeout(500);
    expect(await loginPage.getFailedLoginText(process.env.invalidUserName, process.env.validPassword)).toContain(constants.loginFailed);
})