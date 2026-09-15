import React from "react";
import { Search, RotateCcw, Maximize2, Info, Sparkles } from "lucide-react";
import { BRANDING } from "@/config/branding";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface HeaderProps {
  onOpenSearch: () => void;
  onResetView: () => void;
  onToggleFullscreen: () => void;
  onOpenInfo: () => void;
}

export function Header({
  onOpenSearch,
  onResetView,
  onToggleFullscreen,
  onOpenInfo,
}: HeaderProps) {
  return (
    <header className="h-14 bg-slate-950/90 border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between z-30 shrink-0 select-none backdrop-blur-md">
      {/* Left Title & Tagline */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-gradient-to-br from-amber-500/20 to-blue-600/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-xs tracking-wider shadow-inner">
            50
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-slate-100 text-sm md:text-base">
                {BRANDING.title}
              </span>
              <span className="text-amber-400 font-light tracking-widest text-xs md:text-sm">
                | {BRANDING.subtitle}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-normal tracking-wide hidden sm:block">
              {BRANDING.tagline}
            </p>
          </div>
        </div>

        {/* Demo Data Indicator */}
        <Badge variant="demo" className="hidden lg:inline-flex text-[10px]">
          {BRANDING.demoIndicator}
        </Badge>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenSearch}
          className="text-slate-300 hover:text-white"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden xl:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-slate-800 text-slate-400 rounded border border-slate-700">
            ⌘K
          </kbd>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onResetView}
          className="text-slate-300 hover:text-white"
          title="Reset Map View"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleFullscreen}
          className="text-slate-300 hover:text-white"
          title="Toggle Fullscreen Exhibition Mode"
        >
          <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">Fullscreen</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenInfo}
          className="text-slate-300 hover:text-white"
          title="About Impact Atlas"
        >
          <Info className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden md:inline">About</span>
        </Button>
      </div>
    </header>
  );
}
