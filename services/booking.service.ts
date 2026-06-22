import { connectDB } from "@/lib/db";
import Booking from "@/models/booking";
import { IBooking } from "@/types";
import mongoose from "mongoose";
import { BookingStatus } from "@/types";

export async function createBooking(data: IBooking): Promise<IBooking> {
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
