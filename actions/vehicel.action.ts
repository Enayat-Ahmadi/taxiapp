"use server";

import { VehicleFormData, vehicleSchema } from "@/lib/validations/vehicles";
import { IVehicle } from "@/models/vehicle";
import { addVehicle } from "@/services/vehicle.service";
import { revalidatePath } from "next/cache";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}
export async function addVehicleAction(
  data: VehicleFormData,
): Promise<ActionResult<IVehicle>> {
  try {
    const validated = vehicleSchema.parse(data);
    const result = await addVehicle(validated);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add vehicle",
    };
  }
}
