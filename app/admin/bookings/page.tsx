import { getAllbooking } from "@/services/booking.service";
import { BookingsDataTable } from "@/components/admin/BookingsDataTable";


export default async function AdminBookingsPage() {
  const bookings = await getAllbooking();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>
        <p className="text-gray-600 mt-1">Manage and track all customer bookings</p>
      </div>
      <BookingsDataTable bookings={bookings} />
    </div>
  );
}
