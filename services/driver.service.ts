import { connectDB } from "@/lib/db";
import { mapDriver } from "@/lib/mappers/driver.mapper";
import { DriverFormData } from "@/lib/validations/drivers";
import Driver from "@/models/driver";
import { DriverDto } from "@/types/driver";

export async function getDrivers(): Promise<DriverDto[]> {
  await connectDB();
  const drivers = await Driver.find().sort({ createdAt: -1 }).lean();
  return drivers.map(mapDriver);
}

export async function getDriverByID(id: string): Promise<DriverDto | null> {
  await connectDB();

  const driver = await Driver.findById(id).lean();
  if (!driver) return null;
  return mapDriver(driver);
}

export async function updateDriver(
  id: string,
  data: DriverFormData,
): Promise<DriverDto> {
  await connectDB();

  const updatedDriver = await Driver.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  }).lean();

  if (!updatedDriver) {
    throw new Error("Driver not found");
  }
  return mapDriver(updatedDriver);
}

export async function deleteDriver(id: string): Promise<boolean> {
  await connectDB();

  const res = await Driver.findByIdAndDelete(id);
  if (!res) {
    throw new Error("Driver not found");
  }
  return true;
}

export async function addDriver(data: DriverFormData) {
  await connectDB();
  try {
    const driver = await Driver.create(data);
    return mapDriver(driver);
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      error.code === 11000
    ) {
      throw new Error(
        "A driver with this email or license number already exists",
      );
    }
    throw error;
  }
}
