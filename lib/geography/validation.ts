import { GeoLocationItem, StateAggregation } from "@/types/geo";

export interface ValidationReport {
  isValid: boolean;
  totalLocations: number;
  stateAggregationsCount: number;
  mismatches: string[];
}

/**
 * Validates data consistency assertions for geographic counts vs records.
 */
export function validateAggregationIntegrity(
  locations: GeoLocationItem[],
  stateAggregations: StateAggregation[]
): ValidationReport {
  const mismatches: string[] = [];

  // 1. Validate total location count matches sum of state counts
  const sumStateCounts = stateAggregations.reduce((acc, s) => acc + s.count, 0);
  const totalIndiaLocations = locations.filter((l) => l.country === "India").length;

  if (sumStateCounts !== totalIndiaLocations) {
    mismatches.push(
      `Mismatch in total India locations: aggregated=${sumStateCounts}, actual=${totalIndiaLocations}`
    );
  }

  // 2. Validate individual state counts match exact filtered records
  stateAggregations.forEach((agg) => {
    const actualCount = locations.filter(
      (l) => l.country === "India" && l.state === agg.stateName
    ).length;

    if (agg.count !== actualCount) {
      mismatches.push(
        `State '${agg.stateName}' count mismatch: agg=${agg.count}, actual=${actualCount}`
      );
    }
  });

  // 3. Test Tamil Nadu specific assertion (Must equal 4 records)
  const tnRecords = locations.filter(
    (l) => l.country === "India" && l.state === "Tamil Nadu"
  );
  if (tnRecords.length !== 4) {
    mismatches.push(
      `Acceptance test failure: Tamil Nadu should have exactly 4 demo records, found ${tnRecords.length}`
    );
  }

  return {
    isValid: mismatches.length === 0,
    totalLocations: locations.length,
    stateAggregationsCount: stateAggregations.length,
    mismatches,
  };
}
