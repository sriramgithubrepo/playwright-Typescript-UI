import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

//Order complete page class handles the locators and associated functions related to order complete Page

export class OrderCompletePage extends BasePage {
    private readonly orderSuccessText: Locator;

    constructor(page: Page) {
        super(page);
        this.orderSuccessText = page.locator('h2[data-test="complete-header"]');
    }

    //Retrieves the success message text
    async getOrderSuccessText():Promise<string> {
        return await this.getElementText(this.orderSuccessText);
    }
}