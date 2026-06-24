import { type ChangeEvent } from "react";
import { IBooking, BookingStatus } from "@/types/booking";

const BOOKING_STATUS_OPTIONS: BookingStatus[] = [
  "pending",
  "cancelled",
  "confirmed",
  "completed",
];
const STATUS_STYLES: Record<BookingStatus | "default", string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  default: "bg-gray-100 text-gray-800",
};
interface StatusSelectProps {
  booking: IBooking;
  updatingId: string | null;
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
}
export default function StatusSelect({
  booking,
  updatingId,
  onStatusChange,
}: StatusSelectProps) {
  const currentStatus = booking.status || "pending";
  const bookingId = booking._id || "";
  const isCurrentlyUpdating = updatingId === bookingId;

  const handleCahange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextStatus = e.target.value;
    onStatusChange(bookingId, nextStatus as BookingStatus);
  };

  return (
    <select
      aria-label="Update booking status"
      value={currentStatus}
      onChange={handleCahange}
      disabled={isCurrentlyUpdating}
      suppressHydrationWarning={true}
      className={`px-2 py-1 rounded-full text-xs font-medium border-0 cursor-pointer capitalize transition-opacity ${
        STATUS_STYLES[currentStatus] || STATUS_STYLES.default
      } ${isCurrentlyUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {BOOKING_STATUS_OPTIONS.map((status) => (
        <option
          key={status}
          value={status}
          className="font-semibold text-ink capitalize"
        >
          {status}
        </option>
      ))}
    </select>
  );
}
