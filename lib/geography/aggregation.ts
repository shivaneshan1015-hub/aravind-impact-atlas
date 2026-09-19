import { EntityId } from "@/types/entity";
import { GeoLocationItem, StateAggregation, CountryAggregation } from "@/types/geo";
import { DEMO_LOCATIONS } from "@/data/demo-data";
import { INDIA_STATES_META } from "@/data/india-states";

import { generateStaffDots, StaffGroup, StaffCategory } from "@/data/hospitals/staff-data";
import { PATIENT_DATA_RECORDS } from "@/data/hospitals/patient-pay-data";

const REGION_BOUNDS: Record<string, [[number, number], [number, number]]> = {
  "TAMILNADU": [[76.3, 8.1], [80.3, 13.5]],
  "KERALA": [[74.9, 8.3], [77.5, 12.8]],
  "ANDHRA PRADESH": [[76.8, 12.6], [84.7, 19.1]],
  "KARNATAKA": [[74.1, 11.6], [78.5, 18.4]],
  "PONDICHERRY": [[79.6, 11.7], [79.9, 12.1]],
  "TELUNGANA": [[77.2, 15.8], [81.3, 19.9]],
  "MAHARASHTRA": [[72.7, 15.6], [80.8, 22.0]],
  "WEST BENGAL": [[85.8, 21.5], [89.8, 27.2]],
  "BIHAR": [[83.3, 24.3], [88.2, 27.5]],
  "UTTAR PRADESH": [[77.1, 23.9], [84.6, 30.4]],
  "GUJARAT": [[68.2, 20.1], [74.4, 24.7]],
  "RAJASTHAN": [[69.5, 23.1], [78.2, 30.2]],
  "ORISSA": [[81.4, 17.8], [87.4, 22.5]],
  "ASSAM": [[89.7, 24.1], [96.0, 27.9]],
  "JHARKHAND": [[83.3, 21.9], [87.9, 25.3]],
  "MADHYA PRADESH": [[74.0, 21.1], [82.7, 26.8]],
  "NEW DELHI": [[76.8, 28.4], [77.3, 28.8]],
  "CHATTISHGARH": [[80.2, 17.8], [84.4, 24.1]],
  "ANDAMAN & NICOBAR": [[92.2, 6.7], [93.9, 13.6]],
  "GOA": [[73.6, 14.9], [74.3, 15.8]],
  "HARYANA": [[74.4, 27.6], [77.6, 30.9]],
  "HIMACHAL PRADESH": [[75.6, 30.4], [79.0, 33.2]],
  "JAMMU AND KASHMIR": [[73.4, 32.3], [79.5, 37.1]],
  "MANIPUR": [[93.0, 23.8], [94.8, 25.7]],
  "TRIPURA": [[91.1, 22.9], [92.3, 24.5]],
  "LAKSHADWEEP": [[72.1, 8.2], [73.8, 12.4]],
  "NAGLAND": [[93.3, 25.2], [95.2, 27.0]],
  "ARUNACHAL PRADESH": [[91.6, 26.6], [97.4, 29.5]],
  "MEGHALAYA": [[89.8, 25.0], [92.8, 26.1]],
  "SIKKIM": [[88.0, 27.1], [88.9, 28.1]],
  "DADRA & NAGAR HAVELI": [[72.9, 20.1], [73.2, 20.4]],
  "BANGLADESH": [[88.0, 20.7], [92.6, 26.6]],
  "MALDIVES": [[72.7, 0.6], [73.7, 7.1]],
  "SRILANKA": [[79.6, 5.9], [81.9, 9.8]],
  "MALAYSIA": [[100.1, 1.3], [104.3, 6.7]],
  "SINGAPORE": [[103.6, 1.2], [104.0, 1.5]],
  "OMAN": [[53.0, 16.6], [59.8, 26.2]],
  "DUBAI": [[55.0, 24.8], [55.5, 25.4]],
  "NEPHAL": [[80.1, 26.3], [88.2, 30.4]],
};

export function generatePatientDots(patientFilter: "pay" | "free" | "camp" | "all" = "all"): GeoLocationItem[] {
  const items: GeoLocationItem[] = [];

  PATIENT_DATA_RECORDS.forEach((rec) => {
    if (patientFilter === "all") {
      // 1. Pay Dot (Dark Royal Blue #1E3A8A) - Slightly shifted West
      if (rec.payCount > 0) {
        items.push({
          id: `patient_hub_${rec.id}_pay`,
          entityId: "hospitals",
          subcategoryId: "patients",
          name: rec.name,
          rawName: rec.name,
          city: rec.name,
          state: rec.state,
          country: rec.country,
          latitude: rec.latitude,
          longitude: rec.longitude - 0.012,
          type: "Patient Hub",
          metadata: {
            isPatientHub: true,
            payCount: rec.payCount,
            freeCount: rec.freeCount,
            campCount: rec.campCount,
            totalPatients: rec.totalPatients,
            activeFilter: "pay",
            displayCount: rec.payCount,
          },
          metrics: {
            "Pay Patients": rec.payCount,
            "Free Patients": rec.freeCount,
            "Camp Patients": rec.campCount,
            "Total Patients": rec.totalPatients,
          },
        });
      }

      // 2. Free Dot (Dark Emerald Green #064E3B) - Centered
      if (rec.freeCount > 0) {
        items.push({
          id: `patient_hub_${rec.id}_free`,
          entityId: "hospitals",
          subcategoryId: "patients",
          name: rec.name,
          rawName: rec.name,
          city: rec.name,
          state: rec.state,
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
            activeFilter: "free",
            displayCount: rec.freeCount,
          },
          metrics: {
            "Pay Patients": rec.payCount,
            "Free Patients": rec.freeCount,
            "Camp Patients": rec.campCount,
            "Total Patients": rec.totalPatients,
          },
        });
      }

      // 3. Camp Dot (Dark Burnt Amber #78350F) - Slightly shifted East
      if (rec.campCount > 0) {
        items.push({
          id: `patient_hub_${rec.id}_camp`,
          entityId: "hospitals",
          subcategoryId: "patients",
          name: rec.name,
          rawName: rec.name,
          city: rec.name,
          state: rec.state,
          country: rec.country,
          latitude: rec.latitude,
          longitude: rec.longitude + 0.012,
          type: "Patient Hub",
          metadata: {
            isPatientHub: true,
            payCount: rec.payCount,
            freeCount: rec.freeCount,
            campCount: rec.campCount,
            totalPatients: rec.totalPatients,
            activeFilter: "camp",
            displayCount: rec.campCount,
          },
          metrics: {
            "Pay Patients": rec.payCount,
            "Free Patients": rec.freeCount,
            "Camp Patients": rec.campCount,
            "Total Patients": rec.totalPatients,
          },
        });
      }
    } else {
      let displayCount = rec.totalPatients;
      if (patientFilter === "pay") displayCount = rec.payCount;
      else if (patientFilter === "free") displayCount = rec.freeCount;
      else if (patientFilter === "camp") displayCount = rec.campCount;

      if (displayCount <= 0) return;

      // Single Clean District Pin Marker Item
      items.push({
        id: `patient_hub_${rec.id}_${patientFilter}`,
        entityId: "hospitals",
        subcategoryId: "patients",
        name: rec.name,
        rawName: rec.name,
        city: rec.name,
        state: rec.state,
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

  if (entityId === "staffs" || (entityId === "hospitals" && subcategoryId === "staffs")) {
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

    // Special handling for LAICO
    if (entityId === "laico") {
      if (subcategoryId) {
        return item.subcategoryId === subcategoryId;
      }
      return item.subcategoryId === "capacity_building";
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
        if (item.metadata?.isMainHub) {
          // Only show the 5 distribution base eye bank centres (Madurai, Coimbatore, Tirunelveli, Chennai, Pondicherry)
          return item.metadata?.categoryId !== "salem" && item.metadata?.categoryId !== "tirupathi";
        }
        return item.subcategoryId === "distribution_network";
      }
      return true; // Return all Eye Bank main hubs & collection/distribution nodes for display
    }

    // Special handling for AMRF
    if (entityId === "amrf") {
      if (!subcategoryId || subcategoryId === "doctorate" || subcategoryId === "phd_completed") {
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

    // Special handling for LAICO
    if (entityId === "laico") {
      return item.subcategoryId === "capacity_building" || item.id === "laico_hq";
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
