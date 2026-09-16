"use client";

import React from "react";
import { NarrationChapter } from "@/lib/narration/types";
import { X, Volume2, BookOpen } from "lucide-react";

interface TranscriptModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: NarrationChapter;
  activeCueIndex: number;
  onSelectCue: (cueIndex: number) => void;
}

export function TranscriptModal({
  isOpen,
  onClose,
  chapter,
  activeCueIndex,
  onSelectCue,
}: TranscriptModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[80vh] flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                Spoken Narration Transcript
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                {chapter.title}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Script Segments List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {chapter.segments.map((seg, idx) => {
            const isActive = idx === activeCueIndex;
            return (
              <div
                key={seg.id}
                onClick={() => onSelectCue(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-emerald-50/90 border-emerald-300 ring-2 ring-emerald-400/40 shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 border-slate-200/70"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider ${
                      isActive ? "text-emerald-800" : "text-slate-500"
                    }`}
                  >
                    Segment {idx + 1} · {chapter.cues[idx]?.label}
                  </span>
                  {isActive && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      <Volume2 className="w-3 h-3" /> Spoken Cue
                    </span>
                  )}
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1">
                  {seg.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  “{seg.text}”
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/60 text-center text-[11px] text-slate-500 font-medium">
          Select any segment above to jump directly to that geographic cue.
        </div>
      </div>
    </div>
  );
}
