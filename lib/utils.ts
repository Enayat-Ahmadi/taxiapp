import { Vehicle, VehicleDto } from "@/types/vehicle";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...args: ClassValue[]) => {
  return twMerge(clsx(args));
};
export function getTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const h = String(hour).padStart(2, "0");
      const m = String(minute).padStart(2, "0");
      slots.push(`${h}:${m}`);
    }
  }
  return slots;
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
  distanceKm: number,
  durationMins: number,
  vehicle: Vehicle,
): number {
  const price =
    vehicle.baseFare +
    distanceKm * vehicle.basePricePerKm +
    durationMins * vehicle.pricePerMinute;

  return Math.round(price * 100) / 100;
}
export const PASSENGER_OPTIONS = Array.from({ length: 4 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? "Passenger" : "Passengers"}`,
}));
export const LUGGAGE_OPTIONS = Array.from({ length: 4 }, (_, i) => ({
  value: i,
  label: i === 0 ? "No Luggage" : `${i} ${i === 1 ? "Bag" : "Bags"}`,
}));

export function formatMinutes(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];

  if (hours > 0) {
    parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  }

  if (minutes > 0 || hours === 0) {
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  }

  return parts.join(" ");
}

export function toVehicleDto(vehicle: VehicleDto) {
  return {
    _id: vehicle._id.toString(),
    registrationNumber: vehicle.registrationNumber,
    manufacturer: vehicle.manufacturer,
    vehicleModel: vehicle.vehicleModel,
    year: vehicle.year,
    color: vehicle.color,
    type: vehicle.type,
    seats: vehicle.seats,
    luggageCapacity: vehicle.luggageCapacity,
    basePricePerKm: vehicle.basePricePerKm,
    createdAt: vehicle.createdAt,
    updatedAt: vehicle.updatedAt,
  };
}
