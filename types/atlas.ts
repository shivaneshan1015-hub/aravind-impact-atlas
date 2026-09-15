import { EntityId, GeographicScope } from "./entity";
import { GeoLocationItem, StateAggregation } from "./geo";

export interface AtlasState {
  selectedEntityId: EntityId;
  selectedSubcategoryId: string;
  selectedScope: GeographicScope;
  selectedState: string | null;
  selectedCountry: string | null;
  selectedLocation: GeoLocationItem | null;
  activeFilters: Record<string, string>;
  searchQuery: string;
  mapZoom: number;
  mapCenter: [number, number];
  isSearchOpen: boolean;
  isInfoOpen: boolean;
  isLegendOpen: boolean;
  exhibitionMode: boolean;
}

export interface MetricSummary {
  label: string;
  value: string | number;
  subtext?: string;
  change?: string;
}
