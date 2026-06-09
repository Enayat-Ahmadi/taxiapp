export type VehicleType = "comfort" | "premium";

export interface Vehicle {
  type: VehicleType;
  seats: number;
  luggage: number;
  basePricePerKm: number;
  image: string;
}

export const VEHICLES: Record<"comfort" | "premium", Vehicle> = {
  comfort: {
    type: "comfort",
    seats: 4,
    luggage: 3,
    basePricePerKm: 2,
    image: "/comfort.jpg",
  },
  premium: {
    type: "premium",
    seats: 4,
    luggage: 3,
    basePricePerKm: 2.5,
    image: "/premium.jpg",
  },
};
