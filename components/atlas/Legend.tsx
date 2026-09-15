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
  const color = entityConfig.color || "#EA580C";
  const currentSubcat =
    entityConfig.subcategories.find((s) => s.id === selectedSubcategoryId) ||
    entityConfig.subcategories[0];

  return (
    <div className="absolute bottom-6 left-6 bg-white/95 border border-slate-200 rounded-lg p-3 text-xs z-10 shadow-md backdrop-blur-sm select-none max-w-xs">
      <h4 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">
        {currentSubcat?.legendTitle || "Map Legend"}
      </h4>

      {selectedState ? (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full border border-white shadow-xs shrink-0"
              style={{ backgroundColor: color }}
            />
            <span className="text-slate-700 font-medium">
              Individual {entityConfig.shortName} Marker
            </span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-[11px] text-slate-700 font-medium">
            State Density & Location Counts
          </div>
          <div className="flex items-center gap-3 text-[11px] text-slate-600">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full opacity-40"
                style={{ backgroundColor: color }}
              />
              <span>1 - 2</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full opacity-70"
                style={{ backgroundColor: color }}
              />
              <span>3 - 4</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full ring-2 ring-amber-500/20"
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
