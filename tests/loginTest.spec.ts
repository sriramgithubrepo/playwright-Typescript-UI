import { test, expect } from '../fixtures/pomFixtures.ts'
import * as constants from './testData/constants.json';

test.beforeEach('Sauce demo launch page', async ({ loginPage }) => {
    await loginPage.navigateTo(process.env.url as string);
});

test('Sauce demo login success', async ({loginPage, page }) => {
    await loginPage.completeLogin(process.env.validUserName as string, process.env.validPassword as string);
    expect(page.url()).toContain('/inventory');
    console.log('Login Test 1');
});

test('Sauce demo login failure', async ({ loginPage,page }) => {
    await page.waitForTimeout(500);
    expect(await loginPage.getFailedLoginText(process.env.invalidUserName as string, process.env.validPassword as string)).toContain(constants.loginFailed);
    console.log('Login Test 2');
});