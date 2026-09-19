import { GeoLocationItem } from "@/types/geo";

export type StaffGroup = "employees" | "trainees";
export type StaffCategory = "admin" | "doctors" | "post_graduates" | "aop" | "support";

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
    color: "#1E293B", // Dark Slate
    bgLight: "bg-slate-900 text-white border-slate-800",
  },
  doctors: {
    id: "doctors",
    name: "Doctors",
    count: 446,
    color: "#065F46", // Dark Forest Emerald
    bgLight: "bg-emerald-900 text-white border-emerald-800",
  },
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 0,
    color: "#581C87", // Dark Purple
    bgLight: "bg-purple-950 text-white border-purple-900",
  },
  aop: {
    id: "aop",
    name: "AOP",
    count: 2416,
    color: "#312E81", // Dark Midnight Indigo
    bgLight: "bg-indigo-950 text-white border-indigo-900",
  },
  support: {
    id: "support",
    name: "Support Services",
    count: 290,
    color: "#701A75", // Dark Velvet Plum
    bgLight: "bg-fuchsia-950 text-white border-fuchsia-900",
  },
};

export const TRAINEE_CATEGORIES: Record<StaffCategory, StaffCategoryMeta> = {
  admin: {
    id: "admin",
    name: "Admin Trainees",
    count: 102,
    color: "#1E293B", // Dark Slate
    bgLight: "bg-slate-900 text-white border-slate-800",
  },
  doctors: {
    id: "doctors",
    name: "Doctor Trainees",
    count: 316,
    color: "#065F46", // Dark Forest Emerald
    bgLight: "bg-emerald-900 text-white border-emerald-800",
  },
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 222,
    color: "#581C87", // Dark Purple
    bgLight: "bg-purple-950 text-white border-purple-900",
  },
  aop: {
    id: "aop",
    name: "AOP Trainees",
    count: 2010,
    color: "#312E81", // Dark Midnight Indigo
    bgLight: "bg-indigo-950 text-white border-indigo-900",
  },
  support: {
    id: "support",
    name: "Support Services Trainees",
    count: 27,
    color: "#701A75", // Dark Velvet Plum
    bgLight: "bg-fuchsia-950 text-white border-fuchsia-900",
  },
};

export interface StateStaffData {
  state: string;
  lat: number;
  lng: number;
  country: string;
  admin: number;
  doctors: number;
  post_graduates: number;
  aop: number;
  support: number;
}

export const EMPLOYEE_STATE_RECORDS: StateStaffData[] = [
  { state: "Tamil Nadu", lat: 11.1271, lng: 78.6569, country: "India", admin: 701, doctors: 287, post_graduates: 0, aop: 2246, support: 256 },
  { state: "Andhra Pradesh", lat: 15.4129, lng: 79.2400, country: "India", admin: 78, doctors: 42, post_graduates: 0, aop: 146, support: 14 },
  { state: "Pondicherry", lat: 11.9416, lng: 79.8083, country: "India", admin: 61, doctors: 24, post_graduates: 0, aop: 21, support: 18 },
  { state: "Kerala", lat: 10.4505, lng: 76.2711, country: "India", admin: 2, doctors: 36, post_graduates: 0, aop: 2, support: 1 },
  { state: "Karnataka", lat: 14.3173, lng: 75.7139, country: "India", admin: 1, doctors: 18, post_graduates: 0, aop: 0, support: 0 },
  { state: "Maharashtra", lat: 19.5515, lng: 75.7139, country: "India", admin: 0, doctors: 9, post_graduates: 0, aop: 0, support: 0 },
  { state: "Telangana", lat: 17.8124, lng: 79.0193, country: "India", admin: 0, doctors: 7, post_graduates: 0, aop: 0, support: 0 },
  { state: "Assam", lat: 26.2006, lng: 92.9376, country: "India", admin: 0, doctors: 4, post_graduates: 0, aop: 0, support: 0 },
  { state: "Odisha", lat: 20.3517, lng: 84.8035, country: "India", admin: 0, doctors: 4, post_graduates: 0, aop: 0, support: 0 },
  { state: "Gujarat", lat: 22.2587, lng: 71.1924, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Madhya Pradesh", lat: 22.9734, lng: 78.6569, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Rajasthan", lat: 27.0238, lng: 74.2179, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Tripura", lat: 23.9408, lng: 91.9882, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "West Bengal", lat: 23.5868, lng: 87.8550, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Delhi", lat: 28.7041, lng: 77.1025, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Jharkhand", lat: 23.6102, lng: 85.3096, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
];

export const TRAINEE_STATE_RECORDS: StateStaffData[] = [
  { state: "Tamil Nadu", lat: 11.1271, lng: 78.6569, country: "India", admin: 87, doctors: 101, post_graduates: 70, aop: 1751, support: 27 },
  { state: "Andhra Pradesh", lat: 15.4129, lng: 79.2400, country: "India", admin: 2, doctors: 40, post_graduates: 16, aop: 249, support: 0 },
  { state: "Pondicherry", lat: 11.9416, lng: 79.8083, country: "India", admin: 11, doctors: 10, post_graduates: 1, aop: 8, support: 0 },
  { state: "Kerala", lat: 10.4505, lng: 76.2711, country: "India", admin: 0, doctors: 62, post_graduates: 51, aop: 2, support: 0 },
  { state: "Maharashtra", lat: 19.5515, lng: 75.7139, country: "India", admin: 0, doctors: 28, post_graduates: 35, aop: 0, support: 0 },
  { state: "Karnataka", lat: 14.3173, lng: 75.7139, country: "India", admin: 1, doctors: 18, post_graduates: 3, aop: 0, support: 0 },
  { state: "Telangana", lat: 17.8124, lng: 79.0193, country: "India", admin: 0, doctors: 11, post_graduates: 9, aop: 0, support: 0 },
  { state: "Gujarat", lat: 22.2587, lng: 71.1924, country: "India", admin: 0, doctors: 8, post_graduates: 5, aop: 0, support: 0 },
  { state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462, country: "India", admin: 0, doctors: 7, post_graduates: 3, aop: 0, support: 0 },
  { state: "Madhya Pradesh", lat: 22.9734, lng: 78.6569, country: "India", admin: 1, doctors: 6, post_graduates: 3, aop: 0, support: 0 },
  { state: "Haryana", lat: 29.0588, lng: 76.0856, country: "India", admin: 0, doctors: 5, post_graduates: 6, aop: 0, support: 0 },
  { state: "Delhi", lat: 28.7041, lng: 77.1025, country: "India", admin: 0, doctors: 4, post_graduates: 1, aop: 0, support: 0 },
  { state: "Bihar", lat: 25.0961, lng: 85.3131, country: "India", admin: 0, doctors: 2, post_graduates: 4, aop: 0, support: 0 },
  { state: "Rajasthan", lat: 27.0238, lng: 74.2179, country: "India", admin: 0, doctors: 2, post_graduates: 4, aop: 0, support: 0 },
  { state: "Assam", lat: 26.2006, lng: 92.9376, country: "India", admin: 0, doctors: 2, post_graduates: 1, aop: 0, support: 0 },
  { state: "Jammu & Kashmir", lat: 33.7782, lng: 74.7973, country: "India", admin: 0, doctors: 2, post_graduates: 0, aop: 0, support: 0 },
  { state: "Punjab", lat: 31.1471, lng: 75.3412, country: "India", admin: 0, doctors: 2, post_graduates: 2, aop: 0, support: 0 },
  { state: "West Bengal", lat: 23.5868, lng: 87.8550, country: "India", admin: 0, doctors: 1, post_graduates: 2, aop: 0, support: 0 },
  { state: "Chhattisgarh", lat: 21.2787, lng: 81.8661, country: "India", admin: 0, doctors: 0, post_graduates: 2, aop: 0, support: 0 },
  { state: "Arunachal Pradesh", lat: 28.2180, lng: 94.7278, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Goa", lat: 15.2993, lng: 74.1240, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Jharkhand", lat: 23.6102, lng: 85.3096, country: "India", admin: 0, doctors: 1, post_graduates: 1, aop: 0, support: 0 },
  { state: "Manipur", lat: 24.6637, lng: 93.9063, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Odisha", lat: 20.3517, lng: 84.8035, country: "India", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Tripura", lat: 23.9408, lng: 91.9882, country: "India", admin: 0, doctors: 0, post_graduates: 1, aop: 0, support: 0 },
  { state: "Bhutan", lat: 27.5142, lng: 90.4336, country: "Bhutan", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
  { state: "Kenya", lat: -1.2921, lng: 36.8219, country: "Kenya", admin: 0, doctors: 1, post_graduates: 0, aop: 0, support: 0 },
];

export interface StaffDotItem extends GeoLocationItem {
  staffGroup: StaffGroup;
  category: StaffCategory;
  districtName: string;
}

export function generateStaffDots(
  group: StaffGroup = "employees",
  activeCategory: StaffCategory | "all" = "all"
): StaffDotItem[] {
  const categories = group === "employees" ? EMPLOYEE_CATEGORIES : TRAINEE_CATEGORIES;
  const targetCategories =
    activeCategory === "all"
      ? (Object.keys(categories) as StaffCategory[])
      : [activeCategory];

  const records = group === "employees" ? EMPLOYEE_STATE_RECORDS : TRAINEE_STATE_RECORDS;
  const results: StaffDotItem[] = [];

  targetCategories.forEach((catKey) => {
    const catMeta = categories[catKey];
    if (!catMeta) return;

    records.forEach((rec) => {
      const count = rec[catKey as keyof StateStaffData] as number;
      if (count && count > 0) {
        results.push({
          id: `staff-${group}-${catKey}-${rec.state.replace(/\s+/g, "_")}`,
          name: `${rec.state}: ${count} ${catMeta.name}`,
          rawName: rec.state,
          entityId: "staffs",
          subcategoryId: group,
          country: rec.country,
          state: rec.state,
          city: rec.state,
          latitude: rec.lat,
          longitude: rec.lng,
          type: "Staff State Dot",
          careType: "community",
          sourceStatus: "source-supplied",
          staffGroup: group,
          category: catKey,
          districtName: rec.state,
          metrics: {
            "Staff Count": count,
            "Category": catMeta.name,
            "State": rec.state,
          },
          metadata: {
            color: catMeta.color,
            staffGroup: group,
            category: catKey,
            categoryName: catMeta.name,
            districtName: rec.state,
            country: rec.country,
            state: rec.state,
            traineeCount: count,
          },
        });
      }
    });
  });

  return results;
}
