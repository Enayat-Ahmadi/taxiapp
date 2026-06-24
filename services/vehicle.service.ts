import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import { VehicleFormData } from "@/lib/validations/vehicles";
import { toVehicleDto } from "@/lib/utils";
import { VehicleDto } from "@/types/vehicle";

export async function getVehicles(): Promise<VehicleDto[]> {
  await connectDB();
  const vehicles = await Vehicle.find().sort({ createdAt: -1 }).lean();

  return vehicles.map(toVehicleDto);
}

export async function getVehicleById(id: string): Promise<VehicleDto | null> {
  await connectDB();
  const vehicle = await Vehicle.findById(id).lean();
  if (!vehicle) return null;

  return toVehicleDto(vehicle);
}

export async function updateVehicle(
  id: string,
  data: VehicleFormData,
): Promise<VehicleDto> {
  await connectDB();
  const updatedVehicle = await Vehicle.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updatedVehicle) {
    throw new Error("Vehicle not found");
  }
  return toVehicleDto(updatedVehicle);
}

export async function addVehicle(data: VehicleFormData): Promise<VehicleDto> {
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
