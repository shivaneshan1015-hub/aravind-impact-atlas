import React from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "icon";
  size?: "sm" | "md" | "lg";
  active?: boolean;
  accentColor?: string;
  children: React.ReactNode;
}

export function Button({
  variant = "secondary",
  size = "md",
  active = false,
  accentColor,
  children,
  className,
  style,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none focus:ring-1 focus:ring-slate-400";

  const sizes = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs font-medium gap-2",
    lg: "px-4 py-2 text-sm gap-2.5",
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-xs",
    secondary: "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 hover:text-slate-900",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-100",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100",
    icon: "p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md border border-slate-200",
  };

  const customStyle = active && accentColor ? {
    borderColor: accentColor,
    backgroundColor: `${accentColor}15`,
    color: accentColor,
    ...style
  } : style;

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizes[size],
          variants[variant],
          active && !accentColor && "bg-slate-200 text-slate-900 border-slate-400",
          className
        )
      )}
      style={customStyle}
      {...props}
    >
      {children}
    </button>
  );
}
