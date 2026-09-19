import React from "react";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { EntityConfig } from "@/types/entity";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { isAurolabAggregateOnly } from "@/lib/data/adapters";
import { MapPin, X, ChevronRight, Globe2, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

interface ContextPanelProps {
  entityConfig: EntityConfig;
  selectedState: string | null;
  stateAggregations: StateAggregation[];
  selectedLocation: GeoLocationItem | null;
  locationsInSelectedState: GeoLocationItem[];
  onSelectLocation: (loc: GeoLocationItem) => void;
  onClearLocation: () => void;
  onClearState: () => void;
}

export function ContextPanel({
  entityConfig,
  selectedState,
  stateAggregations,
  selectedLocation,
  locationsInSelectedState,
  onSelectLocation,
  onClearLocation,
  onClearState,
}: ContextPanelProps) {
  const isAggregateOnly = isAurolabAggregateOnly(entityConfig.id);
  const story = IMPACT_STORIES[entityConfig.id] || IMPACT_STORIES.hospitals;

  // Calculate overall metrics when no specific pin/state is selected
  const totalLocationsCount = stateAggregations.reduce((acc, s) => acc + s.count, 0);
  const totalStatesCount = stateAggregations.length;

  return (
    <aside className="absolute bottom-24 right-8 z-20 w-72 max-h-[calc(100vh-180px)] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100/90 flex flex-col select-none overflow-hidden transition-all animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Small Compact Header */}
      <div className="p-3.5 px-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full shadow-xs"
            style={{ backgroundColor: story.accentColor }}
          />
          <h3 className="text-[10px] font-extrabold text-slate-700 uppercase tracking-widest">
            {selectedLocation ? "Pin Location Data" : selectedState ? "Region Data" : "Overall System Data"}
          </h3>
        </div>

        {(selectedLocation || selectedState) && (
          <button
            onClick={() => {
              onClearLocation();
              onClearState();
            }}
            className="flex items-center gap-1 text-[10px] font-extrabold text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs transition-colors"
            title="Return to overall system data"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span>Overall</span>
          </button>
        )}
      </div>

      {/* Compact Floating Card Body (Matching Reference Specimen) */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        {/* CASE 1: SPECIFIC PIN TOUCHED */}
        {selectedLocation && !isAggregateOnly ? (
          <div className="space-y-3 animate-in fade-in duration-200">
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider mb-1.5 text-white shadow-2xs"
                style={{ backgroundColor: story.accentColor }}
              >
                {entityConfig.shortName} Location Node
              </span>
              <h4 className="text-base font-black text-slate-900 leading-snug">
                {selectedLocation.entityId === "aurolab"
                  ? selectedLocation.subcategoryId === "domestic" || selectedLocation.country === "India"
                    ? `${selectedLocation.city || selectedLocation.name} District`
                    : selectedLocation.country
                  : selectedLocation.entityId === "laico" && selectedLocation.subcategoryId !== "capacity_building"
                  ? `${selectedLocation.rawName || selectedLocation.city}`
                  : selectedLocation.name}
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1 font-medium">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {selectedLocation.entityId === "aurolab" && (selectedLocation.subcategoryId === "international" || selectedLocation.country !== "India")
                  ? `${selectedLocation.country}, ${selectedLocation.state}`
                  : selectedLocation.entityId === "laico" && selectedLocation.subcategoryId !== "capacity_building"
                  ? `${selectedLocation.metadata?.traineeCount || selectedLocation.metrics?.["Trainees Count"] || 1} Trainees · 2017–2026 (${selectedLocation.country})`
                  : `${selectedLocation.city}, ${selectedLocation.state}`}
              </p>
            </div>

            {/* Pin Attributes Breakdown */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5 text-xs">
              <h5 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                Location Metrics
              </h5>
              {Object.entries(selectedLocation.metrics || {}).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between py-1 border-b border-slate-200/50 last:border-none"
                >
                  <span className="text-slate-600 capitalize font-medium text-[11px]">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-extrabold text-slate-900 text-[11px]">{val}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onClearLocation}
              className="w-full text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl py-2 transition-colors text-center"
            >
              ← Return to Overall System Data
            </button>
          </div>
        ) : selectedState ? (
          /* CASE 2: REGION / STATE TOUCHED */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Touched Region Node
              </span>
              <h4 className="text-xl font-black text-slate-900">
                {selectedState}
              </h4>

              <div className="mt-1 flex items-baseline gap-1.5">
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ color: story.accentColor }}
                >
                  {locationsInSelectedState.length}
                </span>
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider">
                  Locations
                </span>
              </div>
            </div>

            {isAggregateOnly ? (
              <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-xl text-amber-900 text-[11px] space-y-1">
                <div className="font-black flex items-center gap-1 text-amber-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                  <span>Aggregate Reach</span>
                </div>
                <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                  {selectedState} has {locationsInSelectedState.length} aggregate location nodes. Individual dealer profiles remain protected.
                </p>
              </div>
            ) : (
              <div>
                <h5 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-1.5">
                  Locations ({locationsInSelectedState.length})
                </h5>

                <div className="space-y-1 max-h-36 overflow-y-auto pr-1">
                  {locationsInSelectedState.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => onSelectLocation(loc)}
                      className="w-full text-left p-2 rounded-lg bg-slate-50 border border-slate-100 hover:bg-slate-100 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-[11px] font-bold text-slate-900 group-hover:text-amber-700">
                          {loc.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {loc.city}
                        </p>
                      </div>
                      <ChevronRight className="w-3 h-3 text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Cross-Entity Impact Dimensions in this Geography */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                Ecosystem Impact in {selectedState}
              </span>
              <p className="text-[10px] text-slate-500 font-medium">
                Multiple Aravind dimensions operate in this region. Select a dimension to switch stories:
              </p>
            </div>

            <button
              onClick={onClearState}
              className="w-full text-[11px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl py-2 transition-colors text-center"
            >
              ← Return to Overall System Data
            </button>
          </div>
        ) : (
          /* CASE 3: NO PIN TOUCHED — OVERALL SYSTEM DATA (Matches Reference Card) */
          <div className="space-y-3 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {entityConfig.shortName} Overall
              </span>
            </div>

            {/* Overall Secondary Breakdown */}
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 space-y-1.5 text-xs">
              <h5 className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">
                Overall Ecosystem Metrics
              </h5>
              {story.secondaryMetrics.map((sec) => (
                <div
                  key={sec.label}
                  className="flex items-center justify-between py-1 border-b border-slate-200/50 last:border-none"
                >
                  <span className="text-slate-600 font-medium text-[11px]">{sec.label}:</span>
                  <span className="font-extrabold text-slate-900 text-[11px]">{sec.value}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-slate-400 font-medium text-center italic pt-1">
              Touch any pin on the map to inspect specific location data.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
