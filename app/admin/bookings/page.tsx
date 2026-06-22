"use client";

import { BookingsDataTable } from "@/components/admin/BookingsDataTable";
import { Button, Card } from "@/components/ui";
import { useCallback, useEffect, useState } from "react";
import { IBooking, BookingStatus } from "@/types";
import {
  deleteBookingAction,
  getAllBookingsAction,
  updateBookingStatusAction,
} from "@/actions/booking";
import { cn } from "@/lib/utils";

const BOOKINGS_STATUS = [
  "all",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
] as const;

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [filter, setFilter] = useState<BookingStatus | "all">("all");
  const [isLoading, setIsLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function fetchBookings() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllBookingsAction(filter);
        if (ignore) return;
        if (!response.success) {
          setError(response.error ?? "Failed to fetch bookings");
          return;
        }

        setBookings(response.data ?? []);
      } catch (error) {
        if (ignore) return;
        setError(
          error instanceof Error ? error.message : "Failed to fetch bookings",
        );
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }
    fetchBookings();
    return () => {
      ignore = true;
    };
  }, [filter]);

  const handleStatusChange = useCallback(
    async (bookingId: string, newStatus: BookingStatus) => {
      setUpdatingId(bookingId);
      setError(null);
      try {
        const result = await updateBookingStatusAction(bookingId, newStatus);
        if (!result.success)
          throw new Error(result.error || "Failed to update booking status");
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === bookingId
              ? { ...booking, status: newStatus }
              : booking,
          ),
        );
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setUpdatingId(null);
      }
    },
    [],
  );

  const handleDeleteBooking = useCallback(async (bookingId: string) => {
    try {
      const result = await deleteBookingAction(bookingId);
      if (!result.success) {
        console.error(result.error);
      }
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-3xl font-bold text-gray-900">Bookings</h1>

        <div className="flex flex-wrap gap-2 mt-2">
          {BOOKINGS_STATUS.map((status) => (
            <Button
              key={status}
              onClick={() => setFilter(status)}
              size="sm"
              className={cn(
                "bg-teal capitalize",
                filter === status
                  ? "bg-success text-cloud-light font-medium"
                  : "hover:bg-success/30",
              )}
            >
              {status}
            </Button>
          ))}
        </div>
      </Card>
      {error && <p className="text-center text-sm text-danger">{error}</p>}
      {isLoading ? (
        <p className="py-8 text-center text-gray-500">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="py-8 text-center text-warning">No bookings found.</p>
      ) : (
        <BookingsDataTable
          bookings={bookings}
          onStatusChange={handleStatusChange}
          onDeleteBooking={handleDeleteBooking}
          error={error}
          updatingId={updatingId}
        />
      )}
    </div>
  );
}
