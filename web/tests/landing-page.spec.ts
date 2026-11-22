// import { test, expect } from "@playwright/test";
import { test, expect } from "../fixtures/test.fixture";
import { CheapFlightsLandingPage } from "../pages/cheap-flights-landing.page";

test("has logo", async ({ page }) => {
  const landingPage = new CheapFlightsLandingPage(page);
  await landingPage.navigate();
  await expect(landingPage.header.logo).toBeVisible();
});

test("has login button", async ({ page }) => {
  const landingPage = new CheapFlightsLandingPage(page);
  await landingPage.navigate();
  await expect(landingPage.header.loginButton).toBeVisible();
});
