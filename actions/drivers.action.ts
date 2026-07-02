"use server";

import { DriverFormData, driverSchema } from "@/lib/validations/drivers";
import {
  addDriver,
  deleteDriver,
  getDrivers,
  updateDriver,
} from "@/services/driver.service";
import { revalidatePath } from "next/cache";
import { DriverDto } from "@/types/driver";
import { errorResponse } from "@/lib/errors";
import { requireAdmin } from "@/lib/auth-guard";

type ActionResult<T = void> =
  | { success: true; data?: T }
  | { success: false; error: string };

function validateDriverInput(
  data: DriverFormData,
): { success: true; data: DriverFormData } | { success: false; error: string } {
  const validatedResult = driverSchema.safeParse(data);
  if (!validatedResult.success) {
    return {
      success: false,
      error: validatedResult.error?.issues[0]?.message ?? "Invalid driver data",
    };
  }

  return {
    success: true,
    data: validatedResult.data,
  };
}

export async function getDriversAction(): Promise<ActionResult<DriverDto[]>> {
  try {
    await requireAdmin();
    const drivers = await getDrivers();
    return {
      success: true,
      data: drivers,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

export async function addDriverAction(
  data: DriverFormData,
): Promise<ActionResult<DriverDto>> {
  const validatedResult = validateDriverInput(data);
  if (!validatedResult.success) {
    return validatedResult;
  }

  try {
    await requireAdmin();

    const result = await addDriver(validatedResult.data);
    revalidatePath("/admin/drivers");

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

export async function updateDriverAction(
  id: string,
  data: DriverFormData,
): Promise<ActionResult<DriverDto>> {
  const validatedResult = validateDriverInput(data);
  if (!validatedResult.success) {
    return validatedResult;
  }

  try {
    await requireAdmin();

    const driver = await updateDriver(id, validatedResult.data);
    revalidatePath("/admin/drivers");
    return {
      success: true,
      data: driver,
    };
  } catch (error) {
    return errorResponse(error);
  }
}

export async function deleteDriverAction(
  id: string,
): Promise<ActionResult<void>> {
  try {
    await requireAdmin();

    await deleteDriver(id);
    revalidatePath("/admin/drivers");
    return {
      success: true,
    };
  } catch (error) {
    return errorResponse(error);
  }
}
