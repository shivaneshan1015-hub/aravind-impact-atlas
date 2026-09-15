import { GeoLocationItem } from "@/types/geo";

export const AMRF_DATA: GeoLocationItem[] = [
  // Headquarters
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
    metrics: {
      phdCount: 78,
      publications: 650,
      activeScholars: 24,
    },
    address: "1, Anna Nagar, Madurai, Tamil Nadu 625020",
    establishedYear: 1985,
  },

  // Active PhD Scholars & Completed Scholars (Regional Universities)
  {
    id: "amrf_phd_tn",
    name: "Madurai Kamaraj University AMRF Research Wing",
    entityId: "amrf",
    subcategoryId: "phd_completed",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { phdGraduates: 52, primaryFocus: "Molecular Genetics & Proteomics" },
  },
  {
    id: "amrf_ongoing_tn",
    name: "AMRF Molecular Microbiology Lab",
    entityId: "amrf",
    subcategoryId: "ongoing_phd",
    country: "India",
    state: "Tamil Nadu",
    city: "Madurai",
    latitude: 9.9252,
    longitude: 78.1198,
    metrics: { activeScholars: 18, grantsCount: 12, patentsPending: 4 },
  },

  // Global Academic Collaborators
  {
    id: "amrf_collab_jhu",
    name: "Johns Hopkins Wilmer Eye Institute (Joint Research)",
    entityId: "amrf",
    subcategoryId: "collaborators",
    country: "United States",
    state: "Maryland",
    city: "Baltimore",
    latitude: 39.2904,
    longitude: -76.6122,
    metrics: { project: "Glaucoma Genetics & Epidemiology", papersPublished: 42 },
  },
  {
    id: "amrf_collab_ucl",
    name: "UCL Institute of Ophthalmology (Corneal Stem Cell Research)",
    entityId: "amrf",
    subcategoryId: "collaborators",
    country: "United Kingdom",
    state: "London",
    city: "London",
    latitude: 51.5074,
    longitude: -0.1278,
    metrics: { project: "Limbal Stem Cell Deficiency Therapeutics", papersPublished: 28 },
  },
];
