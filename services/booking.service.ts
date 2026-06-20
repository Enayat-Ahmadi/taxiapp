import { connectDB } from "@/lib/db";
import Booking from "@/models/booking";
import { IBooking } from "@/types";

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
export async function getAllbooking(status?: string): Promise<IBooking[]> {
  await connectDB();
  const query = status && status !== "all" ? { status } : {};
  const bookins = await Booking.find(query).sort({ createdAt: -1 }).lean();
  return bookins.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  })) as IBooking[];
}

export async function updateBookingStatus(bookinId: string, status: string) {
  await connectDB();
  const updatedBooking = await Booking.findByIdAndUpdate(
    bookinId,
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
