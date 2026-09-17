import { GeoLocationItem } from "@/types/geo";

export type StaffGroup = "employees" | "trainees";
export type StaffCategory = "admin" | "doctors" | "aop" | "support";

export interface StaffCategoryMeta {
  id: StaffCategory;
  name: string;
  count: number;
  color: string;
  bgLight: string;
}

export const EMPLOYEE_CATEGORIES: Record<StaffCategory, StaffCategoryMeta> = {
  admin: {
    id: "admin",
    name: "Admin",
    count: 843,
    color: "#2563EB", // Royal Blue
    bgLight: "bg-blue-50 text-blue-700 border-blue-200",
  },
  doctors: {
    id: "doctors",
    name: "Doctors",
    count: 446,
    color: "#8B5CF6", // Purple
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
  },
  aop: {
    id: "aop",
    name: "AOP",
    count: 2416,
    color: "#10B981", // Emerald Green
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  support: {
    id: "support",
    name: "Support Services",
    count: 290,
    color: "#F59E0B", // Amber/Orange
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export const TRAINEE_CATEGORIES: Record<StaffCategory, StaffCategoryMeta> = {
  admin: {
    id: "admin",
    name: "Admin Trainees",
    count: 120,
    color: "#2563EB",
    bgLight: "bg-blue-50 text-blue-700 border-blue-200",
  },
  doctors: {
    id: "doctors",
    name: "Doctor Trainees",
    count: 280,
    color: "#8B5CF6",
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
  },
  aop: {
    id: "aop",
    name: "AOP Trainees",
    count: 650,
    color: "#10B981",
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  support: {
    id: "support",
    name: "Support Services Trainees",
    count: 95,
    color: "#F59E0B",
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export interface DistrictCoords {
  name: string;
  state: string;
  lat: number;
  lng: number;
  weights: Record<StaffCategory, number>; // weight out of 100
}

export const TAMIL_NADU_DISTRICTS: DistrictCoords[] = [
  { name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198, weights: { admin: 28, doctors: 30, aop: 24, support: 26 } },
  { name: "Tirunelveli", state: "Tamil Nadu", lat: 8.7139, lng: 77.7567, weights: { admin: 16, doctors: 18, aop: 17, support: 15 } },
  { name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558, weights: { admin: 18, doctors: 16, aop: 16, support: 17 } },
  { name: "Theni", state: "Tamil Nadu", lat: 10.0104, lng: 77.4768, weights: { admin: 8, doctors: 7, aop: 9, support: 8 } },
  { name: "Dindigul", state: "Tamil Nadu", lat: 10.3673, lng: 77.9803, weights: { admin: 7, doctors: 6, aop: 8, support: 7 } },
  { name: "Virudhunagar", state: "Tamil Nadu", lat: 9.5872, lng: 77.9578, weights: { admin: 6, doctors: 5, aop: 7, support: 6 } },
  { name: "Sivaganga", state: "Tamil Nadu", lat: 9.8472, lng: 78.6361, weights: { admin: 5, doctors: 4, aop: 5, support: 5 } },
  { name: "Thoothukudi", state: "Tamil Nadu", lat: 8.7642, lng: 78.1348, weights: { admin: 4, doctors: 5, aop: 4, support: 4 } },
  { name: "Tenkasi", state: "Tamil Nadu", lat: 8.9594, lng: 77.3147, weights: { admin: 3, doctors: 3, aop: 4, support: 4 } },
  { name: "Tiruppur", state: "Tamil Nadu", lat: 11.1085, lng: 77.3411, weights: { admin: 3, doctors: 3, aop: 3, support: 4 } },
  { name: "Salem", state: "Tamil Nadu", lat: 11.6643, lng: 78.1460, weights: { admin: 2, doctors: 3, aop: 3, support: 4 } },
  { name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, weights: { admin: 0, doctors: 0, aop: 0, support: 0 } },
];

export interface StaffDotItem extends GeoLocationItem {
  staffGroup: StaffGroup;
  category: StaffCategory;
  districtName: string;
}

/**
 * Generate precise dot items for employees or trainees distributed across districts.
 */
export function generateStaffDots(
  group: StaffGroup,
  activeCategory: StaffCategory | "all" = "all"
): StaffDotItem[] {
  const categories = group === "employees" ? EMPLOYEE_CATEGORIES : TRAINEE_CATEGORIES;
  const targetCategories = activeCategory === "all" ? (Object.keys(categories) as StaffCategory[]) : [activeCategory];

  const results: StaffDotItem[] = [];

  targetCategories.forEach((catKey) => {
    const catMeta = categories[catKey];
    const totalTarget = catMeta.count;

    // Distribute total count across districts according to weights
    const totalWeight = TAMIL_NADU_DISTRICTS.reduce((acc, d) => acc + d.weights[catKey], 0);

    let createdForCat = 0;
    TAMIL_NADU_DISTRICTS.forEach((dist, dIdx) => {
      const isLast = dIdx === TAMIL_NADU_DISTRICTS.length - 1;
      const countForDist = isLast
        ? totalTarget - createdForCat
        : Math.round((totalTarget * dist.weights[catKey]) / totalWeight);

      createdForCat += countForDist;

      // Generate concentric micro-spiral dot offsets around district center
      for (let i = 0; i < countForDist; i++) {
        // Golden spiral radius/angle
        const angle = i * 2.39996; // Golden angle in radians
        const radius = 0.005 + 0.0022 * Math.sqrt(i + 1); // ~500m to 3km dispersal radius
        const deltaLng = radius * Math.cos(angle);
        const deltaLat = radius * Math.sin(angle);

        results.push({
          id: `staff-${group}-${catKey}-${dist.name}-${i}`,
          name: `${catMeta.name} (${dist.name})`,
          rawName: dist.name,
          entityId: "hospitals",
          subcategoryId: "staffs",
          country: "India",
          state: dist.state,
          city: dist.name,
          latitude: dist.lat + deltaLat,
          longitude: dist.lng + deltaLng,
          type: "Staff Dot",
          careType: "community", // default map fallback
          sourceStatus: "source-supplied",
          staffGroup: group,
          category: catKey,
          districtName: dist.name,
          metrics: {
            category: catMeta.name,
            district: dist.name,
          },
          metadata: {
            color: catMeta.color,
            staffGroup: group,
            category: catKey,
            districtName: dist.name,
          },
        });
      }
    });
  });

  return results;
}
