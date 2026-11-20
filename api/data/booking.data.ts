import { Booking } from "../models/booking.types";

export const validBooking: Booking = {
  firstname: "Justine",
  lastname: "Bieber",
  totalprice: 123,
  depositpaid: true,
  bookingdates: {
    checkin: "2027-01-10",
    checkout: "2027-01-15",
  },
  additionalneeds: "Breakfast",
};

export const updatedBooking: Booking = {
  firstname: "Justine",
  lastname: "Timberlake",
  totalprice: 500,
  depositpaid: false,
  bookingdates: {
    checkin: "2027-02-10",
    checkout: "2027-02-15",
  },
  additionalneeds: "Lunch",
};
