"use server";

import { VehicleFormData, vehicleSchema } from "@/lib/validations/vehicles";
import {
  addVehicle,
  getVehicles,
  updateVehicle,
  deleteVehicle,
} from "@/services/vehicle.service";
import { revalidatePath } from "next/cache";
import { VehicleDto } from "@/types/vehicle";
import { errorResponse } from "@/lib/errors";

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
    return errorResponse(error);
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
    return errorResponse(error);
  }
}

export async function updatedVehicleAction(
  id: string,
  data: VehicleFormData,
): Promise<ActionResult<VehicleDto>> {
  const result = vehicleSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: result.error?.issues[0]?.message ?? "Invalid vehicle data",
    };
  }
  try {
    const vehicle = await updateVehicle(id, data);
    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${id}`);
    return {
      success: true,
      data: vehicle,
    };
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}

export async function deleteVehicleAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await deleteVehicle(id);
    revalidatePath("/admin/vehicles");
    return {
      success: true,
    };
  } catch (error) {
    console.error(error);
    return errorResponse(error);
  }
}