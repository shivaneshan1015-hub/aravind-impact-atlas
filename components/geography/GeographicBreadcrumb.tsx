import React from "react";
import { ChevronRight, Globe, MapPin, RotateCcw } from "lucide-react";
import { buildGeographicBreadcrumbs } from "@/lib/geography/hierarchy";
import { EntityConfig } from "@/types/entity";

interface GeographicBreadcrumbProps {
  entityConfig: EntityConfig;
  selectedSubcategoryName: string;
  selectedCountry: string | null;
  selectedState: string | null;
  onResetToIndia: () => void;
  onResetToWorld: () => void;
}

export function GeographicBreadcrumb({
  entityConfig,
  selectedSubcategoryName,
  selectedCountry = "India",
  selectedState,
  onResetToIndia,
  onResetToWorld,
}: GeographicBreadcrumbProps) {
  const breadcrumbs = buildGeographicBreadcrumbs(
    entityConfig.shortName,
    selectedSubcategoryName,
    selectedCountry,
    selectedState
  );

  return (
    <div className="bg-[#F7F8F6] border-b border-slate-200 px-4 py-1.5 flex items-center justify-between text-xs select-none shrink-0 z-10">
      {/* Breadcrumb Links */}
      <div className="flex items-center gap-1.5 overflow-x-auto text-slate-500">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mr-1 flex items-center gap-1 shrink-0">
          <Globe className="w-3 h-3 text-slate-400" />
          Location:
        </span>

        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;

          return (
            <React.Fragment key={item.id}>
              {idx > 0 && (
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
              )}

              {isLast ? (
                <span
                  className="font-bold text-slate-900 px-1.5 py-0.5 rounded bg-white border border-slate-300 shadow-2xs flex items-center gap-1 shrink-0"
                  style={item.id === "state" ? { borderColor: entityConfig.color } : undefined}
                >
                  {item.id === "state" && <MapPin className="w-3 h-3 text-amber-600" />}
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={() => {
                    if (item.id === "country") onResetToIndia();
                    else if (item.id === "entity" || item.id === "subcategory") onResetToWorld();
                  }}
                  className="hover:text-slate-900 transition-colors font-medium px-1 py-0.5 rounded hover:bg-slate-200/60 shrink-0"
                >
                  {item.label}
                </button>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Quick Back to India Button (visible when zoomed into a state) */}
      {selectedState && (
        <button
          onClick={onResetToIndia}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-white hover:bg-slate-100 text-amber-700 hover:text-amber-800 border border-amber-500/40 text-[11px] font-semibold transition-all shrink-0 ml-2 shadow-2xs"
        >
          <RotateCcw className="w-3 h-3" />
          <span>← India</span>
        </button>
      )}
    </div>
  );
}
