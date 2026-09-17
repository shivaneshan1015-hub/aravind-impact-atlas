"use client";

import React from "react";
import { Globe, MapPin } from "lucide-react";

export interface QuickScopeNavProps {
  activeScope: "global" | "bangladesh" | "india" | "nepal";
  onSelectScope: (scope: "global" | "bangladesh" | "india" | "nepal") => void;
}

export function QuickScopeNav({ activeScope, onSelectScope }: QuickScopeNavProps) {
  const scopes = [
    {
      id: "global" as const,
      label: "Global Overview",
      flag: "🌐",
      count: "338 Sites",
    },
    {
      id: "bangladesh" as const,
      label: "Bangladesh",
      flag: "🇧🇩",
      count: "222 VCMS",
    },
    {
      id: "india" as const,
      label: "India",
      flag: "🇮🇳",
      count: "170 VCMS",
    },
    {
      id: "nepal" as const,
      label: "Nepal",
      flag: "🇳🇵",
      count: "6 VCMS",
    },
  ];

  return (
    <div className="absolute top-6 right-6 z-20 select-none">
      <div className="bg-white/95 border border-slate-300/80 p-1.5 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-1.5">
        {scopes.map((s) => {
          const isSelected = activeScope === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelectScope(s.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 active:scale-95 ${
                isSelected
                  ? "bg-gradient-to-r from-sky-600 to-blue-700 text-white shadow-md ring-2 ring-sky-400/40"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80"
              }`}
            >
              <span className="text-sm">{s.flag}</span>
              <span className="tracking-tight">{s.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-200/70 text-slate-600"
                }`}
              >
                {s.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
