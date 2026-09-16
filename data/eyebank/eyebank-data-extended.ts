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

// Transposed from Image 2: Eye Bank Collection - District wise
export const EYE_BANK_COLLECTION_CENTRES: EyeBankCollectionCenter[] = [
  {
    centerName: "Madurai Centre",
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
    centerName: "Coimbatore Centre",
    districts: ["Coimbatore", "Tirupur", "Erode", "Dindigul"],
  },
  {
    centerName: "Tirunelveli Centre",
    districts: ["Tirunelveli", "Tuticorin", "Kaniyakumari", "Tenkasi", "Virudhunagar"],
  },
  {
    centerName: "Chennai Centre",
    districts: ["Vellore"],
  },
  {
    centerName: "Pondicherry Centre",
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
    centerName: "Salem Centre",
    districts: ["Salem", "Namakkal", "Dharmapuri", "Krishnagiri"],
  },
  {
    centerName: "Tirupathi Centre",
    districts: ["Thirupathi", "Chittoor"],
  },
];

// Transposed from Image 3: Collected Eyes Distribution across India
export const EYE_BANK_DISTRIBUTION_RECORDS: EyeBankDistributionRecord[] = [
  // Madurai Centre Destinations
  { centerName: "Madurai Centre", district: "Madurai", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Ernakulam", state: "Kerala" },
  { centerName: "Madurai Centre", district: "Bangalore", state: "Karnataka" },
  { centerName: "Madurai Centre", district: "Chennai", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Coimbatore", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Salem", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Hyderabad", state: "Telangana" },
  { centerName: "Madurai Centre", district: "Kakinada", state: "Andhra Pradesh" },
  { centerName: "Madurai Centre", district: "Mumbai", state: "Maharashtra" },
  { centerName: "Madurai Centre", district: "Haridwar", state: "Uttarakhand" },
  { centerName: "Madurai Centre", district: "Haryana Region", state: "Haryana" },
  { centerName: "Madurai Centre", district: "Delhi NCR", state: "Delhi" },
  { centerName: "Madurai Centre", district: "Kolkata", state: "West Bengal" },
  { centerName: "Madurai Centre", district: "Nagpur", state: "Maharashtra" },
  { centerName: "Madurai Centre", district: "Lucknow", state: "Uttar Pradesh" },
  { centerName: "Madurai Centre", district: "Chandigarh", state: "Chandigarh" },
  { centerName: "Madurai Centre", district: "Ahmedabad", state: "Gujarat" },
  { centerName: "Madurai Centre", district: "Varanasi", state: "Uttar Pradesh" },
  { centerName: "Madurai Centre", district: "Sivagangai", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Vellore", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Karur", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Namakkal", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Theni", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Thanjavur", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Tirunelveli", state: "Tamil Nadu" },
  { centerName: "Madurai Centre", district: "Pondicherry", state: "Pondicherry" },
  { centerName: "Madurai Centre", district: "Thrissur", state: "Kerala" },
  { centerName: "Madurai Centre", district: "Thiruvananthapuram", state: "Kerala" },
  { centerName: "Madurai Centre", district: "Tirupathi", state: "Andhra Pradesh" },
  { centerName: "Madurai Centre", district: "Palakkad", state: "Kerala" },

  // Coimbatore Centre Destinations
  { centerName: "Coimbatore Centre", district: "Coimbatore", state: "Tamil Nadu" },
  { centerName: "Coimbatore Centre", district: "Palakkad", state: "Kerala" },
  { centerName: "Coimbatore Centre", district: "Tirupur", state: "Tamil Nadu" },
  { centerName: "Coimbatore Centre", district: "Kozhikode", state: "Kerala" },
  { centerName: "Coimbatore Centre", district: "Erode", state: "Tamil Nadu" },

  // Tirunelveli Centre Destinations
  { centerName: "Tirunelveli Centre", district: "Tirunelveli", state: "Tamil Nadu" },
  { centerName: "Tirunelveli Centre", district: "Tuticorin", state: "Tamil Nadu" },
  { centerName: "Tirunelveli Centre", district: "Kaniyakumari", state: "Tamil Nadu" },

  // Chennai Centre Destinations
  { centerName: "Chennai Centre", district: "Chennai", state: "Tamil Nadu" },
  { centerName: "Chennai Centre", district: "Chengalpattu", state: "Tamil Nadu" },
  { centerName: "Chennai Centre", district: "Vellore", state: "Tamil Nadu" },

  // Pondicherry Centre Destinations
  { centerName: "Pondicherry Centre", district: "Puducherry", state: "Pondicherry" },
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
