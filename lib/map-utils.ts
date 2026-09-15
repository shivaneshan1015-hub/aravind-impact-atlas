import { EntityId } from "@/types/entity";
import { ENTITY_CONFIGS } from "@/config/entities";

/**
 * Get map accent color for an entity.
 */
export function getEntityColor(entityId: EntityId): string {
  return ENTITY_CONFIGS[entityId]?.color || "#2563EB";
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
 * Custom institutional MapLibre style JSON.
 * High-performance, crisp dark theme basemap without requiring external API keys.
 */
export const DARK_ATLAS_MAP_STYLE: maplibreGl.StyleSpecification = {
  version: 8,
  name: "Institutional Dark Atlas",
  sources: {
    carto_dark: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "carto-dark-layer",
      type: "raster",
      source: "carto_dark",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};
