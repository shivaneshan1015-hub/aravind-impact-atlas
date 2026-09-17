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
 * Uses Esri World Light Gray Base & Esri World Dark Gray Base.
 * 100% Free, 0 API key required, 100% ZERO watermark.
 * Features:
 * 1. Crisp Light Mode (Esri Light Gray Base - quiet & clean)
 * 2. High-Contrast Dark Slate Mode (Esri Dark Gray Base - dark slate terrain & neon glowing pins)
 * Allows 0-millisecond instant switching between light & dark styles with zero reload flicker.
 */
export const HIGH_CONTRAST_ATLAS_STYLE: StyleSpecification = {
  version: 8,
  name: "High Contrast Dual Institutional Atlas",
  sources: {
    esri_light: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
    esri_dark: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://www.esri.com/">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "basemap-light",
      type: "raster",
      source: "esri_light",
      minzoom: 0,
      maxzoom: 16,
      layout: { visibility: "visible" },
    },
    {
      id: "basemap-dark",
      type: "raster",
      source: "esri_dark",
      minzoom: 0,
      maxzoom: 16,
      layout: { visibility: "none" },
    },
  ],
};

export const LIGHT_ATLAS_MAP_STYLE = HIGH_CONTRAST_ATLAS_STYLE;
