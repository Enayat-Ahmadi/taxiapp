import mongoose, { Schema, Document } from "mongoose";

type DriverStatus = "active" | "inactive";

export interface IDriver extends Document {
  fullName: string;
  phoneNumber: string;
  email: string;
  licenseNumber: string;
  licenseExpire: Date;
  status: DriverStatus;
  createdAt: Date;
  updatedAt: Date;
}

const stringFields = { type: String, required: true, trim: true };

export const driverSchema = new Schema<IDriver>(
  {
    fullName: stringFields,
    phoneNumber: stringFields,
    email: {
      ...stringFields,
      unique: true,
      lowercase: true,
    },

    licenseNumber: {
      ...stringFields,
      unique: true,
    },

    licenseExpire: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true },
);

const Driver =
  mongoose.models.Driver || mongoose.model<IDriver>("Driver", driverSchema);

export default Driver;
