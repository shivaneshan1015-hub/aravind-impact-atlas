import React from "react";
import { Search, RotateCcw, Maximize2, Info } from "lucide-react";
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
    <header className="h-14 bg-white/95 border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-30 shrink-0 select-none backdrop-blur-md shadow-xs">
      {/* Left Title & Tagline */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-bold text-xs tracking-wider shadow-xs">
            50
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-slate-900 text-sm md:text-base">
                {BRANDING.title}
              </span>
              <span className="text-amber-700 font-medium tracking-widest text-xs md:text-sm">
                | {BRANDING.subtitle}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-normal tracking-wide hidden sm:block">
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
          className="text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200"
        >
          <Search className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden xl:inline-block ml-1 px-1.5 py-0.5 text-[10px] bg-white text-slate-500 rounded border border-slate-300">
            ⌘K
          </kbd>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onResetView}
          className="text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200"
          title="Reset Map View"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden sm:inline">Reset</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onToggleFullscreen}
          className="text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200"
          title="Toggle Fullscreen Exhibition Mode"
        >
          <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">Fullscreen</span>
        </Button>

        <Button
          variant="secondary"
          size="sm"
          onClick={onOpenInfo}
          className="text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border-slate-200"
          title="About Impact Atlas"
        >
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span className="hidden md:inline">About</span>
        </Button>
      </div>
    </header>
  );
}
