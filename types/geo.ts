import { EntityId } from "./entity";

export interface GeoLocationItem {
  id: string;
  name: string;
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
  entityBreakdown?: Record<EntityId, number>;
}
