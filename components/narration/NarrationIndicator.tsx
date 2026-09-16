"use client";

import React from "react";
import { NarrationPlaybackState, NarrationCue } from "@/lib/narration/types";
import { Volume2, VolumeX, Play, Pause, Compass, X, FileText, Sparkles } from "lucide-react";

interface NarrationIndicatorProps {
  playbackState: NarrationPlaybackState;
  activeCue: NarrationCue;
  currentCueIndex: number;
  totalCues: number;
  isMuted: boolean;
  onPause: () => void;
  onResume: () => void;
  onExplore: () => void;
  onExit: () => void;
  onToggleMute: () => void;
  onToggleTranscript: () => void;
}

export function NarrationIndicator({
  playbackState,
  activeCue,
  currentCueIndex,
  totalCues,
  isMuted,
  onPause,
  onResume,
  onExplore,
  onExit,
  onToggleMute,
  onToggleTranscript,
}: NarrationIndicatorProps) {
  const isPlaying = playbackState === "playing";
  const isPaused = playbackState === "paused";
  const isExploring = playbackState === "exploring";

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/95 text-slate-900 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 flex items-center gap-4 select-none min-w-[540px]">
      {/* Sound Pulse Indicator */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-3 h-3">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
              isPlaying ? "animate-ping bg-emerald-400" : "bg-slate-300"
            }`}
          />
          <span
            className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              isPlaying ? "bg-emerald-600" : isPaused ? "bg-amber-500" : "bg-slate-400"
            }`}
          />
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
              GUIDED TOUR · NARRATION · CARE
            </span>
            <span className="text-[9px] font-bold text-slate-400">
              ({currentCueIndex + 1}/{totalCues})
            </span>
          </div>
          <h4 className="text-xs font-extrabold text-slate-900 leading-tight">
            {activeCue.label}
          </h4>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Play / Pause Toggle */}
        <button
          onClick={isPlaying ? onPause : onResume}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
            isPlaying
              ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs"
              : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
          }`}
        >
          {isPlaying ? (
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

        {/* Explore Map Control */}
        <button
          onClick={onExplore}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
            isExploring
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
          }`}
          title="Pause narration to explore map freely"
        >
          <Compass className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <span>EXPLORE</span>
        </button>

        {/* Transcript Toggle */}
        <button
          onClick={onToggleTranscript}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title="View Script Transcript"
        >
          <FileText className="w-4 h-4" />
        </button>

        {/* Mute Toggle */}
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          title={isMuted ? "Unmute Narration" : "Mute Narration"}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-rose-500" />
          ) : (
            <Volume2 className="w-4 h-4 text-slate-700" />
          )}
        </button>

        {/* Exit Guided Tour Button */}
        <button
          onClick={onExit}
          className="p-1.5 rounded-xl bg-slate-100 hover:bg-rose-100 hover:text-rose-700 text-slate-500 transition-colors"
          title="Exit Guided Narration Tour"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
