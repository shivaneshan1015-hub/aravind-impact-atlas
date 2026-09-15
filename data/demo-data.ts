import { GeoLocationItem } from "@/types/geo";
import { AUROLAB_NATIONAL_DEALERS } from "./aurolab/national-dealers";

// Combine Aurolab National Dealers with other entity prototype datasets
export const OTHER_DEMO_LOCATIONS: GeoLocationItem[] = [
  // Aurolab International Dealers
  {
    id: "auro_intl_1",
    name: "BioVision Latin America",
    entityId: "aurolab",
    subcategoryId: "international_dealers",
    country: "Brazil",
    state: "Sao Paulo",
    city: "Sao Paulo",
    latitude: -23.5505,
    longitude: -46.6333,
    metrics: { exportVolume: "120,000 IOLs/yr", regionServed: "South America" },
    address: "Av. Paulista, Sao Paulo, Brazil",
  },
  {
    id: "auro_intl_2",
    name: "AfriSight Ophthalmic Kenya",
    entityId: "aurolab",
    subcategoryId: "international_dealers",
    country: "Kenya",
    state: "Nairobi",
    city: "Nairobi",
    latitude: -1.2921,
    longitude: 36.8219,
    metrics: { exportVolume: "85,000 IOLs/yr", regionServed: "East Africa" },
    address: "Upper Hill Road, Nairobi, Kenya",
  },

  // Hospitals
  {
    id: "hosp_mdu",
    name: "Aravind Eye Hospital - Madurai (Main)",
    entityId: "hospitals",
    subcategoryId: "hospitals_network",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: {
      hospitalsCount: 1,
      bedsCount: 1250,
      annualOutpatients: "950,000",
      surgeriesCount: "110,000",
    },
    address: "1, Anna Nagar, Madurai, Tamil Nadu",
    contact: "+91 452 435 6100",
    establishedYear: 1976,
    type: "Tertiary Hospital & Headquarters",
  },
  {
    id: "hosp_cbe",
    name: "Aravind Eye Hospital - Coimbatore",
    entityId: "hospitals",
    subcategoryId: "hospitals_network",
    country: "India",
    state: "Tamil Nadu",
    city: "Coimbatore",
    latitude: 11.0168,
    longitude: 76.9558,
    metrics: {
      hospitalsCount: 1,
      bedsCount: 950,
      annualOutpatients: "780,000",
      surgeriesCount: "88,000",
    },
    address: "Avinashi Road, Coimbatore, Tamil Nadu",
    establishedYear: 1997,
  },

  // LAICO
  {
    id: "laico_hq",
    name: "LAICO Training & Management Headquarters",
    entityId: "laico",
    subcategoryId: "laico_participants",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { participantsCount: "14,500+", countriesRepresented: 104 },
    establishedYear: 1992,
  },

  // AMRF
  {
    id: "amrf_hq",
    name: "Aravind Medical Research Foundation Center",
    entityId: "amrf",
    subcategoryId: "phd_completed",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { phdCount: 78, publications: 650 },
    establishedYear: 1985,
  },

  // Auroitech
  {
    id: "auroitech_hq",
    name: "Auroitech Digital Health Innovation Hub",
    entityId: "auroitech",
    subcategoryId: "tech_products",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { clientInstitutions: 180, patientsScreened: "4.2 Million" },
    establishedYear: 2018,
  },

  // Eye Bank
  {
    id: "eyebank_mdu",
    name: "Rotary Aravind International Eye Bank - Madurai Hub",
    entityId: "eyebank",
    subcategoryId: "collection_network",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { collectionCentres: 12, corneasCollectedAnnual: 3400 },
    establishedYear: 1998,
  },
];

export const DEMO_LOCATIONS: GeoLocationItem[] = [
  ...AUROLAB_NATIONAL_DEALERS,
  ...OTHER_DEMO_LOCATIONS,
];
