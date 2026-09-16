"use client";

import React, { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ENTITY_CONFIGS } from "@/config/entities";
import { EntityId } from "@/types/entity";
import { GeoLocationItem, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { AUROLAB_NATIONAL_DEALERS } from "@/data/aurolab/national-dealers";
import { calculateStateAggregations, aggregateByCountry } from "@/lib/geography/aggregation";
import { filterAuroitechByProduct } from "@/lib/data/adapters";
import { RotateCcw, Cpu, ArrowLeft, CheckCircle2, Play, Pause, Filter, Calendar } from "lucide-react";

const MapEngine = dynamic(
  () => import("@/components/atlas/MapEngine").then((mod) => mod.MapEngine),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#E7EEF2] flex items-center justify-center text-slate-500 font-medium text-xs select-none">
        Loading Map Lab Canvas Engine...
      </div>
    ),
  }
);

const ENTITY_LIST: EntityId[] = [
  "hospitals",
  "laico",
  "amrf",
  "aurolab",
  "auroitech",
  "eyebank",
  "all",
];

const GRAMMAR_LIST: { id: GeographicGrammar; label: string }[] = [
  { id: "auto", label: "Auto (Entity Grammar)" },
  { id: "footprint", label: "Footprint (Place → Scale)" },
  { id: "capacity", label: "Capacity Network (Origin → Learning)" },
  { id: "collaboration", label: "Collaboration (Research)" },
  { id: "distribution", label: "Distribution (Access Reach)" },
  { id: "product", label: "Product (Tech Geography)" },
  { id: "flow", label: "Flow (Collection → Recipient)" },
];

export default function MapLabPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<EntityId>("hospitals");
  const [selectedGrammar, setSelectedGrammar] = useState<GeographicGrammar>("auto");
  const [selectedGeoLevel, setSelectedGeoLevel] = useState<GeographicLevel>("country");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GeoLocationItem | null>(null);
  const [productFilterId, setProductFilterId] = useState<string | null>(null);
  const [datasetMode, setDatasetMode] = useState<"standard" | "aurolab_dealers">("standard");

  // CARE specific controls state
  const [careTypeFilter, setCareTypeFilter] = useState<"all" | "tertiary" | "secondary" | "community">("all");
  const [revealMaxYear, setRevealMaxYear] = useState<number | null>(null);
  const [isPlayingReveal, setIsPlayingReveal] = useState<boolean>(false);

  // Progressive reveal timeline animation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingReveal) {
      timer = setInterval(() => {
        setRevealMaxYear((prev) => {
          const current = prev === null ? 1976 : prev;
          if (current >= 2025) {
            setIsPlayingReveal(false);
            return 2025;
          }
          return current + 1;
        });
      }, 250);
    }
    return () => clearInterval(timer);
  }, [isPlayingReveal]);

  const activeEntityConfig = ENTITY_CONFIGS[selectedEntityId] || ENTITY_CONFIGS.hospitals;

  // Active Locations based on dataset mode and entity filter
  const rawLocations = useMemo(() => {
    if (datasetMode === "aurolab_dealers") {
      return AUROLAB_NATIONAL_DEALERS;
    }
    if (selectedEntityId === "all") {
      return DEMO_LOCATIONS;
    }
    return DEMO_LOCATIONS.filter((loc) => loc.entityId === selectedEntityId);
  }, [selectedEntityId, datasetMode]);

  // Filter locations by active product layer if Auroitech is selected
  const locations = useMemo(() => {
    if (selectedEntityId === "auroitech" && productFilterId) {
      return filterAuroitechByProduct(rawLocations, productFilterId);
    }
    return rawLocations;
  }, [selectedEntityId, rawLocations, productFilterId]);

  // Calculate dynamic state aggregations
  const stateAggregations = useMemo(() => {
    return calculateStateAggregations(locations);
  }, [locations]);

  // Calculate country aggregations
  const countryAggregations = useMemo(() => {
    return aggregateByCountry(locations);
  }, [locations]);

  // CARE diagnostics count breakdown
  const careCounts = useMemo(() => {
    const careLocs = rawLocations.filter((l) => l.entityId === "hospitals");
    return {
      total: careLocs.length,
      tertiary: careLocs.filter((l) => l.careType === "tertiary").length,
      secondary: careLocs.filter((l) => l.careType === "secondary").length,
      community: careLocs.filter((l) => l.careType === "community").length,
    };
  }, [rawLocations]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F7F8F6] font-sans text-slate-900 antialiased relative">
      {/* Map Lab Top Control Header */}
      <header className="h-16 px-6 bg-white border-b border-slate-200/80 flex items-center justify-between z-30 shrink-0 select-none shadow-xs">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO ATLAS</span>
          </Link>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-900 text-base tracking-tight">
                ARAVIND 50 MAP LAB
              </span>
              <span className="font-bold text-amber-800 text-[10px] uppercase tracking-widest bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                DEVELOPER LABORATORY
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500">
              One Map Engine · CARE Storyboard & Geographic Visualization
            </p>
          </div>
        </div>

        {/* Dataset Test Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-full border border-slate-200">
          <button
            onClick={() => setDatasetMode("standard")}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              datasetMode === "standard"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            CARE Dataset & Standard
          </button>

          <button
            onClick={() => {
              setDatasetMode("aurolab_dealers");
              setSelectedEntityId("aurolab");
            }}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              datasetMode === "aurolab_dealers"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Aurolab Dealers Dataset
          </button>
        </div>

        {/* Reset Camera Button */}
        <button
          onClick={() => {
            setSelectedState(null);
            setSelectedLocation(null);
            setSelectedGeoLevel("country");
            setSelectedGrammar("auto");
            setProductFilterId(null);
            setCareTypeFilter("all");
            setRevealMaxYear(null);
            setIsPlayingReveal(false);
          }}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-extrabold shadow-sm transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>RESET MAP</span>
        </button>
      </header>

      {/* Main Workspace (Map Occupies 80%+ Viewport) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Floating Controls Drawer */}
        <div className="absolute top-4 left-4 z-20 w-80 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-slate-200/80 space-y-4 text-xs select-none max-h-[calc(100vh-100px)] overflow-y-auto">
          {/* Section 1: Entity Selector */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              1. Select Impact Dimension
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {ENTITY_LIST.map((entityId) => {
                const cfg = ENTITY_CONFIGS[entityId];
                const isSelected = selectedEntityId === entityId;
                return (
                  <button
                    key={entityId}
                    onClick={() => {
                      setSelectedEntityId(entityId);
                      setSelectedState(null);
                      setSelectedLocation(null);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg font-bold text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? "text-white shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                    style={{ backgroundColor: isSelected ? cfg?.color : undefined }}
                  >
                    <span>{cfg?.shortName || entityId}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Geographic Level Selector */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              2. Geographic Camera Level
            </label>
            <div className="grid grid-cols-4 gap-1">
              {(["world", "country", "state", "city"] as GeographicLevel[]).map((level) => {
                const isSelected = selectedGeoLevel === level;
                return (
                  <button
                    key={level}
                    onClick={() => setSelectedGeoLevel(level)}
                    className={`py-1.5 rounded-md font-bold text-[11px] uppercase tracking-wider transition-all text-center ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {level}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Visual Grammar Override */}
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              3. Visual Grammar Mode
            </label>
            <div className="space-y-1">
              {GRAMMAR_LIST.map((g) => {
                const isSelected = selectedGrammar === g.id;
                return (
                  <button
                    key={g.id}
                    onClick={() => setSelectedGrammar(g.id)}
                    className={`w-full px-3 py-1.5 rounded-lg font-bold text-left text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-amber-500 text-slate-950 font-black shadow-xs"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                    }`}
                  >
                    <span>{g.label}</span>
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 4: CARE Centre Controls (Visible for hospitals or all entity) */}
          {(selectedEntityId === "hospitals" || selectedEntityId === "all") && (
            <div className="pt-3 border-t border-slate-200/80 space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-blue-700 flex items-center gap-1">
                    <Filter className="w-3 h-3 text-blue-600" />
                    <span>CARE Centre Type Filter</span>
                  </label>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {careTypeFilter}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[11px]">
                  <button
                    onClick={() => setCareTypeFilter("all")}
                    className={`px-2 py-1 rounded font-bold transition-all text-left flex justify-between items-center ${
                      careTypeFilter === "all"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>ALL</span>
                    <span className="text-[10px] opacity-75">{careCounts.total}</span>
                  </button>
                  <button
                    onClick={() => setCareTypeFilter("tertiary")}
                    className={`px-2 py-1 rounded font-bold transition-all text-left flex justify-between items-center ${
                      careTypeFilter === "tertiary"
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>TERTIARY</span>
                    <span className="text-[10px] opacity-75">{careCounts.tertiary}</span>
                  </button>
                  <button
                    onClick={() => setCareTypeFilter("secondary")}
                    className={`px-2 py-1 rounded font-bold transition-all text-left flex justify-between items-center ${
                      careTypeFilter === "secondary"
                        ? "bg-blue-500 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>SECONDARY</span>
                    <span className="text-[10px] opacity-75">{careCounts.secondary}</span>
                  </button>
                  <button
                    onClick={() => setCareTypeFilter("community")}
                    className={`px-2 py-1 rounded font-bold transition-all text-left flex justify-between items-center ${
                      careTypeFilter === "community"
                        ? "bg-sky-500 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    <span>COMMUNITY</span>
                    <span className="text-[10px] opacity-75">{careCounts.community}</span>
                  </button>
                </div>
              </div>

              {/* Progressive Reveal Timeline Controls */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>Progressive Reveal</span>
                  </label>
                  <span className="text-[10px] font-black text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    {revealMaxYear === null ? "1976 – 2025 (ALL)" : `YEAR <= ${revealMaxYear}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (revealMaxYear === null) setRevealMaxYear(1976);
                      setIsPlayingReveal(!isPlayingReveal);
                    }}
                    className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-all shrink-0"
                    title={isPlayingReveal ? "Pause Reveal" : "Play Progressive Reveal"}
                  >
                    {isPlayingReveal ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>

                  <input
                    type="range"
                    min={1976}
                    max={2025}
                    value={revealMaxYear === null ? 2025 : revealMaxYear}
                    onChange={(e) => {
                      setIsPlayingReveal(false);
                      setRevealMaxYear(parseInt(e.target.value, 10));
                    }}
                    className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />

                  <button
                    onClick={() => {
                      setIsPlayingReveal(false);
                      setRevealMaxYear(null);
                    }}
                    className="px-2 py-1 text-[10px] font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded transition-all shrink-0"
                  >
                    ALL
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Auroitech Product Layer (If Auroitech is selected) */}
          {selectedEntityId === "auroitech" && (
            <div className="pt-2 border-t border-slate-100">
              <label className="text-[10px] font-black uppercase tracking-widest text-sky-800 block mb-2 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-sky-600" />
                <span>Tech Product Layer Filter</span>
              </label>
              <div className="space-y-1">
                <button
                  onClick={() => setProductFilterId(null)}
                  className={`w-full px-2.5 py-1 rounded-md text-xs font-bold text-left ${
                    !productFilterId ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  All Tech Products
                </button>
                <button
                  onClick={() => setProductFilterId("prod_a")}
                  className={`w-full px-2.5 py-1 rounded-md text-xs font-bold text-left ${
                    productFilterId === "prod_a" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Product A: AuroEMR
                </button>
                <button
                  onClick={() => setProductFilterId("prod_b")}
                  className={`w-full px-2.5 py-1 rounded-md text-xs font-bold text-left ${
                    productFilterId === "prod_b" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Product B: VisionScreen AI
                </button>
                <button
                  onClick={() => setProductFilterId("prod_c")}
                  className={`w-full px-2.5 py-1 rounded-md text-xs font-bold text-left ${
                    productFilterId === "prod_c" ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-700"
                  }`}
                >
                  Product C: Telemedicine Suite
                </button>
              </div>
            </div>
          )}

          {/* Section 6: Diagnostic State Panel */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
            <div className="flex justify-between">
              <span>Visible Locations:</span>
              <strong className="text-slate-900 font-bold">{locations.length} records</strong>
            </div>
            {selectedEntityId === "hospitals" && (
              <div className="flex justify-between text-[10px] text-blue-700 bg-blue-50 px-2 py-1 rounded border border-blue-100 font-semibold">
                <span>CARE Breakdown:</span>
                <span>
                  {careCounts.tertiary} Tertiary · {careCounts.secondary} Sec · {careCounts.community} Comm
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Aggregated States:</span>
              <strong className="text-slate-900 font-bold">{stateAggregations.length} states</strong>
            </div>
            <div className="flex justify-between">
              <span>Countries Reach:</span>
              <strong className="text-slate-900 font-bold">{countryAggregations.length} countries</strong>
            </div>
            <div className="flex justify-between">
              <span>Data Status:</span>
              <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200 text-[10px]">
                source-supplied / validation-pending
              </span>
            </div>
          </div>
        </div>

        {/* Map Canvas Viewport (Dominates Screen) */}
        <div className="flex-1 relative w-full h-full">
          <MapEngine
            entityConfig={activeEntityConfig}
            locations={locations}
            stateAggregations={stateAggregations}
            selectedState={selectedState}
            selectedLocation={selectedLocation}
            onSelectState={(st) => setSelectedState(st)}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            onClearLocation={() => setSelectedLocation(null)}
            modeGrammar={selectedGrammar}
            geographicLevel={selectedGeoLevel}
            careTypeFilter={careTypeFilter}
            revealMaxYear={revealMaxYear}
            isLabMode={true}
          />
        </div>
      </div>
    </div>
  );
}

