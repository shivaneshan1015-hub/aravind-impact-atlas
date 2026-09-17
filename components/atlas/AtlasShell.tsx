"use client";

import React, { useState, useMemo, useEffect } from "react";
import { EntityId } from "@/types/entity";
import { GeoLocationItem } from "@/types/geo";
import { ENTITY_CONFIGS, INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";
import {
  getFilteredLocations,
  calculateStateAggregations,
} from "@/lib/geography/aggregation";
import { validateAggregationIntegrity } from "@/lib/geography/validation";

import { Header } from "./Header";
import { EntityNav } from "./EntityNav";
import { SubcategoryNav } from "./SubcategoryNav";
import { MetricStrip } from "./MetricStrip";
import { ContextPanel } from "./ContextPanel";
import { Legend } from "./Legend";
import { MapControls } from "./MapControls";
import { MapEngine } from "./MapEngine";
import { SearchModal } from "./SearchModal";
import { InfoModal } from "./InfoModal";
import { GeographicBreadcrumb } from "@/components/geography/GeographicBreadcrumb";

export function AtlasShell() {
  // Application State
  const [selectedEntityId, setSelectedEntityId] = useState<EntityId>("aurolab");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>("national_dealers");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("India");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GeoLocationItem | null>(null);

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  // Active Entity Config
  const activeEntityConfig = ENTITY_CONFIGS[selectedEntityId];

  // Active Subcategory Config
  const activeSubcategory = useMemo(() => {
    return (
      activeEntityConfig.subcategories.find((s) => s.id === selectedSubcategoryId) ||
      activeEntityConfig.subcategories[0]
    );
  }, [activeEntityConfig, selectedSubcategoryId]);

  // Filtered Locations
  const filteredLocations = useMemo(() => {
    return getFilteredLocations(selectedEntityId, selectedSubcategoryId);
  }, [selectedEntityId, selectedSubcategoryId]);

  // Dynamic State Aggregation derived from records
  const stateAggregations = useMemo(() => {
    return calculateStateAggregations(filteredLocations);
  }, [filteredLocations]);

  // Runtime Data Assertion Check (State aggregate sum == Location record total)
  useEffect(() => {
    const report = validateAggregationIntegrity(filteredLocations, stateAggregations);
    if (!report.isValid) {
      console.warn("[Atlas Validation Mismatch]", report.mismatches);
    }
  }, [filteredLocations, stateAggregations]);

  // Locations filtered inside current selected state
  const locationsInSelectedState = useMemo(() => {
    if (!selectedState) return [];
    return filteredLocations.filter((l) => l.state === selectedState);
  }, [filteredLocations, selectedState]);

  // Navigation Handlers
  const handleSelectEntity = (entityId: EntityId) => {
    setSelectedEntityId(entityId);
    const cfg = ENTITY_CONFIGS[entityId];
    if (cfg.subcategories.length > 0) {
      setSelectedSubcategoryId(cfg.subcategories[0].id);
    }
    setSelectedState(null);
    setSelectedLocation(null);
  };

  const handleSelectSubcategory = (subId: string) => {
    setSelectedSubcategoryId(subId);
    setSelectedState(null);
    setSelectedLocation(null);
  };

  const handleSelectState = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedLocation(null);
  };

  const handleSelectLocation = (location: GeoLocationItem) => {
    setSelectedLocation(location);
    if (!selectedState) {
      setSelectedState(location.state);
    }
  };

  const handleResetToIndia = () => {
    setSelectedCountry("India");
    setSelectedState(null);
    setSelectedLocation(null);
  };

  const handleResetToWorld = () => {
    setSelectedCountry(null);
    setSelectedState(null);
    setSelectedLocation(null);
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 font-sans text-slate-100 antialiased">
      {/* 1. Quiet Header */}
      <Header
        onOpenSearch={() => setIsSearchOpen(true)}
        onResetView={handleResetToIndia}
        onToggleFullscreen={handleToggleFullscreen}
        onOpenInfo={() => setIsInfoOpen(true)}
      />

      {/* 2. Main Workspace Layout */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Left Entity Navigation */}
        <EntityNav
          selectedEntityId={selectedEntityId}
          onSelectEntity={handleSelectEntity}
        />

        {/* Center Workspace (Map + Controls) */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-950">
          {/* Subcategory Secondary Tabs */}
          <SubcategoryNav
            entityConfig={activeEntityConfig}
            selectedSubcategoryId={selectedSubcategoryId}
            onSelectSubcategory={handleSelectSubcategory}
          />

          {/* Geographic Breadcrumb Navigation */}
          <GeographicBreadcrumb
            entityConfig={activeEntityConfig}
            selectedSubcategoryName={activeSubcategory.name}
            selectedCountry={selectedCountry}
            selectedState={selectedState}
            onResetToIndia={handleResetToIndia}
            onResetToWorld={handleResetToWorld}
          />

          {/* Metric Strip */}
          <MetricStrip
            entityConfig={activeEntityConfig}
            selectedSubcategoryId={selectedSubcategoryId}
            selectedState={selectedState}
            locations={filteredLocations}
          />

          {/* Core Interactive Map Canvas */}
          <div className="flex-1 relative">
            <MapEngine
              entityConfig={activeEntityConfig}
              locations={filteredLocations}
              stateAggregations={stateAggregations}
              selectedState={selectedState}
              selectedLocation={selectedLocation}
              selectedSubcategoryId={selectedSubcategoryId}
              onSelectState={handleSelectState}
              onSelectLocation={handleSelectLocation}
              onClearLocation={() => setSelectedLocation(null)}
            />

            {/* Reusable Map Legend */}
            <Legend
              entityConfig={activeEntityConfig}
              selectedState={selectedState}
              selectedSubcategoryId={selectedSubcategoryId}
            />
          </div>
        </main>

        {/* Right Contextual Panel */}
        <ContextPanel
          entityConfig={activeEntityConfig}
          selectedState={selectedState}
          stateAggregations={stateAggregations}
          selectedLocation={selectedLocation}
          locationsInSelectedState={locationsInSelectedState}
          onSelectLocation={handleSelectLocation}
          onClearLocation={() => setSelectedLocation(null)}
          onClearState={() => setSelectedState(null)}
        />
      </div>

      {/* Search & Info Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectLocation={handleSelectLocation}
        onSelectState={handleSelectState}
        onSelectEntity={handleSelectEntity}
      />

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
      />
    </div>
  );
}
