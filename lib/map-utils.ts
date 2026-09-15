import { EntityId } from "@/types/entity";
import { ENTITY_CONFIGS } from "@/config/entities";

/**
 * Get map accent color for an entity.
 */
export function getEntityColor(entityId: EntityId): string {
  return ENTITY_CONFIGS[entityId]?.color || "#EA580C";
}

/**
 * Convert hex color to rgba string with custom alpha.
 */
export function hexToRgba(hex: string, alpha: number = 1): string {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Premium Quiet Vector Institutional Basemap Style.
 * Clean monochrome vector landmass with 0 street noise, 0 raster tiles, 0 watermarks, 
 * matching reference specimen (soft off-white ocean #F4F4F2, warm light gray land #E2E2DF, crisp white borders #FFFFFF).
 */
export const LIGHT_ATLAS_MAP_STYLE: maplibreGl.StyleSpecification = {
  version: 8,
  name: "Quiet Light Vector Atlas",
  sources: {
    world: {
      type: "geojson",
      data: "/maps/world/countries.geojson",
    },
    india: {
      type: "geojson",
      data: "/maps/india/states.geojson",
    },
  },
  layers: [
    {
      id: "background-ocean",
      type: "background",
      paint: {
        "background-color": "#F4F4F2",
      },
    },
    {
      id: "world-countries-fill",
      type: "fill",
      source: "world",
      paint: {
        "fill-color": "#E2E2DF",
        "fill-opacity": 1.0,
      },
    },
    {
      id: "world-countries-border",
      type: "line",
      source: "world",
      paint: {
        "line-color": "#FFFFFF",
        "line-width": 1.2,
      },
    },
    {
      id: "india-states-fill",
      type: "fill",
      source: "india",
      paint: {
        "fill-color": "#DADAD7",
        "fill-opacity": 1.0,
      },
    },
    {
      id: "india-states-border",
      type: "line",
      source: "india",
      paint: {
        "line-color": "#FFFFFF",
        "line-width": 1.5,
      },
    },
  ],
};
