"use client";

import type { BookingStatus, IBooking } from "@/types";
import { Card } from "@/components/ui";
import { useState } from "react";
import { updateBookingStatusAction } from "@/actions/booking";
import StatusSelect from "./StatusSelect";
import MobileCard from "./booking/MobileCard";

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
          <MobileCard key={booking._id} booking={booking}>
            <StatusSelect
              booking={booking}
              onStatusChange={handleStatusChange}
              updatingId={updatingId}
            />
          </MobileCard>
        ))}
      </div>

      {/* <div className="block lg:hidden space-y-4">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="border border-gray-200 rounded-lg p-4 space-y-3 bg-teal/60 text-ink"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  From
                </p>
                <p className="font-semibold text-gray-900 capitalize">
                  {booking.pickupLocation}
                </p>
              </div>
              <StatusSelect
                booking={booking}
                onStatusChange={handleStatusChange}
                updatingId={updatingId}
              />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                To
              </p>
              <p className="font-semibold text-gray-900">
                {booking.destination}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Date & Time
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {booking.date}
                </p>
                <p className="text-xs text-gray-500">{booking.time}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Passengers
                </p>
                <p className="text-sm font-medium text-gray-900">
                  {booking.passengers}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Vehicle
                </p>
                <p className="text-sm font-medium text-gray-900 capitalize">
                  {booking.vehicleType}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Price
                </p>
                <p className="text-sm font-medium text-gray-900">
                  ${booking.estimatedPrice}
                </p>
              </div>
            </div>
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Phone
              </p>
              <p className="text-sm font-medium text-gray-900">
                {booking.phoneNumber}
              </p>
            </div>
          </div>
        ))}
      </div> */}

      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Pickup
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Destination
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Date & Time
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Passengers
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Vehicle
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-3 lg:px-4 text-gray-900 capitalize">
                  {booking.pickupLocation}
                </td>
                <td className="py-3 px-3 lg:px-4 text-gray-900 capitalize">
                  {booking.destination}
                </td>
                <td className="py-3 px-3 lg:px-4 text-gray-900">
                  <div className="text-sm">
                    <div>{booking.date}</div>
                    <div className="text-gray-500">{booking.time}</div>
                  </div>
                </td>
                <td className="py-3 px-3 lg:px-4 text-gray-900">
                  {booking.passengers}
                </td>
                <td className="py-3 px-3 lg:px-4 text-gray-900 capitalize">
                  {booking.vehicleType}
                </td>
                <td className="py-3 px-3 lg:px-4 font-medium text-gray-900">
                  ${booking.estimatedPrice}
                </td>
                <td className="py-3 px-3 lg:px-4">
                  <StatusSelect
                    booking={booking}
                    onStatusChange={handleStatusChange}
                    updatingId={updatingId}
                  />
                </td>
                <td className="py-3 px-3 lg:px-4 text-gray-900">
                  {booking.phoneNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
