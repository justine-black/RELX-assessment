import { test as base, expect } from "@playwright/test";
import { CheapFlightsLandingPage } from "../pages/cheap-flights-landing.page";

type MyFixtures = {
  landingPage: CheapFlightsLandingPage;
};

export const test = base.extend<MyFixtures>({
  landingPage: async ({ context, page }, use) => {
    // Block Google One Tap sign-in
    await context.route(
      /https:\/\/accounts\.google\.com\/gsi\//,
      async (route) => {
        console.log("Blocked Google sign-in:", route.request().url());
        await route.abort();
      },
    );

    const landingPage = new CheapFlightsLandingPage(page);

    await use(landingPage);
  },
});

export { expect };
