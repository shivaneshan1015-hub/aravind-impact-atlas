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
  name: "CARTO Quiet Light Institutional Atlas",
  sources: {
    carto_light: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}@2x.png",
        "https://d.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a>',
    },
  },
  layers: [
    {
      id: "carto-light-basemap",
      type: "raster",
      source: "carto_light",
      minzoom: 0,
      maxzoom: 20,
    },
  ],
};
