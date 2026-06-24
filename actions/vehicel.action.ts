"use server";

import { VehicleFormData, vehicleSchema } from "@/lib/validations/vehicles";
import { addVehicle, getVehicles } from "@/services/vehicle.service";
import { revalidatePath } from "next/cache";
import { VehicleDto } from "@/types/vehicle";

interface ActionResult<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function getVehiclesAction(): Promise<ActionResult<VehicleDto[]>> {
  try {
    const result = await getVehicles();
    return { success: true, data: result };
  } catch (error) {
    console.error("Failed to fetch vehicles:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch vehicles";
    return { success: false, error: errorMessage };
  }
}

export async function addVehicleAction(
  data: VehicleFormData,
): Promise<ActionResult<VehicleDto>> {
  const result = vehicleSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error?.issues[0]?.message ?? "Invalid vehicle data",
    };
  }
  const validated = result.data;
  try {
    const vehicle = await addVehicle(validated);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
      data: vehicle,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to add vehicle",
    };
  }
}
