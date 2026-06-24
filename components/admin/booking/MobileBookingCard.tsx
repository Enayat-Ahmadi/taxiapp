import { Button } from "@/components/ui";
import { IBooking } from "@/types/booking";

interface MobileCardProps {
  booking: IBooking;
  children: React.ReactNode;
  onRequestDelete: (bookingId: string) => void;
}
export default function MobileBookingCard({
  booking,
  children,
  onRequestDelete,
}: MobileCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3 bg-teal/60 text-ink">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">From</p>
          <p className="font-semibold text-gray-900 capitalize">
            {booking.pickupLocation}
          </p>
        </div>
        {children}
      </div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wide">To</p>
        <p className="font-semibold text-gray-900">{booking.destination}</p>
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Date & Time
          </p>
          <p className="text-sm font-medium text-gray-900">{booking.date}</p>
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
          <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
          <p className="text-sm font-medium text-gray-900">
            ${booking.estimatedPrice}
          </p>
        </div>
      </div>
      <div className="flex justify-between pt-2 border-t border-gray-100">
        <div className="">
          <p className="text-xs text-gray-500 uppercase tracking-wide">Phone</p>
          <p className="text-sm font-medium text-gray-900">
            {booking.phoneNumber}
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => onRequestDelete(booking._id)}
          className="bg-red-600 text-white hover:bg-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
