"use client";

import React, { useEffect, useState } from "react";

interface AnimatedCounterProps {
  value: string; // e.g. "4,500,000+", "35,000,000+", "350+"
  className?: string;
  style?: React.CSSProperties;
}

export function AnimatedCounter({ value, className = "", style }: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState<string>("0");

  useEffect(() => {
    // Extract numeric part and suffix
    const cleanNumStr = value.replace(/,/g, "").replace(/[^0-9.]/g, "");
    const targetNum = parseFloat(cleanNumStr);

    if (isNaN(targetNum)) {
      setDisplayValue(value);
      return;
    }

    const hasPlus = value.includes("+");
    const hasPercent = value.includes("%");
    const suffix = (hasPlus ? "+" : "") + (hasPercent ? "%" : "");

    let start = 0;
    const durationMs = 1000;
    const steps = 30;
    const increment = targetNum / steps;
    const intervalTime = durationMs / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetNum) {
        setDisplayValue(Math.round(targetNum).toLocaleString() + suffix);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.round(start).toLocaleString() + suffix);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span className={className} style={style}>
      {displayValue}
    </span>
  );
}
