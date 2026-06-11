import { connectDB } from "@/lib/db";
import Booking from "@/models/booking";
import { IBooking } from "@/types";

export async function createBooking(
  data: IBooking,
): Promise<IBooking & { _id: string }> {
  await connectDB();
  const booking = await Booking.create({
    ...data,
    status: "pending",
  });
  return {
    ...booking.toObject(),
    _id: booking._id.toString(),
  };
}
