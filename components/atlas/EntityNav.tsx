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
    <aside className="w-56 md:w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 z-20 select-none overflow-y-auto shadow-xs">
      <div className="p-3 border-b border-slate-100">
        <h3 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2">
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
                  ? "bg-slate-50 border-slate-300 shadow-xs"
                  : "bg-transparent border-transparent hover:bg-slate-50 text-slate-600"
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
                    ? "bg-white border-slate-300 shadow-2xs"
                    : "bg-slate-100 text-slate-500 border-slate-200 group-hover:bg-white group-hover:text-slate-800"
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
                      isSelected ? "text-slate-900" : "text-slate-700 group-hover:text-slate-900"
                    )}
                  >
                    {config.shortName}
                  </span>
                </div>

                <p
                  className="text-[10px] font-medium tracking-wide truncate mt-0.5"
                  style={{
                    color: isSelected ? config.color : "#64748B",
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
