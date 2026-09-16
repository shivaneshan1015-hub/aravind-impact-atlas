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
import { EntityId } from "@/types/entity";
import { SidebarPanel } from "@/components/atlas/SidebarPanel";

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

  const [careTypeFilter, setCareTypeFilter] = React.useState<"all" | "tertiary" | "secondary" | "community">("all");

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
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#F7F8F6] font-sans text-slate-900 antialiased relative">
      {/* Main Workspace (Left Sidebar + Right Map Canvas) */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Scene 01: Arrival Screen */}
        {currentScene === "arrival" && <ArrivalScene />}

        {/* Scene 02: Six Doors Selector Overlay */}
        {currentScene === "dimensions" && <SixDoorsNav />}

        {/* Mode C: Attract Inactivity Overlay */}
        {currentScene === "attract" && <AttractOverlay />}

        {/* Left Sidebar Panel (Story Exploration & One System) */}
        {(currentScene === "story_exploration" || currentScene === "one_system") && (
          <SidebarPanel
            entityConfig={activeEntityConfig}
            locations={filteredLocations}
            stateAggregations={stateAggregations}
            careTypeFilter={careTypeFilter}
            onSelectCareTypeFilter={setCareTypeFilter}
            selectedState={selectedState}
            onSelectState={selectState}
          />
        )}

        {/* Core Exploration View (Map Canvas Dominates Remaining Viewport) */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#F7F8F6]">
          {/* Geographic Breadcrumb Navigation bar */}
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

          {/* Interactive Map Canvas Engine */}
          <div className="flex-1 relative w-full h-full">
            <MapEngine
              entityConfig={activeEntityConfig}
              locations={filteredLocations}
              stateAggregations={stateAggregations}
              selectedState={selectedState}
              selectedLocation={selectedLocation}
              onSelectState={selectState}
              onSelectLocation={selectLocation}
              onClearLocation={() => selectLocation(null)}
              careTypeFilter={careTypeFilter}
            />

            {/* Guided Tour Controls Bar */}
            {isGuidedPlaying && <GuidedControls />}

            {/* One System Finale Synthesis Overlay */}
            {currentScene === "one_system" && <OneSystemFinale />}

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
