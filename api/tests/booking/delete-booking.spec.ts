import { test, expect } from "@playwright/test";
import { validBooking } from "../../data/booking.data";

const bookingData = validBooking;

async function getToken(request: any) {
  const response = await request.post("/auth", {
    data: {
      username: process.env.API_USERNAME || "admin",
      password: process.env.API_PASSWORD || "password123",
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  return body.token;
}

test.describe("DELETE /booking - Delete Booking", () => {
  let bookingId: number;
  let token: string;

  test.beforeEach(async ({ request }) => {
    const createResponse = await request.post("/booking", {
      data: bookingData,
    });

    expect(createResponse.status()).toBe(200);

    const body = await createResponse.json();
    bookingId = body.bookingid;

    token = await getToken(request);
  });

  test("should successfully delete an existing booking", async ({
    request,
  }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);

    const getResponse = await request.get(`/booking/${bookingId}`);

    expect(getResponse.status()).toBe(404);
  });

  test("should reject deletion with an invalid token", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`, {
      headers: {
        Cookie: "token=invalid-token",
      },
    });

    expect(response.status()).toBe(403);
  });

  test("should reject deletion without authentication", async ({ request }) => {
    const response = await request.delete(`/booking/${bookingId}`);

    expect(response.status()).toBe(403);
  });
});
