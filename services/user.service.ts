import { connectDB } from "@/lib/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

type FormData = {
  email: string;
  password?: string;
  fullName: string;
};

export async function findUserByEmail(email: string) {
  await connectDB();
  return User.findOne({ email });
}

export async function createUser({ email, fullName, password }: FormData) {
  await connectDB();
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  return User.create({
    email,
    password: hashedPassword,
    fullName,
  });
}

export async function verifyPassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}
