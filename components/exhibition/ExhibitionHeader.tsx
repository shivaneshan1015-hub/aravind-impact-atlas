"use client";

import React from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { Compass, RotateCcw, Maximize2, Minimize2, Play, Eye } from "lucide-react";

export function ExhibitionHeader() {
  const {
    currentMode,
    setExperienceMode,
    resetAtlas,
    isFullscreen,
    toggleFullscreen,
    currentScene,
    goToArrival,
  } = useScene();

  return (
    <header className="h-16 px-6 bg-white/90 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between z-30 shrink-0 select-none shadow-xs">
      {/* Brand & Golden Jubilee Emblem */}
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={goToArrival}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-md font-bold text-lg tracking-wider group-hover:scale-105 transition-transform">
          A50
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-slate-900 text-lg tracking-tight">
              ARAVIND 50
            </h1>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
            <span className="font-bold text-amber-700 text-xs uppercase tracking-widest bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
              IMPACT ATLAS
            </span>
          </div>
          <p className="text-[11px] font-medium text-slate-500 tracking-wide">
            One system. A world of impact.
          </p>
        </div>
      </div>

      {/* Mode Switcher & Reset Actions */}
      <div className="flex items-center gap-4">
        {/* Mode Selector Pill */}
        <div className="flex items-center bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner">
          <button
            onClick={() => setExperienceMode("explore")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
              currentMode === "explore"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Compass className="w-4 h-4 text-amber-600" />
            <span>EXPLORE MODE</span>
          </button>

          <button
            onClick={() => setExperienceMode("guided")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all min-h-[40px] ${
              currentMode === "guided"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>GUIDED TOUR</span>
          </button>
        </div>

        {/* Prominent Reset Atlas Button for Exhibition Touchscreen */}
        <button
          onClick={resetAtlas}
          className="flex items-center gap-2.5 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-full text-xs font-extrabold shadow-md hover:shadow-lg transition-all active:scale-95 min-h-[44px] min-w-[130px] justify-center border border-slate-800"
          title="Reset to home overview"
        >
          <RotateCcw className="w-4 h-4 text-amber-400" />
          <span>RESET ATLAS</span>
        </button>

        {/* Touchscreen Fullscreen Toggle */}
        <button
          onClick={toggleFullscreen}
          className="p-2.5 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors border border-slate-200"
          title={isFullscreen ? "Exit Fullscreen" : "Touchscreen Fullscreen"}
        >
          {isFullscreen ? (
            <Minimize2 className="w-4 h-4" />
          ) : (
            <Maximize2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </header>
  );
}
