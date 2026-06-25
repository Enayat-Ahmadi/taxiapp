import { connectDB } from "@/lib/db";
import { DriverFormData } from "@/lib/validations/drivers";
import Driver from "@/models/driver";

export async function addDriver(data: DriverFormData) {
  await connectDB();
  try {
    const driver = await Driver.create(data);
    return driver;
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
