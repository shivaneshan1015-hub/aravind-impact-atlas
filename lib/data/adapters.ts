import { EntityId } from "@/types/entity";
import { GeoLocationItem } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";

/**
 * Entity Data Adapter Pipeline.
 * Filters raw location records by entity, subcategory, and optional product filters.
 */
export function getLocationsForEntity(
  entityId: EntityId,
  subcategoryId?: string,
  activeProductId?: string
): GeoLocationItem[] {
  if (entityId === "all") {
    return DEMO_LOCATIONS;
  }

  let filtered = DEMO_LOCATIONS.filter((item) => item.entityId === entityId);

  if (subcategoryId) {
    filtered = filtered.filter((item) => item.subcategoryId === subcategoryId);
  }

  // Auroitech Product Filtering
  if (entityId === "auroitech" && subcategoryId === "tech_products" && activeProductId) {
    filtered = filtered.filter(
      (item) => item.metrics && item.metrics.productId === activeProductId
    );
  }

  return filtered;
}

/**
 * Filters Auroitech locations by product filter ID.
 */
export function filterAuroitechByProduct(
  locations: GeoLocationItem[],
  productId: string
): GeoLocationItem[] {
  return locations.filter(
    (item) => item.metrics && item.metrics.productId === productId
  );
}

/**
 * Enforces Aurolab Aggregate-Only Policy.
 * Aurolab is meant to communicate aggregate reach only (e.g. Tamil Nadu · 4 Dealers),
 * without exposing individual operational dealer profiles or names.
 */
export function isAurolabAggregateOnly(entityId: EntityId): boolean {
  return entityId === "aurolab";
}
