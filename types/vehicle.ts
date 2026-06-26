export type VehicleType = "standard" | "comfort" | "premium";

export interface Vehicle {
  type: VehicleType;
  seats: number;
  luggageCapacity: number;
  basePricePerKm: number;
  pricePerMinute: number;
  baseFare: number;
  image: string;
}

export interface VehicleDto {
  _id: string;
  registrationNumber: string;
  manufacturer: string;
  vehicleModel: string;
  year: number;
  color: string;
  type: VehicleType;
  seats: number;
  luggageCapacity: number;
  basePricePerKm: number;
  createdAt: string;
  updatedAt: string;
}
