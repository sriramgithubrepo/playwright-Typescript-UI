import { test, expect } from '../fixtures/pomFixtures.ts';
import { sortAndCompareStringArray, sortAndCompareNumberArray } from './helper/utils.ts';

test.beforeEach('Sauce demo login', async ({ loginPage }) => {
    await loginPage.navigateTo(process.env.url);
    await loginPage.completeLogin(process.env.validUserName, process.env.validPassword);
});

test('Verify product page default sorting order', async ({ productPage,page }) => {
    const allItemDesc = await productPage.getAllItemDescription();
    await page.waitForTimeout(1000);
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from A-Z', async ({ productPage }) => {
    await productPage.selectDropdown('za', 'value');
    await productPage.selectDropdown('az', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'ascending')).toBe(true);
});

test('Verify product page is sorted from Z-A', async ({ productPage }) => {
    await productPage.selectDropdown('za', 'value');
    const allItemDesc = await productPage.getAllItemDescription();
    expect(sortAndCompareStringArray(allItemDesc, 'descending')).toBe(true);
});

test('Verify product page is sorted from low-high', async ({ productPage }) => {
    await productPage.selectDropdown('lohi', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'ascending')).toBe(true);
});

test('Verify product page is sorted from high-low', async ({ productPage }) => {
    await productPage.selectDropdown('hilo', 'value');
    const allItemPrice = await productPage.getAllItemPrice();
    expect(sortAndCompareNumberArray(allItemPrice, 'descending')).toBe(true);
});