import React from "react";
import { EntityId } from "@/types/entity";
import { ENTITY_CONFIGS } from "@/config/entities";
import {
  Building2,
  GraduationCap,
  Microscope,
  Factory,
  Cpu,
  Eye,
  Globe2,
} from "lucide-react";
import { clsx } from "clsx";

interface EntityNavProps {
  selectedEntityId: EntityId;
  onSelectEntity: (entityId: EntityId) => void;
}

const ENTITY_ICONS: Record<EntityId, React.ComponentType<{ className?: string }>> = {
  all: Globe2,
  hospitals: Building2,
  laico: GraduationCap,
  amrf: Microscope,
  aurolab: Factory,
  auroitech: Cpu,
  eyebank: Eye,
};

export function EntityNav({
  selectedEntityId,
  onSelectEntity,
}: EntityNavProps) {
  const entityList: EntityId[] = [
    "all",
    "hospitals",
    "laico",
    "amrf",
    "aurolab",
    "auroitech",
    "eyebank",
  ];

  return (
    <aside className="w-56 md:w-64 bg-slate-950/95 border-r border-slate-800/80 flex flex-col shrink-0 z-20 select-none overflow-y-auto">
      <div className="p-3 border-b border-slate-800/60">
        <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest px-2">
          Aravind Entities
        </h3>
      </div>

      <nav className="p-2 space-y-1">
        {entityList.map((id) => {
          const config = ENTITY_CONFIGS[id];
          const isSelected = selectedEntityId === id;
          const Icon = ENTITY_ICONS[id];

          return (
            <button
              key={id}
              onClick={() => onSelectEntity(id)}
              className={clsx(
                "w-full text-left p-2.5 rounded-lg transition-all duration-200 group flex items-start gap-3 relative border",
                isSelected
                  ? "bg-slate-900 border-slate-700/80 shadow-md"
                  : "bg-transparent border-transparent hover:bg-slate-900/50 hover:border-slate-850 text-slate-400"
              )}
            >
              {/* Active Indicator Strip */}
              {isSelected && (
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full"
                  style={{ backgroundColor: config.color }}
                />
              )}

              {/* Icon Container */}
              <div
                className={clsx(
                  "p-2 rounded-md transition-colors shrink-0 border",
                  isSelected
                    ? "bg-slate-950 text-white"
                    : "bg-slate-900 text-slate-400 border-slate-800 group-hover:text-slate-200"
                )}
                style={
                  isSelected
                    ? { borderColor: config.color, color: config.color }
                    : undefined
                }
              >
                <Icon className="w-4 h-4" />
              </div>

              {/* Entity Information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={clsx(
                      "text-xs font-semibold tracking-wide truncate block",
                      isSelected ? "text-slate-100" : "text-slate-300 group-hover:text-slate-100"
                    )}
                  >
                    {config.shortName}
                  </span>
                </div>

                <p
                  className="text-[10px] font-medium tracking-wide truncate mt-0.5"
                  style={{
                    color: isSelected ? config.colorLight : "#64748B",
                  }}
                >
                  {config.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
