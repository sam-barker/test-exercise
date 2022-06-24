import { test, expect } from '@playwright/test';

enum Locators {
    PasswordRequirement = '[data-test-id="password-requirement"]',
    PasswordField = '#password',
    Submit = 'data-testid="account-form-submit"'
}

test.beforeEach(async ({ page }) => {
    await page.context().addCookies([
        {
            name: 'notice_gdpr_prefs',
            value: "0:",
            domain: ".bt.com",
            path: "/"
        }
    ])
    await page.goto('/sport/buy/monthly-pass/create-an-account')
})

test('Password requirements should not be fulfilled on start', async ({ page }) => {
    const passwordRequirements = await page.$$(Locators.PasswordRequirement)
    passwordRequirements.forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('false')
    })
})


