import { type ChangeEvent } from "react";
import { IBooking, BookingStatus } from "@/types";

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
    <div className="relative inline-block text-left">
      <select
        aria-label="Update booking status"
        value={currentStatus}
        onChange={handleCahange}
        disabled={isCurrentlyUpdating}
        className={`w-full min-w-[110px] block text-left pl-3 pr-7 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer capitalize transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%234a5568%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:0.65em_auto] bg-[position:right_0.6rem_center] bg-no-repeat ${
          STATUS_STYLES[currentStatus] || STATUS_STYLES.default
        } ${isCurrentlyUpdating ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {BOOKING_STATUS_OPTIONS.map((status) => (
          <option
            key={status}
            value={status}
            className="font-semibold text-ink bg-white text-gray-900 capitalize"
          >
            {status}
          </option>
        ))}
      </select>
    </div>
  );
}
