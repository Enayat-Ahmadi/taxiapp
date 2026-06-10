import { motion } from "framer-motion";
import { Card, Button } from "../ui";
import { VehicleType } from "@/lib/constant";
import { formatPrice } from "@/lib/utils";

type BookingStatus = "pending" | "confirmed" | "comleted" | "cancelleda";
export interface Booking {
  _id?: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  phoneNumber: string;
  vehicleType: VehicleType;
  vegicle?: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
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
  console.log(booking);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">
          Review Your Booking
        </h2>

        {/* Journey Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Journey
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-text-secondary">From</span>
              <span className="text-text-primary font-medium">
                {booking.pickupLocation}
              </span>
            </div>
            <div className="flex justify-between items-start">
              <span className="text-text-secondary">To</span>
              <span className="text-text-primary font-medium">
                {booking.destination}
              </span>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Trip Details
          </h3>
          <div className="grid grid-cols-1 gap-4 ">
            <div className="flex justify-between border border-gold-primary/50 rounded-md p-1">
              <p className="text-sm text-text-secondary mb-1">Date</p>
              <p className="text-text-primary font-medium">{booking.date}</p>
            </div>
            <div className="flex justify-between border border-gold-primary/50 rounded-md p-1">
              <p className="text-sm text-text-secondary mb-1">Time</p>
              <p className="text-text-primary font-medium">{booking.time}</p>
            </div>
            <div className="flex justify-between border border-gold-primary/50 rounded-md p-1">
              <p className="text-sm text-text-secondary mb-1">Passengers</p>
              <p className="text-text-primary font-medium">
                {booking.passengers}
              </p>
            </div>
            <div className="flex justify-between border border-gold-primary/50 rounded-md p-1">
              <p className="text-sm text-text-secondary mb-1">Luggage</p>
              <p className="text-text-primary font-medium">{booking.luggage}</p>
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="mb-8 pb-8 border-b border-slate-700/30">
          <h3 className="text-lg font-semibold text-text-primary mb-4">
            Contact
          </h3>
          <div className="flex justify-between">
            <span className="text-text-secondary">Phone</span>
            <span className="text-text-primary font-medium">
              {booking.phoneNumber}
            </span>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="mb-8 p-4 bg-bg-bento/50 rounded-xl">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Vehicle
              </h3>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gold-primary">
                {booking.vehicleType}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-text-secondary">Estimated fare</span>
            <span className="text-text-primary font-medium">
              {formatPrice(booking.estimatedPrice * 0.85)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-text-secondary">Service fee</span>
            <span className="text-text-primary font-medium">
              {formatPrice(booking.estimatedPrice * 0.15)}
            </span>
          </div>
          <div className="border-t border-slate-700/30 pt-3 flex justify-between items-center">
            <span className="font-semibold text-text-primary">Total</span>
            <span className="text-2xl font-bold text-gold-primary">
              {formatPrice(booking.estimatedPrice)}
            </span>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-text-secondary text-center mb-8">
          By confirming, you agree to our Terms of Service and Privacy Policy.
          Prices may vary based on traffic conditions.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            size="lg"
            className="flex-1"
            onClick={onPrevious}
          >
            Back
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-gradient-gold text-black"
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
