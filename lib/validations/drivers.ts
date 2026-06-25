import { z } from "zod";

export const driverSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),

  phoneNumber: z
    .string()
    .regex(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Invalid phone number format (e.g., +1 (555) 123-4567)",
    )
    .trim(),

  email: z.email("Invalid email address").trim().toLowerCase(),

  licenseNumber: z.string().trim().min(1, "License number is required"),

  licenseExpire: z.coerce.date(),

  status: z.enum(["active", "inactive"]),
});

export type DriverFormData = z.infer<typeof driverSchema>;
