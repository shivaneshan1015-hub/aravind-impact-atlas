"use client";

import React from "react";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { RotateCcw } from "lucide-react";

export interface SidebarPanelProps {
  entityConfig: EntityConfig;
  locations: GeoLocationItem[];
  stateAggregations: StateAggregation[];
  careTypeFilter: "all" | "tertiary" | "secondary" | "community";
  onSelectCareTypeFilter: (filter: "all" | "tertiary" | "secondary" | "community") => void;
  revealMaxYear: number | null;
  onSelectMaxYear: (year: number | null) => void;
  selectedState: string | null;
  onSelectState: (stateName: string | null) => void;
}

export function SidebarPanel({
  entityConfig,
  locations,
  stateAggregations,
  careTypeFilter,
  onSelectCareTypeFilter,
  revealMaxYear,
  onSelectMaxYear,
  selectedState,
  onSelectState,
}: SidebarPanelProps) {
  // Count breakdown by centre type
  const tertiaryCount = locations.filter((l) => l.careType === "tertiary").length;
  const secondaryCount = locations.filter((l) => l.careType === "secondary").length;
  const communityCount = locations.filter((l) => l.careType === "community").length;

  const minYear = 1976;
  const maxYear = 2025;
  const currentMaxYear = revealMaxYear ?? maxYear;

  // Filter state breakdown based on currently visible locations
  const stateCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    locations.forEach((loc) => {
      if (!revealMaxYear || !loc.establishedYear || loc.establishedYear <= revealMaxYear) {
        if (careTypeFilter === "all" || loc.careType === careTypeFilter) {
          counts[loc.state] = (counts[loc.state] || 0) + 1;
        }
      }
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1]);
  }, [locations, revealMaxYear, careTypeFilter]);

  const totalFilteredCount = stateCounts.reduce((acc, [, cnt]) => acc + cnt, 0);

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200/90 flex flex-col z-20 text-slate-900 select-none overflow-y-auto shrink-0 p-5 space-y-5 shadow-sm font-sans">
      {/* Top Header Title */}
      <div>
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 inline-block mb-1">
          {entityConfig.shortName.toUpperCase()} FOOTPRINT
        </span>
        <h1 className="text-lg font-extrabold text-slate-900 leading-tight">
          Eye Care Facilities by Location
        </h1>
      </div>

      {/* Dark Hero Metric Banner Card */}
      <div className="bg-[#0B252C] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
        <span className="text-[11px] font-bold text-emerald-200/90 tracking-wide uppercase block">
          Total Facilities (Filtered)
        </span>
        <div className="text-4xl font-black text-white tracking-tight my-1">
          {totalFilteredCount}
        </div>
        <div className="text-[11px] text-teal-100/70 font-medium">
          across {stateCounts.length} states · 3 centre tiers
        </div>
      </div>

      {/* Centre / Facility Type Category Pills */}
      <div>
        <label className="text-xs font-bold text-slate-700 block mb-2">
          Facility Type
        </label>
        <div className="space-y-2 text-xs font-semibold">
          {/* Tertiary Pill */}
          <button
            onClick={() => onSelectCareTypeFilter(careTypeFilter === "tertiary" ? "all" : "tertiary")}
            className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
              careTypeFilter === "tertiary"
                ? "bg-blue-50 border-blue-400 text-blue-900 shadow-xs ring-1 ring-blue-400/50"
                : "bg-[#FAF7F2] hover:bg-amber-50/50 border-amber-200/60 text-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 shadow-xs border border-white shrink-0" />
              <span className="font-bold">Tertiary Eye Care</span>
            </div>
            <span className="px-2 py-0.5 bg-white/90 text-slate-700 font-extrabold rounded-md text-[11px] border border-slate-200/70">
              {tertiaryCount}
            </span>
          </button>

          {/* Secondary Pill */}
          <button
            onClick={() => onSelectCareTypeFilter(careTypeFilter === "secondary" ? "all" : "secondary")}
            className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
              careTypeFilter === "secondary"
                ? "bg-blue-50 border-blue-400 text-blue-900 shadow-xs ring-1 ring-blue-400/50"
                : "bg-[#FEF9EE] hover:bg-amber-50/50 border-amber-200/60 text-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 shadow-xs border border-white shrink-0" />
              <span className="font-bold">Secondary Eye Care</span>
            </div>
            <span className="px-2 py-0.5 bg-white/90 text-slate-700 font-extrabold rounded-md text-[11px] border border-slate-200/70">
              {secondaryCount}
            </span>
          </button>

          {/* Community Pill */}
          <button
            onClick={() => onSelectCareTypeFilter(careTypeFilter === "community" ? "all" : "community")}
            className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all ${
              careTypeFilter === "community"
                ? "bg-sky-50 border-sky-400 text-sky-900 shadow-xs ring-1 ring-sky-400/50"
                : "bg-[#FAF7F2] hover:bg-amber-50/50 border-amber-200/60 text-slate-800"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-sky-400 shadow-xs border border-white shrink-0" />
              <span className="font-bold">Community Eye Clinics</span>
            </div>
            <span className="px-2 py-0.5 bg-white/90 text-slate-700 font-extrabold rounded-md text-[11px] border border-slate-200/70">
              {communityCount}
            </span>
          </button>
        </div>
      </div>

      {/* Establishment Year Timeline Slider */}
      <div className="pt-2 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-slate-700">
            Establishment Year
          </label>
          <button
            onClick={() => onSelectMaxYear(null)}
            className="text-[11px] font-medium text-slate-400 hover:text-slate-700 underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>reset</span>
          </button>
        </div>

        <div className="text-lg font-black text-slate-900 mb-2 tracking-tight">
          {minYear} – {currentMaxYear}
        </div>

        <input
          type="range"
          min={minYear}
          max={maxYear}
          value={currentMaxYear}
          onChange={(e) => onSelectMaxYear(parseInt(e.target.value, 10))}
          className="w-full accent-[#0B252C] h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* States Represented Breakdown List */}
      <div className="pt-2 border-t border-slate-100 flex-1">
        <label className="text-xs font-bold text-slate-700 block mb-2">
          States Represented
        </label>
        <div className="space-y-1.5">
          {stateCounts.map(([stName, cnt]) => {
            const isSelected = selectedState === stName;
            return (
              <button
                key={stName}
                onClick={() => onSelectState(isSelected ? null : stName)}
                className={`w-full px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
                  isSelected
                    ? "bg-[#0B252C] text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/60"
                }`}
              >
                <span>{stName}</span>
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-700"
                  }`}
                >
                  {cnt}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
