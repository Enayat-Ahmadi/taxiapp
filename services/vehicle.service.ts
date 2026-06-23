import { connectDB } from "@/lib/db";
import { Vehicle } from "@/models/vehicle";
import { VehicleFormData } from "@/lib/validations/vehicles";

export async function addVehicle(data: VehicleFormData) {
  await connectDB();
  const vehicle = await Vehicle.create(data);
  
  return vehicle.toObject();
}
