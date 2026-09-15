import React from "react";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { EntityConfig } from "@/types/entity";
import { isAurolabAggregateOnly } from "@/lib/data/adapters";
import { MapPin, X, ChevronRight, Compass, ShieldCheck, Sparkles } from "lucide-react";
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

  // If no state or location selected, render a minimal floating discovery prompt
  if (!selectedState && !selectedLocation) {
    return (
      <div className="absolute top-20 right-6 z-20 max-w-sm bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80 text-slate-900 select-none pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-1">
          <Compass className="w-4 h-4 text-amber-600" />
          <span>Geographic Discovery</span>
        </div>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          Tap any state region or centroid badge on the map to explore {entityConfig.shortName}&apos;s geographic impact footprint.
        </p>
      </div>
    );
  }

  return (
    <aside className="absolute bottom-16 right-6 z-20 w-80 max-h-[75vh] bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/90 flex flex-col select-none overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Impact Evidence</span>
        </h3>

        <button
          onClick={() => {
            if (selectedLocation) onClearLocation();
            else if (selectedState) onClearState();
          }}
          className="p-1 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Panel Body */}
      <div className="p-4 flex-1 overflow-y-auto space-y-4">
        {/* STATE 1: Individual Location Selected */}
        {selectedLocation && !isAggregateOnly ? (
          <div className="space-y-4">
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider mb-1.5 text-white"
                style={{ backgroundColor: entityConfig.color }}
              >
                {entityConfig.shortName} Record
              </span>
              <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                {selectedLocation.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {selectedLocation.city}, {selectedLocation.state}, {selectedLocation.country}
              </p>
            </div>

            {/* Key Data Attributes */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-2">
              <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                Impact Metrics
              </h5>
              {Object.entries(selectedLocation.metrics || {}).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-none"
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
              className="w-full text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-100 rounded-xl py-2"
            >
              Back to Region Overview
            </Button>
          </div>
        ) : (
          /* STATE 2: Region / State Selected (Aggregate View for Aurolab) */
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Selected Geographic Region
              </span>
              <h4 className="text-xl font-black text-slate-900">
                {selectedState}
              </h4>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-3xl font-black tracking-tight"
                  style={{ color: entityConfig.color }}
                >
                  {locationsInSelectedState.length}
                </span>
                <span className="text-xs text-slate-600 font-bold uppercase tracking-wider">
                  {entityConfig.shortName} Locations
                </span>
              </div>
            </div>

            {/* Aurolab Strict Aggregate Notice */}
            {isAggregateOnly ? (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-amber-900 text-xs space-y-1.5">
                <div className="font-black flex items-center gap-1.5 text-amber-900">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Aggregate Distribution Reach</span>
                </div>
                <p className="text-[11px] text-amber-800 leading-relaxed font-medium">
                  Displaying total dealer distribution density in {selectedState} across {locationsInSelectedState.length} location nodes. Operational dealer profiles remain confidential.
                </p>
              </div>
            ) : (
              /* Location List for other entities */
              <div>
                <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">
                  Locations ({locationsInSelectedState.length})
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
              className="w-full text-xs font-bold text-slate-700 border-slate-300 hover:bg-slate-100 rounded-xl py-2"
            >
              Zoom Out to Overview Map
            </Button>
          </div>
        )}
      </div>
    </aside>
  );
}
