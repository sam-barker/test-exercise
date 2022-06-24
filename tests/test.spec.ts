import { test, expect } from '@playwright/test';
import { SignUpPage } from '../page-objects/sign-up'
import { YourDetailsPage } from '../page-objects/your-details'

test.beforeEach(async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.goto()
})

test('Password requirements should not be fulfilled on start', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    const passwordRequirements = await signUpPage.getPasswordRequirements()
    passwordRequirements.forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('false')
    })
})

test('Password which fails all three criteria', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.addPassword('a')

    const passwordRequirements = await signUpPage.getPasswordRequirements()
    passwordRequirements.forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('true')
    })
})

test('Password which satisfies only 8 characters', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.addPassword('aaaaaaaaaa')

    const passwordRequirements = await signUpPage.getPasswordRequirements()

    passwordRequirements.slice(0, 1).forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('false')
    })

    passwordRequirements.slice(1).forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('true')
    })
})

test('Password which satisfies only 1 number', async ({ page }) => {
    const passwordField = page.locator(Locators.PasswordField)
    await passwordField.type('1')
    await passwordField.evaluate(e => e.blur())

    const passwordRequirements = await signUpPage.getPasswordRequirements()

    passwordRequirements.slice(0, 2).forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('false')
    })

    passwordRequirements.slice(2).forEach(element => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('true')
    })
})

test('Password which satisfies only casing', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.addPassword('aA')

    const passwordRequirements = await signUpPage.getPasswordRequirements()

    passwordRequirements.forEach((element, index) => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual(index !== 1 ? 'true' : 'false')
    })
})

test('Password satisfies all cases', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.addPassword('Testing1029384756')

    const passwordRequirements = await signUpPage.getPasswordRequirements()

    passwordRequirements.forEach((element) => {
        expect(element.getAttribute('data-valid')).toEqual('false')
        expect(element.getAttribute('data-invalid')).toEqual('false')
    })
})

test('should advance to the next page on successful creation', async ({ page }) => {
    const signUpPage = new SignUpPage(page)

    await signUpPage.addEmail()
    await signUpPage.addPassword('Testing1234567890')
    await signUpPage.submitForm()

    const yourDetailsPage = new YourDetailsPage(page)
    await yourDetailsPage.waitForPageLoad()
})
