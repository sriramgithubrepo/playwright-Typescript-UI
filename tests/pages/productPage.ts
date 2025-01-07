import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

export class ProductPage extends BasePage {
  readonly page: Page;
  readonly sortButton: string;
  readonly cartButton: Locator;
  readonly allItemDescription: Locator;
  readonly allItemPrice: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.sortButton = 'select[data-test="product-sort-container"]';
    this.cartButton = page.locator('#shopping_cart_container');
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
  }

  //Clicks cart button
  async clickCartButton():Promise<void> {
    await this.clickElement(this.cartButton);
  }

  //Selects the option from the dropdown based on value or label
  async selectDropdown(textOrValue: string, optionToSelect: string):Promise<void> {
    await this.selectStaticDropdown(this.sortButton, textOrValue, optionToSelect);
  }

  //Retrieves the descriptions of all items displayed
  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }

  //Retrieves the price of all items displayed and converts to a Number array
  async getAllItemPrice(): Promise<number[]> {
    const priceTexts = await this.getAllElementText(this.allItemPrice);
    if (!priceTexts.length) throw new Error("Item prices not found");
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
    return prices;
  }
}