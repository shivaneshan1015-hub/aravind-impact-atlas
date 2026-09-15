import { EntityConfig, EntityId } from "@/types/entity";

export const INDIA_CENTER: [number, number] = [78.9629, 20.5937]; // [lng, lat]
export const INDIA_DEFAULT_ZOOM = 4.8;

export const ENTITY_CONFIGS: Record<EntityId, EntityConfig> = {
  all: {
    id: "all",
    name: "All Impact View",
    shortName: "All Impact",
    tagline: "System-wide Footprint",
    description:
      "Comprehensive visualization of Aravind Eye Care System's global presence across healthcare, research, manufacturing, capacity building, and technology.",
    color: "#D97706", // Gold
    colorLight: "#FBBF24",
    bgGlow: "rgba(217, 119, 6, 0.15)",
    subcategories: [
      {
        id: "all_locations",
        name: "All Entities Overview",
        tagline: "Combined geographic presence",
        defaultScope: "country",
        primaryMetricKey: "totalEntities",
        secondaryMetricKeys: ["locationsCount", "countriesCount"],
        legendTitle: "Entity Types",
      },
    ],
    metrics: [
      { id: "totalLocations", label: "Global Locations" },
      { id: "entitiesCount", label: "Entities Represented" },
      { id: "statesCount", label: "Indian States" },
      { id: "countriesCount", label: "Countries Served" },
    ],
    defaultCenter: INDIA_CENTER,
    defaultZoom: INDIA_DEFAULT_ZOOM,
  },
  hospitals: {
    id: "hospitals",
    name: "Aravind Eye Hospitals",
    shortName: "Eye Hospitals",
    tagline: "Care",
    description:
      "Network of tertiary, secondary, outpatient eye care hospitals and vision centres providing high-quality, compassionate eye care.",
    color: "#2563EB", // Deep Blue
    colorLight: "#60A5FA",
    bgGlow: "rgba(37, 99, 235, 0.15)",
    subcategories: [
      {
        id: "hospitals_network",
        name: "Hospitals",
        tagline: "Tertiary, secondary & vision centres",
        defaultScope: "state",
        primaryMetricKey: "hospitalsCount",
        secondaryMetricKeys: ["bedsCount", "visionCentres"],
        legendTitle: "Hospital Facilities",
      },
      {
        id: "patient_volume",
        name: "Patient Volume",
        tagline: "Outpatient & surgical care reach",
        defaultScope: "state",
        primaryMetricKey: "annualOutpatients",
        secondaryMetricKeys: ["surgeriesCount", "freeCarePercent"],
        legendTitle: "Patient Density",
      },
      {
        id: "employees",
        name: "Employees",
        tagline: "Ophthalmologists, MLOPs & staff",
        defaultScope: "state",
        primaryMetricKey: "staffCount",
        secondaryMetricKeys: ["doctorsCount", "mlopCount"],
        legendTitle: "Workforce Strength",
      },
    ],
    metrics: [
      { id: "hospitalsCount", label: "Eye Care Centres" },
      { id: "bedsCount", label: "Hospital Beds" },
      { id: "annualOutpatients", label: "Annual Outpatients" },
      { id: "surgeriesCount", label: "Surgeries Performed" },
    ],
    defaultCenter: [78.1198, 9.9252], // Centered near Tamil Nadu / South India
    defaultZoom: 6.2,
  },
  laico: {
    id: "laico",
    name: "Lions Aravind Institute for Community Ophthalmology",
    shortName: "LAICO",
    tagline: "Capacity Building",
    description:
      "Global consultancy and training institute expanding high-volume, high-quality eye care through partner hospitals across 30+ nations.",
    color: "#0D9488", // Teal
    colorLight: "#2DD4BF",
    bgGlow: "rgba(13, 148, 136, 0.15)",
    subcategories: [
      {
        id: "laico_participants",
        name: "Participants",
        tagline: "Global healthcare leaders & trainees",
        defaultScope: "world",
        primaryMetricKey: "participantsCount",
        secondaryMetricKeys: ["countriesRepresented", "trainingsCount"],
        legendTitle: "Participant Count",
      },
      {
        id: "capacity_building",
        name: "Capacity Building",
        tagline: "Mentored partner hospitals worldwide",
        defaultScope: "world",
        primaryMetricKey: "partnerHospitals",
        secondaryMetricKeys: ["surgeriesMentored", "efficiencyGain"],
        legendTitle: "Partner Network",
      },
    ],
    metrics: [
      { id: "partnerHospitals", label: "Mentored Hospitals" },
      { id: "participantsCount", label: "Trained Executives" },
      { id: "countriesCount", label: "Countries Engaged" },
      { id: "coursesCount", label: "Training Programs" },
    ],
    defaultCenter: [78.9629, 20.5937],
    defaultZoom: 4.5,
  },
  amrf: {
    id: "amrf",
    name: "Aravind Medical Research Foundation",
    shortName: "AMRF",
    tagline: "Research",
    description:
      "Premieres basic research in ocular science, molecular genetics, proteomics, stem cells, and clinical research.",
    color: "#7C3AED", // Purple
    colorLight: "#A78BFA",
    bgGlow: "rgba(124, 58, 237, 0.15)",
    subcategories: [
      {
        id: "phd_completed",
        name: "Ph.D. Completed",
        tagline: "Alumni doctoral scholars & publications",
        defaultScope: "state",
        primaryMetricKey: "phdCount",
        secondaryMetricKeys: ["publications", "citations"],
        legendTitle: "Ph.D. Scholars",
      },
      {
        id: "ongoing_phd",
        name: "Ongoing Ph.D.",
        tagline: "Active doctoral research projects",
        defaultScope: "state",
        primaryMetricKey: "activeScholars",
        secondaryMetricKeys: ["researchAreas", "grantsCount"],
        legendTitle: "Active Scholars",
      },
      {
        id: "collaborators",
        name: "Collaborators",
        tagline: "Global academic & institutional partners",
        defaultScope: "world",
        primaryMetricKey: "collaborationsCount",
        secondaryMetricKeys: ["jointPapers", "activeGrants"],
        legendTitle: "Research Partners",
      },
    ],
    metrics: [
      { id: "phdCompletedCount", label: "Ph.D. Graduates" },
      { id: "ongoingPhdCount", label: "Current Scholars" },
      { id: "publicationsCount", label: "Peer-Reviewed Papers" },
      { id: "globalPartnersCount", label: "Global Research Partners" },
    ],
    defaultCenter: [78.1198, 9.9252],
    defaultZoom: 6.0,
  },
  aurolab: {
    id: "aurolab",
    name: "Aurolab",
    shortName: "Aurolab",
    tagline: "Access",
    description:
      "Manufacturing division producing high-quality intraocular lenses, suture materials, pharmaceutical eye drops, and surgical equipment for worldwide blindness prevention.",
    color: "#EA580C", // Warm Orange
    colorLight: "#FB923C",
    bgGlow: "rgba(234, 88, 12, 0.15)",
    subcategories: [
      {
        id: "national_dealers",
        name: "National Dealers",
        tagline: "Distribution network across Indian states",
        defaultScope: "state",
        primaryMetricKey: "dealersCount",
        secondaryMetricKeys: ["productsDistributed", "citiesCovered"],
        legendTitle: "Dealer Count by State",
      },
      {
        id: "international_dealers",
        name: "International Dealers",
        tagline: "Export distribution across 160+ countries",
        defaultScope: "world",
        primaryMetricKey: "exportCountries",
        secondaryMetricKeys: ["globalDealers", "iolsExported"],
        legendTitle: "Global Distribution",
      },
    ],
    metrics: [
      { id: "nationalDealersCount", label: "National Dealers" },
      { id: "exportCountriesCount", label: "Export Nations" },
      { id: "iolsProduced", label: "IOLs Distributed" },
      { id: "productsCount", label: "Ophthalmic Products" },
    ],
    defaultCenter: INDIA_CENTER,
    defaultZoom: 4.8,
  },
  auroitech: {
    id: "auroitech",
    name: "Auroitech",
    shortName: "Auroitech",
    tagline: "Technology",
    description:
      "Technology arm innovating digital health solutions, telemedicine platforms, vision screening AI, and hospital management software.",
    color: "#0284C7", // Cyan/Blue
    colorLight: "#38BDF8",
    bgGlow: "rgba(2, 132, 199, 0.15)",
    subcategories: [
      {
        id: "tech_products",
        name: "Products",
        tagline: "Digital health & hospital software platforms",
        defaultScope: "state",
        primaryMetricKey: "deploymentsCount",
        secondaryMetricKeys: ["activeUsers", "telemedicineConsults"],
        legendTitle: "Product Deployments",
      },
      {
        id: "tech_clients",
        name: "Clients",
        tagline: "Hospitals & clinics utilizing Auroitech tech",
        defaultScope: "state",
        primaryMetricKey: "clientInstitutions",
        secondaryMetricKeys: ["recordsManaged", "uptimePercent"],
        legendTitle: "Client Institutions",
      },
      {
        id: "tech_patients",
        name: "Patients",
        tagline: "Patients screened & managed via digital platforms",
        defaultScope: "state",
        primaryMetricKey: "patientsScreened",
        secondaryMetricKeys: ["teleConsultations", "aiDiagnosticScreenings"],
        legendTitle: "Digital Reach",
      },
    ],
    metrics: [
      { id: "clientInstitutionsCount", label: "Client Hospitals" },
      { id: "digitalPatientsCount", label: "Patients Screened" },
      { id: "productsDeployedCount", label: "Software Solutions" },
      { id: "teleconsultsCount", label: "Telemedicine Consults" },
    ],
    defaultCenter: INDIA_CENTER,
    defaultZoom: 5.0,
  },
  eyebank: {
    id: "eyebank",
    name: "Rotary Aravind International Eye Bank",
    shortName: "Eye Bank",
    tagline: "Vision Restoration",
    description:
      "Premier eye bank network dedicated to corneal tissue retrieval, processing, evaluation, distribution, and corneal blindness eradication.",
    color: "#059669", // Emerald Green
    colorLight: "#34D399",
    bgGlow: "rgba(5, 150, 105, 0.15)",
    subcategories: [
      {
        id: "collection_network",
        name: "Collection Network",
        tagline: "Corneal tissue collection & hospital retrieval centres",
        defaultScope: "state",
        primaryMetricKey: "collectionCentres",
        secondaryMetricKeys: ["cornealPledges", "donationsCount"],
        legendTitle: "Collection Centres",
      },
      {
        id: "distribution_network",
        name: "Distribution Network",
        tagline: "Corneal tissue distribution for transplantation",
        defaultScope: "state",
        primaryMetricKey: "transplantsCount",
        secondaryMetricKeys: ["utilizationRate", "recipientHospitals"],
        legendTitle: "Tissue Distribution",
      },
    ],
    metrics: [
      { id: "collectionCentresCount", label: "Collection Centres" },
      { id: "corneasCollectedAnnual", label: "Corneas Collected/Yr" },
      { id: "transplantsAnnual", label: "Corneal Transplants/Yr" },
      { id: "pledgesCount", label: "Registered Pledges" },
    ],
    defaultCenter: [78.1198, 9.9252],
    defaultZoom: 6.0,
  },
};
