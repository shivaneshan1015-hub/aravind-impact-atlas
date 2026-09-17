import React from "react";
import { Plus, Minus, RotateCcw, Maximize2 } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleFullscreen: () => void;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
}: MapControlsProps) {
  return (
    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 select-none">
      <div className="bg-white/95 border border-slate-300 rounded-xl p-1 shadow-lg backdrop-blur-md flex flex-col gap-1">
        <button
          onClick={onZoomIn}
          className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
          title="Zoom In"
        >
          <Plus className="w-5 h-5 stroke-[2.5]" />
        </button>

        <div className="h-[1px] bg-slate-200 my-0.5" />

        <button
          onClick={onZoomOut}
          className="p-2.5 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors active:scale-95"
          title="Zoom Out"
        >
          <Minus className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      <button
        onClick={onResetView}
        className="p-2.5 bg-white/95 border border-slate-300 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-lg backdrop-blur-md transition-colors active:scale-95 flex items-center justify-center"
        title="Reset Map View"
      >
        <RotateCcw className="w-5 h-5 stroke-[2.5]" />
      </button>

      <button
        onClick={onToggleFullscreen}
        className="p-2.5 bg-white/95 border border-slate-300 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-lg backdrop-blur-md transition-colors active:scale-95 flex items-center justify-center"
        title="Fullscreen Exhibition Mode"
      >
        <Maximize2 className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
