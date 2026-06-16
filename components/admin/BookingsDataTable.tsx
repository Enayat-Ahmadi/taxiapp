"use client";

import type { BookingStatus, IBooking } from "@/types";
import { Card } from "@/components/ui";
import { useState } from "react";
import { updateBookingStatusAction } from "@/actions/booking";
import StatusSelect from "./booking/StatusSelect";
import MobileBookingCard from "./booking/MobileBookingCard";
import BookingTableRow, { BookingTableHeader } from "./booking/BookingTable";

interface BookingsDataTableProps {
  bookings: IBooking[];
}

export function BookingsDataTable({
  bookings: initalBookings,
}: BookingsDataTableProps) {
  const [bookings, setBookings] = useState(initalBookings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStatusChange = async (
    bookingId: string,
    newStatus: BookingStatus,
  ) => {
    if (!bookings) return;
    setUpdatingId(bookingId);
    setError(null);
    try {
      const result = await updateBookingStatusAction(bookingId, newStatus);
      if (!result.success) {
        throw new Error(result.error || "Failed to update booking status");
      }
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: newStatus }
            : booking,
        ),
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setError(errorMessage);
      console.error("Error updating status:", error);
    } finally {
      setUpdatingId(null);
    }
  };
  if (bookings.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-warning">No bookings found</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
        {bookings.map((booking) => (
          <MobileBookingCard key={booking._id} booking={booking}>
            <StatusSelect
              booking={booking}
              onStatusChange={handleStatusChange}
              updatingId={updatingId}
            />
          </MobileBookingCard>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <BookingTableHeader />
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <BookingTableRow key={booking._id} booking={booking}>
                <StatusSelect
                  booking={booking}
                  onStatusChange={handleStatusChange}
                  updatingId={updatingId}
                />
              </BookingTableRow>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
