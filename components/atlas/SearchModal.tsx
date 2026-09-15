import React, { useState, useEffect, useRef } from "react";
import { Search, X, MapPin, Building2, ArrowRight } from "lucide-react";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { INDIA_STATES_META } from "@/data/india-states";
import { ENTITY_CONFIGS } from "@/config/entities";
import { GeoLocationItem } from "@/types/geo";
import { EntityId } from "@/types/entity";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLocation: (loc: GeoLocationItem) => void;
  onSelectState: (stateName: string) => void;
  onSelectEntity: (entityId: EntityId) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectLocation,
  onSelectState,
  onSelectEntity,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const cleanQuery = query.toLowerCase().trim();

  // Filter locations
  const filteredLocations = cleanQuery
    ? DEMO_LOCATIONS.filter(
        (l) =>
          l.name.toLowerCase().includes(cleanQuery) ||
          l.city.toLowerCase().includes(cleanQuery) ||
          l.state.toLowerCase().includes(cleanQuery)
      ).slice(0, 8)
    : [];

  // Filter states
  const filteredStates = cleanQuery
    ? Object.keys(INDIA_STATES_META).filter((s) =>
        s.toLowerCase().includes(cleanQuery)
      )
    : [];

  // Filter entities
  const filteredEntities = cleanQuery
    ? (Object.keys(ENTITY_CONFIGS) as EntityId[]).filter(
        (e) =>
          ENTITY_CONFIGS[e].name.toLowerCase().includes(cleanQuery) ||
          ENTITY_CONFIGS[e].shortName.toLowerCase().includes(cleanQuery)
      )
    : [];

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search hospitals, dealers, states, cities..."
            className="w-full bg-transparent text-slate-900 placeholder-slate-400 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results List */}
        <div className="p-2 max-h-96 overflow-y-auto space-y-3">
          {!cleanQuery ? (
            <div className="p-6 text-center text-xs text-slate-500">
              Type to search across all Aravind entities, states, cities, and locations.
            </div>
          ) : (
            <>
              {/* States Results */}
              {filteredStates.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-1">
                    States / Regions
                  </h4>
                  {filteredStates.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        onSelectState(st);
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-xs text-slate-800 group"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span className="font-semibold">{st}</span>
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                    </button>
                  ))}
                </div>
              )}

              {/* Entities Results */}
              {filteredEntities.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-1">
                    Aravind Entities
                  </h4>
                  {filteredEntities.map((ent) => {
                    const cfg = ENTITY_CONFIGS[ent];
                    return (
                      <button
                        key={ent}
                        onClick={() => {
                          onSelectEntity(ent);
                          onClose();
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between text-xs text-slate-800 group"
                      >
                        <span className="flex items-center gap-2">
                          <Building2
                            className="w-3.5 h-3.5"
                            style={{ color: cfg.color }}
                          />
                          <span className="font-semibold">{cfg.name}</span>
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700" />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Location Results */}
              {filteredLocations.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-3 py-1">
                    Locations & Dealers
                  </h4>
                  {filteredLocations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectEntity(loc.entityId);
                        onSelectLocation(loc);
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-100 flex items-start justify-between text-xs text-slate-800 group"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {loc.name}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {loc.city}, {loc.state} • {ENTITY_CONFIGS[loc.entityId]?.shortName}
                        </div>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 shrink-0 mt-1" />
                    </button>
                  ))}
                </div>
              )}

              {filteredStates.length === 0 &&
                filteredEntities.length === 0 &&
                filteredLocations.length === 0 && (
                  <div className="p-8 text-center text-xs text-slate-500">
                    No results found for "{query}".
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
