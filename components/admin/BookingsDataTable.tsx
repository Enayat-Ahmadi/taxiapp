"use client";

import type { IBooking } from "@/types";
import { Card } from "@/components/ui";

interface BookingsDataTableProps {
  bookings: IBooking[];
}

const getStatusBadgeColor = (
  status: string,
):
  | "bg-yellow-100 text-yellow-800"
  | "bg-green-100 text-green-800"
  | "bg-blue-100 text-blue-800"
  | "bg-red-100 text-red-800"
  | "bg-gray-100 text-gray-800" => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "confirmed":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export function BookingsDataTable({ bookings }: BookingsDataTableProps) {
  if (bookings.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-warning">No bookings found</p>
      </Card>
    );
  }

  return (
    <Card className="p-4 md:p-6">
      {/* Mobile Card View */}
      <div className="block lg:hidden space-y-4">
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
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                  booking.status || "pending",
                )}`}
              >
                {booking.status || "pending"}
              </span>
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
      </div>

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
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                      booking.status || "pending",
                    )}`}
                  >
                    {booking.status || "pending"}
                  </span>
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
