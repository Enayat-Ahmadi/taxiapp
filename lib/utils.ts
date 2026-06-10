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
  distance: number = 15,
  pricePerKM: number,
): number {
  return Math.round(distance * pricePerKM * 100) / 100;
}
export const PASSENGER_OPTIONS = Array.from({ length: 4 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1} ${i === 0 ? "Passenger" : "Passengers"}`,
}));
export const LUGGAGE_OPTIONS = Array.from({ length: 4 }, (_, i) => ({
  value: i,
  label: i === 0 ? "No Luggage" : `${i} ${i === 1 ? "Bag" : "Bags"}`,
}));
