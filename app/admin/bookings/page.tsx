import { getAllbooking } from "@/services/booking.service";

export default async function AdminBookingsPage() {
  const bookings = await getAllbooking();
  console.log(bookings)
  return <h1>this is admin booking page</h1>;
}
