"use client";

import { BookingsDataTable } from "@/components/admin/BookingsDataTable";
import { Button, Card } from "@/components/ui";
import { useCallback, useEffect, useState } from "react";
import { IBooking, BookingStatus } from "@/types/booking";
import {
  deleteBookingAction,
  getAllBookingsAction,
  updateBookingStatusAction,
} from "@/actions/bookings.action";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/Spinner";
import { ConfirmModal } from "@/components/ui/DeleteConfirmModal";
import useDeleteModal from "@/hooks/useDeleteModal";
import { toast } from "sonner";

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

  const deleteModal = useDeleteModal<string>(async (id) => {
    const res = await deleteBookingAction(id);
    if (!res.success) {
      toast.error(res.error ?? "Failed to delete booking");
      return;
    }
    setBookings((prev) => prev.filter((b) => b._id !== id));
    toast.success("Booking deleted successfully");
  });
  
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
        <Spinner size="lg" text="Loading bookings..." />
      ) : bookings.length === 0 ? (
        <p className="py-8 text-center text-warning">No bookings found.</p>
      ) : (
        <BookingsDataTable
          bookings={bookings}
          onStatusChange={handleStatusChange}
          onDeleteBooking={deleteModal.requestDelete}
          error={error}
          updatingId={updatingId}
        />
      )}
      <ConfirmModal
        title="Delete Booking?"
        description="This booking will be permanently removed."
        confirmText="Delete"
        isOpen={deleteModal.isOpen}
        isLoading={deleteModal.isDeleting}
        onCancel={deleteModal.cancelDelete}
        onConfirm={deleteModal.confirmDelete}
      />
    </div>
  );
}
