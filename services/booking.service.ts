import { connectDB } from "@/lib/db";
import Booking from "@/models/booking";
import { CreateBookingInput, IBooking } from "@/types/booking";
import mongoose from "mongoose";
import { BookingStatus } from "@/types/booking";

export async function createBooking(data: CreateBookingInput): Promise<IBooking> {
  await connectDB();
  const newBooking = await Booking.create({
    ...data,
    status: "pending",
  });
  return {
    ...newBooking.toObject(),
    _id: newBooking._id.toString(),
  };
}
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
export async function getBookingStats(): Promise<BookingStats> {
  await connectDB();
  const [
    totalBookings,
    confirmedBookings,
    completedBookings,
    cancelledBookings,
    pendingBookings,
  ] = await Promise.all([
    Booking.countDocuments(),
    Booking.countDocuments({ status: "confirmed" }),
    Booking.countDocuments({ status: "completed" }),
    Booking.countDocuments({ status: "cancelled" }),
    Booking.countDocuments({ status: "pending" }),
  ]);

  return {
    totalBookings,
    completedBookings,
    confirmedBookings,
    cancelledBookings,
    pendingBookings,
  };
}
