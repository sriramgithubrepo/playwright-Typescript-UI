import { test, expect } from '../fixtures/pomFixtures.ts';
import * as testData from './testData/sauceDemoTestData.json';
import * as constants from './testData/constants.json';

test.beforeEach('Sauce demo login and add item', async ({ loginPage,productPage }) => {
    await loginPage.navigateTo(process.env.url);
    await loginPage.completeLogin(process.env.validUserName, process.env.validPassword);
    await productPage.addItems(testData.itemsToAdd)
    await productPage.clickCartButton();
});

test('Verify user able to place an order', async ({ cartPage,checkoutInformationPage,overviewPage,orderCompletePage,page }) => {
    expect(await cartPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    expect(await overviewPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    await overviewPage.clickFinishButton();
    await page.waitForTimeout(1000);
    expect(await orderCompletePage.getOrderSuccessText()).toBe(constants.orderSuccessText);
});