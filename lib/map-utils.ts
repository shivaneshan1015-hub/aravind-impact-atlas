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

export type MapVarietyId = "teal_coastal" | "voyager_topo" | "warm_ivory" | "glassmorphic";

export interface MapVarietyOption {
  id: MapVarietyId;
  name: string;
  badge: string;
  desc: string;
  borderColor: string;
  isDarkTheme: boolean;
}

export const MAP_VARIETIES: MapVarietyOption[] = [
  {
    id: "teal_coastal",
    name: "Electric Teal & Chalk",
    badge: "Vibrant Coastal",
    desc: "Crisp chalk white landmass with vibrant electric teal accents & slate borders",
    borderColor: "#0D9488",
    isDarkTheme: false,
  },
  {
    id: "voyager_topo",
    name: "Voyager Topo Terrain",
    badge: "Natural Topo",
    desc: "Detailed topographic terrain elevation & crisp cartography",
    borderColor: "#059669",
    isDarkTheme: false,
  },
  {
    id: "warm_ivory",
    name: "Warm Ivory & Cobalt",
    badge: "Healthcare Palette",
    desc: "Humanitarian warm ivory landmass with rich royal cobalt blue ocean",
    borderColor: "#1D4ED8",
    isDarkTheme: false,
  },
  {
    id: "glassmorphic",
    name: "Glassmorphic Midnight",
    badge: "Cyber Kiosk",
    desc: "Dark slate glassmorphic landmass with neon cyan glowing pins",
    borderColor: "#38BDF8",
    isDarkTheme: true,
  },
];

/**
 * 55-inch Interactive Exhibition Display Master Map Style.
 */
export const DISPLAY_55INCH_MASTER_STYLE: StyleSpecification = {
  version: 8,
  name: "55in Exhibition Display Master Atlas",
  sources: {
    carto_light: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: '&copy; CARTO &copy; OpenStreetMap',
    },
    carto_dark: {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
        "https://b.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
        "https://c.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: '&copy; CARTO &copy; OpenStreetMap',
    },
    esri_topo: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: '&copy; Esri &copy; OpenStreetMap',
    },
    esri_ocean: {
      type: "raster",
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: '&copy; Esri',
    },
  },
  layers: [
    {
      id: "basemap-light",
      type: "raster",
      source: "carto_light",
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
    {
      id: "basemap-topo",
      type: "raster",
      source: "esri_topo",
      minzoom: 0,
      maxzoom: 18,
      layout: { visibility: "none" },
    },
    {
      id: "basemap-ocean",
      type: "raster",
      source: "esri_ocean",
      minzoom: 0,
      maxzoom: 18,
      layout: { visibility: "none" },
    },
  ],
};

export const LIGHT_ATLAS_MAP_STYLE = DISPLAY_55INCH_MASTER_STYLE;
