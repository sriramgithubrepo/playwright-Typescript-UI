import { test, expect } from '../fixtures/pomFixtures.ts'
import * as constants from './testData/constants.json';

test.beforeEach('Sauce demo launch page', async ({ loginPage }) => {
    await loginPage.navigateTo(process.env.url);
});

test('Sauce demo login success', async ({loginPage, page }) => {
    await loginPage.completeLogin(process.env.validUserName, process.env.validPassword);
    expect(page.url()).toContain('/inventory');
});

test('Sauce demo login failure', async ({ loginPage,page }) => {
    await page.waitForTimeout(500);
    expect(await loginPage.getFailedLoginText(process.env.invalidUserName, process.env.validPassword)).toContain(constants.loginFailed);
});