import { EntityId } from "@/types/entity";
import { GeoLocationItem, StateAggregation, CountryAggregation } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { INDIA_STATES_META } from "@/data/india-states";

import { generateStaffDots, StaffGroup, StaffCategory } from "@/data/hospitals/staff-data";
import { PATIENT_DATA_RECORDS } from "@/data/hospitals/patient-pay-data";

export function generatePatientDots(patientFilter: "pay" | "free" | "camp" | "all" = "all"): GeoLocationItem[] {
  const items: GeoLocationItem[] = [];

  PATIENT_DATA_RECORDS.forEach((rec) => {
    let displayCount = rec.totalPatients;
    if (patientFilter === "pay") displayCount = rec.payCount;
    else if (patientFilter === "free") displayCount = rec.freeCount;
    else if (patientFilter === "camp") displayCount = rec.campCount;

    if (displayCount <= 0) return;

    // 1. Central Region Hub Badge Item
    items.push({
      id: `patient_hub_${rec.id}_${patientFilter}`,
      entityId: "hospitals",
      subcategoryId: "patients",
      name: rec.name,
      rawName: rec.name,
      city: rec.name,
      state: rec.isState ? rec.name : "International",
      country: rec.country,
      latitude: rec.latitude,
      longitude: rec.longitude,
      type: "Patient Hub",
      metadata: {
        isPatientHub: true,
        payCount: rec.payCount,
        freeCount: rec.freeCount,
        campCount: rec.campCount,
        totalPatients: rec.totalPatients,
        activeFilter: patientFilter,
        displayCount: displayCount,
      },
      metrics: {
        "Pay Patients": rec.payCount,
        "Free Patients": rec.freeCount,
        "Camp Patients": rec.campCount,
        "Total Patients": rec.totalPatients,
      },
    });

    // 2. Scatter Patient Dots (Exact count if <= 50, or proportional cloud if > 50)
    const numScatterDots = displayCount <= 50 ? displayCount : Math.min(100, Math.max(25, Math.floor(Math.log2(displayCount) * 5)));

    for (let i = 0; i < numScatterDots; i++) {
      const angle = (i * 137.5 * Math.PI) / 180;
      const radiusFactor = (i + 1) / numScatterDots;
      const maxSpread = rec.isState ? (displayCount > 50000 ? 1.1 : 0.5) : 0.35;
      const r = Math.sqrt(radiusFactor) * maxSpread;

      const dotLat = rec.latitude + r * Math.sin(angle);
      const dotLng = rec.longitude + (r * Math.cos(angle)) / Math.cos((rec.latitude * Math.PI) / 180);

      const isFreeDot = patientFilter === "free" || (patientFilter === "all" && i % 3 === 0);

      items.push({
        id: `patient_dot_${rec.id}_${i}_${patientFilter}`,
        entityId: "hospitals",
        subcategoryId: "patients",
        name: `${rec.name} Patient #${i + 1}`,
        rawName: rec.name,
        city: rec.name,
        state: rec.isState ? rec.name : "International",
        country: rec.country,
        latitude: dotLat,
        longitude: dotLng,
        type: "Patient Dot",
        metadata: {
          isScatterDot: true,
          dotIndex: i + 1,
          regionName: rec.name,
          isFreeDot: isFreeDot,
          payCount: rec.payCount,
          freeCount: rec.freeCount,
          totalPatients: rec.totalPatients,
        },
        metrics: {
          "Pay Patients": rec.payCount,
          "Free Patients": rec.freeCount,
          "Total Patients": rec.totalPatients,
        },
      });
    }
  });

  return items;
}

/**
 * Filter locations by Entity ID and optional Subcategory ID.
 * If entityId === 'all', returns all demo locations.
 */
export function getFilteredLocations(
  entityId: EntityId,
  subcategoryId?: string,
  staffGroup: StaffGroup = "employees",
  staffCategory: StaffCategory | "all" = "all",
  patientFilter: "pay" | "free" | "camp" | "all" = "all"
): GeoLocationItem[] {
  if (entityId === "all") {
    return DEMO_LOCATIONS;
  }

  if (entityId === "hospitals" && subcategoryId === "staffs") {
    return generateStaffDots(staffGroup, staffCategory);
  }

  if (entityId === "hospitals" && subcategoryId === "patients") {
    return generatePatientDots(patientFilter);
  }

  return DEMO_LOCATIONS.filter((item) => {
    if (item.entityId !== entityId) return false;

    // Special handling for Eye Hospitals / CARE entity
    if (entityId === "hospitals") {
      if (subcategoryId === "hospitals_tertiary") return item.careType === "tertiary";
      if (subcategoryId === "hospitals_secondary") return item.careType === "secondary";
      if (subcategoryId === "hospitals_community") return item.careType === "community";
      if (subcategoryId === "hospitals_vision_centres") return item.careType === "vision_centre";
      return item.careType !== "vision_centre"; // Default overview shows core hospitals network
    }

    // Special handling for Aurolab
    if (entityId === "aurolab") {
      if (!subcategoryId || subcategoryId === "domestic" || subcategoryId === "national_dealers" || subcategoryId === "domestic_dealers") {
        return item.subcategoryId === "domestic" || item.subcategoryId === "national_dealers" || item.subcategoryId === "domestic_dealers";
      }
      if (subcategoryId === "international" || subcategoryId === "international_dealers") {
        return item.subcategoryId === "international" || item.subcategoryId === "international_dealers";
      }
      return true;
    }

    // Special handling for Eye Bank
    if (entityId === "eyebank") {
      if (subcategoryId === "collected") {
        return !!(item.metadata?.isMainHub || item.subcategoryId === "collection_network");
      }
      if (subcategoryId === "distributed") {
        return !!(item.metadata?.isMainHub || item.subcategoryId === "distribution_network");
      }
      return true; // Return all Eye Bank main hubs & collection/distribution nodes for display
    }

    // Special handling for AMRF
    if (entityId === "amrf") {
      if (!subcategoryId || subcategoryId === "doctorate") {
        return item.subcategoryId === "phd_completed" || item.subcategoryId === "ongoing_phd";
      }
      if (subcategoryId === "phd_completed") {
        return item.subcategoryId === "phd_completed";
      }
      if (subcategoryId === "ongoing_phd") {
        return item.subcategoryId === "ongoing_phd";
      }
      if (subcategoryId === "collaboratives") {
        return item.subcategoryId === "collaboratives" || item.id === "amrf_hq";
      }
      if (subcategoryId === "students_abroad") {
        return item.subcategoryId === "students_abroad" || item.id === "amrf_hq";
      }
      return true;
    }

    // Special handling for AuroiTech
    if (entityId === "auroitech") {
      if (subcategoryId === "ihms") {
        return item.subcategoryId === "ihms";
      }
      if (subcategoryId === "eyenotes") {
        return item.subcategoryId === "tech_patients" || item.subcategoryId === "eyenotes";
      }
      if (subcategoryId === "vcms") {
        return item.subcategoryId === "vcms";
      }
      if (subcategoryId === "total_patients") {
        return item.subcategoryId === "tech_patients" || item.subcategoryId === "total_patients";
      }
      return true;
    }

    if (subcategoryId && item.subcategoryId !== subcategoryId) {
      return false;
    }

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

/**
 * Reusable Country Aggregator.
 */
export function aggregateByCountry(locations: GeoLocationItem[]): CountryAggregation[] {
  const countryGroups = aggregateByField(locations, "country");

  return Object.entries(countryGroups)
    .map(([countryName, items]) => {
      const avgLat = items.reduce((acc, i) => acc + i.latitude, 0) / items.length;
      const avgLng = items.reduce((acc, i) => acc + i.longitude, 0) / items.length;
      return {
        countryName,
        count: items.length,
        centroid: [avgLng, avgLat] as [number, number],
      };
    })
    .sort((a, b) => b.count - a.count);
}

/**
 * Reusable City Aggregator.
 */
export interface CityAggregation {
  cityName: string;
  stateName: string;
  countryName: string;
  count: number;
  centroid: [number, number];
  items: GeoLocationItem[];
}

export function aggregateByCity(locations: GeoLocationItem[]): CityAggregation[] {
  const cityGroups = aggregateByField(locations, "city");

  return Object.entries(cityGroups)
    .map(([cityName, items]) => {
      const avgLat = items.reduce((acc, i) => acc + i.latitude, 0) / items.length;
      const avgLng = items.reduce((acc, i) => acc + i.longitude, 0) / items.length;
      return {
        cityName,
        stateName: items[0].state || "State",
        countryName: items[0].country || "India",
        count: items.length,
        centroid: [avgLng, avgLat] as [number, number],
        items,
      };
    })
    .sort((a, b) => b.count - a.count);
}
