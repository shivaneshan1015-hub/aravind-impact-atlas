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
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 0,
    color: "#06B6D4", // Cyan
    bgLight: "bg-cyan-50 text-cyan-700 border-cyan-200",
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
    count: 102,
    color: "#2563EB", // Royal Blue
    bgLight: "bg-blue-50 text-blue-700 border-blue-200",
  },
  doctors: {
    id: "doctors",
    name: "Doctor Trainees",
    count: 351,
    color: "#8B5CF6", // Purple
    bgLight: "bg-purple-50 text-purple-700 border-purple-200",
  },
  post_graduates: {
    id: "post_graduates",
    name: "Post Graduates",
    count: 187,
    color: "#06B6D4", // Cyan
    bgLight: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  aop: {
    id: "aop",
    name: "AOP Trainees",
    count: 2010,
    color: "#10B981", // Emerald Green
    bgLight: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  support: {
    id: "support",
    name: "Support Services Trainees",
    count: 27,
    color: "#F59E0B", // Amber/Orange
    bgLight: "bg-amber-50 text-amber-700 border-amber-200",
  },
};

export interface DistrictCoords {
  name: string;
  state: string;
  lat: number;
  lng: number;
  counts: Record<StaffCategory, number>;
  traineeCounts: Record<StaffCategory, number>;
}

export const TAMIL_NADU_DISTRICTS: DistrictCoords[] = [
  {
    name: "Madurai",
    state: "Tamil Nadu",
    lat: 9.9252,
    lng: 78.1198,
    counts: { admin: 195, doctors: 108, post_graduates: 0, aop: 581, support: 72 },
    traineeCounts: { admin: 26, doctors: 93, post_graduates: 48, aop: 510, support: 1 },
  },
  {
    name: "Tirunelveli",
    state: "Tamil Nadu",
    lat: 8.7139,
    lng: 77.7567,
    counts: { admin: 112, doctors: 62, post_graduates: 0, aop: 338, support: 40 },
    traineeCounts: { admin: 15, doctors: 51, post_graduates: 26, aop: 295, support: 3 },
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    lat: 11.0168,
    lng: 76.9558,
    counts: { admin: 121, doctors: 66, post_graduates: 0, aop: 356, support: 43 },
    traineeCounts: { admin: 16, doctors: 57, post_graduates: 29, aop: 312, support: 14 },
  },
  {
    name: "Puducherry",
    state: "Puducherry",
    lat: 11.9416,
    lng: 79.8083,
    counts: { admin: 79, doctors: 43, post_graduates: 0, aop: 225, support: 27 },
    traineeCounts: { admin: 11, doctors: 37, post_graduates: 19, aop: 198, support: 0 },
  },
  {
    name: "Tiruppur",
    state: "Tamil Nadu",
    lat: 11.1085,
    lng: 77.3411,
    counts: { admin: 42, doctors: 23, post_graduates: 0, aop: 122, support: 16 },
    traineeCounts: { admin: 6, doctors: 20, post_graduates: 10, aop: 107, support: 0 },
  },
  {
    name: "Salem",
    state: "Tamil Nadu",
    lat: 11.6643,
    lng: 78.146,
    counts: { admin: 38, doctors: 21, post_graduates: 0, aop: 113, support: 14 },
    traineeCounts: { admin: 5, doctors: 18, post_graduates: 9, aop: 98, support: 0 },
  },
  {
    name: "Theni",
    state: "Tamil Nadu",
    lat: 10.0104,
    lng: 77.4768,
    counts: { admin: 33, doctors: 17, post_graduates: 0, aop: 89, support: 12 },
    traineeCounts: { admin: 4, doctors: 15, post_graduates: 8, aop: 78, support: 0 },
  },
  {
    name: "Dindigul",
    state: "Tamil Nadu",
    lat: 10.3673,
    lng: 77.9803,
    counts: { admin: 28, doctors: 15, post_graduates: 0, aop: 80, support: 10 },
    traineeCounts: { admin: 4, doctors: 13, post_graduates: 6, aop: 70, support: 0 },
  },
  {
    name: "Virudhunagar",
    state: "Tamil Nadu",
    lat: 9.5872,
    lng: 77.9578,
    counts: { admin: 24, doctors: 13, post_graduates: 0, aop: 66, support: 8 },
    traineeCounts: { admin: 3, doctors: 11, post_graduates: 5, aop: 58, support: 0 },
  },
  {
    name: "Sivaganga",
    state: "Tamil Nadu",
    lat: 9.8472,
    lng: 78.6361,
    counts: { admin: 21, doctors: 11, post_graduates: 0, aop: 57, support: 7 },
    traineeCounts: { admin: 3, doctors: 9, post_graduates: 5, aop: 50, support: 0 },
  },
  {
    name: "Thoothukudi",
    state: "Tamil Nadu",
    lat: 8.7642,
    lng: 78.1348,
    counts: { admin: 19, doctors: 10, post_graduates: 0, aop: 52, support: 7 },
    traineeCounts: { admin: 3, doctors: 8, post_graduates: 4, aop: 46, support: 2 },
  },
  {
    name: "Tenkasi",
    state: "Tamil Nadu",
    lat: 8.9594,
    lng: 77.3147,
    counts: { admin: 17, doctors: 9, post_graduates: 0, aop: 43, support: 5 },
    traineeCounts: { admin: 2, doctors: 5, post_graduates: 3, aop: 38, support: 0 },
  },
  {
    name: "Ramanathapuram",
    state: "Tamil Nadu",
    lat: 9.3639,
    lng: 78.8395,
    counts: { admin: 12, doctors: 6, post_graduates: 0, aop: 29, support: 4 },
    traineeCounts: { admin: 2, doctors: 4, post_graduates: 3, aop: 30, support: 3 },
  },
  {
    name: "Thanjavur",
    state: "Tamil Nadu",
    lat: 10.787,
    lng: 79.1378,
    counts: { admin: 10, doctors: 5, post_graduates: 0, aop: 24, support: 3 },
    traineeCounts: { admin: 2, doctors: 4, post_graduates: 3, aop: 26, support: 0 },
  },
  {
    name: "Tiruchirappalli",
    state: "Tamil Nadu",
    lat: 10.7905,
    lng: 78.7047,
    counts: { admin: 12, doctors: 6, post_graduates: 0, aop: 29, support: 4 },
    traineeCounts: { admin: 2, doctors: 6, post_graduates: 9, aop: 34, support: 2 },
  },
  {
    name: "Karur",
    state: "Tamil Nadu",
    lat: 10.9601,
    lng: 78.0766,
    counts: { admin: 6, doctors: 3, post_graduates: 0, aop: 15, support: 2 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 15, support: 0 },
  },
  {
    name: "Erode",
    state: "Tamil Nadu",
    lat: 11.341,
    lng: 77.7172,
    counts: { admin: 8, doctors: 4, post_graduates: 0, aop: 19, support: 2 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 18, support: 0 },
  },
  {
    name: "Namakkal",
    state: "Tamil Nadu",
    lat: 11.2189,
    lng: 78.1674,
    counts: { admin: 5, doctors: 2, post_graduates: 0, aop: 12, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 10, support: 0 },
  },
  {
    name: "Nilgiris",
    state: "Tamil Nadu",
    lat: 11.4916,
    lng: 76.7337,
    counts: { admin: 4, doctors: 2, post_graduates: 0, aop: 10, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kanyakumari",
    state: "Tamil Nadu",
    lat: 8.0883,
    lng: 77.5385,
    counts: { admin: 8, doctors: 4, post_graduates: 0, aop: 18, support: 2 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 17, support: 0 },
  },
  {
    name: "Cuddalore",
    state: "Tamil Nadu",
    lat: 11.748,
    lng: 79.7714,
    counts: { admin: 5, doctors: 2, post_graduates: 0, aop: 11, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Villupuram",
    state: "Tamil Nadu",
    lat: 11.9401,
    lng: 79.4861,
    counts: { admin: 5, doctors: 2, post_graduates: 0, aop: 11, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kallakurichi",
    state: "Tamil Nadu",
    lat: 11.7384,
    lng: 78.9639,
    counts: { admin: 3, doctors: 1, post_graduates: 0, aop: 7, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Perambalur",
    state: "Tamil Nadu",
    lat: 11.2342,
    lng: 78.882,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 4, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Ariyalur",
    state: "Tamil Nadu",
    lat: 11.1401,
    lng: 79.0786,
    counts: { admin: 1, doctors: 1, post_graduates: 0, aop: 4, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Mayiladuthurai",
    state: "Tamil Nadu",
    lat: 11.1018,
    lng: 79.6522,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 7, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Nagapattinam",
    state: "Tamil Nadu",
    lat: 10.7656,
    lng: 79.8424,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 7, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvarur",
    state: "Tamil Nadu",
    lat: 10.7726,
    lng: 79.6365,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 7, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Pudukkottai",
    state: "Tamil Nadu",
    lat: 10.3797,
    lng: 78.8202,
    counts: { admin: 4, doctors: 2, post_graduates: 0, aop: 11, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Krishnagiri",
    state: "Tamil Nadu",
    lat: 12.5186,
    lng: 78.2137,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 6, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Dharmapuri",
    state: "Tamil Nadu",
    lat: 12.1211,
    lng: 78.1582,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 6, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Vellore",
    state: "Tamil Nadu",
    lat: 12.9165,
    lng: 79.1325,
    counts: { admin: 3, doctors: 1, post_graduates: 0, aop: 9, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 1 },
  },
  {
    name: "Tirupathur",
    state: "Tamil Nadu",
    lat: 12.4926,
    lng: 78.5679,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Ranipet",
    state: "Tamil Nadu",
    lat: 12.9246,
    lng: 79.3332,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvannamalai",
    state: "Tamil Nadu",
    lat: 12.2253,
    lng: 79.0747,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 6, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Chengalpattu",
    state: "Tamil Nadu",
    lat: 12.6819,
    lng: 79.9888,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 6, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kanchipuram",
    state: "Tamil Nadu",
    lat: 12.8342,
    lng: 79.7036,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 6, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvallur",
    state: "Tamil Nadu",
    lat: 13.1432,
    lng: 79.9048,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 1 },
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    lat: 13.0827,
    lng: 80.2707,
    counts: { admin: 7, doctors: 3, post_graduates: 0, aop: 18, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  }
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
  const targetCategories =
    activeCategory === "all"
      ? (Object.keys(categories) as StaffCategory[])
      : [activeCategory];

  const results: StaffDotItem[] = [];

  targetCategories.forEach((catKey) => {
    const catMeta = categories[catKey];
    if (!catMeta) return;

    TAMIL_NADU_DISTRICTS.forEach((dist) => {
      const countsObj = group === "employees" ? dist.counts : dist.traineeCounts;
      const countForDist = countsObj[catKey] || 0;

      for (let i = 0; i < countForDist; i++) {
        const angle = i * 2.39996; // Golden angle in radians
        const radius = 0.0035 + 0.0016 * Math.sqrt(i + 1); // ~400m to 2.5km dispersal radius
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
          careType: "community",
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
