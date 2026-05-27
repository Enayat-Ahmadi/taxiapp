"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string | number; label: string }>;
}

export function Select({
  className,
  label,
  error,
  options,
  ...rest
}: SelectProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select
        className={cn(
          "w-full px-4 py-3  rounded-xl border border-slate-700/50 focus:outline-none focus:ring-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed appearance-none",
          error && "border-error focus:ring-error/20 focus:border-error",
          className,
        )}
        {...rest}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}
