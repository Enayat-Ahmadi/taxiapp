import { Vehicle, VehicleType } from "@/types/vehicle";

export const VEHICLES: Record<"standard" | "comfort" | "premium", Vehicle> = {
  standard: {
    type: "standard",
    seats: 4,
    luggage: 2,
    baseFare: 3.5,
    basePricePerKm: 1.2,
    pricePerMinute: 0.2,
    image: "/standard.jpg",
  },
  comfort: {
    type: "comfort",
    seats: 4,
    luggage: 3,
    baseFare: 4.5,
    basePricePerKm: 2,
    pricePerMinute: 0.25,
    image: "/comfort.jpg",
  },
  premium: {
    type: "premium",
    seats: 4,
    luggage: 3,
    baseFare: 7,
    basePricePerKm: 2.8,
    pricePerMinute: 0.35,
    image: "/premium.jpg",
  },
};

export const VEHICLE_TYPES = ["standard", "comfort", "premium"] as const;

export function calculateServerPrice(
  vehicleType: VehicleType,
  distanceKm: number,
  durationMins: number,
): number {
  const vehicle = VEHICLES[vehicleType];
  return Number(
    vehicle.baseFare +
      distanceKm * vehicle.basePricePerKm +
      durationMins * vehicle.pricePerMinute,
  );
}