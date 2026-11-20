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

test.describe("PUT/PATCH /booking - Update Booking", () => {
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

  test("should fully update an existing booking", async ({ request }) => {
    const updatedData = {
      firstname: "Jane",
      lastname: "Smith",
      totalprice: 2000,
      depositpaid: false,
      bookingdates: {
        checkin: "2026-12-15",
        checkout: "2026-12-20",
      },
      additionalneeds: "Lunch",
    };

    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toMatchObject(updatedData);
  });

  test("should partially update an existing booking", async ({ request }) => {
    const updatedData = {
      firstname: "Jane",
      lastname: "Smith",
    };

    const response = await request.patch(`/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`,
      },
      data: updatedData,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.firstname).toBe("Jane");
    expect(body.lastname).toBe("Smith");
    expect(body.totalprice).toBe(bookingData.totalprice);
  });

  test("should reject an update with an invalid token", async ({ request }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      headers: {
        Cookie: "token=invalid-token",
      },
      data: bookingData,
    });

    expect(response.status()).toBe(403);
  });

  test("should reject an update without authentication", async ({
    request,
  }) => {
    const response = await request.put(`/booking/${bookingId}`, {
      data: bookingData,
    });

    expect(response.status()).toBe(403);
  });
});
