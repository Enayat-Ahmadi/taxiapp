import mongoose, { Schema, Document } from "mongoose";

const DEFAULT_PRICING = {
  BASE_PRICE: 3.5,
  PRICE_PER_KM: 1.2,
  PRICE_PER_MINUTE: 0.25,
  PLATFORM_FEE: 15,
  CANCELLATION_FEE: 2,
  MINIMUM_FARE: 5,
} as const;

const numberField = {
  type: Number,
  min: 0,
};

const stringField = {
  type: String,
  trim: true,
};

export interface ISettings extends Document {
  //Company
  companyName: string;
  companyPhone: string;
  companyEmail: string;

  // Location
  companyAddress: string;
  city: string;

  // Pricing
  currency: string;
  basePrice: number;
  pricePerKm: number;
  pricePerMinute: number;
  minimumFare: number;
  cancellationFee: number;
  platformFeePercentage: number;

  createdAt: Date;
  updatedAt: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: {
      ...stringField,
      required: [true, "Company name is required"],
    },
    companyPhone: {
      ...stringField,
      required: [true, "Company phone is required"],
    },
    companyEmail: {
      ...stringField,
      required: [true, "Company email is required"],
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    companyAddress: {
      ...stringField,
      required: [true, "Company address is required"],
    },
    city: {
      ...stringField,
      required: [true, "City is required"],
    },

    currency: {
      ...stringField,
      default: "EUR",
    },
    basePrice: {
      ...numberField,
      default: DEFAULT_PRICING.BASE_PRICE,
    },
    pricePerKm: {
      ...numberField,
      default: DEFAULT_PRICING.PRICE_PER_KM,
    },
    pricePerMinute: {
      ...numberField,
      default: DEFAULT_PRICING.PRICE_PER_MINUTE,
    },
    minimumFare: {
      ...numberField,
      default: DEFAULT_PRICING.MINIMUM_FARE,
    },
    cancellationFee: {
      ...numberField,
      default: DEFAULT_PRICING.CANCELLATION_FEE,
    },
    platformFeePercentage: {
      ...numberField,
      default: DEFAULT_PRICING.PLATFORM_FEE,
      max: 100,
    },
  },
  { timestamps: true },
);

export const Settings =
  mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", SettingsSchema);
