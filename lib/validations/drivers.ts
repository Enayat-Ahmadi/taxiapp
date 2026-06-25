import { z } from "zod";

export const driverSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters"),

  phoneNumber: z.string().trim().min(5, "Phone number is required"),

  email: z.email("Invalid email address").trim().toLowerCase(),

  licenseNumber: z.string().trim().min(1, "License number is required"),

  licenseExpiry: z.coerce.date(),

  status: z.enum(["active", "inactive"]),
});

export type DriverFormData = z.infer<typeof driverSchema>;
