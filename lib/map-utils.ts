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
 * 100% API-Key Free Self-Contained MapLibre GL Light Style.
 * Renders crisp vector land, borders, and water without any external tile dependencies.
 */
export const LIGHT_ATLAS_MAP_STYLE: maplibreGl.StyleSpecification = {
  version: 8,
  name: "Institutional Light Atlas",
  sources: {
    world_countries: {
      type: "geojson",
      data: "/maps/world/countries.geojson",
    },
    india_states: {
      type: "geojson",
      data: "/maps/india/states.geojson",
    },
  },
  layers: [
    {
      id: "background-water",
      type: "background",
      paint: {
        "background-color": "#E7EEF2",
      },
    },
    {
      id: "world-land-fill",
      type: "fill",
      source: "world_countries",
      paint: {
        "fill-color": "#EEF0EC",
        "fill-opacity": 0.95,
      },
    },
    {
      id: "world-borders",
      type: "line",
      source: "world_countries",
      paint: {
        "line-color": "#D3D8D3",
        "line-width": 1.0,
      },
    },
  ],
};
