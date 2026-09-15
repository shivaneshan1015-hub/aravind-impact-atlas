import React from "react";
import { EntityConfig } from "@/types/entity";

interface LegendProps {
  entityConfig: EntityConfig;
  selectedState: string | null;
  selectedSubcategoryId: string;
}

export function Legend({
  entityConfig,
  selectedState,
  selectedSubcategoryId,
}: LegendProps) {
  const color = entityConfig.color;
  const currentSubcat =
    entityConfig.subcategories.find((s) => s.id === selectedSubcategoryId) ||
    entityConfig.subcategories[0];

  return (
    <div className="absolute bottom-6 left-6 bg-slate-950/90 border border-slate-800/80 rounded-lg p-3 text-xs z-10 shadow-lg backdrop-blur-md select-none max-w-xs">
      <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
        {currentSubcat?.legendTitle || "Map Legend"}
      </h4>

      {selectedState ? (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-white/40 shadow-sm shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-slate-300">
              Individual {entityConfig.shortName} Facility Marker
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-[11px] text-slate-300 font-medium">
            State Density & Location Counts
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full opacity-50"
                style={{ backgroundColor: color }}
              />
              <span>1 - 2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full opacity-80"
                style={{ backgroundColor: color }}
              />
              <span>3 - 4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                style={{ backgroundColor: color }}
              />
              <span>5+</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
