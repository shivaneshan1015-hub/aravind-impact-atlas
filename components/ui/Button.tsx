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
    "inline-flex items-center justify-center rounded-md transition-all duration-200 font-medium disabled:opacity-50 disabled:pointer-events-none select-none focus:outline-none focus:ring-1 focus:ring-slate-500";

  const sizes = {
    sm: "px-2.5 py-1 text-xs gap-1.5",
    md: "px-3.5 py-1.5 text-xs font-medium gap-2",
    lg: "px-4 py-2 text-sm gap-2.5",
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-sm",
    secondary: "bg-slate-900/80 text-slate-200 border border-slate-800 hover:bg-slate-800 hover:border-slate-700",
    outline: "border border-slate-700 text-slate-300 hover:bg-slate-800/60",
    ghost: "text-slate-400 hover:text-white hover:bg-slate-800/50",
    icon: "p-2 text-slate-400 hover:text-white hover:bg-slate-800/70 rounded-md border border-slate-800",
  };

  const customStyle = active && accentColor ? {
    borderColor: accentColor,
    backgroundColor: `${accentColor}1A`, // ~10% opacity
    color: "#FFFFFF",
    ...style
  } : style;

  return (
    <button
      className={twMerge(
        clsx(
          baseStyles,
          sizes[size],
          variants[variant],
          active && !accentColor && "bg-slate-800 text-white border-slate-600",
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
