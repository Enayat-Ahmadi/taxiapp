import { VehicleType } from "./vehicle";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

/** Fields required when creating a new booking. */
export interface CreateBookingInput {
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  phoneNumber: string;
  vehicleType: VehicleType;
  estimatedPrice: number;
  distance: number;
  estimatedTime: number;
}

/** A persisted booking including database-assigned fields. */
export interface IBooking extends CreateBookingInput {
  _id: string;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ApiResponse<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

export interface StepData {
  step1?: FormFields;
  step2?: {
    vehicleType: VehicleType;
    estimatedPrice: number;
  };
}
export type FormFields = {
  pickupLocation: string;
  destination: string;
  phoneNumber: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
};
