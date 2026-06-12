import { getAllbooking } from "@/services/booking.service";

export default async function BookingsPage() {
  const bookings = await getAllbooking();
  console.log(bookings);
  return <h1>this is booking page </h1>;
}




 