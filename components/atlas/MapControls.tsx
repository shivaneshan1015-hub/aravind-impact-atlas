import React from "react";
import { Plus, Minus, RotateCcw, Maximize2, Sun, Moon } from "lucide-react";

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  onToggleFullscreen: () => void;
  mapTheme?: "light" | "dark";
  onToggleTheme?: () => void;
}

export function MapControls({
  onZoomIn,
  onZoomOut,
  onResetView,
  onToggleFullscreen,
  mapTheme = "light",
  onToggleTheme,
}: MapControlsProps) {
  return (
    <div className="absolute top-6 left-6 flex flex-col gap-1.5 z-10 select-none">
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

      {onToggleTheme && (
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-lg border shadow-md backdrop-blur-sm transition-all flex items-center justify-center ${
            mapTheme === "dark"
              ? "bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800"
              : "bg-white/95 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          }`}
          title={mapTheme === "dark" ? "Switch to Crisp Light Mode" : "Switch to Dark Slate Mode"}
        >
          {mapTheme === "dark" ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      )}

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
