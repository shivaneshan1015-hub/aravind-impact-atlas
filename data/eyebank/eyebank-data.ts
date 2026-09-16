import { GeoLocationItem } from "@/types/geo";

export interface CollectionVector {
  id: string;
  fromCity: string;
  fromCoords: [number, number]; // [lng, lat]
  toHubName: string;
  toCoords: [number, number]; // [lng, lat]
}

// Main Eye Bank Centres (Exact names from table)
export const MAIN_EYE_BANK_HUBS = [
  {
    id: "eb_hub_madurai",
    centerName: "RAIEB , Madurai",
    city: "Madurai",
    state: "Tamil Nadu",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { collectionCentres: 14, corneasCollectedAnnual: 3400, transplantsAnnual: 2100 },
    establishedYear: 1998,
  },
  {
    id: "eb_hub_coimbatore",
    centerName: "AIOB, Coimbatore",
    city: "Coimbatore",
    state: "Tamil Nadu",
    latitude: 11.0168,
    longitude: 76.9558,
    metrics: { collectionCentres: 4, corneasCollectedAnnual: 2200, transplantsAnnual: 1450 },
    establishedYear: 2005,
  },
  {
    id: "eb_hub_tirunelveli",
    centerName: "RAEB ,Tirunelveli",
    city: "Tirunelveli",
    state: "Tamil Nadu",
    latitude: 8.7139,
    longitude: 77.7567,
    metrics: { collectionCentres: 5, corneasCollectedAnnual: 1600, transplantsAnnual: 980 },
    establishedYear: 2008,
  },
  {
    id: "eb_hub_chennai",
    centerName: "AEB Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    latitude: 13.0827,
    longitude: 80.2707,
    metrics: { collectionCentres: 1, corneasCollectedAnnual: 850, transplantsAnnual: 520 },
    establishedYear: 2012,
  },
  {
    id: "eb_hub_pondicherry",
    centerName: "AEBAP,Pondicherry",
    city: "Puducherry",
    state: "Puducherry",
    latitude: 11.9416,
    longitude: 79.8083,
    metrics: { collectionCentres: 6, corneasCollectedAnnual: 1950, transplantsAnnual: 1250 },
    establishedYear: 2006,
  },
  {
    id: "eb_hub_salem",
    centerName: "AEH, Salem",
    city: "Salem",
    state: "Tamil Nadu",
    latitude: 11.6643,
    longitude: 78.1460,
    metrics: { collectionCentres: 4, corneasCollectedAnnual: 1100, transplantsAnnual: 720 },
    establishedYear: 2015,
  },
  {
    id: "eb_hub_tirupathi",
    centerName: "AEH ,Tirupathi",
    city: "Thirupathi",
    state: "Andhra Pradesh",
    latitude: 13.6288,
    longitude: 79.4192,
    metrics: { collectionCentres: 2, corneasCollectedAnnual: 650, transplantsAnnual: 410 },
    establishedYear: 2018,
  },
];

// District Collection Nodes dictionary for mapping coordinates
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
  Thiruvanamalai: { lat: 12.2253, lng: 79.0747, state: "Tamil Nadu" },
  Kallakuruchi: { lat: 11.7384, lng: 78.9610, state: "Tamil Nadu" },
  Salem: { lat: 11.6643, lng: 78.1460, state: "Tamil Nadu" },
  Namakkal: { lat: 11.2189, lng: 78.1674, state: "Tamil Nadu" },
  Dharmapuri: { lat: 12.1211, lng: 78.1581, state: "Tamil Nadu" },
  Krishanagiri: { lat: 12.5186, lng: 78.2144, state: "Tamil Nadu" },
  Krishnagiri: { lat: 12.5186, lng: 78.2144, state: "Tamil Nadu" },
  Thirupathi: { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh" },
  Chittoor: { lat: 13.2172, lng: 79.1003, state: "Andhra Pradesh" },
};

// Build complete GeoLocationItem list for Eye Bank entity
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
  },
}));

// Generate collection nodes attached to main hubs
const COLLECTION_CENTRE_ITEMS: GeoLocationItem[] = [
  // RAIEB , Madurai Collection Nodes
  ...["Madurai", "Dindigul", "Theni", "Virdhunagar", "Sivagangai", "Pudukkottai", "Ramanathapuram", "Ariyalur", "Karur", "Thanjavur", "Nagapattinam", "Thiruvarur", "Trichy", "Mayaladudurai"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 9.9252, lng: 78.1198, state: "Tamil Nadu" };
    return {
      id: `eb_coll_mdu_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "RAIEB , Madurai", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "RAIEB , Madurai",
        district,
      },
    };
  }),

  // AIOB, Coimbatore Collection Nodes
  ...["Coimbatore", "Tirupur", "Erode", "Dindigul"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 11.0168, lng: 76.9558, state: "Tamil Nadu" };
    return {
      id: `eb_coll_cbe_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "AIOB, Coimbatore", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "AIOB, Coimbatore",
        district,
      },
    };
  }),

  // RAEB ,Tirunelveli Collection Nodes
  ...["Tirunelveli", "Tuticorin", "Kaniyakumari", "Tenkasi", "Virudhunagar"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 8.7139, lng: 77.7567, state: "Tamil Nadu" };
    return {
      id: `eb_coll_tvl_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "RAEB ,Tirunelveli", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "RAEB ,Tirunelveli",
        district,
      },
    };
  }),

  // AEB Chennai Collection Nodes
  ...["Vellore"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 12.9165, lng: 79.1325, state: "Tamil Nadu" };
    return {
      id: `eb_coll_che_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "AEB Chennai", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "AEB Chennai",
        district,
      },
    };
  }),

  // AEBAP,Pondicherry Collection Nodes
  ...["Cuddalore", "Vilupuram", "Puducherry", "Mayaldudurai", "Thiruvanamalai", "Kallakuruchi"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 11.9416, lng: 79.8083, state: "Puducherry" };
    return {
      id: `eb_coll_pdy_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "AEBAP,Pondicherry", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "AEBAP,Pondicherry",
        district,
      },
    };
  }),

  // AEH, Salem Collection Nodes
  ...["Salem", "Namakkal", "Dharmapuri", "Krishanagiri"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 11.6643, lng: 78.1460, state: "Tamil Nadu" };
    return {
      id: `eb_coll_slm_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "AEH, Salem", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "AEH, Salem",
        district,
      },
    };
  }),

  // AEH ,Tirupathi Collection Nodes
  ...["Thirupathi", "Chittoor"].map((district) => {
    const coords = DISTRICT_COORDINATES[district] || { lat: 13.6288, lng: 79.4192, state: "Andhra Pradesh" };
    return {
      id: `eb_coll_tpt_${district.toLowerCase()}`,
      name: `${district} Collection Centre`,
      rawName: `${district}`,
      entityId: "eyebank" as const,
      subcategoryId: "collection_network",
      country: "India",
      state: coords.state,
      city: district,
      latitude: coords.lat,
      longitude: coords.lng,
      metrics: { attachedHub: "AEH ,Tirupathi", status: "Active Network" },
      metadata: {
        isMainHub: false,
        attachedMainCenter: "AEH ,Tirupathi",
        district,
      },
    };
  }),
];

// Master EYEBANK_DATA combining Main Hubs & Collection Nodes
export const EYEBANK_DATA: GeoLocationItem[] = [
  ...MAIN_HUB_ITEMS,
  ...COLLECTION_CENTRE_ITEMS,

  // National Distribution Nodes
  {
    id: "eyebank_dist_tn",
    name: "Tamil Nadu Corneal Tissue Distribution Network",
    entityId: "eyebank",
    subcategoryId: "distribution_network",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai Hub",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { recipientHospitals: 42, cornealTransplants: 4530, utilizationRate: "88%" },
  },
  {
    id: "eyebank_dist_ka",
    name: "Karnataka Tissue Distribution Partner",
    entityId: "eyebank",
    subcategoryId: "distribution_network",
    country: "India",
    state: "Karnataka",
    city: "Bengaluru",
    latitude: 12.9716,
    longitude: 77.5946,
    metrics: { recipientHospitals: 18, cornealTransplants: 1200, utilizationRate: "85%" },
  },
  {
    id: "eyebank_dist_kl",
    name: "Kerala Tissue Distribution Partner",
    entityId: "eyebank",
    subcategoryId: "distribution_network",
    country: "India",
    state: "Kerala",
    city: "Kochi",
    latitude: 9.9312,
    longitude: 76.2673,
    metrics: { recipientHospitals: 14, cornealTransplants: 950, utilizationRate: "86%" },
  },
];
