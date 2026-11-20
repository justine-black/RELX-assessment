import { test, expect } from "@playwright/test";
import { validBooking } from "../../data/booking.data";

const bookingData = validBooking;

test.describe("POST /booking - Create Booking", () => {
  test("should successfully create a booking", async ({ request }) => {
    const response = await request.post("/booking", {
      data: bookingData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
    expect(body.booking).toMatchObject({ ...bookingData });
  });

  test("should create a booking without optional additional needs", async ({
    request,
  }) => {
    const { additionalneeds, ...payload } = bookingData;

    const response = await request.post("/booking", {
      data: payload,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.bookingid).toBeTruthy();
    expect(body.booking.firstname).toBe(payload.firstname);
  });

  test("should reject a booking with an empty request body", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {},
    });

    expect(response.status()).toBe(500);
  });

  test("should reject a booking with missing required fields", async ({
    request,
  }) => {
    const response = await request.post("/booking", {
      data: {
        firstname: "John",
        lastname: "Doe",
      },
    });

    expect(response.status()).toBe(500);
  });
});
