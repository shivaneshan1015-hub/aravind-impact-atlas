export type EntityId =
  | "hospitals"
  | "laico"
  | "amrf"
  | "aurolab"
  | "auroitech"
  | "eyebank"
  | "all";

export type SubcategoryId = string;

export type GeographicScope = "world" | "country" | "state" | "city";

export type VisualizationType = "markers" | "choropleth" | "network" | "clusters";

export interface MetricDefinition {
  id: string;
  label: string;
  unit?: string;
  description?: string;
  format?: (value: number) => string;
}

export interface SubcategoryConfig {
  id: SubcategoryId;
  name: string;
  tagline?: string;
  defaultScope: GeographicScope;
  primaryMetricKey: string;
  secondaryMetricKeys: string[];
  legendTitle: string;
}

export interface EntityConfig {
  id: EntityId;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  color: string; // Theme color (hex)
  colorLight: string;
  bgGlow: string;
  subcategories: SubcategoryConfig[];
  metrics: MetricDefinition[];
  defaultCenter: [number, number]; // [lng, lat]
  defaultZoom: number;
}
