// import { test, expect } from "@playwright/test";
import { test, expect } from "../fixtures/test.fixture";
import { CheapFlightsLandingPage } from "../pages/cheap-flights-landing.page";

test.describe("Google Login", () => {
  test("can login with Google", async ({ landingPage, page }) => {
    //   const landingPage = new CheapFlightsLandingPage(page);
    const login = landingPage.login;

    await landingPage.navigate();
    await landingPage.header.loginButton.click();

    // Wait for the login modal to appear
    await expect(login.loginModal).toBeVisible();
    await expect(login.googleLoginButton).toBeVisible();
    await login.googleLoginButton.click();

    const googlePopup = await page.waitForEvent("popup");
    await googlePopup.waitForLoadState();
    await expect(googlePopup).toHaveURL(
      /^https:\/\/accounts.google.com\/v3\/signin/,
    );
  });
});

test.describe("Email Login", () => {
  test("can login with email", async ({ landingPage }) => {
    //   const landingPage = new CheapFlightsLandingPage(page);
    const login = landingPage.login;

    await landingPage.navigate();
    await landingPage.header.loginButton.click();

    // Wait for the login modal to appear
    await expect(login.loginModal).toBeVisible();
    await expect(login.emailLoginButton).toBeVisible();
    await login.emailLoginButton.click();

    // Check that the email login form is displayed
    await expect(login.emailInput).toBeVisible();
    await login.emailInput.pressSequentially("test@gmail.com");
    await expect(login.signInButton).toBeVisible();
    await login.signInButton.click();

    // Check that the OTP input is displayed
    await expect(login.otpInput).toBeVisible();
  });

  test("can redirect to sign up with exsting email without account", async ({
    landingPage,
    page,
  }) => {
    const login = landingPage.login;

    await landingPage.navigate();
    await landingPage.header.loginButton.click();

    await expect(login.loginModal).toBeVisible();
    await expect(login.emailLoginButton).toBeVisible();
    await login.emailLoginButton.click();

    await expect(login.emailInput).toBeVisible();
    await login.emailInput.pressSequentially("existing@gmail.com");
    await expect(login.signInButton).toBeVisible();
    await login.signInButton.click();

    await expect(login.signUpButton).toBeVisible();
  });

  test("cannot login with non-existing email", async ({
    landingPage,
    page,
  }) => {
    const login = landingPage.login;

    await landingPage.navigate();
    await landingPage.header.loginButton.click();

    await expect(login.loginModal).toBeVisible();
    await expect(login.emailLoginButton).toBeVisible();
    await login.emailLoginButton.click();

    await expect(login.emailInput).toBeVisible();
    await login.emailInput.pressSequentially("non-existing@test.com");
    await expect(login.signInButton).toBeVisible();
    await login.signInButton.click();

    await expect(
      page.locator("#validation-message-auth-email-input"),
    ).toBeVisible();
  });

  test("cannot login with non-email input", async ({ landingPage, page }) => {
    const login = landingPage.login;

    await landingPage.navigate();
    await landingPage.header.loginButton.click();

    await expect(login.loginModal).toBeVisible();
    await expect(login.emailLoginButton).toBeVisible();
    await login.emailLoginButton.click();

    await expect(login.emailInput).toBeVisible();
    await login.emailInput.pressSequentially("invalid-email");
    await expect(login.signInButton).toBeVisible();
    await login.signInButton.click();

    await expect(
      page.locator("#validation-message-auth-email-input"),
    ).toBeVisible();
  });
});
