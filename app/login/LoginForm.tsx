"use client";

import { loginAction, googleSignInAction } from "@/actions/auth.actions";
import Link from "next/link";
import { Card, Button, Input } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/validations/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoginInput } from "@/lib/validations/auth";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });
  const handleForm = async (data: LoginInput) => {
    try {
      const res = await loginAction(data);
      if (res.success) {
        router.push("/admin");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };
  return (
    <Card className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-xl font-semibold">Sign in</h1>

     

      <div className="flex items-center gap-2 text-xs text-gray-400">
        <div className="h-px flex-1 bg-gray-200" />
        or
        <div className="h-px flex-1 bg-gray-200" />
      </div>

      {/* Credentials sign-in */}
      <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
        <Input
          {...register("email")}
          label="Email"
          type="email"
          error={errors.email?.message}
        />

        <Input
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
        />

        <Button variant="teal" size="sm" type="submit" className="w-full">
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>

      <p className="text-center text-sm text-ink">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </p>
    </Card>
  );
}
