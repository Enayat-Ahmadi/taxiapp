// actions/auth.actions.ts
"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { registerSchema } from "@/lib/validations/auth";
import { findUserByEmail, createUser } from "@/services/user.service";
import { LoginInput } from "@/lib/validations/auth";

export type AuthState = {
  error?: string;
  success?: boolean;
};


// ---- Register ----
export async function registerAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Invalid email or password format" };
  }

  const { email, password } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return { error: "User already exists" };
  }

  await createUser({ email, password });

  return { success: true };
}

// ---- Login (credentials) ----
export async function loginAction(data: LoginInput): Promise<AuthState> {
  try {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/admin",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password" };
    }
    throw error;
  }
}

// ---- Login (Google) ----
export async function googleSignInAction() {
  await signIn("google", { redirectTo: "/admin" });
}

// ---- Sign out ----
export async function signOutAction() {
  await signOut({ redirectTo: "/login" });
}
