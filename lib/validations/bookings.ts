import { z } from "zod";

const LocationSchema = z
  .string()
  .min(3, "Location must be at least 3 chatacters")
  .max(100, "Location must be less then 100 characters")
  .trim();

const PhoneNumberSchema = z
  .string()
  .regex(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    "Invalid phone number format (e.g., +1 (555) 123-4567)",
  )
  .trim();

const DateSchema = z.string().refine((date) => {
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return bookingDate >= today;
}, "Date must be today or in the future");

const TimeSchema = z
  .string()
  .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)");

const PassengersSchema = z
  .number()
  .int("Must be a whole number")
  .min(1, "Al least 1 passenger required")
  .max(4, "Maximum 4 passenger allowed");
const LuggageSchema = z
  .number()
  .int("Must be a whole number")
  .min(0, "Luggage count cannot be negative")
  .max(6, "Maximum 6 luggage items allowed");

export const TripDetailsSchema = z.object({
  pickupLocation: LocationSchema,
  destination: LocationSchema,
  date: DateSchema,
  time: TimeSchema,
  passengers: PassengersSchema,
  luggage: LuggageSchema,
  phoneNumber: PhoneNumberSchema,
});

export const VehicleSelectionSchema = z.object({
  vehicleType: z.enum(["standard", "comfort", "premium"], {
    message: "Please select a valid vehicle type",
  }),
  estimatedPrice: z
    .number()
    .positive("Price must be greater then 0")
    .finite("Invalid price "),
});

export const BookingSchema = z.object({
  pickupLocation: LocationSchema,
  destination: LocationSchema,
  date: DateSchema,
  time: TimeSchema,
  passengers: PassengersSchema,
  lugguge: LuggageSchema,
  estimatedPrice: z
    .number()
    .positive("Price must be greater than 0")
    .finite("Invalid price"),
});

export type TripDetailsInput = z.infer<typeof TripDetailsSchema>;
export type VehicleSelectionInput = z.infer<typeof VehicleSelectionSchema>;
export type BookingInput = z.infer<typeof BookingSchema>;
