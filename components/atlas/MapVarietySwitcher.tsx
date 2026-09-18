"use client";

import React, { useState } from "react";
import { Layers, Check, Sparkles, X } from "lucide-react";
import { MAP_VARIETIES, MapVarietyId } from "@/lib/map-utils";

interface MapVarietySwitcherProps {
  activeVariety: MapVarietyId;
  onSelectVariety: (varietyId: MapVarietyId) => void;
}

export function MapVarietySwitcher({
  activeVariety,
  onSelectVariety,
}: MapVarietySwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const currentOption = MAP_VARIETIES.find((v) => v.id === activeVariety) || MAP_VARIETIES[0];

  return (
    <div className="relative z-20 select-none">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-3.5 py-2.5 bg-white/95 border border-slate-300 rounded-xl text-slate-800 shadow-lg backdrop-blur-md hover:bg-slate-50 transition-all flex items-center gap-2.5 active:scale-95 font-black text-xs"
        title="Switch Map Variety & Theme Style"
      >
        <div
          className="w-3.5 h-3.5 rounded-full border border-white shadow-xs shrink-0 animate-pulse"
          style={{ backgroundColor: currentOption.borderColor }}
        />
        <div className="flex flex-col items-start leading-tight">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MAP VARIETY</span>
          <span className="text-xs font-black text-slate-800">{currentOption.name}</span>
        </div>
        <Layers className="w-4 h-4 text-sky-600 ml-1 shrink-0" />
      </button>

      {/* Expandable Varieties Modal / Popover */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-80 bg-white/95 border border-slate-300 rounded-2xl p-3 shadow-2xl backdrop-blur-xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 px-1">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Map Varieties</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-0.5">
            {MAP_VARIETIES.map((varItem) => {
              const isSelected = activeVariety === varItem.id;
              return (
                <button
                  key={varItem.id}
                  onClick={() => {
                    onSelectVariety(varItem.id);
                    setIsOpen(false);
                  }}
                  className={`w-full p-2.5 rounded-xl border text-left flex items-start justify-between transition-all active:scale-98 ${
                    isSelected
                      ? "bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-sky-400/40"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="space-y-1 pr-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-white shrink-0"
                        style={{ backgroundColor: varItem.borderColor }}
                      />
                      <span className="font-black text-xs leading-tight">{varItem.name}</span>
                      <span
                        className={`px-1.5 py-0.2 text-[9px] font-extrabold uppercase rounded ${
                          isSelected ? "bg-white/20 text-sky-300" : "bg-slate-200 text-slate-700"
                        }`}
                      >
                        {varItem.badge}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] leading-snug font-normal ${
                        isSelected ? "text-slate-300" : "text-slate-500"
                      }`}
                    >
                      {varItem.desc}
                    </p>
                  </div>

                  {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
