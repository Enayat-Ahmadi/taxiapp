export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";

export type VehicleType = "comfort" | "premium";

export interface Vehicle {
  type: VehicleType;
  seats: number;
  luggage: number;
  basePricePerKm: number;
  pricePerMinute: number;
  baseFare: number;
  image: string;
}

export interface IBooking {
  _id: string;
  pickupLocation: string;
  destination: string;
  date: string;
  time: string;
  passengers: number;
  luggage: number;
  phoneNumber: string;
  vehicleType: VehicleType;
  estimatedPrice: number;
  distance?: number;
  estimatedTime?: number;
  status?: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
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
