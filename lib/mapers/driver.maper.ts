import { IDriver } from "@/models/driver";
import { DriverDto } from "@/types/driver";

export function mapDriver(driver: IDriver): DriverDto {
  return {
    id: driver._id.toString() ?? driver._id,
    fullName: driver.fullName,
    phoneNumber: driver.phoneNumber,
    email: driver.email,
    licenseNumber: driver.licenseNumber,
    licenseExpiry: driver.licenseExpire,
    status: driver.status,
    createdAt: driver.createdAt,
    updatedAt: driver.updatedAt,
  };
}
