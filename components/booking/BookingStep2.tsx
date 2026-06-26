import { motion } from "framer-motion";
import { Card, Button } from "../ui";
import { useMemo } from "react";
import { VEHICLES } from "@/lib/constants/vehicles";
import { useState, useEffect } from "react";
import { calculateEstimatedPrice, formatMinutes } from "@/lib/utils";
import { VehicleType } from "@/types/vehicle";
import { getDistanceAction } from "@/actions/distance.action";
import VehicelCard from "./VehicleCard";

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
  const [duration, setDuration] = useState<number>(0);
  const [loadingRoute, setLoadingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string>("");

  useEffect(() => {
    const fetchDistance = async () => {
      if (!pickupLocation || !destination) return;

      setLoadingRoute(true);
      setRouteError("");

      const response = await getDistanceAction(pickupLocation, destination);

      if (response.success) {
        setDistance(response.data.distance);
        setDuration(response.data.duration);
      } else {
        setRouteError(response.error);
        setDistance(null);
      }

      setLoadingRoute(false);
    };

    fetchDistance();
  }, [pickupLocation, destination]);

  const vehiclePrices = useMemo(() => {
    if (distance === null) return {};
    return Object.fromEntries(
      Object.entries(VEHICLES).map(([key, vehicle]) => [
        key,
        calculateEstimatedPrice(distance, duration, vehicle),
      ]),
    );
  }, [distance, duration]);

  const handleContinue = () => {
    if (selectedVehicle && distance !== null) {
      onNext(selectedVehicle, vehiclePrices[selectedVehicle] ?? 0);
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
          {pickupLocation && destination && (
            <p className="text-ink text-sm">
              From {pickupLocation} to {destination}
            </p>
          )}
          {loadingRoute && (
            <p className="text-sm text-success mt-2">Calculating distance...</p>
          )}
          {routeError && (
            <p className="text-sm text-red-500 mt-2">{routeError}</p>
          )}
          {!loadingRoute && !routeError && distance !== null && (
            <p className="text-sm text-success font-medium mt-2">
              Distance: {distance} km | {formatMinutes(duration)}
            </p>
          )}
        </div>
        <div className="space-y-4 mb-8">
          {Object.entries(VEHICLES).map(([key, vehicle]) => {
            return (
              <VehicelCard
                key={key}
                vehicleKey={key}
                vehicle={vehicle}
                isSelected={selectedVehicle === key}
                estimatedPrice={vehiclePrices[key] ?? 0}
                disabled={distance === null || loadingRoute}
                onSelect={setSelectedVehicle}
              />
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
