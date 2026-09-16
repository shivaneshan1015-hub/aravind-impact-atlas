export interface EyeBankCollectionCenter {
  centerName: string;
  districts: string[];
}

export interface EyeBankDistributionRecord {
  centerName: string;
  district: string;
  state: string;
}

export interface EyeBankYearlyMetric {
  sNo: number;
  year: string;
  collection: number;
  utilization: number;
}

// Transposed from Image: Eye Bank Collection - District wise (Exact Main Centre Names)
export interface EyeBankCollectionCenter {
  centerName: string; // Exact Main Centre Name from table, e.g. "RAIEB , Madurai"
  shortName: string;
  city: string;
  latitude: number;
  longitude: number;
  districts: string[];
}

export const EYE_BANK_COLLECTION_CENTRES: EyeBankCollectionCenter[] = [
  {
    centerName: "RAIEB , Madurai",
    shortName: "RAIEB Madurai",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    districts: [
      "Madurai",
      "Dindigul",
      "Theni",
      "Virdhunagar",
      "Sivagangai",
      "Pudukkottai",
      "Ramanathapuram",
      "Ariyalur",
      "Karur",
      "Thanjavur",
      "Nagapattinam",
      "Thiruvarur",
      "Trichy",
      "Mayaladudurai",
    ],
  },
  {
    centerName: "AIOB, Coimbatore",
    shortName: "AIOB Coimbatore",
    city: "Coimbatore",
    latitude: 11.0168,
    longitude: 76.9558,
    districts: ["Coimbatore", "Tirupur", "Erode", "Dindigul"],
  },
  {
    centerName: "RAEB ,Tirunelveli",
    shortName: "RAEB Tirunelveli",
    city: "Tirunelveli",
    latitude: 8.7139,
    longitude: 77.7567,
    districts: ["Tirunelveli", "Tuticorin", "Kaniyakumari", "Tenkasi", "Virudhunagar"],
  },
  {
    centerName: "AEB Chennai",
    shortName: "AEB Chennai",
    city: "Chennai",
    latitude: 13.0827,
    longitude: 80.2707,
    districts: ["Vellore"],
  },
  {
    centerName: "AEBAP,Pondicherry",
    shortName: "AEBAP Pondicherry",
    city: "Puducherry",
    latitude: 11.9416,
    longitude: 79.8083,
    districts: [
      "Cuddalore",
      "Vilupuram",
      "Puducherry",
      "Mayaldudurai",
      "Thiruvanamalai",
      "Kallakuruchi",
    ],
  },
  {
    centerName: "AEH, Salem",
    shortName: "AEH Salem",
    city: "Salem",
    latitude: 11.6643,
    longitude: 78.1460,
    districts: ["Salem", "Namakkal", "Dharmapuri", "Krishanagiri"],
  },
  {
    centerName: "AEH ,Tirupathi",
    shortName: "AEH Tirupathi",
    city: "Thirupathi",
    latitude: 13.6288,
    longitude: 79.4192,
    districts: ["Thirupathi", "Chittoor"],
  },
];

// Transposed from Image 3: Collected Eyes Distribution across India
export const EYE_BANK_DISTRIBUTION_RECORDS: EyeBankDistributionRecord[] = [
  // RAIEB , Madurai Destinations
  { centerName: "RAIEB , Madurai", district: "Madurai", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Ernakulam", state: "Kerala" },
  { centerName: "RAIEB , Madurai", district: "Bangalore", state: "Karnataka" },
  { centerName: "RAIEB , Madurai", district: "Chennai", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Coimbatore", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Salem", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Hyderabad", state: "Telangana" },
  { centerName: "RAIEB , Madurai", district: "Kakinada", state: "Andhra Pradesh" },
  { centerName: "RAIEB , Madurai", district: "Mumbai", state: "Maharashtra" },
  { centerName: "RAIEB , Madurai", district: "Haridwar", state: "Uttarakhand" },
  { centerName: "RAIEB , Madurai", district: "Haryana Region", state: "Haryana" },
  { centerName: "RAIEB , Madurai", district: "Delhi NCR", state: "Delhi" },
  { centerName: "RAIEB , Madurai", district: "Kolkata", state: "West Bengal" },
  { centerName: "RAIEB , Madurai", district: "Nagpur", state: "Maharashtra" },
  { centerName: "RAIEB , Madurai", district: "Lucknow", state: "Uttar Pradesh" },
  { centerName: "RAIEB , Madurai", district: "Chandigarh", state: "Chandigarh" },
  { centerName: "RAIEB , Madurai", district: "Ahmedabad", state: "Gujarat" },
  { centerName: "RAIEB , Madurai", district: "Varanasi", state: "Uttar Pradesh" },
  { centerName: "RAIEB , Madurai", district: "Sivagangai", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Vellore", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Karur", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Namakkal", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Theni", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Thanjavur", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Tirunelveli", state: "Tamil Nadu" },
  { centerName: "RAIEB , Madurai", district: "Pondicherry", state: "Pondicherry" },
  { centerName: "RAIEB , Madurai", district: "Thrissur", state: "Kerala" },
  { centerName: "RAIEB , Madurai", district: "Thiruvananthapuram", state: "Kerala" },
  { centerName: "RAIEB , Madurai", district: "Tirupathi", state: "Andhra Pradesh" },
  { centerName: "RAIEB , Madurai", district: "Palakkad", state: "Kerala" },

  // AIOB, Coimbatore Destinations
  { centerName: "AIOB, Coimbatore", district: "Coimbatore", state: "Tamil Nadu" },
  { centerName: "AIOB, Coimbatore", district: "Palakkad", state: "Kerala" },
  { centerName: "AIOB, Coimbatore", district: "Tirupur", state: "Tamil Nadu" },
  { centerName: "AIOB, Coimbatore", district: "Kozhikode", state: "Kerala" },
  { centerName: "AIOB, Coimbatore", district: "Erode", state: "Tamil Nadu" },

  // RAEB ,Tirunelveli Destinations
  { centerName: "RAEB ,Tirunelveli", district: "Tirunelveli", state: "Tamil Nadu" },
  { centerName: "RAEB ,Tirunelveli", district: "Tuticorin", state: "Tamil Nadu" },
  { centerName: "RAEB ,Tirunelveli", district: "Kaniyakumari", state: "Tamil Nadu" },

  // AEB Chennai Destinations
  { centerName: "AEB Chennai", district: "Chennai", state: "Tamil Nadu" },
  { centerName: "AEB Chennai", district: "Chengalpattu", state: "Tamil Nadu" },
  { centerName: "AEB Chennai", district: "Vellore", state: "Tamil Nadu" },

  // AEBAP,Pondicherry Destinations
  { centerName: "AEBAP,Pondicherry", district: "Puducherry", state: "Pondicherry" },

  // AEH, Salem Destinations
  { centerName: "AEH, Salem", district: "Salem", state: "Tamil Nadu" },

  // AEH ,Tirupathi Destinations
  { centerName: "AEH ,Tirupathi", district: "Thirupathi", state: "Andhra Pradesh" },
];

// Transposed from Image 4: Aravind Integrated Eye Bank Services (AIEBS) 10-Year Collection & Utilization
export const AIEBS_YEARLY_METRICS: EyeBankYearlyMetric[] = [
  { sNo: 1, year: "Apr 16 to Mar 17", collection: 5356, utilization: 2792 },
  { sNo: 2, year: "Apr 17 to Mar 18", collection: 5886, utilization: 2512 },
  { sNo: 3, year: "Apr 18 to Mar 19", collection: 5630, utilization: 2536 },
  { sNo: 4, year: "Apr 19 to Mar 20", collection: 5752, utilization: 2475 },
  { sNo: 5, year: "Apr 20 to Mar 21", collection: 1364, utilization: 939 },
  { sNo: 6, year: "Apr 21 to Mar 22", collection: 3049, utilization: 1757 },
  { sNo: 7, year: "Apr 22 to Mar 23", collection: 5023, utilization: 2418 },
  { sNo: 8, year: "Apr 23 to Mar 24", collection: 6115, utilization: 2655 },
  { sNo: 9, year: "Apr 24 to Mar 25", collection: 6816, utilization: 2666 },
  { sNo: 10, year: "Apr 25 to Mar 26", collection: 6897, utilization: 2670 },
];
