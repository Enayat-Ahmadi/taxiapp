import mongoose, { Schema, models, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
}
const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String },
  role: { type: String, enum: ["user", "admin"], default: "user" },
});

export const User =
  models.User<IUser> || mongoose.model<IUser>("User", userSchema);
