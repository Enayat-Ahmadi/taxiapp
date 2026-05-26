"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const Button = ({
  children,
  className,
  variant = "primary",
  size = "md",
  isLoading,
  disabled,
  ...rest
}: ButtonProps) => {
  const baseStyle =
    "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-info focus:ring-offset-2 focus:ring-offset-info cursor-pointer";

  const variants = {
    primary:
      "bg-sky text-black hover:shadow-gold-glow hover:scale-105 active:scale-95",
    secondary: "bg-teal-active text-ink-dark hover:bg-teal-light",
    outline: "border border-teal text-ink-light hover:bg-teal-dark/10",
    ghost: "text-ink hover:bg-teal-active",
  };
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };
  return (
    <button
      className={cn(baseStyle, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...rest}
    >
      {children}
    </button>
  );
};
