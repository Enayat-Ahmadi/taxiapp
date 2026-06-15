import { connectDB } from "@/lib/db";
import Booking from "@/models/booking";
import { IBooking } from "@/types";

export async function createBooking(
  data: IBooking,
): Promise<IBooking> {
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
export async function getAllbooking(): Promise<IBooking[]> {
  await connectDB();
  const bookins = await Booking.find().sort({ createdAt: -1 }).lean();
  return bookins.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
  })) as IBooking[];
}
