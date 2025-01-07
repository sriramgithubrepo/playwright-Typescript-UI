import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import * as testData from './testData/sauceDemoLoginTestData.json';

let loginPage: LoginPage;

test.beforeEach('Sauce demo launch page', async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateTo('https://www.saucedemo.com/');
})

test('Sauce demo login success', async ({ page }) => {
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
    expect(page.url()).toContain('/inventory');
})

test('Sauce demo login failure', async ({ }) => {
    expect(await loginPage.getFailedLoginText(testData.invalidUserName, testData.validPassword)).toContain('Username and password do not match');
})