import { APIRequestContext, APIResponse } from "@playwright/test";

import { Booking, AuthResponse } from "../models/booking.types";

export class BookingAPI {
  constructor(private request: APIRequestContext) {}

  // Authentication
  async createToken(): Promise<string> {
    const response = await this.request.post("/auth", {
      data: {
        username: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    if (!response.ok()) {
      throw new Error(`Authentication failed: ${response.status()}`);
    }

    const body: AuthResponse = await response.json();

    if (!body.token) {
      throw new Error("Authentication token was not returned");
    }

    return body.token;
  }

  // Create Booking
  async createBooking(booking: Booking): Promise<APIResponse> {
    return this.request.post("/booking", {
      data: booking,
    });
  }

  // Get Booking
  async getBooking(id: number): Promise<APIResponse> {
    return this.request.get(`/booking/${id}`);
  }

  // Update Booking
  async updateBooking(id: number, booking: Booking): Promise<APIResponse> {
    const token = await this.createToken();

    return this.request.put(`/booking/${id}`, {
      data: booking,
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }

  // Delete Booking
  async deleteBooking(id: number): Promise<APIResponse> {
    const token = await this.createToken();

    return this.request.delete(`/booking/${id}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });
  }
}
