import { expect, Locator, Page } from "@playwright/test";

export class SignUpPage {
  private page: Page;
  private passwordRequirement: String;
  private passwordField: Locator;
  private emailField: Locator;
  private submit: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passwordRequirement = '[data-test-id="password-requirement"]';
    this.passwordField = page.locator("#password");
    this.emailField = page.locator("#email");
    this.submit = page.locator('[data-testid="account-form-submit"]');
  }

  async getPasswordRequirements() {
    const passwordRequirements = await this.page.$$(
      '[data-test-id="password-requirement"]'
    );
    return passwordRequirements;
  }

  async goto() {
    await this.page.context().addCookies([
      {
        name: "notice_gdpr_prefs",
        value: "0:",
        domain: ".bt.com",
        path: "/",
      },
    ]);
    await this.page.goto("/sport/buy/monthly-pass/create-an-account");
  }

  async addEmail() {
    await this.emailField.type(`testing-${Date.now()}@testing.com`);
    await this.emailField.evaluate((e) => e.blur());
  }

  async addPassword(password: string) {
    await this.passwordField.type(password);
    await this.passwordField.evaluate((e) => e.blur());
  }

  async submitForm() {
    await this.submit.click();
  }
}
