import React from "react";
import { EntityConfig } from "@/types/entity";
import { clsx } from "clsx";

interface SubcategoryNavProps {
  entityConfig: EntityConfig;
  selectedSubcategoryId: string;
  onSelectSubcategory: (subcategoryId: string) => void;
  activeProductId?: string;
  onSelectProduct?: (productId: string) => void;
}

export function SubcategoryNav({
  entityConfig,
  selectedSubcategoryId,
  onSelectSubcategory,
  activeProductId = "product_a",
  onSelectProduct,
}: SubcategoryNavProps) {
  const subcategories = entityConfig.subcategories;

  const isAuroitechProducts =
    entityConfig.id === "auroitech" && selectedSubcategoryId === "tech_products";

  return (
    <div className="bg-white/90 border-b border-slate-200 px-4 py-2 flex items-center justify-between overflow-x-auto select-none shrink-0 z-10 backdrop-blur-sm shadow-2xs">
      <div className="flex items-center gap-2 overflow-x-auto">
        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mr-2 shrink-0 hidden sm:inline">
          Focus Layer:
        </span>

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

      {/* Auroitech Product Selector Filter */}
      {isAuroitechProducts && onSelectProduct && (
        <div className="flex items-center gap-1.5 shrink-0 ml-4 pl-4 border-l border-slate-200">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 shrink-0">
            Product Filter:
          </span>
          {[
            { id: "product_a", name: "Product A (AuroEMR)" },
            { id: "product_b", name: "Product B (VisionScreen AI)" },
            { id: "product_c", name: "Product C (Telemedicine)" },
          ].map((prod) => {
            const isProdSelected = activeProductId === prod.id;
            return (
              <button
                key={prod.id}
                onClick={() => onSelectProduct(prod.id)}
                className={clsx(
                  "px-2.5 py-0.5 rounded text-[11px] font-semibold transition-colors border",
                  isProdSelected
                    ? "bg-sky-600 text-white border-sky-600"
                    : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                )}
              >
                {prod.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
