"use client";
import React from "react";
import { cn } from "@/lib/utils";
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "elevated";
}
export const Card = ({
  className,
  variant = "default",
  ...rest
}: CardProps) => {
  const variants = {
    default: "bg-teal-dark border border-slate-700/30",
    glass:
      "bg-teal-dark/50 backdrop-blur-md border border-slate-700/30 shadow-inner-glow",
    elevated: "bg-teal-darkshadow-elevation-md border border-slate-700/30",
  };
  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        variants[variant],
        className,
      )}
      {...rest}
    />
  );
};
