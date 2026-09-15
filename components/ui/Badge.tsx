import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "gold" | "demo";
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium tracking-wide transition-colors";

  const variants = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    outline: "border border-slate-300 text-slate-600 bg-transparent",
    gold: "bg-amber-500/10 text-amber-800 border border-amber-500/30",
    demo: "bg-amber-500/10 text-amber-800 border border-amber-500/40 font-semibold tracking-wider",
  };

  return (
    <span
      className={twMerge(clsx(baseStyles, variants[variant], className))}
      {...props}
    >
      {children}
    </span>
  );
}
