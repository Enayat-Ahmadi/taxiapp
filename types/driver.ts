export interface DriverDto {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  licenseExpire: Date;
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
