import { test, expect } from "@playwright/test";
import { validBooking } from "../../data/booking.data";

const bookingData = validBooking;

test.describe("GET /booking - Retrieve Booking", () => {
  let bookingId: number;

  test.beforeEach(async ({ request }) => {
    const response = await request.post("/booking", {
      data: bookingData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    bookingId = body.bookingid;
  });

  test("should retrieve all booking IDs", async ({ request }) => {
    const response = await request.get("/booking");

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test("should retrieve an existing booking by ID", async ({ request }) => {
    const response = await request.get(`/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toMatchObject({ ...bookingData });
  });

  test("should filter bookings by firstname", async ({ request }) => {
    const response = await request.get(
      `/booking?firstname=${bookingData.firstname}`,
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(
      body.some(
        (booking: { bookingid: number }) => booking.bookingid === bookingId,
      ),
    ).toBeTruthy();
  });

  test("should return 404 for a nonexistent booking", async ({ request }) => {
    const response = await request.get("/booking/999999999");

    expect(response.status()).toBe(404);
  });

  test("should return 404 for an invalid booking ID", async ({ request }) => {
    const response = await request.get("/booking/invalid-id");

    expect(response.status()).toBe(404);
  });
});
