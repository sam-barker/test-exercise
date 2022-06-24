import { Locator, Page } from "@playwright/test";

export class YourDetailsPage {
  private page: Page;
  private submit: Locator;
  private header: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private dobDay: Locator;
  private dobMonth: Locator;
  private dobYear: Locator;
  private maidenName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.locator("p", { hasText: "Step 2 of 4" });
    this.submit = page.locator('[data-testid="personal-details-form-submit"]');
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.dobDay = page.locator("#dobDay");
    this.dobMonth = page.locator("#dobMonth");
    this.dobYear = page.locator("#dobYear");
    this.maidenName = page.locator("#security");
  }

  get detailsHeader() {
    return this.header;
  }

  async fillInRandomDetails() {
    await this.firstName.type("Test");
    await this.lastName.type("Testy");
    await this.dobDay.type("1");
    await this.dobMonth.type("1");
    await this.dobYear.type("1980");
    await this.maidenName.type("Testmaidenname");
  }

  async submitForm() {
    await this.submit.click();
  }
}
