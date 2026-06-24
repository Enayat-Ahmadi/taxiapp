import mongoose, { Schema, Document } from "mongoose";
import { VehicleType } from "@/types/vehicle";
import { VEHICLE_TYPES } from "@/lib/constant";

export interface IVehicle extends Document {
  registrationNumber: string;
  manufacturer: string;
  vehicleModel: string;
  year: number;
  color: string;
  type: VehicleType;
  seats: number;
  luggageCapacity: number;
  basePricePerKm: number;
  createdAt: Date;
  updatedAt: Date;
}

const vehicleSchema = new Schema<IVehicle>(
  {
    registrationNumber: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      unique: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    vehicleModel: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
      min: 1900,
      max: new Date().getFullYear() + 1,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: VEHICLE_TYPES,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    luggageCapacity: {
      type: Number,
      required: true,
      min: 0,
    },
    basePricePerKm: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Vehicle =
  mongoose.models.Vehicle || mongoose.model<IVehicle>("Vehicle", vehicleSchema);
