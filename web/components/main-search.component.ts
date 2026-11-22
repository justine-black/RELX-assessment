import { type Page, type Locator } from "@playwright/test";

export class MainSearch {
  readonly page: Page;

  readonly flightsButton: Locator;
  readonly staysButton: Locator;
  readonly carsButton: Locator;

  readonly fromInput: Locator;
  readonly toInput: Locator;
  readonly departureDateInput: Locator;
  readonly returnDateInput: Locator;
  readonly tripTypeButton: Locator;
  readonly travelersButton: Locator;
  readonly searchButton: Locator;

  readonly travellersOptions: Locator;
  readonly cabinClassOptions: Locator;

  constructor(page: Page) {
    this.page = page;

    this.flightsButton = page.getByRole("link", { name: "Search for flights" });
    this.staysButton = page.getByRole("link", { name: "Search for stays" });
    this.carsButton = page.getByRole("link", { name: "Search for cars" });

    this.fromInput = page.locator("//*[@data-test-origin]");
    this.toInput = page.getByRole("combobox", { name: "Ask anything" }).first();
    this.departureDateInput = page.locator(
      "//div[@role='button']//span[text()='Departure']",
    );
    this.returnDateInput = page.locator(
      "//div[@role='button']//span[text()='Return']",
    );
    this.tripTypeButton = page.locator(
      '//div[@aria-controls="flight-trip-type-dropdown"]',
    );
    this.travelersButton = page.locator(
      '//div[aria-controls="nl-search-flight-horizontal-search-form-travelers-dropdown"]',
    );
    this.searchButton = page.locator('//div[@aria-label="Search"]').first();

    this.travellersOptions = page.getByText("Travellers", { exact: true });
    this.cabinClassOptions = page.getByText("Cabin class", { exact: true });
  }
}
