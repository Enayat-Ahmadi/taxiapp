// actions/auth.actions.ts
"use server";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import { findUserByEmail, createUser } from "@/services/user.service";
import { LoginInput } from "@/lib/validations/auth";


type AuthState = { success: true } | { success: false; error: string };

// ---- Register ----
export async function registerAction(data: RegisterInput): Promise<AuthState> {
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const { email, password, fullName } = parsed.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return { success: false, error: "User already exists" };
  }

  await createUser({ email, password, fullName });

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
      return { success: false, error: "Invalid email or password" };
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
