"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  label?: string;
  error?: string;
}
export function Input({ label, type, className, error, ...rest }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={label} className="block text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        id={label}
        className={cn(
          "w-full px-4 py-3  rounded-xl border border-slate-700/50 focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none",
          error && "border-error focus:ring-error/20 focus:border-error",
          className,
        )}
        {...rest}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
