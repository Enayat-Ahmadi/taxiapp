import mongoose, { Schema } from "mongoose";
import type { IBooking } from "@/types/booking";

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    destination: {
      type: String,
      required: [true, "Destination is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
    },
    passengers: {
      type: Number,
      required: [true, "Number of passengers is required"],
      min: 1,
      max: 4,
    },
    luggage: {
      type: Number,
      required: [true, "Number of luggage is required"],
      min: 0,
      max: 6,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    vehicleType: {
      type: String,
      enum: ["standard", "comfort", "premium"],
      required: [true, "Vehicle type is required"],
    },
    estimatedPrice: {
      type: Number,
      required: [true, "Estimated price is required"],
      min: 0,
    },
    distance: {
      type: Number,
      default: null,
    },
    estimatedTime: {
      type: Number,
      default: null,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Booking =
  mongoose.models.Booking || mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
