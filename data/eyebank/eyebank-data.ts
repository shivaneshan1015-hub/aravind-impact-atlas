import { GeoLocationItem } from "@/types/geo";
import { EYE_BANK_DISTRIBUTION_RECORDS } from "./eyebank-data-extended";

export interface CollectionVector {
  id: string;
  fromCity: string;
  fromCoords: [number, number]; // [lng, lat]
  toHubName: string;
  toCoords: [number, number]; // [lng, lat]
}

export interface EyeBankCategoryConfig {
  id: string;
  name: string;
  fullName: string;
  color: string;
  districts: string[];
  distributionDistricts?: string[];
  isDistributionCenter?: boolean;
}

export const EYE_BANK_CATEGORIES: EyeBankCategoryConfig[] = [
  {
    id: "madurai",
    name: "Madurai",
    fullName: "Madurai",
    color: "#991B1B", // Dark Crimson Red
    isDistributionCenter: true,
    districts: [
      "Madurai", "Dindigul", "Theni", "Virudhunagar", "Virdhunagar", "Sivagangai",
      "Pudukkottai", "Ramanathapuram", "Ariyalur", "Karur", "Thanjavur",
      "Nagapattinam", "Thiruvarur", "Trichy", "Mayaladudurai", "Mayiladuthurai", "Mayaldudurai"
    ],
    distributionDistricts: [
      "Madurai", "Ernakulam", "Bangalore", "Chennai", "Coimbatore", "Salem",
      "Hyderabad", "Kakinada", "Mumbai", "Haridwar", "Haryana", "Delhi",
      "Kolkatta", "Nagpur", "Lucknow", "Chandigarh", "Ahmedabad", "Varanasi",
      "Sivagangai", "Vellore", "Karur", "Namakkal", "Theni", "Thanjavur",
      "Tirunelveli", "Pondicherry", "Thrissur", "Tiruvanandapuram", "Tirupathi", "Palakkad"
    ],
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    fullName: "Coimbatore",
    color: "#065F46", // Dark Emerald Green
    isDistributionCenter: true,
    districts: ["Coimbatore", "Tirupur", "Erode", "Dindigul"],
    distributionDistricts: ["Coimbatore", "Palakadu", "Tirupur", "Kozhikode", "Erode"],
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    fullName: "Tirunelveli",
    color: "#115E59", // Dark Teal
    isDistributionCenter: true,
    districts: ["Tirunelveli", "Tuticorin", "Kaniyakumari", "Tenkasi", "Virudhunagar", "Virdhunagar"],
    distributionDistricts: ["Tirunelveli", "Tuticorin", "Kaniyakumari"],
  },
  {
    id: "chennai",
    name: "Chennai",
    fullName: "Chennai",
    color: "#1E3A8A", // Dark Royal Blue
    isDistributionCenter: true,
    districts: ["Vellore"],
    distributionDistricts: ["Chennai", "Chengalpattu", "Vellore"],
  },
  {
    id: "pondicherry",
    name: "Pondicherry",
    fullName: "Pondicherry",
    color: "#581C87", // Dark Purple
    isDistributionCenter: true,
    districts: [
      "Cuddalore", "Vilupuram", "Viluppuram", "Puducherry", "Pondicherry",
      "Mayaldudurai", "Mayaladudurai", "Mayiladuthurai", "Thiruvanamalai", "Thiruvannamalai", "Kallakuruchi", "Kallakurichi"
    ],
    distributionDistricts: ["Pudhucherry"],
  },
  {
    id: "salem",
    name: "Salem",
    fullName: "Salem",
    color: "#78350F", // Dark Burnt Chocolate
    isDistributionCenter: false,
    districts: ["Salem", "Namakkal", "Dharmapuri", "Krishanagiri", "Krishnagiri"],
    distributionDistricts: [],
  },
  {
    id: "tirupathi",
    name: "Tirupathi",
    fullName: "Tirupathi",
    color: "#0F172A", // Dark Slate Charcoal
    isDistributionCenter: false,
    districts: ["Thirupathi", "Tirupathi", "Chittoor"],
    distributionDistricts: [],
  },
];

export const EYE_BANK_DISTRIBUTION_CATEGORIES = EYE_BANK_CATEGORIES.filter((c) => c.isDistributionCenter);

// Main Eye Bank Centres
export const MAIN_EYE_BANK_HUBS = [
  {
    id: "eb_hub_madurai",
    centerName: "Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { collectionCentres: 14, corneasCollectedAnnual: 3400, transplantsAnnual: 2100 },
    establishedYear: 1998,
    categoryId: "madurai",
    color: "#991B1B",
  },
  {
    id: "eb_hub_coimbatore",
    centerName: "Coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    latitude: 11.0168,
    longitude: 76.9558,
    metrics: { collectionCentres: 4, corneasCollectedAnnual: 2200, transplantsAnnual: 1450 },
    establishedYear: 2005,
    categoryId: "coimbatore",
    color: "#065F46",
  },
  {
    id: "eb_hub_tirunelveli",
    centerName: "Tirunelveli",
    city: "Tirunelveli",
    state: "Tamil Nadu",
    latitude: 8.7139,
    longitude: 77.7567,
    metrics: { collectionCentres: 5, corneasCollectedAnnual: 1600, transplantsAnnual: 980 },
    establishedYear: 2008,
    categoryId: "tirunelveli",
    color: "#115E59",
  },
  {
    id: "eb_hub_chennai",
    centerName: "Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    latitude: 13.0827,
    longitude: 80.2707,
    metrics: { collectionCentres: 1, corneasCollectedAnnual: 850, transplantsAnnual: 520 },
    establishedYear: 2012,
    categoryId: "chennai",
    color: "#1E3A8A",
  },
  {
    id: "eb_hub_pondicherry",
    centerName: "Pondicherry",
    city: "Puducherry",
    state: "Puducherry",
    latitude: 11.9416,
    longitude: 79.8083,
    metrics: { collectionCentres: 6, corneasCollectedAnnual: 1950, transplantsAnnual: 1250 },
    establishedYear: 2006,
    categoryId: "pondicherry",
    color: "#581C87",
  },
  {
    id: "eb_hub_salem",
    centerName: "Salem",
    city: "Salem",
    state: "Tamil Nadu",
    latitude: 11.6643,
    longitude: 78.1460,
    metrics: { collectionCentres: 4, corneasCollectedAnnual: 1100, transplantsAnnual: 720 },
    establishedYear: 2015,
    categoryId: "salem",
    color: "#78350F",
  },
  {
    id: "eb_hub_tirupathi",
    centerName: "Tirupathi",
    city: "Thirupathi",
    state: "Andhra Pradesh",
    latitude: 13.6288,
    longitude: 79.4192,
    metrics: { collectionCentres: 2, corneasCollectedAnnual: 650, transplantsAnnual: 410 },
    establishedYear: 2018,
    categoryId: "tirupathi",
    color: "#0F172A",
  },
];

// Master Coordinates Dictionary for Collection Nodes & National Distribution Destinations
export const DISTRICT_COORDINATES: Record<string, { lat: number; lng: number; state: string }> = {
  Madurai: { lat: 9.9252, lng: 78.1198, state: "Tamil Nadu" },
  Dindigul: { lat: 10.3673, lng: 77.9803, state: "Tamil Nadu" },
  Theni: { lat: 10.0104, lng: 77.4768, state: "Tamil Nadu" },
  Virdhunagar: { lat: 9.5680, lng: 77.9624, state: "Tamil Nadu" },
  Virudhunagar: { lat: 9.5680, lng: 77.9624, state: "Tamil Nadu" },
  Sivagangai: { lat: 9.8433, lng: 78.4809, state: "Tamil Nadu" },
  Pudukkottai: { lat: 10.3833, lng: 78.8242, state: "Tamil Nadu" },
  Ramanathapuram: { lat: 9.3639, lng: 78.8315, state: "Tamil Nadu" },
  Ariyalur: { lat: 11.1401, lng: 79.0747, state: "Tamil Nadu" },
  Karur: { lat: 10.9601, lng: 78.0816, state: "Tamil Nadu" },
  Thanjavur: { lat: 10.7870, lng: 79.1378, state: "Tamil Nadu" },
  Nagapattinam: { lat: 10.7656, lng: 79.8449, state: "Tamil Nadu" },
  Thiruvarur: { lat: 10.7726, lng: 79.6344, state: "Tamil Nadu" },
  Trichy: { lat: 10.7905, lng: 78.7047, state: "Tamil Nadu" },
  Mayaladudurai: { lat: 11.1018, lng: 79.6524, state: "Tamil Nadu" },
  Mayaldudurai: { lat: 11.1018, lng: 79.6524, state: "Tamil Nadu" },
  Coimbatore: { lat: 11.0168, lng: 76.9558, state: "Tamil Nadu" },
  Tirupur: { lat: 11.1085, lng: 77.3411, state: "Tamil Nadu" },
  Erode: { lat: 11.3410, lng: 77.7172, state: "Tamil Nadu" },
  Tirunelveli: { lat: 8.7139, lng: 77.7567, state: "Tamil Nadu" },
  Tuticorin: { lat: 8.7642, lng: 78.1348, state: "Tamil Nadu" },
  Kaniyakumari: { lat: 8.0883, lng: 77.5385, state: "Tamil Nadu" },
  Tenkasi: { lat: 8.9594, lng: 77.3000, state: "Tamil Nadu" },
  Chennai: { lat: 13.0827, lng: 80.2707, state: "Tamil Nadu" },
  Vellore: { lat: 12.9165, lng: 79.1325, state: "Tamil Nadu" },
  Cuddalore: { lat: 11.7480, lng: 79.7681, state: "Tamil Nadu" },
  Vilupuram: { lat: 11.9401, lng: 79.4937, state: "Tamil Nadu" },
  Puducherry: { lat: 11.9416, lng: 79.8083, state: "Puducherry" },
  Pondicherry: { lat: 11.9416, lng: 79.8083, state: "Puducherry" },
  Pudhucherry: { lat: 11.9416, lng: 79.8083, state: "Puducherry" },
  Thiruvanamalai: { lat: 12.2253, lng: 79.0747, state: "Tamil Nadu" },
  Kallakuruchi: { lat: 11.7384, lng: 78.9610, state: "Tamil Nadu" },
  Salem: { lat: 11.6643, lng: 78.1460, state: "Tamil Nadu" },
  Namakkal: { lat: 11.2189, lng: 78.1674, state: "Tamil Nadu" },
  Dharmapuri: { lat: 12.1211, lng: 78.1581, state: "Tamil Nadu" },
  Krishanagiri: { lat: 12.5186, lng: 78.2144, state: "Tamil Nadu" },
  Krishnagiri: { lat: 12.5186, lng: 78.2144, state: "Tamil Nadu" },
  Thirupathi: { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh" },
  Tirupathi: { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh" },
  Chittoor: { lat: 13.2172, lng: 79.1003, state: "Andhra Pradesh" },

  // Distribution Destinations across India
  Ernakulam: { lat: 9.9816, lng: 76.2999, state: "Kerala" },
  Bangalore: { lat: 12.9716, lng: 77.5946, state: "Karnataka" },
  Hyderabad: { lat: 17.3850, lng: 78.4867, state: "Telangana" },
  Kakinada: { lat: 16.9891, lng: 82.2475, state: "Andhra Pradesh" },
  Mumbai: { lat: 19.0760, lng: 72.8777, state: "Maharashtra" },
  Haridwar: { lat: 29.9457, lng: 78.1642, state: "Uttarakhand" },
  Haryana: { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  "Haryana Region": { lat: 28.4595, lng: 77.0266, state: "Haryana" },
  Delhi: { lat: 28.7041, lng: 77.1025, state: "Delhi" },
  "Delhi NCR": { lat: 28.7041, lng: 77.1025, state: "Delhi" },
  Kolkatta: { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  Kolkata: { lat: 22.5726, lng: 88.3639, state: "West Bengal" },
  Nagpur: { lat: 21.1458, lng: 79.0882, state: "Maharashtra" },
  Lucknow: { lat: 26.8467, lng: 80.9462, state: "Uttar Pradesh" },
  Chandigarh: { lat: 30.7333, lng: 76.7794, state: "Chandigarh" },
  Ahmedabad: { lat: 23.0225, lng: 72.5714, state: "Gujarat" },
  Varanasi: { lat: 25.3176, lng: 82.9739, state: "Uttar Pradesh" },
  Thrissur: { lat: 10.5276, lng: 76.2144, state: "Kerala" },
  Tiruvanandapuram: { lat: 8.5241, lng: 76.9366, state: "Kerala" },
  Thiruvananthapuram: { lat: 8.5241, lng: 76.9366, state: "Kerala" },
  Palakkad: { lat: 10.7867, lng: 76.6548, state: "Kerala" },
  Palakadu: { lat: 10.7867, lng: 76.6548, state: "Kerala" },
  Kozhikode: { lat: 11.2588, lng: 75.7804, state: "Kerala" },
  Chengalpattu: { lat: 12.6823, lng: 79.9757, state: "Tamil Nadu" },
};

// 1. Main Hub Location Items
const MAIN_HUB_ITEMS: GeoLocationItem[] = MAIN_EYE_BANK_HUBS.map((hub) => ({
  id: hub.id,
  name: hub.centerName,
  rawName: hub.centerName,
  entityId: "eyebank",
  subcategoryId: "collection_network",
  country: "India",
  state: hub.state,
  city: hub.city,
  latitude: hub.latitude,
  longitude: hub.longitude,
  metrics: hub.metrics,
  establishedYear: hub.establishedYear,
  metadata: {
    isMainHub: true,
    centerName: hub.centerName,
    categoryId: hub.categoryId,
    color: hub.color,
  },
}));

// Helper to normalize district names for deduplication
function getNormalizedDistrictKey(district: string): string {
  const d = district.toLowerCase().trim();
  if (d === "virdhunagar" || d === "virudhunagar") return "virudhunagar";
  if (d === "mayaladudurai" || d === "mayiladuthurai" || d === "mayaldudurai") return "mayiladuthurai";
  if (d === "vilupuram" || d === "viluppuram") return "viluppuram";
  if (d === "puducherry" || d === "pondicherry" || d === "pudhucherry") return "puducherry";
  if (d === "thiruvanamalai" || d === "thiruvannamalai") return "thiruvannamalai";
  if (d === "kallakuruchi" || d === "kallakurichi") return "kallakurichi";
  if (d === "krishanagiri" || d === "krishnagiri") return "krishnagiri";
  if (d === "thirupathi" || d === "tirupathi") return "tirupathi";
  return d;
}

// 2. Collection Node Items derived from EYE_BANK_CATEGORIES with Shared Dual-Color support
const collectionDistrictMap: Record<string, { district: string; categories: EyeBankCategoryConfig[] }> = {};

EYE_BANK_CATEGORIES.forEach((cat) => {
  cat.districts.forEach((dist) => {
    const key = getNormalizedDistrictKey(dist);
    if (!collectionDistrictMap[key]) {
      collectionDistrictMap[key] = { district: dist, categories: [] };
    }
    if (!collectionDistrictMap[key].categories.find((c) => c.id === cat.id)) {
      collectionDistrictMap[key].categories.push(cat);
    }
  });
});

const COLLECTION_CENTRE_ITEMS: GeoLocationItem[] = Object.values(collectionDistrictMap).map((item) => {
  const districtName = item.district;
  const coords = DISTRICT_COORDINATES[districtName] || DISTRICT_COORDINATES[getNormalizedDistrictKey(districtName)] || { lat: 9.9252, lng: 78.1198, state: "Tamil Nadu" };
  
  const primaryCat = item.categories[0];
  const secondaryCat = item.categories[1];
  const isShared = item.categories.length > 1;

  const categoryIds = item.categories.map((c) => c.id);
  const attachedHubNames = item.categories.map((c) => c.fullName);

  const gradientStyle = isShared
    ? `linear-gradient(135deg, ${primaryCat.color} 50%, ${secondaryCat.color} 50%)`
    : primaryCat.color;

  return {
    id: `eb_coll_${getNormalizedDistrictKey(districtName)}`,
    name: `${districtName} Collection Centre`,
    rawName: districtName,
    entityId: "eyebank" as const,
    subcategoryId: "collection_network",
    country: "India",
    state: coords.state,
    city: districtName,
    latitude: coords.lat,
    longitude: coords.lng,
    metrics: {
      attachedHub: attachedHubNames.join(" & "),
      status: isShared ? "Shared Multi-Category Network" : "Active Network",
    },
    metadata: {
      isMainHub: false,
      isCollectionCentre: true,
      district: districtName,
      attachedMainCenter: attachedHubNames[0],
      attachedHubs: attachedHubNames,
      categoryId: primaryCat.id,
      categoryIds,
      primaryColor: primaryCat.color,
      secondaryColor: secondaryCat?.color,
      isShared,
      gradientStyle,
    },
  };
});

// 3. National Distribution Items generated from EYE_BANK_DISTRIBUTION_RECORDS with Shared Dual-Color support
const distributionDistrictMap: Record<string, { district: string; state: string; categories: EyeBankCategoryConfig[] }> = {};

EYE_BANK_DISTRIBUTION_RECORDS.forEach((rec) => {
  const key = getNormalizedDistrictKey(rec.district);
  if (!distributionDistrictMap[key]) {
    distributionDistrictMap[key] = { district: rec.district, state: rec.state, categories: [] };
  }
  const hubCat = EYE_BANK_CATEGORIES.find(
    (c) => c.fullName === rec.centerName || rec.centerName.includes(c.name)
  );
  if (hubCat && !distributionDistrictMap[key].categories.find((c) => c.id === hubCat.id)) {
    distributionDistrictMap[key].categories.push(hubCat);
  }
});

const DISTRIBUTION_DESTINATION_ITEMS: GeoLocationItem[] = Object.values(distributionDistrictMap).map((item) => {
  const districtName = item.district;
  const coords = DISTRICT_COORDINATES[districtName] || DISTRICT_COORDINATES[getNormalizedDistrictKey(districtName)] || { lat: 12.9716, lng: 77.5946, state: item.state };

  const primaryCat = item.categories[0] || EYE_BANK_CATEGORIES[0];
  const secondaryCat = item.categories[1];
  const isShared = item.categories.length > 1;

  const categoryIds = item.categories.map((c) => c.id);
  const attachedHubNames = item.categories.map((c) => c.fullName);

  const gradientStyle = isShared
    ? `linear-gradient(135deg, ${primaryCat.color} 50%, ${secondaryCat.color} 50%)`
    : primaryCat.color;

  return {
    id: `eb_dist_${getNormalizedDistrictKey(districtName)}`,
    name: `${districtName} Distribution Centre`,
    rawName: districtName,
    entityId: "eyebank" as const,
    subcategoryId: "distribution_network",
    country: "India",
    state: coords.state || item.state,
    city: districtName,
    latitude: coords.lat,
    longitude: coords.lng,
    metrics: { sourceHub: attachedHubNames.join(" & "), recipientRegion: coords.state || item.state },
    metadata: {
      isMainHub: false,
      isDistributionDestination: true,
      sourceHubName: attachedHubNames[0],
      attachedHubs: attachedHubNames,
      district: districtName,
      categoryId: primaryCat.id,
      categoryIds,
      primaryColor: primaryCat.color,
      secondaryColor: secondaryCat?.color,
      isShared,
      gradientStyle,
    },
  };
});

// Master EYEBANK_DATA combining Main Hubs, Collection Nodes, and National Distribution Nodes
export const EYEBANK_DATA: GeoLocationItem[] = [
  ...MAIN_HUB_ITEMS,
  ...COLLECTION_CENTRE_ITEMS,
  ...DISTRIBUTION_DESTINATION_ITEMS,
];
