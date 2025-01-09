import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

//Product page class handles the locators and associated functions related to Product Page

export class ProductPage extends BasePage {
  private readonly sortButton: string;
  private readonly cartButton: Locator;
  private readonly allItemDescription: Locator;
  private readonly allItemPrice: Locator;
  private readonly cartCount:Locator;

  constructor(page: Page) {
    super(page);
    this.sortButton = 'select[data-test="product-sort-container"]';
    this.cartButton = page.locator('#shopping_cart_container');
    this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
    this.allItemPrice = page.locator('div[data-test="inventory-item-price"]');
    this.cartCount= page.locator('//span[contains(@class, "shopping_cart_badge")]');
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
    return this.page.locator(`//div[contains(@class, "inventory_item") and .//div[normalize-space(.)="${productName}"]]//button[text()="Add to cart"]`);
   }

   getRemovebuttonLocators(productName:string):Locator{
    return this.page.locator(`//div[contains(@class, "cart_item") and .//div[normalize-space(.)="${productName}"]]//button[text()="Remove"]`);
   }

  //Retrieves the descriptions of all items displayed
  async getAllItemDescription(): Promise<string[]> {
    return await this.getAllElementText(this.allItemDescription);
  }

   //Get the cart count
   async getCartCount() {
    return await this.getElementText(this.cartCount);
  }

  // returns visibility of cart count element
  async getCartCountVisibility() {
    return await (this.getElementVisibility(this.cartCount));
  }

  //Adds multiple items to the cart
  async addItems(itemsToAdd:string[]) {
    for(const item of itemsToAdd){
     const addtoCartButton= this.getAddtoCartLocators(item);
     await addtoCartButton.click();
    }
  }

   //Adds multiple items to the cart
   async removeItems(itemsToAdd:string[]) {
    for(const item of itemsToAdd){
     const removeCartButton= this.getRemovebuttonLocators(item);
     await removeCartButton.click();
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