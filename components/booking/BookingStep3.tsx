import { motion } from "framer-motion";
import { Card, Button } from "../ui";
import { formatPrice } from "@/lib/utils";
import { Booking } from "@/types";

interface Step3Props {
  booking: Booking;
  onConfirm: () => void;
  onPrevious: () => void;
  isLoading?: boolean;
}
export default function BookingStep3({
  booking,
  onPrevious,
  onConfirm,
  isLoading,
}: Step3Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-ink mb-6">
          Review Your Booking
        </h2>

        {/* Journey Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-ink mb-4">Journey</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-ink">From</span>
              <span className="text-ink font-medium">
                {booking.pickupLocation}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-ink">To</span>
              <span className="text-ink font-medium">
                {booking.destination}
              </span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-ink mb-4">Trip Details</h3>
          <div className="grid grid-cols-1 gap-4 ">
            <div className="flex justify-between border border-ink-light rounded-md p-1">
              <p className="text-sm text-ink mb-1">Date</p>
              <p className="text-ink font-medium">{booking.date}</p>
            </div>
            <div className="flex justify-between border border-ink-light rounded-md p-1">
              <p className="text-sm text-ink mb-1">Time</p>
              <p className="text-ink font-medium">{booking.time}</p>
            </div>
            <div className="flex justify-between border border-ink-light rounded-md p-1">
              <p className="text-sm text-ink mb-1">Passengers</p>
              <p className="text-ink font-medium">{booking.passengers}</p>
            </div>
            <div className="flex justify-between border border-ink-light rounded-md p-1">
              <p className="text-sm text-ink mb-1">Luggage</p>
              <p className="text-ink font-medium">{booking.luggage}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-ink mb-4">Contact</h3>
          <div className="flex justify-between">
            <span className="text-ink">Phone</span>
            <span className="text-ink font-medium">{booking.phoneNumber}</span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-8 p-4 bg-teal/40 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-ink mb-4">Vehicle</h3>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-ink">
                {booking.vehicleType}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ink">Estimated fare</span>
            <span className="text-ink font-medium">
              {formatPrice(booking.estimatedPrice * 0.85)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-ink">Service fee</span>
            <span className="text-ink font-medium">
              {formatPrice(booking.estimatedPrice * 0.15)}
            </span>
          </div>
          <div className="border-t border-slate-700/30 pt-3 flex justify-between items-center">
            <span className="font-semibold text-ink">Total</span>
            <span className="text-2xl font-bold text-ink">
              {formatPrice(booking.estimatedPrice)}
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-ink text-center mb-8">
          By confirming, you agree to our Terms of Service and Privacy Policy.
          Prices may vary based on traffic conditions.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Button variant="outline" size="lg" onClick={onPrevious}>
            Back
          </Button>
          <Button
            size="lg"
            className="bg-teal text-cloud-light"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Confirm Booking
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
