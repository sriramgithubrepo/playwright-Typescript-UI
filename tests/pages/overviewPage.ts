import { Locator, Page } from '@playwright/test';
import BasePage from './basePage';

//Overview page class handles the locators and associated functions related to overview Page

export class OverviewPage extends BasePage {
    private readonly allItemDescription: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        super(page)
        this.allItemDescription = page.locator('div[data-test="inventory-item-name"]');
        this.finishButton = page.locator('#finish');
    }

    //Retrieves the descriptions of all item text
    async getAllItemDescription(): Promise<string[]> {
        return await this.getAllElementText(this.allItemDescription);
    }

    //Clicks on Finish button
    async clickFinishButton():Promise<void> {
        await this.clickElement(this.finishButton);
    }
}