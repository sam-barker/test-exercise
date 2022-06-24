import { Locator, Page } from '@playwright/test'

export class BillingPage {
    private page: Page
    private header: Locator

    constructor(page: Page) {
        this.page = page
        this.header = page.locator('h1', { hasText: 'Billing address' })
    }

    get billingAddressHeader() {
        return this.header
    }
}