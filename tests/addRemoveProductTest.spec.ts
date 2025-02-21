import { test, expect } from '../fixtures/pomFixtures.ts';
import * as testData from './testData/sauceDemoTestData.json';

test('Verify user can add and then remove product ', async ({ loginPage,productPage}) => {
    await loginPage.navigateTo(process.env.url as string);
    await loginPage.completeLogin(process.env.validUserName as string, process.env.validPassword as string);
    await productPage.addItems(testData.itemsToAdd);
    expect(await productPage.getCartCount()).toEqual(testData.itemsToAdd.length.toString());
    await productPage.clickCartButton();
    await productPage.removeItems(testData.itemsToAdd);
   expect(await productPage.getCartCountVisibility()).toBeFalsy();
   console.log('Add and remove Test');
});