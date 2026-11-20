import { test as base } from "@playwright/test";
import { BookingAPI } from "../../api/clients/BookingAPI";

type APIFixtures = {
  bookingAPI: BookingAPI;
};

export const test = base.extend<APIFixtures>({
  bookingAPI: async ({ request }, use) => {
    const bookingAPI = new BookingAPI(request);

    await use(bookingAPI);
  },
});

export { expect } from "@playwright/test";
