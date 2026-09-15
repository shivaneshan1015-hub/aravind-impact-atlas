import React from "react";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { EntityConfig } from "@/types/entity";
import {
  MapPin,
  X,
  Building,
  Phone,
  Calendar,
  ChevronRight,
  Compass,
} from "lucide-react";
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
  return (
    <aside className="w-72 md:w-80 bg-white border-l border-slate-200 flex flex-col shrink-0 z-20 select-none overflow-y-auto shadow-xs">
      {/* Header */}
      <div className="p-3.5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
          <Compass className="w-3.5 h-3.5 text-slate-500" />
          Context Panel
        </h3>

        {(selectedLocation || selectedState) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (selectedLocation) onClearLocation();
              else if (selectedState) onClearState();
            }}
            className="h-6 w-6 p-0 text-slate-500 hover:text-slate-900"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 space-y-4">
        {/* STATE 1: Location Selected */}
        {selectedLocation ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div>
              <div
                className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider mb-1.5 border"
                style={{
                  backgroundColor: `${entityConfig.color}15`,
                  color: entityConfig.color,
                  borderColor: `${entityConfig.color}30`,
                }}
              >
                {entityConfig.shortName} Record
              </div>
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {selectedLocation.name}
              </h4>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                {selectedLocation.city}, {selectedLocation.state},{" "}
                {selectedLocation.country}
              </p>
            </div>

            {/* Metrics Breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 space-y-2">
              <h5 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                Key Data Attributes
              </h5>
              {Object.entries(selectedLocation.metrics).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs py-1 border-b border-slate-200/60 last:border-none"
                >
                  <span className="text-slate-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="font-semibold text-slate-900">{val}</span>
                </div>
              ))}
            </div>

            {/* Contact / Address Metadata */}
            {(selectedLocation.address ||
              selectedLocation.contact ||
              selectedLocation.establishedYear) && (
              <div className="space-y-2 text-xs text-slate-600">
                {selectedLocation.address && (
                  <p className="flex items-start gap-2">
                    <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{selectedLocation.address}</span>
                  </p>
                )}

                {selectedLocation.contact && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{selectedLocation.contact}</span>
                  </p>
                )}

                {selectedLocation.establishedYear && (
                  <p className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Established {selectedLocation.establishedYear}</span>
                  </p>
                )}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={onClearLocation}
              className="w-full text-xs text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              Back to Region Overview
            </Button>
          </div>
        ) : selectedState ? (
          /* STATE 2: Region / State Selected */
          <div className="space-y-4 animate-in fade-in slide-in-from-right-2 duration-200">
            <div className="border-b border-slate-200 pb-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Selected Region
              </span>
              <h4 className="text-lg font-bold text-slate-900">
                {selectedState}
              </h4>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className="text-2xl font-extrabold"
                  style={{ color: entityConfig.color }}
                >
                  {locationsInSelectedState.length}
                </span>
                <span className="text-xs text-slate-600 font-medium">
                  {entityConfig.shortName} Locations
                </span>
              </div>
            </div>

            {/* List of locations in state */}
            <div>
              <h5 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Locations ({locationsInSelectedState.length})
              </h5>

              <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1">
                {locationsInSelectedState.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => onSelectLocation(loc)}
                    className="w-full text-left p-2.5 rounded-md bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 group-hover:text-slate-900">
                        {loc.name}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {loc.city}
                      </p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                  </button>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={onClearState}
              className="w-full text-xs text-slate-700 border-slate-300 hover:bg-slate-50"
            >
              Zoom Out to National Map
            </Button>
          </div>
        ) : (
          /* STATE 3: Default Empty State */
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Explore The Map
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-[200px] mx-auto leading-relaxed">
                Click on a state region or individual location marker on the map to inspect details.
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
