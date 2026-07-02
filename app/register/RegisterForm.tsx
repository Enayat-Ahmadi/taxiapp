"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { RegisterInput, registerSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Button } from "@/components/ui";
import { registerAction } from "@/actions/auth.actions";
import { toast } from "sonner";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    console.log("data", data);
    try {
      const res = await registerAction(data);
      if (!res.success) {
        toast.error(res.error);
        return;
      }

      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };
  return (
    <Card className="mx-auto max-w-sm space-y-6 p-6">
      <h1 className="text-xl font-semibold">Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          {...register("fullName")}
          label="Full Name"
          type="text"
          error={errors.fullName?.message}
        />
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
        <Input
          {...register("verifyPassword")}
          label="Verify Password"
          type="password"
          error={errors.verifyPassword?.message}
        />

        <Button variant="teal" size="sm" type="submit" className="w-full">
          {isSubmitting ? "Creating..." : "Create account"}
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="underline">
          Sign in
        </Link>
      </p>
    </Card>
  );
}
