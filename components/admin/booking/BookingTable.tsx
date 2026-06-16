import { IBooking } from "@/types";
import React from "react";

interface DesktopCardProps {
  booking: IBooking;
  children: React.ReactNode;
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
];
export default function BookingTableRow({
  booking,
  children,
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
        ${booking.estimatedPrice}
      </td>
      <td className="py-3 px-3 lg:px-4">{children}</td>
      <td className="py-3 px-3 lg:px-4 text-gray-900">{booking.phoneNumber}</td>
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
