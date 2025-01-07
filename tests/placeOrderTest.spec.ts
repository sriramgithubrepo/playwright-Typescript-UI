import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage.ts'
import { ProductPage } from './pages/productPage.ts';
import { CartPage } from './pages/cartPage.ts';
import { CheckoutInformationPage } from './pages/checkoutInformationPage.ts'; 
import { OverviewPage } from './pages/overviewPage.ts';
import { OrderCompletePage } from './pages/orderCompletePage.ts';
import * as testData from './testData/sauceDemoLoginTestData.json';
import * as constants from './testData/constants.json';

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutInformationPage:CheckoutInformationPage;
let overviewPage:OverviewPage;
let orderCompletePage:OrderCompletePage;

test.beforeEach('Sauce demo login and add item', async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutInformationPage =new CheckoutInformationPage(page);
    overviewPage = new OverviewPage(page);
    orderCompletePage= new OrderCompletePage(page)
    await loginPage.navigateTo(constants.url);
    await loginPage.completeLogin(testData.validUserName, testData.validPassword);
    await productPage.addItems(testData.itemsToAdd)
    await productPage.clickCartButton();
})

test('Verify user able to place an order', async ({ page }) => {
    expect(await cartPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    await cartPage.clickCheckoutButton();
    await checkoutInformationPage.fillDetailsAndProceed(testData.userDetails);
    expect(await overviewPage.getAllItemDescription()).toEqual(testData.itemsToAdd);
    await overviewPage.clickFinishButton();
    await page.waitForTimeout(1000);
    expect(await orderCompletePage.getOrderSuccessText()).toBe(constants.orderSuccessText);
})