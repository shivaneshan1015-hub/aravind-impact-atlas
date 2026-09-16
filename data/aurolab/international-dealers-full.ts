import { GeoLocationItem } from "@/types/geo";

export interface InternationalClientRecord {
  sNo: number;
  country: string;
  region: string;
  lat: number;
  lng: number;
  clientLabel: string;
}

// Transposed from User Image: 83 Aurolab International Client Locations Across Global Regions
export const AUROLAB_INTERNATIONAL_83_CLIENTS: InternationalClientRecord[] = [
  // Latin America & Caribbean (16 Clients)
  { sNo: 1, country: "Bolivia", region: "Latin America", lat: -16.4897, lng: -68.1193, clientLabel: "Aurolab International Client 1 (Bolivia)" },
  { sNo: 2, country: "Brazil", region: "Latin America", lat: -15.7801, lng: -47.9292, clientLabel: "Aurolab International Client 2 (Brazil)" },
  { sNo: 3, country: "Dominican Republic", region: "Latin America", lat: 18.4861, lng: -69.9312, clientLabel: "Aurolab International Client 3 (Dominican Republic)" },
  { sNo: 4, country: "Ecuador", region: "Latin America", lat: -0.1807, lng: -78.4678, clientLabel: "Aurolab International Client 4 (Ecuador)" },
  { sNo: 5, country: "Paraguay", region: "Latin America", lat: -25.2637, lng: -57.5759, clientLabel: "Aurolab International Client 5 (Paraguay)" },
  { sNo: 6, country: "Honduras", region: "Latin America", lat: 14.0723, lng: -87.2068, clientLabel: "Aurolab International Client 6 (Honduras)" },
  { sNo: 7, country: "El Salvador", region: "Latin America", lat: 13.6929, lng: -89.2182, clientLabel: "Aurolab International Client 7 (El Salvador)" },
  { sNo: 8, country: "Peru", region: "Latin America", lat: -12.0464, lng: -77.0428, clientLabel: "Aurolab International Client 8 (Peru)" },
  { sNo: 9, country: "Argentina", region: "Latin America", lat: -34.6037, lng: -58.3816, clientLabel: "Aurolab International Client 9 (Argentina)" },
  { sNo: 10, country: "Chile", region: "Latin America", lat: -33.4489, lng: -70.6693, clientLabel: "Aurolab International Client 10 (Chile)" },
  { sNo: 11, country: "Colombia", region: "Latin America", lat: 4.711, lng: -74.0721, clientLabel: "Aurolab International Client 11 (Colombia)" },
  { sNo: 12, country: "Guatemala", region: "Latin America", lat: 14.6349, lng: -90.5069, clientLabel: "Aurolab International Client 12 (Guatemala)" },
  { sNo: 13, country: "Uruguay", region: "Latin America", lat: -34.9011, lng: -56.1645, clientLabel: "Aurolab International Client 13 (Uruguay)" },
  { sNo: 14, country: "Mexico", region: "Latin America", lat: 19.4326, lng: -99.1332, clientLabel: "Aurolab International Client 14 (Mexico)" },
  { sNo: 15, country: "Costa Rica", region: "Latin America", lat: 9.9281, lng: -84.0907, clientLabel: "Aurolab International Client 15 (Costa Rica)" },
  { sNo: 16, country: "Trinidad & Tobago", region: "Latin America", lat: 10.6549, lng: -61.5189, clientLabel: "Aurolab International Client 16 (Trinidad & Tobago)" },

  // Europe & Eurasia (14 Clients)
  { sNo: 17, country: "Albania", region: "Europe & Eurasia", lat: 41.3275, lng: 19.8187, clientLabel: "Aurolab International Client 17 (Albania)" },
  { sNo: 18, country: "Kosovo", region: "Europe & Eurasia", lat: 42.6629, lng: 21.1655, clientLabel: "Aurolab International Client 18 (Kosovo)" },
  { sNo: 19, country: "Czech Republic", region: "Europe & Eurasia", lat: 50.0755, lng: 14.4378, clientLabel: "Aurolab International Client 19 (Czech Republic)" },
  { sNo: 20, country: "Azerbaijan", region: "Europe & Eurasia", lat: 40.4093, lng: 49.8671, clientLabel: "Aurolab International Client 20 (Azerbaijan)" },
  { sNo: 21, country: "Greece", region: "Europe & Eurasia", lat: 37.9838, lng: 23.7275, clientLabel: "Aurolab International Client 21 (Greece)" },
  { sNo: 22, country: "Turkmenistan", region: "Europe & Eurasia", lat: 37.9601, lng: 58.3261, clientLabel: "Aurolab International Client 22 (Turkmenistan)" },
  { sNo: 23, country: "Germany", region: "Europe & Eurasia", lat: 52.52, lng: 13.405, clientLabel: "Aurolab International Client 23 (Germany)" },
  { sNo: 24, country: "Turkey", region: "Europe & Eurasia", lat: 39.9334, lng: 32.8597, clientLabel: "Aurolab International Client 24 (Turkey Hub 1)" },
  { sNo: 25, country: "Kyrgyzstan", region: "Europe & Eurasia", lat: 42.8746, lng: 74.5698, clientLabel: "Aurolab International Client 25 (Kyrgyzstan)" },
  { sNo: 26, country: "Croatia", region: "Europe & Eurasia", lat: 45.815, lng: 15.9819, clientLabel: "Aurolab International Client 26 (Croatia)" },
  { sNo: 27, country: "Turkey", region: "Europe & Eurasia", lat: 41.0082, lng: 28.9784, clientLabel: "Aurolab International Client 27 (Turkey Hub 2)" },
  { sNo: 28, country: "Uzbekistan", region: "Europe & Eurasia", lat: 41.2995, lng: 69.2401, clientLabel: "Aurolab International Client 28 (Uzbekistan)" },
  { sNo: 29, country: "Poland", region: "Europe & Eurasia", lat: 52.2297, lng: 21.0122, clientLabel: "Aurolab International Client 29 (Poland)" },
  { sNo: 30, country: "The Netherlands", region: "Europe & Eurasia", lat: 52.3676, lng: 4.9041, clientLabel: "Aurolab International Client 30 (The Netherlands)" },

  // Africa (16 Clients)
  { sNo: 31, country: "Angola", region: "Africa", lat: -8.839, lng: 13.2343, clientLabel: "Aurolab International Client 31 (Angola)" },
  { sNo: 32, country: "Burundi", region: "Africa", lat: -3.4264, lng: 29.9246, clientLabel: "Aurolab International Client 32 (Burundi)" },
  { sNo: 33, country: "Mali", region: "Africa", lat: 12.6392, lng: -8.0029, clientLabel: "Aurolab International Client 33 (Mali)" },
  { sNo: 34, country: "Tanzania", region: "Africa", lat: -6.163, lng: 35.7516, clientLabel: "Aurolab International Client 34 (Tanzania)" },
  { sNo: 35, country: "South Africa", region: "Africa", lat: -26.2041, lng: 28.0473, clientLabel: "Aurolab International Client 35 (South Africa)" },
  { sNo: 36, country: "Zambia", region: "Africa", lat: -15.3875, lng: 28.3228, clientLabel: "Aurolab International Client 36 (Zambia)" },
  { sNo: 37, country: "Uganda", region: "Africa", lat: 0.3476, lng: 32.5825, clientLabel: "Aurolab International Client 37 (Uganda)" },
  { sNo: 38, country: "Zimbabwe", region: "Africa", lat: -17.8252, lng: 31.053, clientLabel: "Aurolab International Client 38 (Zimbabwe)" },
  { sNo: 39, country: "Rwanda", region: "Africa", lat: -1.9441, lng: 30.0619, clientLabel: "Aurolab International Client 39 (Rwanda)" },
  { sNo: 40, country: "Ethiopia", region: "Africa", lat: 9.03, lng: 38.7578, clientLabel: "Aurolab International Client 40 (Ethiopia 1)" },
  { sNo: 41, country: "Ethiopia", region: "Africa", lat: 9.04, lng: 38.76, clientLabel: "Aurolab International Client 41 (Ethiopia 2)" },
  { sNo: 42, country: "Ethiopia", region: "Africa", lat: 9.02, lng: 38.74, clientLabel: "Aurolab International Client 42 (Ethiopia 3)" },
  { sNo: 43, country: "Kenya", region: "Africa", lat: -1.2921, lng: 36.8219, clientLabel: "Aurolab International Client 43 (Kenya 1)" },
  { sNo: 44, country: "Nigeria", region: "Africa", lat: 9.0579, lng: 7.4951, clientLabel: "Aurolab International Client 44 (Nigeria)" },
  { sNo: 45, country: "Kenya", region: "Africa", lat: -4.0435, lng: 39.6682, clientLabel: "Aurolab International Client 45 (Kenya 2)" },
  { sNo: 46, country: "Ethiopia", region: "Africa", lat: 11.6, lng: 37.38, clientLabel: "Aurolab International Client 46 (Ethiopia 4)" },

  // Asia & Pacific (25 Clients)
  { sNo: 47, country: "Thailand", region: "Asia & Pacific", lat: 13.7563, lng: 100.5018, clientLabel: "Aurolab International Client 47 (Thailand 1)" },
  { sNo: 48, country: "Thailand", region: "Asia & Pacific", lat: 18.7883, lng: 98.9853, clientLabel: "Aurolab International Client 48 (Thailand 2)" },
  { sNo: 49, country: "Malaysia", region: "Asia & Pacific", lat: 3.139, lng: 101.6869, clientLabel: "Aurolab International Client 49 (Malaysia 1)" },
  { sNo: 50, country: "Malaysia", region: "Asia & Pacific", lat: 5.4141, lng: 100.3288, clientLabel: "Aurolab International Client 50 (Malaysia 2)" },
  { sNo: 51, country: "Indonesia", region: "Asia & Pacific", lat: -6.2088, lng: 106.8456, clientLabel: "Aurolab International Client 51 (Indonesia 1)" },
  { sNo: 52, country: "Cambodia", region: "Asia & Pacific", lat: 11.5564, lng: 104.9282, clientLabel: "Aurolab International Client 52 (Cambodia 1)" },
  { sNo: 53, country: "New Zealand", region: "Asia & Pacific", lat: -41.2865, lng: 174.7762, clientLabel: "Aurolab International Client 53 (New Zealand)" },
  { sNo: 54, country: "Laos", region: "Asia & Pacific", lat: 17.9757, lng: 102.6331, clientLabel: "Aurolab International Client 54 (Laos)" },
  { sNo: 55, country: "Vietnam", region: "Asia & Pacific", lat: 21.0285, lng: 105.8342, clientLabel: "Aurolab International Client 55 (Vietnam 1)" },
  { sNo: 56, country: "Mongolia", region: "Asia & Pacific", lat: 47.8864, lng: 106.9057, clientLabel: "Aurolab International Client 56 (Mongolia)" },
  { sNo: 57, country: "Philippines", region: "Asia & Pacific", lat: 14.5995, lng: 120.9842, clientLabel: "Aurolab International Client 57 (Philippines)" },
  { sNo: 58, country: "South Korea", region: "Asia & Pacific", lat: 37.5665, lng: 126.978, clientLabel: "Aurolab International Client 58 (South Korea)" },
  { sNo: 59, country: "Myanmar", region: "Asia & Pacific", lat: 19.7633, lng: 96.0785, clientLabel: "Aurolab International Client 59 (Myanmar)" },
  { sNo: 60, country: "Indonesia", region: "Asia & Pacific", lat: -7.2575, lng: 112.7521, clientLabel: "Aurolab International Client 60 (Indonesia 2)" },
  { sNo: 61, country: "Cambodia", region: "Asia & Pacific", lat: 13.3671, lng: 103.859, clientLabel: "Aurolab International Client 61 (Cambodia 2)" },
  { sNo: 62, country: "Thailand", region: "Asia & Pacific", lat: 7.0086, lng: 100.493, clientLabel: "Aurolab International Client 62 (Thailand 3)" },
  { sNo: 63, country: "Vietnam", region: "Asia & Pacific", lat: 10.8231, lng: 106.6297, clientLabel: "Aurolab International Client 63 (Vietnam 2)" },
  { sNo: 64, country: "Bhutan", region: "Asia & Pacific", lat: 27.4728, lng: 89.6393, clientLabel: "Aurolab International Client 64 (Bhutan)" },
  { sNo: 65, country: "Sri Lanka", region: "Asia & Pacific", lat: 6.9271, lng: 79.8612, clientLabel: "Aurolab International Client 65 (Sri Lanka 1)" },
  { sNo: 66, country: "Sri Lanka", region: "Asia & Pacific", lat: 7.2906, lng: 80.6337, clientLabel: "Aurolab International Client 66 (Sri Lanka 2)" },
  { sNo: 67, country: "Maldives", region: "Asia & Pacific", lat: 4.1755, lng: 73.5093, clientLabel: "Aurolab International Client 67 (Maldives)" },
  { sNo: 68, country: "Afghanistan", region: "Asia & Pacific", lat: 34.5553, lng: 69.2075, clientLabel: "Aurolab International Client 68 (Afghanistan)" },
  { sNo: 69, country: "Bangladesh", region: "Asia & Pacific", lat: 23.8103, lng: 90.4125, clientLabel: "Aurolab International Client 69 (Bangladesh)" },
  { sNo: 70, country: "Nepal", region: "Asia & Pacific", lat: 27.7172, lng: 85.324, clientLabel: "Aurolab International Client 70 (Nepal)" },
  { sNo: 71, country: "Pakistan", region: "Asia & Pacific", lat: 33.6844, lng: 73.0479, clientLabel: "Aurolab International Client 71 (Pakistan)" },

  // Middle East & MENA (12 Clients)
  { sNo: 72, country: "Saudi Arabia", region: "Middle East", lat: 24.7136, lng: 46.6753, clientLabel: "Aurolab International Client 72 (Saudi Arabia)" },
  { sNo: 73, country: "Yemen", region: "Middle East", lat: 15.3694, lng: 44.2066, clientLabel: "Aurolab International Client 73 (Yemen)" },
  { sNo: 74, country: "Iran", region: "Middle East", lat: 35.6892, lng: 51.389, clientLabel: "Aurolab International Client 74 (Iran)" },
  { sNo: 75, country: "Dubai (UAE)", region: "Middle East", lat: 25.2048, lng: 55.2708, clientLabel: "Aurolab International Client 75 (Dubai UAE)" },
  { sNo: 76, country: "Iraq", region: "Middle East", lat: 33.3152, lng: 44.3661, clientLabel: "Aurolab International Client 76 (Iraq)" },
  { sNo: 77, country: "Syria", region: "Middle East", lat: 33.5138, lng: 36.2765, clientLabel: "Aurolab International Client 77 (Syria)" },
  { sNo: 78, country: "Egypt", region: "Middle East", lat: 30.0444, lng: 31.2357, clientLabel: "Aurolab International Client 78 (Egypt)" },
  { sNo: 79, country: "Algeria", region: "Middle East", lat: 36.7538, lng: 3.0588, clientLabel: "Aurolab International Client 79 (Algeria)" },
  { sNo: 80, country: "Morocco", region: "Middle East", lat: 33.9716, lng: -6.8498, clientLabel: "Aurolab International Client 80 (Morocco 1)" },
  { sNo: 81, country: "Morocco", region: "Middle East", lat: 33.5731, lng: -7.5898, clientLabel: "Aurolab International Client 81 (Morocco 2)" },
  { sNo: 82, country: "Tunisia", region: "Middle East", lat: 36.8065, lng: 10.1815, clientLabel: "Aurolab International Client 82 (Tunisia)" },
  { sNo: 83, country: "Sudan", region: "Middle East", lat: 15.5007, lng: 32.5599, clientLabel: "Aurolab International Client 83 (Sudan)" },
];

export const AUROLAB_INTERNATIONAL_LOCATIONS_FULL: GeoLocationItem[] = AUROLAB_INTERNATIONAL_83_CLIENTS.map(
  (c) => ({
    id: `auro_intl_83_${c.sNo}`,
    name: c.clientLabel,
    entityId: "aurolab",
    subcategoryId: "international",
    country: c.country,
    state: c.region,
    city: c.country,
    latitude: c.lat,
    longitude: c.lng,
    metrics: {
      clientNo: c.sNo,
      exportNation: c.country,
      geographicRegion: c.region,
      productRange: "Auroflex IOLs, Sutures, Pharma",
    },
    address: `${c.country}, ${c.region}`,
  })
);
