import { EntityId } from "./entity";

export type CareCentreType = "tertiary" | "secondary" | "community" | "vision_centre";

export interface GeoLocationItem {
  id: string;
  name: string;
  rawName?: string;
  entityId: EntityId;
  subcategoryId: string;
  country: string;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  metrics: Record<string, number | string>;
  metadata?: Record<string, any>;
  address?: string;
  contact?: string;
  establishedYear?: number;
  type?: string;
  careType?: CareCentreType;
  sourceStatus?: "source-supplied" | "validated" | "needs-validation";
}

export type GeographicGrammar =
  | "footprint"
  | "capacity"
  | "collaboration"
  | "distribution"
  | "product"
  | "flow"
  | "auto";

export type GeographicLevel = "world" | "country" | "state" | "city";

export interface GeographicRecord {
  id: string;
  rawLocation: string;
  normalizedLocation: string;
  geographicLevel: GeographicLevel;
  country: string;
  state?: string;
  city?: string;
  latitude: number;
  longitude: number;
  category?: string;
  metric?: string;
  count?: number;
  sourceStatus: "source-supplied-dev-data" | "phase7-pending";
  metadata?: Record<string, any>;
}

export interface StateAggregation {
  stateName: string;
  countryName: string;
  count: number;
  centroid: [number, number]; // [lng, lat]
  bounds?: [[number, number], [number, number]];
  entityBreakdown?: Record<EntityId, number>;
}

export interface CountryAggregation {
  countryName: string;
  count: number;
  centroid: [number, number]; // [lng, lat]
  bounds?: [[number, number], [number, number]];
  entityBreakdown?: Record<EntityId, number>;
}
