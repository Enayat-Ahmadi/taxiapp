import { z } from "zod";
import { VehicleType } from "@/types/vehicle";

export const VEHICLE_TYPES = ["standard", "comfort", "premium"] as const;

export const vehicleSchema = z.object({
  registrationNumber: z
    .string()
    .trim()
    .min(1, "Registration number is required")
    .max(20, "Registration number is too long"),

  manufacturer: z
    .string()
    .trim()
    .min(2, "Manufacturer is required")
    .max(50, "Manufacturer is too long"),

  vehicleModel: z
    .string()
    .trim()
    .min(1, "Model is required")
    .max(50, "Model is too long"),

  year: z.coerce
    .number()
    .int("Year must be a whole number")
    .min(1900, "Invalid year")
    .max(new Date().getFullYear() + 1, "Invalid year"),

  color: z
    .string()
    .trim()
    .min(2, "Color is required")
    .max(30, "Color is too long"),

  type: z.enum(
    Object.values(VEHICLE_TYPES) as [VehicleType, ...VehicleType[]],
    {
      error: "Please select a vehicle type",
    },
  ),

  seats: z.coerce
    .number()
    .int("Seats must be a whole number")
    .min(1, "Must have at least 1 seat")
    .max(20, "Too many seats"),

  luggageCapacity: z.coerce
    .number()
    .int("Luggage capacity must be a whole number")
    .min(0, "Cannot be negative")
    .max(20, "Invalid luggage capacity"),

  basePricePerKm: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(1000, "Price is too high"),
});

export type VehicleFormData = z.infer<typeof vehicleSchema>;
