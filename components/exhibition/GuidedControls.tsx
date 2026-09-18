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
    stopGuidedJourney();
    const prevIdx = (guidedStepIndex - 1 + GUIDED_ENTITIES.length) % GUIDED_ENTITIES.length;
    selectStory(GUIDED_ENTITIES[prevIdx]);
  };

  const handleNext = () => {
    stopGuidedJourney();
    const nextIdx = (guidedStepIndex + 1) % GUIDED_ENTITIES.length;
    selectStory(GUIDED_ENTITIES[nextIdx]);
  };

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-30 bg-white/95 text-slate-900 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-slate-200 flex items-center gap-6 select-none min-w-[580px]">
      {/* Step Info */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-800">
              Guided Exhibition Tour · Step {guidedStepIndex + 1} of 7
            </span>
          </div>
          <h4 className="text-sm font-extrabold text-slate-900">
            {story.title} — “{story.question}”
          </h4>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={handlePrev}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
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
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
          }`}
        >
          {isGuidedPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>PAUSE</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>RESUME</span>
            </>
          )}
        </button>

        <button
          onClick={handleNext}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="Next Story"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        <button
          onClick={stopGuidedJourney}
          className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 transition-colors ml-1"
          title="Exit Guided Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
