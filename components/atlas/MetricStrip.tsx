import React from "react";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem } from "@/types/geo";

interface MetricStripProps {
  entityConfig: EntityConfig;
  selectedSubcategoryId: string;
  selectedState: string | null;
  locations: GeoLocationItem[];
}

export function MetricStrip({
  entityConfig,
  selectedSubcategoryId,
  selectedState,
  locations,
}: MetricStripProps) {
  // Compute dynamic stats from records
  const totalLocations = locations.length;
  const uniqueStates = new Set(locations.map((l) => l.state)).size;
  const uniqueCities = new Set(locations.map((l) => l.city)).size;
  const uniqueCountries = new Set(locations.map((l) => l.country)).size;

  const currentSubcat =
    entityConfig.subcategories.find((s) => s.id === selectedSubcategoryId) ||
    entityConfig.subcategories[0];

  return (
    <div className="bg-white/95 border-b border-slate-200 px-4 py-2 flex items-center justify-between z-10 shrink-0 select-none overflow-x-auto shadow-2xs">
      {/* Scope Indicator */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase">
          {selectedState ? `STATE: ${selectedState.toUpperCase()}` : "SCOPE: NATIONAL & GLOBAL"}
        </span>

        {selectedState && (
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 border border-amber-500/30 font-medium">
            Filtered State View
          </span>
        )}
      </div>

      {/* Metrics Row */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            {currentSubcat?.name || "RECORDS"}:
          </span>
          <span
            className="text-sm font-bold tracking-tight"
            style={{ color: entityConfig.color }}
          >
            {totalLocations}
          </span>
        </div>

        {!selectedState && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              STATES:
            </span>
            <span className="text-sm font-bold text-slate-800">
              {uniqueStates}
            </span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            CITIES:
          </span>
          <span className="text-sm font-bold text-slate-800">
            {uniqueCities}
          </span>
        </div>

        {uniqueCountries > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
              COUNTRIES:
            </span>
            <span className="text-sm font-bold text-slate-800">
              {uniqueCountries}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
