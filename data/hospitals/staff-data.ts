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
  country?: string;
  lat: number;
  lng: number;
  counts: Record<StaffCategory, number>;
  traineeCounts: Record<StaffCategory, number>;
}

export const TAMIL_NADU_DISTRICTS: DistrictCoords[] = [
  // Out of State & International Staff Origin Locations (Surat, Kenya, Chittoor, Puducherry, Kerala, Delhi, Nepal)
  {
    name: "Surat",
    state: "Gujarat",
    country: "India",
    lat: 21.1702,
    lng: 72.8311,
    counts: { admin: 12, doctors: 18, post_graduates: 0, aop: 15, support: 0 },
    traineeCounts: { admin: 4, doctors: 12, post_graduates: 8, aop: 0, support: 0 },
  },
  {
    name: "Kenya",
    state: "Nairobi",
    country: "Kenya",
    lat: -1.2921,
    lng: 36.8219,
    counts: { admin: 14, doctors: 22, post_graduates: 0, aop: 0, support: 0 },
    traineeCounts: { admin: 5, doctors: 15, post_graduates: 10, aop: 0, support: 0 },
  },
  {
    name: "Chittoor",
    state: "Andhra Pradesh",
    country: "India",
    lat: 13.2172,
    lng: 79.1003,
    counts: { admin: 16, doctors: 20, post_graduates: 0, aop: 45, support: 8 },
    traineeCounts: { admin: 6, doctors: 14, post_graduates: 9, aop: 25, support: 2 },
  },
  {
    name: "Puducherry",
    state: "Puducherry",
    country: "India",
    lat: 11.9416,
    lng: 79.8083,
    counts: { admin: 72, doctors: 38, post_graduates: 0, aop: 210, support: 25 },
    traineeCounts: { admin: 8, doctors: 32, post_graduates: 16, aop: 180, support: 0 },
  },
  {
    name: "Thiruvananthapuram",
    state: "Kerala",
    country: "India",
    lat: 8.5241,
    lng: 76.9366,
    counts: { admin: 8, doctors: 14, post_graduates: 0, aop: 30, support: 4 },
    traineeCounts: { admin: 3, doctors: 10, post_graduates: 7, aop: 15, support: 0 },
  },
  {
    name: "Palakkad",
    state: "Kerala",
    country: "India",
    lat: 10.7867,
    lng: 76.6548,
    counts: { admin: 6, doctors: 12, post_graduates: 0, aop: 25, support: 3 },
    traineeCounts: { admin: 2, doctors: 8, post_graduates: 5, aop: 20, support: 0 },
  },
  {
    name: "Delhi",
    state: "Delhi",
    country: "India",
    lat: 28.6139,
    lng: 77.2090,
    counts: { admin: 8, doctors: 10, post_graduates: 0, aop: 0, support: 0 },
    traineeCounts: { admin: 2, doctors: 6, post_graduates: 5, aop: 0, support: 0 },
  },
  {
    name: "Nepal",
    state: "Bagmati",
    country: "Nepal",
    lat: 27.7172,
    lng: 85.3240,
    counts: { admin: 6, doctors: 12, post_graduates: 0, aop: 0, support: 0 },
    traineeCounts: { admin: 2, doctors: 8, post_graduates: 6, aop: 0, support: 0 },
  },

  // Tamil Nadu Districts
  {
    name: "Madurai",
    state: "Tamil Nadu",
    country: "India",
    lat: 9.9252,
    lng: 78.1198,
    counts: { admin: 180, doctors: 90, post_graduates: 0, aop: 530, support: 65 },
    traineeCounts: { admin: 21, doctors: 78, post_graduates: 42, aop: 460, support: 1 },
  },
  {
    name: "Tirunelveli",
    state: "Tamil Nadu",
    country: "India",
    lat: 8.7139,
    lng: 77.7567,
    counts: { admin: 100, doctors: 52, post_graduates: 0, aop: 310, support: 35 },
    traineeCounts: { admin: 12, doctors: 43, post_graduates: 22, aop: 270, support: 3 },
  },
  {
    name: "Coimbatore",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.0168,
    lng: 76.9558,
    counts: { admin: 110, doctors: 56, post_graduates: 0, aop: 325, support: 38 },
    traineeCounts: { admin: 13, doctors: 47, post_graduates: 24, aop: 280, support: 14 },
  },
  {
    name: "Tiruppur",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.1085,
    lng: 77.3411,
    counts: { admin: 40, doctors: 20, post_graduates: 0, aop: 115, support: 15 },
    traineeCounts: { admin: 5, doctors: 18, post_graduates: 8, aop: 100, support: 0 },
  },
  {
    name: "Salem",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.6643,
    lng: 78.146,
    counts: { admin: 35, doctors: 18, post_graduates: 0, aop: 105, support: 13 },
    traineeCounts: { admin: 4, doctors: 15, post_graduates: 7, aop: 90, support: 0 },
  },
  {
    name: "Theni",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.0104,
    lng: 77.4768,
    counts: { admin: 30, doctors: 15, post_graduates: 0, aop: 82, support: 11 },
    traineeCounts: { admin: 3, doctors: 12, post_graduates: 6, aop: 75, support: 0 },
  },
  {
    name: "Dindigul",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.3673,
    lng: 77.9803,
    counts: { admin: 26, doctors: 13, post_graduates: 0, aop: 75, support: 9 },
    traineeCounts: { admin: 3, doctors: 10, post_graduates: 4, aop: 65, support: 0 },
  },
  {
    name: "Virudhunagar",
    state: "Tamil Nadu",
    country: "India",
    lat: 9.5872,
    lng: 77.9578,
    counts: { admin: 22, doctors: 11, post_graduates: 0, aop: 62, support: 7 },
    traineeCounts: { admin: 2, doctors: 9, post_graduates: 3, aop: 55, support: 0 },
  },
  {
    name: "Sivaganga",
    state: "Tamil Nadu",
    country: "India",
    lat: 9.8472,
    lng: 78.6361,
    counts: { admin: 19, doctors: 9, post_graduates: 0, aop: 52, support: 6 },
    traineeCounts: { admin: 2, doctors: 7, post_graduates: 3, aop: 48, support: 0 },
  },
  {
    name: "Thoothukudi",
    state: "Tamil Nadu",
    country: "India",
    lat: 8.7642,
    lng: 78.1348,
    counts: { admin: 17, doctors: 8, post_graduates: 0, aop: 48, support: 6 },
    traineeCounts: { admin: 2, doctors: 6, post_graduates: 0, aop: 44, support: 2 },
  },
  {
    name: "Tenkasi",
    state: "Tamil Nadu",
    country: "India",
    lat: 8.9594,
    lng: 77.3147,
    counts: { admin: 15, doctors: 7, post_graduates: 0, aop: 40, support: 4 },
    traineeCounts: { admin: 1, doctors: 4, post_graduates: 0, aop: 36, support: 0 },
  },
  {
    name: "Ramanathapuram",
    state: "Tamil Nadu",
    country: "India",
    lat: 9.3639,
    lng: 78.8395,
    counts: { admin: 10, doctors: 5, post_graduates: 0, aop: 26, support: 3 },
    traineeCounts: { admin: 1, doctors: 3, post_graduates: 0, aop: 28, support: 3 },
  },
  {
    name: "Thanjavur",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.787,
    lng: 79.1378,
    counts: { admin: 8, doctors: 4, post_graduates: 0, aop: 22, support: 2 },
    traineeCounts: { admin: 1, doctors: 4, post_graduates: 0, aop: 25, support: 0 },
  },
  {
    name: "Tiruchirappalli",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.7905,
    lng: 78.7047,
    counts: { admin: 10, doctors: 5, post_graduates: 0, aop: 26, support: 3 },
    traineeCounts: { admin: 0, doctors: 5, post_graduates: 0, aop: 32, support: 2 },
  },
  {
    name: "Karur",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.9601,
    lng: 78.0766,
    counts: { admin: 5, doctors: 2, post_graduates: 0, aop: 14, support: 2 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 14, support: 0 },
  },
  {
    name: "Erode",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.341,
    lng: 77.7172,
    counts: { admin: 7, doctors: 3, post_graduates: 0, aop: 18, support: 2 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 17, support: 0 },
  },
  {
    name: "Namakkal",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.2189,
    lng: 78.1674,
    counts: { admin: 4, doctors: 2, post_graduates: 0, aop: 11, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 10, support: 0 },
  },
  {
    name: "Nilgiris",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.4916,
    lng: 76.7337,
    counts: { admin: 3, doctors: 1, post_graduates: 0, aop: 9, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kanyakumari",
    state: "Tamil Nadu",
    country: "India",
    lat: 8.0883,
    lng: 77.5385,
    counts: { admin: 7, doctors: 3, post_graduates: 0, aop: 17, support: 2 },
    traineeCounts: { admin: 0, doctors: 5, post_graduates: 0, aop: 16, support: 0 },
  },
  {
    name: "Cuddalore",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.748,
    lng: 79.7714,
    counts: { admin: 4, doctors: 2, post_graduates: 0, aop: 10, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Villupuram",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.9401,
    lng: 79.4861,
    counts: { admin: 4, doctors: 2, post_graduates: 0, aop: 10, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kallakurichi",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.7384,
    lng: 78.9639,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 6, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Perambalur",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.2342,
    lng: 78.882,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 4, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Ariyalur",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.1401,
    lng: 79.0786,
    counts: { admin: 1, doctors: 1, post_graduates: 0, aop: 4, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Mayiladuthurai",
    state: "Tamil Nadu",
    country: "India",
    lat: 11.1018,
    lng: 79.6522,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 6, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Nagapattinam",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.7656,
    lng: 79.8424,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 6, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvarur",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.7726,
    lng: 79.6365,
    counts: { admin: 2, doctors: 1, post_graduates: 0, aop: 6, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Pudukkottai",
    state: "Tamil Nadu",
    country: "India",
    lat: 10.3797,
    lng: 78.8202,
    counts: { admin: 3, doctors: 2, post_graduates: 0, aop: 10, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Krishnagiri",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.5186,
    lng: 78.2137,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Dharmapuri",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.1211,
    lng: 78.1582,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Vellore",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.9165,
    lng: 79.1325,
    counts: { admin: 3, doctors: 1, post_graduates: 0, aop: 8, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 1 },
  },
  {
    name: "Tirupathur",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.4926,
    lng: 78.5679,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Ranipet",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.9246,
    lng: 79.3332,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvannamalai",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.2253,
    lng: 79.0747,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Chengalpattu",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.6819,
    lng: 79.9888,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Kanchipuram",
    state: "Tamil Nadu",
    country: "India",
    lat: 12.8342,
    lng: 79.7036,
    counts: { admin: 2, doctors: 0, post_graduates: 0, aop: 5, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  },
  {
    name: "Tiruvallur",
    state: "Tamil Nadu",
    country: "India",
    lat: 13.1432,
    lng: 79.9048,
    counts: { admin: 1, doctors: 0, post_graduates: 0, aop: 4, support: 0 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 1 },
  },
  {
    name: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    lat: 13.0827,
    lng: 80.2707,
    counts: { admin: 7, doctors: 3, post_graduates: 0, aop: 16, support: 1 },
    traineeCounts: { admin: 0, doctors: 0, post_graduates: 0, aop: 0, support: 0 },
  }
];

export interface StaffDotItem extends GeoLocationItem {
  staffGroup: StaffGroup;
  category: StaffCategory;
  districtName: string;
}

/**
 * Generate precise dot items for employees or trainees distributed across origin locations.
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
          country: dist.country || "India",
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
            country: dist.country || "India",
            state: dist.state,
          },
        });
      }
    });
  });

  return results;
}
