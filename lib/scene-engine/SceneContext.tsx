"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { EntityId } from "@/types/entity";
import { GeoLocationItem } from "@/types/geo";
import { SceneId, ExperienceMode, SceneState, AttractState } from "./types";
import { ENTITY_CONFIGS } from "@/config/entities";
import { EXHIBITION_CONFIG } from "@/config/exhibition-config";
import { killAllTimelines } from "@/lib/animation/motion-engine";

interface SceneContextType extends SceneState {
  // Navigation Actions
  goToArrival: () => void;
  goToDimensions: () => void;
  selectStory: (entityId: EntityId) => void;
  selectSubcategory: (subId: string) => void;
  selectState: (stateName: string | null) => void;
  selectLocation: (location: GeoLocationItem | null) => void;
  setProductFilter: (productId: string | null) => void;
  resetAtlas: () => void;
  
  // Experience Modes & Attract State
  setExperienceMode: (mode: ExperienceMode) => void;
  startGuidedJourney: () => void;
  stopGuidedJourney: () => void;
  setAttractStep: (step: number, impact?: EntityId) => void;
  wakeFromAttract: () => void;
  
  // Fullscreen
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

const INACTIVITY_TIMEOUT_MS = 60000; // 60 seconds idle -> Attract Mode

const SceneContext = createContext<SceneContextType | undefined>(undefined);

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [currentScene, setCurrentScene] = useState<SceneId>("arrival");
  const [currentMode, setCurrentMode] = useState<ExperienceMode>("explore");
  const [selectedEntityId, setSelectedEntityId] = useState<EntityId>("hospitals");
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<string>("hospitals_locations");
  const [selectedCountry, setSelectedCountry] = useState<string | null>("India");
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<GeoLocationItem | null>(null);
  const [productFilterId, setProductFilterId] = useState<string | null>(null);
  const [isGuidedPlaying, setIsGuidedPlaying] = useState<boolean>(false);
  const [guidedStepIndex, setGuidedStepIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Decoupled Attract State
  const [attractState, setAttractState] = useState<AttractState>({
    active: false,
    step: 0,
  });

  // Inactivity Timer for Exhibition Touchscreen
  useEffect(() => {
    let timer: NodeJS.Timeout;

    const resetInactivityTimer = () => {
      clearTimeout(timer);
      if (!EXHIBITION_CONFIG.attractMode.enabled) return;
      // Only set attract timer if user is not already in attract scene
      if (currentScene !== "attract") {
        timer = setTimeout(() => {
          killAllTimelines();
          setAttractState({ active: true, step: 0 });
          setCurrentScene("attract");
          setCurrentMode("attract");
          setIsGuidedPlaying(false);
        }, EXHIBITION_CONFIG.attractMode.idleTimeoutMs);
      }
    };

    const events = ["pointerdown", "touchstart", "mousemove", "keydown"];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));

    resetInactivityTimer();

    return () => {
      clearTimeout(timer);
      events.forEach((evt) => window.removeEventListener(evt, resetInactivityTimer));
    };
  }, [currentScene]);

  // Handle Guided Mode Automation
  useEffect(() => {
    if (!isGuidedPlaying) return;

    const guidedSequence: EntityId[] = EXHIBITION_CONFIG.guidedMode.sequence;

    const stepTimer = setInterval(() => {
      setGuidedStepIndex((prev) => {
        const nextIdx = (prev + 1) % guidedSequence.length;
        const nextEntity = guidedSequence[nextIdx];
        setSelectedEntityId(nextEntity);
        const cfg = ENTITY_CONFIGS[nextEntity];
        if (cfg && cfg.subcategories.length > 0) {
          setSelectedSubcategoryId(cfg.subcategories[0].id);
        }
        if (nextEntity === "all") {
          setCurrentScene("one_system");
        } else {
          setCurrentScene("story_exploration");
        }
        return nextIdx;
      });
    }, EXHIBITION_CONFIG.guidedMode.stepDurationMs);

    return () => clearInterval(stepTimer);
  }, [isGuidedPlaying]);

  const goToArrival = useCallback(() => {
    killAllTimelines();
    setAttractState({ active: false, step: 0 });
    setCurrentScene("arrival");
    setSelectedState(null);
    setSelectedLocation(null);
  }, []);

  const goToDimensions = useCallback(() => {
    killAllTimelines();
    setAttractState({ active: false, step: 0 });
    setCurrentScene("dimensions");
    setSelectedState(null);
    setSelectedLocation(null);
  }, []);

  const selectStory = useCallback((entityId: EntityId) => {
    killAllTimelines();
    setSelectedEntityId(entityId);
    const cfg = ENTITY_CONFIGS[entityId];
    if (cfg && cfg.subcategories.length > 0) {
      setSelectedSubcategoryId(cfg.subcategories[0].id);
    }
    setSelectedState(null);
    setSelectedLocation(null);

    if (entityId === "all") {
      setCurrentScene("one_system");
    } else {
      setCurrentScene("story_exploration");
    }
  }, []);

  const selectSubcategory = useCallback((subId: string) => {
    setSelectedSubcategoryId(subId);
    setSelectedState(null);
    setSelectedLocation(null);
  }, []);

  const selectState = useCallback((stateName: string | null) => {
    setSelectedState(stateName);
    setSelectedLocation(null);
  }, []);

  const selectLocation = useCallback((location: GeoLocationItem | null) => {
    setSelectedLocation(location);
    if (location && !selectedState) {
      setSelectedState(location.state);
    }
  }, [selectedState]);

  const setProductFilter = useCallback((productId: string | null) => {
    setProductFilterId(productId);
    setSelectedState(null);
    setSelectedLocation(null);
  }, []);

  const resetAtlas = useCallback(() => {
    killAllTimelines();
    setAttractState({ active: false, step: 0 });
    setCurrentScene("dimensions");
    setCurrentMode("explore");
    setIsGuidedPlaying(false);
    setGuidedStepIndex(0);
    setSelectedEntityId("hospitals");
    setSelectedSubcategoryId("hospitals_locations");
    setSelectedCountry("India");
    setSelectedState(null);
    setSelectedLocation(null);
    setProductFilterId(null);
  }, []);

  const setExperienceMode = useCallback((mode: ExperienceMode) => {
    setCurrentMode(mode);
    if (mode === "guided") {
      setIsGuidedPlaying(true);
      setGuidedStepIndex(0);
      selectStory("hospitals");
    } else {
      setIsGuidedPlaying(false);
    }
  }, [selectStory]);

  const startGuidedJourney = useCallback(() => {
    setCurrentMode("guided");
    setIsGuidedPlaying(true);
    setGuidedStepIndex(0);
    selectStory("hospitals");
  }, [selectStory]);

  const stopGuidedJourney = useCallback(() => {
    setIsGuidedPlaying(false);
    setCurrentMode("explore");
  }, []);

  const setAttractStep = useCallback((step: number, impact?: EntityId) => {
    setAttractState({
      active: true,
      step,
      impact,
      startedAt: Date.now(),
    });
  }, []);

  const wakeFromAttract = useCallback(() => {
    killAllTimelines();
    setAttractState({ active: false, step: 0 });
    setCurrentScene("dimensions");
    setCurrentMode("explore");
    setIsGuidedPlaying(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  return (
    <SceneContext.Provider
      value={{
        currentScene,
        currentMode,
        selectedEntityId,
        selectedSubcategoryId,
        selectedCountry,
        selectedState,
        selectedLocation,
        productFilterId,
        isGuidedPlaying,
        guidedStepIndex,
        attractState,
        setAttractStep,
        goToArrival,
        goToDimensions,
        selectStory,
        selectSubcategory,
        selectState,
        selectLocation,
        setProductFilter,
        resetAtlas,
        setExperienceMode,
        startGuidedJourney,
        stopGuidedJourney,
        wakeFromAttract,
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) {
    throw new Error("useScene must be used within a SceneProvider");
  }
  return context;
}
