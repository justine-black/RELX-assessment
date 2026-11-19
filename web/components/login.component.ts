import { type Page, type Locator } from "@playwright/test";

export class Login {
  readonly page: Page;
  readonly loginModal: Locator;
  readonly googleLoginButton: Locator;
  readonly emailLoginButton: Locator;
  readonly emailInput: Locator;
  readonly signInButton: Locator;
  readonly otpInput: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginModal = page.locator('//div[contains(@class, "unified-login")]');
    this.googleLoginButton = page.getByRole("button", { name: "Google" });
    this.emailLoginButton = page.getByRole("button", {
      name: "Continue with email",
    });

    this.emailInput = page.getByRole("textbox", { name: "Enter email" });
    this.signInButton = page
      .getByRole("dialog", { name: "Sign in or create an account" })
      .getByRole("button", { name: "Sign in" });
    this.otpInput = page
      .locator("div")
      .filter({ hasText: /^Verification code$/ });

    this.signUpButton = page.getByRole("button", {
      name: "Create your account",
    });
  }
}
