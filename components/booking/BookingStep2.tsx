import { motion, AnimatePresence } from "framer-motion";
import { Card, Button } from "../ui";
import Image from "next/image";
import { VEHICLES } from "@/lib/constant";
import { useState, useEffect } from "react";
import {
  cn,
  formatPrice,
  calculateEstimatedPrice,
  formatMinutes,
} from "@/lib/utils";
import { VehicleType } from "@/types";

interface RouteInfo {
  distance: number;
  duration: number;
  estimatedTime: string;
}

interface Step2Props {
  pickupLocation?: string;
  destination?: string;
  onNext: (VehicleType: VehicleType, price: number) => void;
  isLoading?: boolean;
  onPrevious: () => void;
  initialVehicleType?: VehicleType;
}

export default function BookingStep2({
  pickupLocation,
  destination,
  onNext,
  isLoading,
  onPrevious,
  initialVehicleType,
}: Step2Props) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleType | null>(
    initialVehicleType || null,
  );
  const [distance, setDistance] = useState<number | null>(null);
  const [routeInfo, setRouteInfo] = useState<number>(0);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string>("");

  useEffect(() => {
    const fetchDistance = async () => {
      if (!pickupLocation || !destination) {
        setDistance(null);
        return;
      }

      setLoadingRoute(true);
      setRouteError("");
      try {
        const response = await fetch("/api/bookings/distance", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickupLocation,
            destination,
          }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to calculate distance");
        }

        const data = await response.json();
        const route = data.data as RouteInfo;
        setDistance(route.distance);
        setRouteInfo(route.duration);
      } catch (error) {
        console.error("Error fetching route:", error);
        setRouteError(
          error instanceof Error
            ? error.message
            : "Failed to calculate distance",
        );
        setDistance(null);
      } finally {
        setLoadingRoute(false);
      }
    };

    fetchDistance();
  }, [pickupLocation, destination]);

  const handleContinue = () => {
    if (selectedVehicle && distance !== null) {
      const vehicle = VEHICLES[selectedVehicle];
      const estimatedPrice = calculateEstimatedPrice(
        distance,
        routeInfo,
        vehicle,
      );
      onNext(selectedVehicle, estimatedPrice);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
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
          {loadingRoute ? (
            <p className="text-sm text-success mt-2">Calculating distance...</p>
          ) : routeError ? (
            <p className="text-sm text-red-500 mt-2">{routeError}</p>
          ) : distance !== null ? (
            <p className="text-sm text-success font-medium mt-2">
              Distance: {distance} km | {formatMinutes(routeInfo)}
            </p>
          ) : null}
        </div>
        <div className="space-y-4 mb-8">
          {Object.entries(VEHICLES).map(([key, vehicle]) => {
            const isSelected = selectedVehicle === key;
            const estimatePrice =
              distance !== null
                ? calculateEstimatedPrice(distance, routeInfo, vehicle)
                : 0;
            return (
              <motion.button
                key={key}
                onClick={() => setSelectedVehicle(key as VehicleType)}
                className="w-full text-left"
                disabled={distance === null || loadingRoute}
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
            disabled={loadingRoute}
          >
            Back
          </Button>
          <Button
            size="lg"
            className="flex-1 bg-teal text-white disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !selectedVehicle ||
              isLoading ||
              distance === null ||
              loadingRoute ||
              !!routeError
            }
            isLoading={isLoading || loadingRoute}
            onClick={handleContinue}
          >
            {loadingRoute ? "Calculating distance..." : "Continue to Review"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
