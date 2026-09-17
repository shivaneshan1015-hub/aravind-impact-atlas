import { StyleSpecification } from "maplibre-gl";
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
 * Premium High-Contrast Dual Basemap Style.
 * Features:
 * 1. Crisp Voyager High-Contrast Light Mode (CartoDB Voyager - high contrast coastlines, roads, typography)
 * 2. High-Contrast Dark Slate Mode (CartoDB Dark Matter - high contrast dark slate terrain & neon markers)
 * Allows 0-millisecond instant switching between light & dark styles with zero reload flicker.
 */
export const HIGH_CONTRAST_ATLAS_STYLE: StyleSpecification = {
  version: 8,
  name: "High Contrast Dual Institutional Atlas",
  sources: {
    carto_voyager: {
      type: "raster",
      tiles: [
        "https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    carto_dark: {
      type: "raster",
      tiles: [
        "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "basemap-voyager",
      type: "raster",
      source: "carto_voyager",
      minzoom: 0,
      maxzoom: 18,
      layout: { visibility: "visible" },
    },
    {
      id: "basemap-dark",
      type: "raster",
      source: "carto_dark",
      minzoom: 0,
      maxzoom: 18,
      layout: { visibility: "none" },
    },
  ],
};

export const LIGHT_ATLAS_MAP_STYLE = HIGH_CONTRAST_ATLAS_STYLE;
