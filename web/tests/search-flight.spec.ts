// import { test, expect } from "@playwright/test";
import { test, expect } from "../fixtures/test.fixture";
import { CheapFlightsLandingPage } from "../pages/cheap-flights-landing.page";

test.describe("Search for flights from landing page", () => {
  test("cannot search without a destination", async ({ page }) => {
    const landingPage = new CheapFlightsLandingPage(page);
    await landingPage.navigate();

    await landingPage.mainSearch.flightsButton.click();
    await landingPage.mainSearch.searchButton.click();

    await expect(
      landingPage.page.getByText("Please enter a Destination"),
    ).toBeVisible();
  });

  test("cannot search without a departure/return date", async ({ page }) => {
    const landingPage = new CheapFlightsLandingPage(page);
    await landingPage.navigate();

    await landingPage.mainSearch.flightsButton.click();

    await landingPage.mainSearch.toInput.fill("Boracay");

    await landingPage.page
      .getByRole("option", { name: "Boracay, Philippines MPH" })
      .click();

    await landingPage.mainSearch.searchButton.click();

    const expected = landingPage.page.getByText(
      "Please enter a Departure date.",
    );

    for (let i = 0; i < 3; i++) {
      if (await expected.isVisible({ timeout: 1000 })) {
        break;
      }

      await landingPage.mainSearch.searchButton.click();
    }

    await expect(expected).toBeVisible();
  });

  test("can search for available flights with valid inputs", async ({
    page,
    context,
  }) => {
    const landingPage = new CheapFlightsLandingPage(page);
    const newPagePromise = context.waitForEvent("page");

    await landingPage.navigate();

    await landingPage.mainSearch.flightsButton.click();

    await landingPage.mainSearch.toInput.fill("Boracay");

    await landingPage.page
      .getByRole("option", { name: "Boracay, Philippines MPH" })
      .click();

    await landingPage.mainSearch.departureDateInput.click();
    await landingPage.page
      .getByRole("button", { name: "Tuesday, 1 December," })
      .click();
    await landingPage.page
      .getByRole("button", { name: "Friday, 4 December," })
      .click();

    if (!(await landingPage.mainSearch.travellersOptions.isVisible())) {
      await landingPage.mainSearch.travelersButton.click();
    }

    await landingPage.page
      .getByRole("button", { name: "Increment" })
      .first()
      .click();
    await landingPage.mainSearch.searchButton.click();

    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");

    await expect(newPage).toHaveURL(/flight-search/);
    await expect(
      newPage.getByRole("button", { name: "Flight origin input Manila" }),
    ).toBeVisible({ timeout: 10000 });

    await expect(
      newPage.getByRole("button", { name: "Flight destination input Boracay" }),
    ).toBeVisible();

    await expect(newPage.getByText("Tue 1/12 – Fri 4/12")).toBeVisible();

    await expect(
      newPage.getByRole("button", { name: "2", exact: true }),
    ).toBeVisible();

    await expect(
      newPage.locator("//*[@class='ev1_-results-list']"),
    ).toBeVisible();

    await expect(
      await newPage
        .locator("//div[@role='group' and @class='Fxw9-result-item-container']")
        .count(),
    ).toBeGreaterThan(1);
  });

  test("can search but no available flights", async ({ page, context }) => {
    const landingPage = new CheapFlightsLandingPage(page);
    const newPagePromise = context.waitForEvent("page");

    await landingPage.navigate();

    await landingPage.mainSearch.flightsButton.click();

    await landingPage.mainSearch.toInput.fill("Boracay");

    await landingPage.page
      .getByRole("option", { name: "Boracay, Philippines MPH" })
      .click();

    await landingPage.mainSearch.departureDateInput.click();
    await landingPage.page
      .getByRole("button", { name: "Tuesday, 1 December," })
      .click();
    await landingPage.page
      .getByRole("button", { name: "Friday, 4 December," })
      .click();

    await landingPage.mainSearch.searchButton.click();

    const newPage = await newPagePromise;
    await newPage.waitForLoadState("domcontentloaded");

    await expect(newPage).toHaveURL(/flight-search/);

    await expect(newPage.getByText("No flights found")).toBeVisible();
  });
});
