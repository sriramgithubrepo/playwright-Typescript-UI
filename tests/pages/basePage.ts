import { Locator, Page } from '@playwright/test';

export default class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    // Naviagtes to specified url
    async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }

    // Clicks the specified element
    async clickElement(element: Locator): Promise<void> {
        await element.click();
    }

    // FIlls the specified element with the provided text

    async fillText(element: Locator, text: string): Promise<void> {
        await element.fill(text);
    }

    //  Retrieves the inner text of the specified element
    async getElementText(element: Locator): Promise<string> {
        return await element.innerText();
    }

    // Retrieves the inner text of all the matching elements
    async getAllElementText(element: Locator): Promise<string[]> {
        return await element.allInnerTexts();
    }

    // Selects an option from a static dropdown by value or label
    async selectStaticDropdown(element: string | Locator, valueToSelect: string, optionToSelect: string = 'value'): Promise<void> {
        // Convert string to Locator if necessary
        const dropdown = typeof element === 'string' ? this.page.locator(element) : element;

        if (optionToSelect === 'value') {
            await dropdown.selectOption({ value: valueToSelect });
        } else if (optionToSelect === 'text') {
            await dropdown.selectOption({ label: valueToSelect });
        }
    }

}