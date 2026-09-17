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
 * High-Contrast Light Institutional Atlas Map Style (Optimized for 55-inch Interactive Display).
 * Features:
 * - Esri World Light Gray Base raster layer
 * - 100% Free, 0 API key required, 100% ZERO watermark text
 * - Clean quiet institutional canvas style with high contrast boundaries & sharp state vectors
 */
export const HIGH_CONTRAST_55INCH_MAP_STYLE: StyleSpecification = {
  version: 8,
  name: "55in Interactive Display High-Contrast Institutional Atlas",
  sources: {
    esri_light_gray: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "esri-light-gray-basemap",
      type: "raster",
      source: "esri_light_gray",
      minzoom: 0,
      maxzoom: 16,
    },
  ],
};

export const LIGHT_ATLAS_MAP_STYLE = HIGH_CONTRAST_55INCH_MAP_STYLE;
