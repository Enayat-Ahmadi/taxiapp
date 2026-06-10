import { motion, AnimatePresence} from "framer-motion";
import { Card } from "../ui";
import Image from "next/image";
import { VEHICLES, VehicleType } from "@/lib/constant";
import { useState } from "react";
import { Button } from "../ui";
import { cn } from "@/lib/utils";

interface Step2Props {
  pickupLocation?: string;
  destination?: string;
  onNext: (VehicleType: VehicleType, price: number) => void;
  isLoading?: boolean;
  onPrevious: () => void;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
export function calculateEstimatedPrice(
  distance: number = 15,
  pricePerKM: number,
): number {
  return Math.round(distance * pricePerKM * 100) / 100;
}

export default function BookingStep2({
  pickupLocation,
  destination,
  onNext,
  isLoading,
  onPrevious,
}: Step2Props) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    null,
  );

  const distance = 15; //KM

  const handleContinue = () => {
    if (selectedVehicle) {
      const vehicle = VEHICLES[selectedVehicle];
      const estimatedPrice = calculateEstimatedPrice(
        distance,
        vehicle.basePricePerKm,
      );
      console.log(selectedVehicle, estimatedPrice);
      onNext(selectedVehicle, estimatedPrice);
    }
  };
  return (
    <motion.div>
      <Card className="mb-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-ink-dark mb-2">
            Choose your Vehicle
          </h2>
          <p className="text-ink text-sm">
            {pickupLocation && destination && (
              <>
                From {pickupLocation} to {destination}
              </>
            )}
          </p>
        </div>
        <div className="space-y-4 mb-8">
          {Object.entries(VEHICLES).map(([key, vehicle]) => {
            const isSelected = selectedVehicle === key;
            const price = vehicle.basePricePerKm;
            const estimatePrice = calculateEstimatedPrice(distance, price);
            return (
              <motion.button
                key={key}
                onClick={() => setSelectedVehicle(key as VehicleType)}
                className="w-full text-left"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={cn(
                    "cursor-pointer transition-all duration-300 overflow-hidden",
                    isSelected
                      ? "border-info/50 bg-success/30 shadow-info"
                      : "hover:border-warning/50",
                  )}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
                    {/* Vehicle Image */}
                    <div className="md:col-span-4">
                      <div className="relative w-full bg-bg-bento rounded-lg overflow-hidden">
                        <Image
                          src={vehicle.image}
                          alt={vehicle.type}
                          width={600}
                          height={100}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    {/* vekicle info */}
                    <div className="flex justify-between md:col-span-4">
                      <div className=" ">
                        <h3 className="text-lg font-semibold text-ink capitalize">
                          {vehicle.type}
                        </h3>

                        <div className="flex gap-4 text-xs text-ink">
                          <span>👥 {vehicle.seats} seats</span>
                          <span>🎒 {vehicle.luggage} bags</span>
                        </div>
                      </div>
                      <div className="md:col-span-1 text-right">
                        <div className="mb-2">
                          <p className="text-xs text-ink-dark">
                            Estimated fare
                          </p>
                          <p className="text-2xl font-bold text-ink">
                            {formatPrice(estimatePrice)}
                          </p>
                        </div>
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              className="inline-block"
                            >
                              <div className="w-6 h-6 bg-info rounded-full flex items-center justify-center text-cloud-light">
                                ✓
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.button>
            );
          })}
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
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
            className="flex-1 bg-teal text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedVehicle || isLoading}
            isLoading={isLoading}
            onClick={handleContinue}
          >
            Continue to Review
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
