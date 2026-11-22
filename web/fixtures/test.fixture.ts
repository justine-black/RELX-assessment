import { test as base, expect } from "@playwright/test";
import { CheapFlightsLandingPage } from "../pages/cheap-flights-landing.page";

type Fixtures = {
  blockGoogleSignIn: void;
  landingPage: CheapFlightsLandingPage;
};

export const test = base.extend<Fixtures>({
  blockGoogleSignIn: [
    async ({ context }, use) => {
      await context.route("**://accounts.google.com/gsi/**", (route) =>
        route.abort(),
      );

      await use();
    },
    { auto: true },
  ],

  landingPage: async ({ page }, use) => {
    const landingPage = new CheapFlightsLandingPage(page);
    await use(landingPage);
  },
});

export { expect };
