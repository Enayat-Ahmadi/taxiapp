import { z } from "zod";

export const settingsSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required"),

  companyPhone: z.string().trim().min(1, "Company phone is required"),

  companyEmail: z.string().trim().email("Please enter a valid email address"),

  companyAddress: z.string().trim().min(1, "Company address is required"),

  city: z.string().trim().min(1, "City is required"),

  currency: z.string().trim().min(1, "Currency is required"),

  basePrice: z.number().min(0, "Base price cannot be negative"),

  pricePerKm: z.number().min(0, "Price per KM cannot be negative"),

  pricePerMinute: z.number().min(0, "Price per minute cannot be negative"),

  minimumFare: z.number().min(0, "Minimum fare cannot be negative"),

  cancellationFee: z.number().min(0, "Cancellation fee cannot be negative"),

  platformFeePercentage: z
    .number()
    .min(0, "Platform fee cannot be negative")
    .max(100, "Platform fee cannot exceed 100%"),
});

export type SettingsFormData = z.infer<typeof settingsSchema>;
