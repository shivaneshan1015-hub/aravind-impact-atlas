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
    <div className="bg-white/90 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto select-none shrink-0 z-10 backdrop-blur-sm shadow-2xs">
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
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
              )}
              style={
                isSelected
                  ? {
                      backgroundColor: entityConfig.color,
                      borderColor: entityConfig.color,
                      color: "#FFFFFF",
                    }
                  : undefined
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: isSelected ? "#FFFFFF" : "#64748B",
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
