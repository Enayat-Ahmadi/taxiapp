import { Vehicle } from "@/types";

export const VEHICLES: Record<"comfort" | "premium", Vehicle> = {
  comfort: {
    type: "comfort",
    seats: 4,
    luggage: 3,
    baseFare: 4.5,
    basePricePerKm: 2,
    pricePerMinute: 0.25,
    image: "/comfort.jpg",
  },
  premium: {
    type: "premium",
    seats: 4,
    luggage: 3,
    baseFare: 7,
    basePricePerKm: 2.8,
    pricePerMinute: 0.35,
    image: "/premium.jpg",
  },
};
