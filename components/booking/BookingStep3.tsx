import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, Button } from "../ui";
import { formatPrice } from "@/lib/utils";
import { IBooking } from "@/types";

interface Step3Props {
  booking: IBooking;
  onConfirm: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}

const detailKeys: { label: string; key: keyof IBooking }[] = [
  { label: "From", key: "pickupLocation" },
  { label: "To", key: "destination" },
  { label: "Phone", key: "phoneNumber" },
  { label: "Date", key: "date" },
  { label: "Time", key: "time" },
  { label: "Passengers", key: "passengers" },
  { label: "Luggage", key: "luggage" },
];

export default function BookingStep3({ booking, onPrevious, onConfirm, isLoading }: Step3Props) {

  const { fare, serviceFee, total } = useMemo(() => {
    const fare = booking.estimatedPrice * 0.85;
    const serviceFee = booking.estimatedPrice * 0.15;
    return { fare, serviceFee, total: fare + serviceFee };
  }, [booking.estimatedPrice]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-ink mb-6">Review Your Booking</h2>

        {/* Trip Details */}
        <div className="mb-8 pb-8">
          {detailKeys.map(({ label, key }) => (
            <div key={key} className="flex justify-between border-b border-ink-light mt-2 p-1">
              <p className="text-sm text-ink">{label}</p>
              <p className="text-ink font-medium capitalize">{String(booking[key])}</p>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="mb-8 p-4 bg-teal/40 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-ink">Vehicle</h3>
            <p className="text-lg font-bold text-ink capitalize">{booking.vehicleType}</p>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ink">Estimated fare</span>
            <span className="text-ink font-medium">{formatPrice(fare)}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ink">Service fee</span>
            <span className="text-ink font-medium">{formatPrice(serviceFee)}</span>
          </div>
          <div className="border-t border-slate-700/30 pt-3 flex justify-between items-center">
            <span className="font-semibold text-ink">Total</span>
            <span className="text-2xl font-bold text-ink">{formatPrice(total)}</span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-ink text-center mb-8">
          By confirming, you agree to our Terms of Service and Privacy Policy.
          Prices may vary based on traffic conditions.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <Button variant="outline" size="lg" onClick={onPrevious}>Back</Button>
          <Button size="lg" className="bg-teal text-cloud-light" onClick={onConfirm} isLoading={isLoading}>
            Confirm Booking
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}