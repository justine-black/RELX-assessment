import { expect, type Page, type Locator } from "@playwright/test";

export class Header {
  readonly page: Page;
  readonly logo: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".mc6t-logo");
    this.loginButton = page.getByRole("button", { name: "Sign in" });
  }
}
