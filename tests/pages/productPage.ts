import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

//Product page class handles the locators and associated functions related to Product Page

export class ProductPage extends BasePage {
  private readonly sortButton: string;
  private readonly cartButton: Locator;
  private readonly allItemDescription: Locator;
  private readonly allItemPrice: Locator;

  constructor(page: Page) {
    super(page);
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

  getAddtoCartLocators(productName:string):Locator{
    return this.page.locator(`//div[contains(@class, "inventory_item") and .//div[normalize-space(.)="${productName}"]]//button[text()="Add to cart"]`)
   }

  //Retrieves the descriptions of all items displayed
  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }

  //Adds multiple items to the cart
  async addItems(itemsToAdd:string[]) {
    for(const item of itemsToAdd){
     const addtoCartButton= this.getAddtoCartLocators(item);
     await addtoCartButton.click();
    }
  }

  //Retrieves the price of all items displayed and converts to a Number array
  async getAllItemPrice(): Promise<number[]> {
    const priceTexts = await this.getAllElementText(this.allItemPrice);
    if (!priceTexts.length) throw new Error("Item prices not found");
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
    return prices;
  }
}