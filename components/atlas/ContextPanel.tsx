import React from "react";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { EntityConfig } from "@/types/entity";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { isAurolabAggregateOnly } from "@/lib/data/adapters";
import { MapPin, X, ChevronRight, Globe2, ShieldCheck, Sparkles, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <aside className="absolute bottom-12 right-6 z-20 w-84 max-h-[80vh] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col select-none overflow-hidden transition-all animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Floating Data Card Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full shadow-xs"
            style={{ backgroundColor: story.accentColor }}
          />
          <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest">
            {selectedLocation ? "Pin Data" : selectedState ? "Region Data" : "Overall Ecosystem Data"}
          </h3>
        </div>

        {(selectedLocation || selectedState) && (
          <button
            onClick={() => {
              onClearLocation();
              onClearState();
            }}
            className="flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200 transition-colors"
            title="Return to overall system data"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Overall Data</span>
          </button>
        )}
      </div>

      {/* Floating Data Card Body */}
      <div className="p-5 flex-1 overflow-y-auto space-y-4">
        {/* CASE 1: SPECIFIC PIN TOUCHED */}
        {selectedLocation && !isAggregateOnly ? (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span
                className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-2 text-white shadow-xs"
                style={{ backgroundColor: story.accentColor }}
              >
                {entityConfig.shortName} Location Node
              </span>
              <h4 className="text-lg font-black text-slate-900 leading-snug">
                {selectedLocation.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.country}
              </p>
            </div>

            {/* Pin Attributes Breakdown */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                Location Metrics
              </h5>
              {Object.entries(selectedLocation.metrics || {}).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 last:border-none"
                >
                  <span className="text-slate-600 capitalize font-medium">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-extrabold text-slate-900">{val}</span>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearLocation}
              className="w-full text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-100 rounded-xl py-2.5"
            >
              ← Back to Overall Data
            </Button>
          </div>
        ) : selectedState ? (
          /* CASE 2: REGION / STATE PIN TOUCHED (Aggregate Protection for Aurolab) */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Touched Region Node
              </span>
              <h4 className="text-2xl font-black text-slate-900">
                {selectedState}
              </h4>

              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="text-4xl font-black tracking-tight"
                  style={{ color: story.accentColor }}
                >
                  {locationsInSelectedState.length}
                </span>
                <span className="text-xs text-slate-600 font-extrabold uppercase tracking-wider">
                  {entityConfig.shortName} Locations
                </span>
              </div>
            </div>

            {isAggregateOnly ? (
              <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-xl text-amber-900 text-xs space-y-1.5">
                <div className="font-black flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Aggregate Region Reach</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  Showing aggregate dealer distribution density in {selectedState} across {locationsInSelectedState.length} location nodes. Individual dealer profiles remain protected.
                </p>
              </div>
            ) : (
              <div>
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Region Locations ({locationsInSelectedState.length})
                </h5>

                <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                  {locationsInSelectedState.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => onSelectLocation(loc)}
                      className="w-full text-left p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:bg-slate-100 transition-all flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-xs font-bold text-slate-900 group-hover:text-amber-700">
                          {loc.name}
                        </p>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {loc.city}
                        </p>
                      </div>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onClearState}
              className="w-full text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-100 rounded-xl py-2.5"
            >
              ← Back to Overall Data
            </Button>
          </div>
        ) : (
          /* CASE 3: NO PIN TOUCHED — OVERALL SYSTEM DATA (Matches Reference Card) */
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {entityConfig.shortName} Overall Reach
              </span>
              <h4 className="text-sm font-extrabold text-slate-800 mt-0.5">
                {story.primaryMetric.label}
              </h4>

              {/* Big Hero Overall Metric (Reference Style) */}
              <div className="mt-2">
                <div
                  className="text-5xl font-black tracking-tight leading-none"
                  style={{ color: story.accentColor }}
                >
                  {story.primaryMetric.value}
                </div>
                {story.primaryMetric.unit && (
                  <p className="text-xs text-slate-500 font-bold mt-1">
                    {story.primaryMetric.unit}
                  </p>
                )}
              </div>
            </div>

            {/* Overall Secondary Breakdown */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 space-y-2">
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                Overall Ecosystem Metrics
              </h5>
              {story.secondaryMetrics.map((sec) => (
                <div
                  key={sec.label}
                  className="flex items-center justify-between text-xs py-1.5 border-b border-slate-200/60 last:border-none"
                >
                  <span className="text-slate-600 font-medium">{sec.label}:</span>
                  <span className="font-extrabold text-slate-900">{sec.value}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-slate-100">
              <p className="text-[11px] text-slate-500 font-medium italic">
                Touch any pin or state node on the map to inspect specific location data.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
