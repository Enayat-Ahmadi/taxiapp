"use client";

import type { BookingStatus, IBooking } from "@/types/booking";
import { Card } from "@/components/ui";
import StatusSelect from "./booking/StatusSelect";
import MobileBookingCard from "./booking/MobileBookingCard";
import BookingTableRow, { BookingTableHeader } from "./booking/BookingTable";
import { ConfirmModal } from "../ui/DeleteConfirmModal";
import { useState } from "react";

interface BookingsDataTableProps {
  bookings: IBooking[];
  updatingId: string | null;
  error: string | null;
  onStatusChange: (bookingId: string, newStatus: BookingStatus) => void;
  onDeleteBooking: (bookingId: string) => Promise<void>;
}

export function BookingsDataTable({
  bookings,
  updatingId,
  error,
  onStatusChange,
  onDeleteBooking,
}: BookingsDataTableProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const handleRequestDelete = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async (bookingId: string) => {
    setIsDeleting(true);
    try {
      await onDeleteBooking(bookingId);
      setDeleteModalOpen(false);
      setSelectedBookingId(null);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
    setSelectedBookingId(null);
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
          <MobileBookingCard
            key={booking._id}
            onRequestDelete={handleRequestDelete}
            booking={booking}
          >
            <StatusSelect
              booking={booking}
              onStatusChange={onStatusChange}
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
              <BookingTableRow
                key={booking._id}
                booking={booking}
                onDelete={handleRequestDelete}
              >
                <StatusSelect
                  booking={booking}
                  onStatusChange={onStatusChange}
                  updatingId={updatingId}
                />
              </BookingTableRow>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        title="Delete Booking?"
        description="Are you sure you want to delete this booking?"
        confirmText="Delete"
        isOpen={deleteModalOpen}
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!selectedBookingId) return;
          await handleConfirmDelete(selectedBookingId);
        }}
        onCancel={handleCancelDelete}
      />
    </Card>
  );
}
