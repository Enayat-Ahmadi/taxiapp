import mongoose, { Schema, models, Document } from "mongoose";

interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const User =
  models.User<IUser> || mongoose.model<IUser>("User", userSchema);
