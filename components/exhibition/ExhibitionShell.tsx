"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { ENTITY_CONFIGS } from "@/config/entities";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import {
  getFilteredLocations,
  calculateStateAggregations,
} from "@/lib/geography/aggregation";
import { filterAuroitechByProduct } from "@/lib/data/adapters";

import { ExhibitionHeader } from "./ExhibitionHeader";
import { ArrivalScene } from "./ArrivalScene";
import { SixDoorsNav } from "./SixDoorsNav";
import { AttractOverlay } from "./AttractOverlay";
import { ContextPanel } from "@/components/atlas/ContextPanel";
import { MetricStrip } from "@/components/atlas/MetricStrip";
import { SubcategoryNav } from "@/components/atlas/SubcategoryNav";
import { Legend } from "@/components/atlas/Legend";
import { MapControls } from "@/components/atlas/MapControls";
import { GeographicBreadcrumb } from "@/components/geography/GeographicBreadcrumb";
import { FollowImpactNav } from "@/components/geography/FollowImpactNav";
import { GuidedControls } from "./GuidedControls";
import { OneSystemFinale } from "./OneSystemFinale";
import { SearchModal } from "@/components/atlas/SearchModal";
import { InfoModal } from "@/components/atlas/InfoModal";
import { ArrowLeft, Cpu } from "lucide-react";
import { EntityId } from "@/types/entity";

// Dynamically import MapEngine with ssr: false to prevent MapLibre GL SSR window/WebGL exceptions
const MapEngine = dynamic(
  () => import("@/components/atlas/MapEngine").then((mod) => mod.MapEngine),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#E7EEF2] flex items-center justify-center text-slate-400 font-medium text-xs select-none">
        Loading Map Canvas...
      </div>
    ),
  }
);

export function ExhibitionShell() {
  const {
    currentScene,
    selectedEntityId,
    selectedSubcategoryId,
    selectedCountry,
    selectedState,
    selectedLocation,
    productFilterId,
    isGuidedPlaying,
    selectStory,
    selectSubcategory,
    selectState,
    selectLocation,
    goToDimensions,
    setProductFilter,
  } = useScene();

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  // Active Entity Config with fallback
  const activeEntityConfig = ENTITY_CONFIGS[selectedEntityId] || ENTITY_CONFIGS.hospitals;

  // Active Story Definition with fallback
  const activeStory = IMPACT_STORIES[selectedEntityId] || IMPACT_STORIES.hospitals;

  // Active Subcategory Config with fallback
  const activeSubcategory = useMemo(() => {
    if (!activeEntityConfig || !activeEntityConfig.subcategories || activeEntityConfig.subcategories.length === 0) {
      return {
        id: "default",
        name: "Overview",
        tagline: "",
        defaultScope: "country" as const,
        primaryMetricKey: "",
        secondaryMetricKeys: [],
        legendTitle: "Overview",
      };
    }
    return (
      activeEntityConfig.subcategories.find((s) => s.id === selectedSubcategoryId) ||
      activeEntityConfig.subcategories[0]
    );
  }, [activeEntityConfig, selectedSubcategoryId]);

  // Raw Filtered Locations
  const rawLocations = useMemo(() => {
    return getFilteredLocations(selectedEntityId, selectedSubcategoryId);
  }, [selectedEntityId, selectedSubcategoryId]);

  // Apply Auroitech Product Filter if active
  const filteredLocations = useMemo(() => {
    if (selectedEntityId === "auroitech" && productFilterId) {
      return filterAuroitechByProduct(rawLocations, productFilterId);
    }
    return rawLocations;
  }, [selectedEntityId, rawLocations, productFilterId]);

  // Dynamic State Aggregations derived from records
  const stateAggregations = useMemo(() => {
    return calculateStateAggregations(filteredLocations);
  }, [filteredLocations]);

  // Locations filtered inside current selected state
  const locationsInSelectedState = useMemo(() => {
    if (!selectedState) return [];
    return filteredLocations.filter((l) => l.state === selectedState);
  }, [filteredLocations, selectedState]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased relative">
      {/* Permanent Touchscreen Exhibition Header */}
      <ExhibitionHeader />

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Scene 01: Arrival Screen */}
        {currentScene === "arrival" && <ArrivalScene />}

        {/* Scene 02: Six Doors Selector Overlay */}
        {currentScene === "dimensions" && <SixDoorsNav />}

        {/* Mode C: Attract Inactivity Overlay */}
        {currentScene === "attract" && <AttractOverlay />}

        {/* Core Exploration View (Story Exploration & One System Finale) */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
          {/* Top Story Question & Context Banner */}
          {(currentScene === "story_exploration" || currentScene === "one_system") && (
            <div
              className="px-6 py-3 bg-white border-b border-slate-200 flex items-center justify-between z-10 shadow-xs"
              style={{ borderLeft: `6px solid ${activeStory.accentColor}` }}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={goToDimensions}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>SIX DOORS</span>
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: activeStory.accentColor }}
                    >
                      {activeStory.title}
                    </span>
                    <h2 className="font-extrabold text-slate-900 text-base">
                      “{activeStory.question}”
                    </h2>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    {activeStory.tagline}
                  </p>
                </div>
              </div>

              {/* Quick Subcategory Tabs */}
              <SubcategoryNav
                entityConfig={activeEntityConfig}
                selectedSubcategoryId={selectedSubcategoryId}
                onSelectSubcategory={selectSubcategory}
              />
            </div>
          )}

          {/* Auroitech Product Layer Selector (Story 05 - Technology) */}
          {(currentScene === "story_exploration" || currentScene === "one_system") && selectedEntityId === "auroitech" && (
            <div className="px-6 py-2 bg-sky-50/80 border-b border-sky-100 flex items-center justify-between z-10 text-xs select-none">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-sky-700" />
                <span className="font-extrabold text-sky-900 uppercase tracking-wider text-[10px]">
                  Digital Health Product Layer:
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setProductFilter(null)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    !productFilterId ? "bg-sky-600 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => setProductFilter("prod_a")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    productFilterId === "prod_a" ? "bg-sky-600 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  Product A: AuroEMR
                </button>
                <button
                  onClick={() => setProductFilter("prod_b")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    productFilterId === "prod_b" ? "bg-sky-600 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  Product B: VisionScreen AI
                </button>
                <button
                  onClick={() => setProductFilter("prod_c")}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    productFilterId === "prod_c" ? "bg-sky-600 text-white shadow-xs" : "bg-white text-slate-700 hover:bg-slate-200 border border-slate-200"
                  }`}
                >
                  Product C: Telemedicine Suite
                </button>
              </div>
            </div>
          )}

          {/* Geographic Breadcrumb Navigation */}
          {(currentScene === "story_exploration" || currentScene === "one_system") && (
            <GeographicBreadcrumb
              entityConfig={activeEntityConfig}
              selectedSubcategoryName={activeSubcategory.name}
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              onResetToIndia={() => selectState(null)}
              onResetToWorld={() => selectState(null)}
            />
          )}

          {/* Metric Strip */}
          {(currentScene === "story_exploration" || currentScene === "one_system") && (
            <MetricStrip
              entityConfig={activeEntityConfig}
              selectedSubcategoryId={selectedSubcategoryId}
              selectedState={selectedState}
              locations={filteredLocations}
            />
          )}

          {/* Interactive Map Canvas Engine (Dynamically Loaded) */}
          <div className="flex-1 relative">
            <MapEngine
              entityConfig={activeEntityConfig}
              locations={filteredLocations}
              stateAggregations={stateAggregations}
              selectedState={selectedState}
              selectedLocation={selectedLocation}
              onSelectState={selectState}
              onSelectLocation={selectLocation}
              onClearLocation={() => selectLocation(null)}
            />

            {/* Guided Tour Controls Bar */}
            {isGuidedPlaying && <GuidedControls />}

            {/* Follow the Impact Step-by-Step Nav */}
            {(currentScene === "story_exploration" || currentScene === "one_system") && !isGuidedPlaying && (
              <FollowImpactNav entityId={selectedEntityId} />
            )}

            {/* One System Finale Synthesis Overlay */}
            {currentScene === "one_system" && <OneSystemFinale />}

            {/* Map Legend */}
            <Legend
              entityConfig={activeEntityConfig}
              selectedState={selectedState}
              selectedSubcategoryId={selectedSubcategoryId}
            />

            {/* Unobtrusive Map Controls */}
            <MapControls
              onZoomIn={() => {}}
              onZoomOut={() => {}}
              onResetView={() => selectState(null)}
              onToggleFullscreen={() => {}}
            />

            {/* Quick Six Doors Switcher Bar at Bottom of Map */}
            {(currentScene === "story_exploration" || currentScene === "one_system") && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 z-20">
                {(["hospitals", "laico", "amrf", "aurolab", "auroitech", "eyebank", "all"] as EntityId[]).map(
                  (entityId) => {
                    const story = IMPACT_STORIES[entityId];
                    const isSelected = selectedEntityId === entityId;
                    return (
                      <button
                        key={entityId}
                        onClick={() => selectStory(entityId)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "text-white shadow-sm scale-105"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                        }`}
                        style={{
                          backgroundColor: isSelected ? story.accentColor : undefined,
                        }}
                      >
                        <span className="text-[10px] opacity-75">{story.doorNumber}</span>
                        <span>{story.title}</span>
                      </button>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </main>

        {/* Right Story Context Panel */}
        {(currentScene === "story_exploration" || currentScene === "one_system") && (
          <ContextPanel
            entityConfig={activeEntityConfig}
            selectedState={selectedState}
            stateAggregations={stateAggregations}
            selectedLocation={selectedLocation}
            locationsInSelectedState={locationsInSelectedState}
            onSelectLocation={selectLocation}
            onClearLocation={() => selectLocation(null)}
            onClearState={() => selectState(null)}
          />
        )}
      </div>

      {/* Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLocation={selectLocation}
        onSelectState={selectState}
        onSelectEntity={selectStory}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
