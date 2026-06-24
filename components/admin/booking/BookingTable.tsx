import { formatPrice } from "@/lib/utils";
import { IBooking } from "@/types/booking";
import React from "react";
import { Button } from "@/components/ui";

interface DesktopCardProps {
  booking: IBooking;
  children: React.ReactNode;
  onDelete?: (bookingId: string) => void;
}
const TABLE_HEAD = [
  "Pickup",
  "Destination",
  "Time",
  "Passengers",
  "Vehicle",
  "Price",
  "Status",
  "Phone",
  "Action",
];
export default function BookingTableRow({
  booking,
  children,
  onDelete,
}: DesktopCardProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
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
      <td className="py-3 px-3 lg:px-4 text-gray-900">{booking.passengers}</td>
      <td className="py-3 px-3 lg:px-4 text-gray-900 capitalize">
        {booking.vehicleType}
      </td>
      <td className="py-3 px-3 lg:px-4 font-medium text-gray-900">
        {formatPrice(booking.estimatedPrice)}
      </td>
      <td className="py-3 px-3 lg:px-4">{children}</td>
      <td className="py-3 px-3 lg:px-4 text-gray-900">{booking.phoneNumber}</td>
      <td className="py-3 px-3 lg:px-4">
        <Button
          size="sm"
          onClick={() => onDelete?.(booking._id)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}
export function BookingTableHeader() {
  return (
    <tr className="border-b border-gray-200">
      {TABLE_HEAD.map((item) => (
        <th
          key={item}
          className="text-left py-3 px-3 lg:px-4 font-semibold text-gray-700"
        >
          {item}
        </th>
      ))}
    </tr>
  );
}
