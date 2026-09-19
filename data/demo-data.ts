import { GeoLocationItem } from "@/types/geo";
import { AUROLAB_DOMESTIC_LOCATIONS } from "./aurolab/domestic-dealers-42";
import { AUROLAB_INTERNATIONAL_LOCATIONS_FULL } from "./aurolab/international-dealers-full";
import { HOSPITALS_DATA } from "./hospitals/hospitals-data";
import { VISION_CENTRES_DATA } from "./hospitals/vision-centres-data";
import { LAICO_DATA } from "./laico/laico-data";
import { LAICO_SHORT_TERM_TRAINEES_DATA } from "./laico/short-term-trainees-data";
import { LAICO_OTHER_TRAINING_DATA } from "./laico/laico-training-data";
import { AMRF_DATA } from "./amrf/amrf-data";
import { AUROITECH_DATA } from "./auroitech/auroitech-data";
import { EYEBANK_DATA } from "./eyebank/eyebank-data";

// Ensure Aurolab domestic dealers use subcategoryId: "domestic"
const AUROLAB_DOMESTIC = AUROLAB_DOMESTIC_LOCATIONS.map((loc) => ({
  ...loc,
  subcategoryId: "domestic",
}));

// Master Demo Locations Export
export const DEMO_LOCATIONS: GeoLocationItem[] = [
  ...AUROLAB_DOMESTIC,
  ...AUROLAB_INTERNATIONAL_LOCATIONS_FULL,
  ...HOSPITALS_DATA,
  ...VISION_CENTRES_DATA,
  ...LAICO_DATA,
  ...LAICO_SHORT_TERM_TRAINEES_DATA,
  ...LAICO_OTHER_TRAINING_DATA,
  ...AMRF_DATA,
  ...AUROITECH_DATA,
  ...EYEBANK_DATA,
];
