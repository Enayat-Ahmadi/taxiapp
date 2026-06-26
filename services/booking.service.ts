import { connectDB } from "@/lib/db";
import { BOOKING_STATUSES } from "@/lib/constant";
import Booking from "@/models/booking";
import { IBooking } from "@/types/booking";
import mongoose from "mongoose";
import { BookingStatus } from "@/types/booking";

/** Create a new booking with status set to "pending". */
export async function createBooking(data: IBooking): Promise<IBooking> {
  await connectDB();
  const newBooking = await Booking.create({
    ...data,
    status: BOOKING_STATUSES.PENDING,
  });
  return {
    ...newBooking.toObject(),
    _id: newBooking._id.toString(),
  };
}

/** Retrieve all bookings, optionally filtered by status. */
export async function getAllBookings(
  status?: BookingStatus | "all",
): Promise<IBooking[]> {
  await connectDB();
  const query = status && status !== "all" ? { status } : {};
  const bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();
  return bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  })) as IBooking[];
}

/** Delete a booking by its ID. */
export async function deleteBooking(bookingId: string): Promise<void> {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking id");
  }

  const result = await Booking.findByIdAndDelete(bookingId);
  if (!result) {
    throw new Error("Booking not found");
  }
}

/** Update the status of an existing booking. */
export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
): Promise<IBooking> {
  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(bookingId)) {
    throw new Error("Invalid booking id");
  }
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true },
  );

  if (!updatedBooking) {
    throw new Error("Booking not found");
  }
  return {
    ...updatedBooking.toObject(),
    _id: updatedBooking._id.toString(),
  };
}

export interface BookingStats {
  totalBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  pendingBookings: number;
}

/** Get booking counts grouped by status using a single aggregation query. */
export async function getBookingStats(): Promise<BookingStats> {
  await connectDB();
  const [result] = await Booking.aggregate<BookingStats>([
    {
      $group: {
        _id: null,
        totalBookings: { $sum: 1 },
        confirmedBookings: {
          $sum: { $cond: [{ $eq: ["$status", BOOKING_STATUSES.CONFIRMED] }, 1, 0] },
        },
        completedBookings: {
          $sum: { $cond: [{ $eq: ["$status", BOOKING_STATUSES.COMPLETED] }, 1, 0] },
        },
        cancelledBookings: {
          $sum: { $cond: [{ $eq: ["$status", BOOKING_STATUSES.CANCELLED] }, 1, 0] },
        },
        pendingBookings: {
          $sum: { $cond: [{ $eq: ["$status", BOOKING_STATUSES.PENDING] }, 1, 0] },
        },
      },
    },
  ]);

  return (
    result ?? {
      totalBookings: 0,
      confirmedBookings: 0,
      completedBookings: 0,
      cancelledBookings: 0,
      pendingBookings: 0,
    }
  );
}
