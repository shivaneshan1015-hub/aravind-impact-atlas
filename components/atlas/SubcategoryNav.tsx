import React from "react";
import { EntityConfig } from "@/types/entity";
import { clsx } from "clsx";

interface SubcategoryNavProps {
  entityConfig: EntityConfig;
  selectedSubcategoryId: string;
  onSelectSubcategory: (subcategoryId: string) => void;
}

export function SubcategoryNav({
  entityConfig,
  selectedSubcategoryId,
  onSelectSubcategory,
}: SubcategoryNavProps) {
  const subcategories = entityConfig.subcategories;

  if (subcategories.length <= 1) return null;

  return (
    <div className="bg-slate-950/80 border-b border-slate-800/80 px-4 py-2 flex items-center gap-2 overflow-x-auto select-none shrink-0 z-10 backdrop-blur-sm">
      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mr-2 shrink-0 hidden sm:inline">
        Focus Layer:
      </span>

      <div className="flex items-center gap-1.5 overflow-x-auto">
        {subcategories.map((sub) => {
          const isSelected = selectedSubcategoryId === sub.id;

          return (
            <button
              key={sub.id}
              onClick={() => onSelectSubcategory(sub.id)}
              className={clsx(
                "px-3 py-1 rounded-md text-xs font-medium transition-all duration-150 whitespace-nowrap border shrink-0 flex items-center gap-1.5",
                isSelected
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-900/40 text-slate-400 border-slate-850 hover:bg-slate-850 hover:text-slate-200"
              )}
              style={
                isSelected
                  ? {
                      borderColor: entityConfig.color,
                      boxShadow: `0 0 10px ${entityConfig.color}25`,
                    }
                  : undefined
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: isSelected ? entityConfig.color : "#475569",
                }}
              />
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
