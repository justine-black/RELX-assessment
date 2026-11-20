import { expect, type Page, type Locator } from "@playwright/test";
import { Header } from "../components/header.component";
import { Login } from "../components/login.component";

export class CheapFlightsLandingPage {
  readonly page: Page;
  readonly header: Header;
  readonly login: Login;
  // readonly loginButton: Locator;
  // readonly fromInput: Locator;
  // readonly toInput: Locator;
  // readonly departureDateInput: Locator;
  // readonly returnDateInput: Locator;
  // readonly searchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.login = new Login(page);
    // this.loginButton = page.locator('button:has-text("Log in")');
    // this.fromInput = page.locator('input[placeholder="From"]');
    // this.toInput = page.locator('input[placeholder="To"]');
    // this.departureDateInput = page.locator('input[placeholder="Departure date"]');
    // this.returnDateInput = page.locator('input[placeholder="Return date"]');
    // this.searchButton = page.locator('button:has-text("Search")');
  }

  async navigate() {
    await this.page.goto("https://www.cheapflights.com.au/");
  }
}
