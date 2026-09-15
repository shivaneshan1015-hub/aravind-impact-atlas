"use client";

import React from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { Sparkles, Globe2, Heart, Award, Cpu, Eye, RotateCcw } from "lucide-react";

export function OneSystemFinale() {
  const { selectStory, resetAtlas } = useScene();

  return (
    <div className="absolute top-20 left-6 z-20 max-w-md bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-amber-200/80 text-slate-900 select-none animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Emblem */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-[10px] font-black uppercase tracking-widest mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
        <span>Golden Jubilee Synthesis (1976 – 2026)</span>
      </div>

      <h2 className="text-3xl font-black text-slate-900 leading-tight">
        ONE SYSTEM
        <span className="block text-xl font-light text-slate-600">
          A WORLD OF IMPACT
        </span>
      </h2>

      <p className="text-xs text-slate-600 mt-2 font-medium leading-relaxed">
        These are not six separate organizations. Care, Capacity Building, Research, Access, Technology, and Sight Restoration work as one unified system to eliminate needless blindness.
      </p>

      {/* Hero Integrated Metrics */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="bg-amber-50/70 border border-amber-200/60 p-3 rounded-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900">
            Patient Touchpoints
          </span>
          <div className="text-2xl font-black text-amber-900 mt-0.5">
            75,000,000+
          </div>
          <span className="text-[10px] text-amber-700 font-bold">worldwide</span>
        </div>

        <div className="bg-teal-50/70 border border-teal-200/60 p-3 rounded-xl">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-900">
            Countries Reached
          </span>
          <div className="text-2xl font-black text-teal-900 mt-0.5">
            160+
          </div>
          <span className="text-[10px] text-teal-700 font-bold">nations served</span>
        </div>
      </div>

      {/* 6 Connected Dimensions Grid */}
      <div className="space-y-1.5 pt-2 border-t border-slate-100">
        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
          Integrated System Dimensions
        </span>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            onClick={() => selectStory("hospitals")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
            <span className="group-hover:text-blue-600 text-[11px]">01 Care</span>
          </button>
          <button
            onClick={() => selectStory("laico")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
            <span className="group-hover:text-teal-600 text-[11px]">02 Capacity</span>
          </button>
          <button
            onClick={() => selectStory("amrf")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-purple-600 shrink-0" />
            <span className="group-hover:text-purple-600 text-[11px]">03 Research</span>
          </button>
          <button
            onClick={() => selectStory("aurolab")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
            <span className="group-hover:text-amber-600 text-[11px]">04 Access</span>
          </button>
          <button
            onClick={() => selectStory("auroitech")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
            <span className="group-hover:text-sky-600 text-[11px]">05 Technology</span>
          </button>
          <button
            onClick={() => selectStory("eyebank")}
            className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left font-bold text-slate-800 transition-all flex items-center gap-2 group"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 shrink-0" />
            <span className="group-hover:text-emerald-600 text-[11px]">06 Sight Restoration</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button
          onClick={resetAtlas}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs shadow-md transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span>RESET ATLAS & EXPLORE AGAIN</span>
        </button>
      </div>
    </div>
  );
}
