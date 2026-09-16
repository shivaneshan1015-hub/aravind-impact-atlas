"use client";

import React, { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ENTITY_CONFIGS } from "@/config/entities";
import { EntityId } from "@/types/entity";
import { GeoLocationItem, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { AUROLAB_NATIONAL_DEALERS } from "@/data/aurolab/national-dealers";
import { calculateStateAggregations, aggregateByCountry } from "@/lib/geography/aggregation";
import { filterAuroitechByProduct } from "@/lib/data/adapters";
import { RotateCcw, Cpu, ArrowLeft, CheckCircle2 } from "lucide-react";

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
              One Map Engine · Testing Surface for 6 Geographic Grammars
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
            Standard Demo Data
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

          {/* Section 4: Auroitech Product Layer (If Auroitech is selected) */}
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

          {/* Section 5: Diagnostic State Panel */}
          <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-600 font-medium">
            <div className="flex justify-between">
              <span>Visible Locations:</span>
              <strong className="text-slate-900 font-bold">{locations.length} records</strong>
            </div>
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
              <span className="text-amber-700 font-bold bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                source-supplied-dev-data
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
            isLabMode={true}
          />
        </div>
      </div>
    </div>
  );
}
