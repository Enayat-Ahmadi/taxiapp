/**
 * Database Utilities
 * Common database operations and helpers for MongoDB
 */

import Booking from "@/models/booking";
import { connectDB } from "./db";

export async function getBookingStats() {
  try {
    await connectDB();
    const totalBookings = await Booking.countDocuments();
    const confirmedBookings = await Booking.countDocuments({
      status: "confirmed",
    });
    const completedBookings = await Booking.countDocuments({
      status: "completed",
    });
    const cancelledBookings = await Booking.countDocuments({
      status: "cancelled",
    });
    return {
      totalBookings,
      completedBookings,
      confirmedBookings,
      cancelledBookings,
    };
  } catch (error) {
    console.error("Error getting booking status:", error);
    return null;
  }
}
