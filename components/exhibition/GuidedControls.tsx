"use client";

import React from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { EntityId } from "@/types/entity";
import { Play, Pause, ChevronLeft, ChevronRight, X, Sparkles } from "lucide-react";

const GUIDED_ENTITIES: EntityId[] = [
  "hospitals",
  "laico",
  "amrf",
  "aurolab",
  "auroitech",
  "eyebank",
  "all",
];

export function GuidedControls() {
  const {
    isGuidedPlaying,
    guidedStepIndex,
    selectedEntityId,
    stopGuidedJourney,
    startGuidedJourney,
    selectStory,
  } = useScene();

  const currentEntity = GUIDED_ENTITIES[guidedStepIndex] || "hospitals";
  const story = IMPACT_STORIES[currentEntity] || IMPACT_STORIES.hospitals;

  const handlePrev = () => {
    const prevIdx = (guidedStepIndex - 1 + GUIDED_ENTITIES.length) % GUIDED_ENTITIES.length;
    selectStory(GUIDED_ENTITIES[prevIdx]);
  };

  const handleNext = () => {
    const nextIdx = (guidedStepIndex + 1) % GUIDED_ENTITIES.length;
    selectStory(GUIDED_ENTITIES[nextIdx]);
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-slate-900/95 text-white backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-6 select-none animate-in fade-in slide-in-from-top-4 duration-300 min-w-[560px]">
      {/* Step Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">
              Guided Exhibition Tour · Step {guidedStepIndex + 1} of 7
            </span>
          </div>
          <h4 className="text-sm font-extrabold text-white">
            {story.doorNumber}. {story.title} — “{story.question}”
          </h4>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2.5 ml-auto">
        <button
          onClick={handlePrev}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          title="Previous Story"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (isGuidedPlaying) {
              stopGuidedJourney();
            } else {
              startGuidedJourney();
            }
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
            isGuidedPlaying
              ? "bg-amber-500 hover:bg-amber-400 text-slate-900"
              : "bg-emerald-600 hover:bg-emerald-500 text-white"
          }`}
        >
          {isGuidedPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE / EXPLORE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RESUME TOUR</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors"
          title="Next Story"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={stopGuidedJourney}
          className="p-2 rounded-xl bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white transition-colors ml-1"
          title="Exit Guided Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
