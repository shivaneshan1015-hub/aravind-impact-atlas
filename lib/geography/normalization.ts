import { GeographicRecord, GeographicLevel } from "@/types/geo";

/**
 * Known Geographic Alias Normalization Table.
 * Preserves raw input values while returning clean standardized geographic names.
 */
export const GEOGRAPHIC_ALIASES: Record<string, string> = {
  "Bangalore": "Bengaluru",
  "Cochin": "Kochi",
  "Vishakapatnam": "Visakhapatnam",
  "Visakhapatnam": "Visakhapatnam",
  "Bhubaneshwar": "Bhubaneswar",
  "The Netherlands": "Netherlands",
  "Holland": "Netherlands",
  "USA": "United States",
  "US": "United States",
  "UK": "United Kingdom",
  "U.K.": "United Kingdom",
  "U.S.A.": "United States",
  "UAE": "United Arab Emirates",
  "U.A.E.": "United Arab Emirates",
};

/**
 * Known Ambiguous Locations.
 * E.g., "Dubai" is an Emirate / City, not a independent sovereign country.
 */
export interface AmbiguousLocationFlag {
  rawLocation: string;
  suggestedLevel: GeographicLevel;
  parentCountry: string;
  notes: string;
}

export const AMBIGUOUS_LOCATIONS: Record<string, AmbiguousLocationFlag> = {
  "Dubai": {
    rawLocation: "Dubai",
    suggestedLevel: "city",
    parentCountry: "United Arab Emirates",
    notes: "Source specifies Dubai city/emirate; normalized under United Arab Emirates.",
  },
};

/**
 * Normalizes location strings.
 */
export function normalizeLocationName(rawName: string): string {
  if (!rawName) return "";
  const trimmed = rawName.trim();
  return GEOGRAPHIC_ALIASES[trimmed] || trimmed;
}

/**
 * Convert any location item or raw record into a normalized GeographicRecord.
 */
export function createNormalizedGeographicRecord(
  id: string,
  rawLocation: string,
  geographicLevel: GeographicLevel,
  country: string,
  latitude: number,
  longitude: number,
  options?: {
    state?: string;
    city?: string;
    category?: string;
    metric?: string;
    count?: number;
    metadata?: Record<string, any>;
  }
): GeographicRecord {
  const normLoc = normalizeLocationName(rawLocation);
  const normCountry = normalizeLocationName(country);
  const normState = options?.state ? normalizeLocationName(options.state) : undefined;
  const normCity = options?.city ? normalizeLocationName(options.city) : undefined;

  // Handle ambiguous cases like Dubai
  const ambig = AMBIGUOUS_LOCATIONS[rawLocation] || AMBIGUOUS_LOCATIONS[normLoc];
  const finalLevel = ambig ? ambig.suggestedLevel : geographicLevel;
  const finalCountry = ambig ? ambig.parentCountry : normCountry;

  return {
    id,
    rawLocation,
    normalizedLocation: normLoc,
    geographicLevel: finalLevel,
    country: finalCountry,
    state: normState,
    city: normCity,
    latitude,
    longitude,
    category: options?.category,
    metric: options?.metric,
    count: options?.count || 1,
    sourceStatus: "source-supplied-dev-data",
    metadata: options?.metadata,
  };
}
