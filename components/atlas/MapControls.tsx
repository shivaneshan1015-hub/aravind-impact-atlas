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
    <div className="absolute top-6 right-6 flex flex-col gap-1.5 z-10 select-none">
      <div className="bg-white/95 border border-slate-200 rounded-lg p-1 shadow-md backdrop-blur-sm flex flex-col gap-1">
        <button
          onClick={onZoomIn}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="h-[1px] bg-slate-200 my-0.5" />

        <button
          onClick={onZoomOut}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onResetView}
        className="p-2 bg-white/95 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-md backdrop-blur-sm transition-colors"
        title="Reset Map View"
      >
        <RotateCcw className="w-4 h-4" />
      </button>

      <button
        onClick={onToggleFullscreen}
        className="p-2 bg-white/95 border border-slate-200 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-md backdrop-blur-sm transition-colors"
        title="Fullscreen Exhibition Mode"
      >
        <Maximize2 className="w-4 h-4" />
      </button>
    </div>
  );
}
