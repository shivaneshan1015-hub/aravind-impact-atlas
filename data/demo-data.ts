import { GeoLocationItem } from "@/types/geo";
import { AUROLAB_NATIONAL_DEALERS } from "./aurolab/national-dealers";
import { HOSPITALS_DATA } from "./hospitals/hospitals-data";
import { LAICO_DATA } from "./laico/laico-data";
import { AMRF_DATA } from "./amrf/amrf-data";
import { AUROITECH_DATA } from "./auroitech/auroitech-data";
import { EYEBANK_DATA } from "./eyebank/eyebank-data";

// Aurolab International Dealers
export const AUROLAB_INTERNATIONAL_DEALERS: GeoLocationItem[] = [
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
  {
    id: "auro_intl_3",
    name: "Mekong Eye Tech Vietnam",
    entityId: "aurolab",
    subcategoryId: "international_dealers",
    country: "Vietnam",
    state: "Ho Chi Minh City",
    city: "Ho Chi Minh City",
    latitude: 10.8231,
    longitude: 106.6297,
    metrics: { exportVolume: "95,000 IOLs/yr", regionServed: "Southeast Asia" },
    address: "District 1, Ho Chi Minh City, Vietnam",
  },
];

// Master Demo Locations Export
export const DEMO_LOCATIONS: GeoLocationItem[] = [
  ...AUROLAB_NATIONAL_DEALERS,
  ...AUROLAB_INTERNATIONAL_DEALERS,
  ...HOSPITALS_DATA,
  ...LAICO_DATA,
  ...AMRF_DATA,
  ...AUROITECH_DATA,
  ...EYEBANK_DATA,
];
