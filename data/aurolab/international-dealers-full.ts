import { GeoLocationItem } from "@/types/geo";

export interface InternationalExportCountry {
  country: string;
  region: string;
  lat: number;
  lng: number;
}

// Complete 70+ Aurolab International Export Nations transposed from User Image
export const AUROLAB_INTERNATIONAL_COUNTRIES: InternationalExportCountry[] = [
  // Latin America & Caribbean
  { country: "Bolivia", region: "Latin America", lat: -16.4897, lng: -68.1193 },
  { country: "Brazil", region: "Latin America", lat: -15.7801, lng: -47.9292 },
  { country: "Dominican Republic", region: "Latin America", lat: 18.4861, lng: -69.9312 },
  { country: "Ecuador", region: "Latin America", lat: -0.1807, lng: -78.4678 },
  { country: "Paraguay", region: "Latin America", lat: -25.2637, lng: -57.5759 },
  { country: "Honduras", region: "Latin America", lat: 14.0723, lng: -87.2068 },
  { country: "El Salvador", region: "Latin America", lat: 13.6929, lng: -89.2182 },
  { country: "Peru", region: "Latin America", lat: -12.0464, lng: -77.0428 },
  { country: "Argentina", region: "Latin America", lat: -34.6037, lng: -58.3816 },
  { country: "Chile", region: "Latin America", lat: -33.4489, lng: -70.6693 },
  { country: "Colombia", region: "Latin America", lat: 4.711, lng: -74.0721 },
  { country: "Guatemala", region: "Latin America", lat: 14.6349, lng: -90.5069 },
  { country: "Uruguay", region: "Latin America", lat: -34.9011, lng: -56.1645 },
  { country: "Mexico", region: "Latin America", lat: 19.4326, lng: -99.1332 },
  { country: "Costa Rica", region: "Latin America", lat: 9.9281, lng: -84.0907 },
  { country: "Trinidad & Tobago", region: "Latin America", lat: 10.6549, lng: -61.5189 },

  // Europe & Eurasia
  { country: "Albania", region: "Europe & Eurasia", lat: 41.3275, lng: 19.8187 },
  { country: "Kosovo", region: "Europe & Eurasia", lat: 42.6629, lng: 21.1655 },
  { country: "Czech Republic", region: "Europe & Eurasia", lat: 50.0755, lng: 14.4378 },
  { country: "Azerbaijan", region: "Europe & Eurasia", lat: 40.4093, lng: 49.8671 },
  { country: "Greece", region: "Europe & Eurasia", lat: 37.9838, lng: 23.7275 },
  { country: "Turkmenistan", region: "Europe & Eurasia", lat: 37.9601, lng: 58.3261 },
  { country: "Germany", region: "Europe & Eurasia", lat: 52.52, lng: 13.405 },
  { country: "Turkey", region: "Europe & Eurasia", lat: 39.9334, lng: 32.8597 },
  { country: "Kyrgyzstan", region: "Europe & Eurasia", lat: 42.8746, lng: 74.5698 },
  { country: "Croatia", region: "Europe & Eurasia", lat: 45.815, lng: 15.9819 },
  { country: "Uzbekistan", region: "Europe & Eurasia", lat: 41.2995, lng: 69.2401 },
  { country: "Poland", region: "Europe & Eurasia", lat: 52.2297, lng: 21.0122 },
  { country: "The Netherlands", region: "Europe & Eurasia", lat: 52.3676, lng: 4.9041 },

  // Africa
  { country: "Angola", region: "Africa", lat: -8.839, lng: 13.2343 },
  { country: "Burundi", region: "Africa", lat: -3.4264, lng: 29.9246 },
  { country: "Mali", region: "Africa", lat: 12.6392, lng: -8.0029 },
  { country: "Tanzania", region: "Africa", lat: -6.163, lng: 35.7516 },
  { country: "South Africa", region: "Africa", lat: -26.2041, lng: 28.0473 },
  { country: "Zambia", region: "Africa", lat: -15.3875, lng: 28.3228 },
  { country: "Uganda", region: "Africa", lat: 0.3476, lng: 32.5825 },
  { country: "Zimbabwe", region: "Africa", lat: -17.8252, lng: 31.053 },
  { country: "Rwanda", region: "Africa", lat: -1.9441, lng: 30.0619 },
  { country: "Ethiopia", region: "Africa", lat: 9.03, lng: 38.7578 },
  { country: "Kenya", region: "Africa", lat: -1.2921, lng: 36.8219 },
  { country: "Nigeria", region: "Africa", lat: 9.0579, lng: 7.4951 },
  { country: "Algeria", region: "Africa", lat: 36.7538, lng: 3.0588 },
  { country: "Morocco", region: "Africa", lat: 33.9716, lng: -6.8498 },
  { country: "Tunisia", region: "Africa", lat: 36.8065, lng: 10.1815 },
  { country: "Sudan", region: "Africa", lat: 15.5007, lng: 32.5599 },

  // Asia & Pacific
  { country: "Thailand", region: "Asia & Pacific", lat: 13.7563, lng: 100.5018 },
  { country: "Malaysia", region: "Asia & Pacific", lat: 3.139, lng: 101.6869 },
  { country: "Indonesia", region: "Asia & Pacific", lat: -6.2088, lng: 106.8456 },
  { country: "Cambodia", region: "Asia & Pacific", lat: 11.5564, lng: 104.9282 },
  { country: "New Zealand", region: "Asia & Pacific", lat: -41.2865, lng: 174.7762 },
  { country: "Laos", region: "Asia & Pacific", lat: 17.9757, lng: 102.6331 },
  { country: "Vietnam", region: "Asia & Pacific", lat: 21.0285, lng: 105.8342 },
  { country: "Mongolia", region: "Asia & Pacific", lat: 47.8864, lng: 106.9057 },
  { country: "Philippines", region: "Asia & Pacific", lat: 14.5995, lng: 120.9842 },
  { country: "South Korea", region: "Asia & Pacific", lat: 37.5665, lng: 126.978 },
  { country: "Myanmar", region: "Asia & Pacific", lat: 19.7633, lng: 96.0785 },
  { country: "Bhutan", region: "Asia & Pacific", lat: 27.4728, lng: 89.6393 },
  { country: "Sri Lanka", region: "Asia & Pacific", lat: 6.9271, lng: 79.8612 },
  { country: "Maldives", region: "Asia & Pacific", lat: 4.1755, lng: 73.5093 },
  { country: "Afghanistan", region: "Asia & Pacific", lat: 34.5553, lng: 69.2075 },
  { country: "Bangladesh", region: "Asia & Pacific", lat: 23.8103, lng: 90.4125 },
  { country: "Nepal", region: "Asia & Pacific", lat: 27.7172, lng: 85.324 },
  { country: "Pakistan", region: "Asia & Pacific", lat: 33.6844, lng: 73.0479 },

  // Middle East & MENA
  { country: "Saudi Arabia", region: "Middle East", lat: 24.7136, lng: 46.6753 },
  { country: "Yemen", region: "Middle East", lat: 15.3694, lng: 44.2066 },
  { country: "Iran", region: "Middle East", lat: 35.6892, lng: 51.389 },
  { country: "Dubai (UAE)", region: "Middle East", lat: 25.2048, lng: 55.2708 },
  { country: "Iraq", region: "Middle East", lat: 33.3152, lng: 44.3661 },
  { country: "Syria", region: "Middle East", lat: 33.5138, lng: 36.2765 },
  { country: "Egypt", region: "Middle East", lat: 30.0444, lng: 31.2357 },
];

export const AUROLAB_INTERNATIONAL_LOCATIONS_FULL: GeoLocationItem[] = AUROLAB_INTERNATIONAL_COUNTRIES.map(
  (c, idx) => ({
    id: `auro_intl_full_${idx + 1}`,
    name: `Aurolab Partner Hub - ${c.country}`,
    entityId: "aurolab",
    subcategoryId: "international",
    country: c.country,
    state: c.region,
    city: c.country,
    latitude: c.lat,
    longitude: c.lng,
    metrics: {
      exportNation: c.country,
      geographicRegion: c.region,
      productRange: "Auroflex IOLs, Sutures, Pharma",
    },
    address: `${c.country}, ${c.region}`,
  })
);
