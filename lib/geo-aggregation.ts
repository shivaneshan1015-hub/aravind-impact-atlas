import { EntityId } from "@/types/entity";
import { GeoLocationItem, StateAggregation, CountryAggregation } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { INDIA_STATES_META } from "@/data/india-states";

/**
 * Filter locations by Entity ID and optional Subcategory ID.
 * If entityId === 'all', returns all demo locations.
 */
export function getFilteredLocations(
  entityId: EntityId,
  subcategoryId?: string
): GeoLocationItem[] {
  if (entityId === "all") {
    return DEMO_LOCATIONS;
  }

  return DEMO_LOCATIONS.filter((item) => {
    if (item.entityId !== entityId) return false;
    if (subcategoryId && item.subcategoryId !== subcategoryId) return false;
    return true;
  });
}

/**
 * Aggregate locations by Indian state.
 * Returns dynamic state counts, centroids, bounds, and entity breakdowns.
 */
export function aggregateByState(locations: GeoLocationItem[]): StateAggregation[] {
  const stateMap: Record<string, GeoLocationItem[]> = {};

  locations.forEach((item) => {
    if (item.country === "India" && item.state) {
      if (!stateMap[item.state]) {
        stateMap[item.state] = [];
      }
      stateMap[item.state].push(item);
    }
  });

  const aggregations: StateAggregation[] = [];

  Object.entries(stateMap).forEach(([stateName, items]) => {
    const meta = INDIA_STATES_META[stateName];
    // Fallback centroid if not in metadata
    const centroid: [number, number] = meta
      ? meta.centroid
      : [items[0].longitude, items[0].latitude];

    const bounds = meta ? meta.bounds : undefined;

    // Entity breakdown
    const entityBreakdown: Record<string, number> = {};
    items.forEach((it) => {
      entityBreakdown[it.entityId] = (entityBreakdown[it.entityId] || 0) + 1;
    });

    aggregations.push({
      stateName,
      countryName: "India",
      count: items.length,
      centroid,
      bounds,
      entityBreakdown,
    });
  });

  // Sort descending by count
  return aggregations.sort((a, b) => b.count - a.count);
}

/**
 * Aggregate locations by Country for global scope visualizations.
 */
export function aggregateByCountry(locations: GeoLocationItem[]): CountryAggregation[] {
  const countryMap: Record<string, GeoLocationItem[]> = {};

  locations.forEach((item) => {
    const c = item.country || "India";
    if (!countryMap[c]) countryMap[c] = [];
    countryMap[c].push(item);
  });

  return Object.entries(countryMap).map(([countryName, items]) => {
    const avgLng = items.reduce((acc, i) => acc + i.longitude, 0) / items.length;
    const avgLat = items.reduce((acc, i) => acc + i.latitude, 0) / items.length;

    const entityBreakdown: Record<string, number> = {};
    items.forEach((it) => {
      entityBreakdown[it.entityId] = (entityBreakdown[it.entityId] || 0) + 1;
    });

    return {
      countryName,
      count: items.length,
      centroid: [avgLng, avgLat],
      entityBreakdown,
    };
  });
}

/**
 * Generate Dynamic GeoJSON for state centroid badges (dynamic counts directly on map)
 */
export function buildStateCountsGeoJSON(aggregations: StateAggregation[]) {
  return {
    type: "FeatureCollection" as const,
    features: aggregations.map((agg) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: agg.centroid,
      },
      properties: {
        stateName: agg.stateName,
        count: agg.count,
        label: `${agg.stateName.toUpperCase()}\n${agg.count}`,
      },
    })),
  };
}

/**
 * Generate GeoJSON FeatureCollection from Location points
 */
export function buildLocationPointsGeoJSON(locations: GeoLocationItem[]) {
  return {
    type: "FeatureCollection" as const,
    features: locations.map((loc) => ({
      type: "Feature" as const,
      geometry: {
        type: "Point" as const,
        coordinates: [loc.longitude, loc.latitude],
      },
      properties: {
        id: loc.id,
        name: loc.name,
        entityId: loc.entityId,
        subcategoryId: loc.subcategoryId,
        state: loc.state,
        city: loc.city,
        country: loc.country,
        address: loc.address,
        contact: loc.contact,
        ...loc.metrics,
      },
    })),
  };
}
