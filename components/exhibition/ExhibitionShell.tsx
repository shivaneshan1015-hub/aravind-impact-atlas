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
import { GeoLocationItem } from "@/types/geo";
import { StaffGroup, StaffCategory } from "@/data/hospitals/staff-data";

import { ArrivalScene } from "./ArrivalScene";
import { SixDoorsNav } from "./SixDoorsNav";
import { AttractOverlay } from "./AttractOverlay";
import { ContextPanel } from "@/components/atlas/ContextPanel";
import { Legend } from "@/components/atlas/Legend";
import { FollowImpactNav } from "@/components/geography/FollowImpactNav";
import { GuidedControls } from "./GuidedControls";
import { OneSystemFinale } from "./OneSystemFinale";
import { SearchModal } from "@/components/atlas/SearchModal";
import { InfoModal } from "@/components/atlas/InfoModal";
import { EntityId } from "@/types/entity";
import { EyeBankVisualizer } from "@/components/eyebank/EyeBankVisualizer";
import { SidebarPanel } from "@/components/atlas/SidebarPanel";
import { useNarration } from "@/lib/narration/useNarration";
import { NarrationIndicator } from "@/components/narration/NarrationIndicator";
import { TranscriptModal } from "@/components/narration/TranscriptModal";
import { Maximize2, Minimize2, Home } from "lucide-react";

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

import { VisionCentreHospitalCategory } from "@/data/hospitals/vision-centres-data";

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
    stopGuidedJourney,
    selectStory,
    selectSubcategory,
    selectState,
    selectLocation,
    goToDimensions,
    goToArrival,
    setProductFilter,
    isFullscreen,
    toggleFullscreen,
  } = useScene();

  const [careTypeFilter, setCareTypeFilter] = React.useState<"all" | "tertiary" | "secondary" | "community" | "vision_centre">("all");
  const [visionCentreHubFilter, setVisionCentreHubFilter] = React.useState<VisionCentreHospitalCategory>("all");
  const [staffGroup, setStaffGroup] = React.useState<StaffGroup>("employees");
  const [staffCategory, setStaffCategory] = React.useState<StaffCategory | "all">("all");
  const [patientFilter, setPatientFilter] = React.useState<"pay" | "free" | "camp" | "all">("all");
  const [laicoCountryFilter, setLaicoCountryFilter] = React.useState<string>("all");
  const [eyeBankCategoryFilter, setEyeBankCategoryFilter] = React.useState<string>("all");

  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isInfoOpen, setIsInfoOpen] = React.useState(false);

  // Reset all local entity filters whenever user switches entity / story page
  React.useEffect(() => {
    setCareTypeFilter("all");
    setVisionCentreHubFilter("all");
    setStaffGroup("employees");
    setStaffCategory("all");
    setPatientFilter("all");
    setLaicoCountryFilter("all");
    setEyeBankCategoryFilter("all");
  }, [selectedEntityId]);

  // Guided Narration Hook for CARE Hospitals Pilot
  const narration = useNarration();

  // Synchronize narration playback when Guided Mode starts or stops
  React.useEffect(() => {
    if (isGuidedPlaying && selectedEntityId === "hospitals") {
      narration.play();
    } else {
      narration.exit();
    }
  }, [isGuidedPlaying, selectedEntityId]);

  // Synchronize narration cues with Map Engine filter and camera reveals
  React.useEffect(() => {
    if (isGuidedPlaying && selectedEntityId === "hospitals" && narration.activeCue) {
      if (narration.activeCue.centreType) {
        setCareTypeFilter(narration.activeCue.centreType);
      }
    }
  }, [narration.activeCue, isGuidedPlaying, selectedEntityId]);

  // Handle Visitor Interruption: Touching pins or map regions pauses narration cleanly
  const handleSelectStateWithInterruption = (stName: string | null) => {
    narration.handleVisitorInterruption();
    selectState(stName);
  };

  const handleSelectLocationWithInterruption = (loc: GeoLocationItem | null) => {
    narration.handleVisitorInterruption();
    selectLocation(loc);
  };

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
    return getFilteredLocations(selectedEntityId, selectedSubcategoryId, staffGroup, staffCategory, patientFilter);
  }, [selectedEntityId, selectedSubcategoryId, staffGroup, staffCategory, patientFilter]);

  // Apply Auroitech Product Filter, LAICO Country Filter, and Eye Bank Category Filter if active
  const filteredLocations = useMemo(() => {
    let locs = rawLocations;
    if (selectedEntityId === "auroitech" && productFilterId) {
      locs = filterAuroitechByProduct(locs, productFilterId);
    }
    if (selectedEntityId === "laico" && laicoCountryFilter && laicoCountryFilter !== "all") {
      locs = locs.filter(
        (l) => l.country && l.country.toLowerCase() === laicoCountryFilter.toLowerCase()
      );
    }
    if (selectedEntityId === "eyebank" && eyeBankCategoryFilter && eyeBankCategoryFilter !== "all") {
      locs = locs.filter((l) => {
        const catId = l.metadata?.categoryId;
        const catIds = l.metadata?.categoryIds as string[] | undefined;
        if (catId === eyeBankCategoryFilter) return true;
        if (catIds && catIds.includes(eyeBankCategoryFilter)) return true;
        if (l.id.includes(eyeBankCategoryFilter)) return true;
        return false;
      });
    }
    return locs;
  }, [selectedEntityId, rawLocations, productFilterId, laicoCountryFilter, eyeBankCategoryFilter]);

  // Dynamic State Aggregations derived from records
  const stateAggregations = useMemo(() => {
    return calculateStateAggregations(filteredLocations);
  }, [filteredLocations]);

  // Derive locations in selected state for ContextPanel
  const locationsInSelectedState = useMemo(() => {
    if (!selectedState) return [];
    return filteredLocations.filter((l) => l.state === selectedState);
  }, [filteredLocations, selectedState]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0F172A] font-sans antialiased text-slate-100 flex flex-col">
      {/* Scene Overlays */}
      {currentScene === "arrival" && <ArrivalScene />}
      {currentScene === "dimensions" && <SixDoorsNav />}
      {currentScene === "attract" && <AttractOverlay />}

      {/* Main Exhibition Stage Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar Panel (Story Exploration & One System) */}
        {(currentScene === "story_exploration" || currentScene === "one_system") && (
          <SidebarPanel
            entityConfig={activeEntityConfig}
            locations={filteredLocations}
            stateAggregations={stateAggregations}
            careTypeFilter={careTypeFilter}
            onSelectCareTypeFilter={setCareTypeFilter}
            selectedState={selectedState}
            onSelectState={handleSelectStateWithInterruption}
            selectedSubcategoryId={selectedSubcategoryId}
            onSelectSubcategory={selectSubcategory}
            selectedLocation={selectedLocation}
            onSelectLocation={handleSelectLocationWithInterruption}
            staffGroup={staffGroup}
            onSelectStaffGroup={setStaffGroup}
            staffCategory={staffCategory}
            onSelectStaffCategory={setStaffCategory}
            patientFilter={patientFilter}
            onSelectPatientFilter={setPatientFilter}
            visionCentreHubFilter={visionCentreHubFilter}
            onSelectVisionCentreHubFilter={setVisionCentreHubFilter}
            laicoCountryFilter={laicoCountryFilter}
            onSelectLaicoCountryFilter={setLaicoCountryFilter}
            eyeBankCategoryFilter={eyeBankCategoryFilter}
            onSelectEyeBankCategoryFilter={setEyeBankCategoryFilter}
          />
        )}

        {/* Core Exploration View (Map Canvas Dominates Remaining Viewport) */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-[#F7F8F6]">


          {/* Interactive Map Canvas Engine */}
          <div className="flex-1 relative w-full h-full">
            <MapEngine
              entityConfig={activeEntityConfig}
              locations={filteredLocations}
              stateAggregations={stateAggregations}
              selectedState={selectedState}
              selectedLocation={selectedLocation}
              selectedSubcategoryId={selectedSubcategoryId}
              onSelectState={handleSelectStateWithInterruption}
              onSelectLocation={handleSelectLocationWithInterruption}
              onClearLocation={() => selectLocation(null)}
              careTypeFilter={careTypeFilter}
              visionCentreHubFilter={visionCentreHubFilter}
              eyeBankCategoryFilter={eyeBankCategoryFilter}
              isOneSystem={currentScene === "one_system" || selectedEntityId === "all"}
            />

            {/* Guided Tour Narration Indicator Bar */}
            {isGuidedPlaying && selectedEntityId === "hospitals" ? (
              <NarrationIndicator
                playbackState={narration.playbackState}
                activeCue={narration.activeCue}
                currentCueIndex={narration.currentCueIndex}
                totalCues={narration.chapter.cues.length}
                isMuted={narration.isMuted}
                onPause={narration.pause}
                onResume={narration.resume}
                onExplore={narration.explore}
                onExit={stopGuidedJourney}
                onToggleMute={narration.toggleMute}
                onToggleTranscript={narration.toggleTranscript}
              />
            ) : isGuidedPlaying ? (
              <GuidedControls />
            ) : null}

            {/* Quick Six Doors Switcher Bar at Bottom of Map */}
            {(currentScene === "story_exploration" || currentScene === "one_system") && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-slate-200/80 flex items-center gap-2 z-20">
                {(["hospitals", "laico", "amrf", "aurolab", "auroitech", "eyebank", "staffs", "all"] as EntityId[]).map(
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

        {/* Right Story Context Panel (Hidden in Eye Bank mode and One System mode for pure map focus) */}
        {currentScene === "story_exploration" && selectedEntityId !== "eyebank" && selectedEntityId !== "all" && (
          <div className="absolute top-4 right-4 z-30 max-w-lg pointer-events-auto">
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
          </div>
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

      {/* Spoken Narration Script Transcript Modal */}
      <TranscriptModal
        isOpen={narration.isTranscriptOpen}
        onClose={narration.toggleTranscript}
        chapter={narration.chapter}
        activeCueIndex={narration.currentCueIndex}
        onSelectCue={narration.seekToCue}
      />

      {/* Floating Top-Right Fullscreen Control Button */}
      <button
        onClick={toggleFullscreen}
        className="fixed top-4 right-4 z-40 p-2.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-md hover:bg-slate-100 text-slate-700 transition-all"
        title={isFullscreen ? "Exit Fullscreen Mode" : "Enter Fullscreen Mode"}
      >
        {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
      </button>

      {/* Floating Bottom-Left Back Button to Starting Page */}
      {(currentScene === "story_exploration" || currentScene === "one_system") && (
        <button
          onClick={goToArrival}
          className="fixed bottom-4 left-4 z-40 px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-extrabold shadow-lg flex items-center gap-1.5 transition-all border border-slate-800"
          title="Return to Starting Page"
        >
          <Home className="w-3.5 h-3.5 text-amber-400" />
          <span>STARTING PAGE</span>
        </button>
      )}
    </div>
  );
}
