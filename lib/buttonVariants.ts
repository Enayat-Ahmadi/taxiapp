import { cn } from "./utils";

const baseStyle =
  "font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-info focus:ring-offset-2 cursor-pointer";

const variants = {
  primary:
    "bg-sky text-black hover:shadow-brand hover:scale-105 active:scale-95",
  secondary: "bg-teal-active text-ink-dark hover:bg-teal-light",
  outline: "border border-teal text-ink-light hover:bg-teal-dark/10",
  ghost: "text-ink hover:bg-teal-active",
  teal: "bg-teal text-cloud-light hover:bg-teal-dark/90",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const buttonVariants = (
  variant: keyof typeof variants = "primary",
  size: keyof typeof sizes = "md",
  className?: string,
) => cn(baseStyle, variants[variant], sizes[size], className);
