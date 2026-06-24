import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import { VehicleFormData } from "@/lib/validations/vehicles";
import { toVehicleDto } from "@/lib/utils";

export async function addVehicle(data: VehicleFormData) {
  await connectDB();
  try {
    const vehicle = await Vehicle.create(data);
    return toVehicleDto(vehicle);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as { code: unknown }).code === 11000
    ) {
      throw new Error("Vehicle already exists");
    }
    throw new Error("Failed to create vehicle");
  }
}
