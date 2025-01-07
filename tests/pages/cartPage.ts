import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

//Cart page class handles the locators and associated functions related to Cart Page

export class CartPage extends BasePage {
    private readonly allItemDescription: Locator;
    private readonly checkoutButton: Locator;
  
    constructor(page: Page) {
        super(page);
        this.allItemDescription=page.locator('div[data-test="inventory-item-name"]');
        this.checkoutButton=page.locator('#checkout');
    }
    //Retrieves descriptions of all items in the cart
    async getAllItemDescription(): Promise<string[]> {
        return await this.getAllElementText(this.allItemDescription);
      }

    //Clicks the checkout button in cart page
      async clickCheckoutButton():Promise<void> {
        await this.clickElement(this.checkoutButton);
      }

}