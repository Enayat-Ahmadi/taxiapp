export type BookingStatus = "pending" | "confirmed" | "comleted" | "cancelleda";

export type VehicleType = "standard" | "comfort" | "premium";

export interface Vehicle {
  type: VehicleType;
  seats: number;
  luggage: number;
  basePricePerKm: number;
  image: string;
}
export interface Booking {
  _id?: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  phoneNumber: string;
  vehicleType: VehicleType;
  vegicle?: string;
  estimatedPrice: number;
  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
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
