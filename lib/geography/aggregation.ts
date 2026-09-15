import { EntityId } from "@/types/entity";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
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
 * Generic field-based aggregator.
 */
export function aggregateByField<T extends Record<string, any>>(
  records: T[],
  fieldKey: keyof T
): Record<string, T[]> {
  const result: Record<string, T[]> = {};

  records.forEach((rec) => {
    const fieldValue = rec[fieldKey];
    if (typeof fieldValue === "string" && fieldValue.trim() !== "") {
      const key = fieldValue.trim();
      if (!result[key]) result[key] = [];
      result[key].push(rec);
    }
  });

  return result;
}

/**
 * Generic unique count calculator for any record list and field key.
 */
export function countUnique<T extends Record<string, any>>(
  records: T[],
  fieldKey: keyof T
): number {
  const set = new Set<string>();
  records.forEach((rec) => {
    const val = rec[fieldKey];
    if (typeof val === "string" && val.trim()) {
      set.add(val.trim());
    }
  });
  return set.size;
}

/**
 * Calculates Indian state aggregations dynamically from location records.
 */
export function calculateStateAggregations(
  locations: GeoLocationItem[]
): StateAggregation[] {
  const stateGroups = aggregateByField(locations, "state");

  return Object.entries(stateGroups)
    .map(([stateName, items]) => {
      const meta = INDIA_STATES_META[stateName];
      const centroid: [number, number] = meta
        ? meta.centroid
        : [items[0].longitude, items[0].latitude];

      const bounds = meta ? meta.bounds : undefined;

      return {
        stateName,
        countryName: "India",
        count: items.length,
        centroid,
        bounds,
      };
    })
    .sort((a, b) => b.count - a.count);
}
