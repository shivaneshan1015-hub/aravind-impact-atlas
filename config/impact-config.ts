import { EntityId } from "@/types/entity";

export interface ImpactConfig {
  id: EntityId;
  label: string;
  entity: string;
  shortName: string;
  question: string;
  description: string;
  accent: string;
  mapMode: "markers" | "choropleth" | "network" | "clusters" | "all";
  availableMetrics: string[];
  availableGeographies: ("world" | "country" | "state" | "city")[];
  doorNumber: string;
  tagline: string;
  visualGrammar: string;
  primaryMetric: {
    label: string;
    value: string;
    unit?: string;
  };
  secondaryMetrics: Array<{
    label: string;
    value: string;
  }>;
  storyNarrative: string;
}

export const CENTRAL_IMPACT_CONFIGS: Record<EntityId, ImpactConfig> = {
  hospitals: {
    id: "hospitals",
    label: "Patient care",
    entity: "Patient care",
    shortName: "Patient care",
    question: "Where does care reach?",
    description: "Network of primary, secondary, and tertiary eye hospitals providing high-quality care to millions.",
    accent: "#2563EB",
    mapMode: "markers",
    availableMetrics: ["annualOutpatients", "surgeriesCount", "hospitalsCount", "bedsCount"],
    availableGeographies: ["country", "state", "city"],
    doorNumber: "01",
    tagline: "Direct high-volume clinical eye care across South India",
    visualGrammar: "Hospital centroid hubs with expanding radial coverage footprints",
    primaryMetric: {
      label: "Outpatient Visits",
      value: "4,500,000+",
      unit: "annual patients",
    },
    secondaryMetrics: [
      { label: "Surgeries Performed", value: "550,000+" },
      { label: "Free/Subsidized Care", value: "50%" },
      { label: "Hospital Centers", value: "24 Main + 120 Vision Centers" },
    ],
    storyNarrative: "Starting from an 11-bed clinic in 1976, Aravind now operates an integrated healthcare network treating millions regardless of ability to pay.",
  },
  laico: {
    id: "laico",
    label: "Training and capacity building",
    entity: "Training and capacity building",
    shortName: "Training and capacity building",
    question: "Where does eye-care knowledge travel?",
    description: "Global consultancy and training institute expanding eye care through 409 mentored partner hospitals.",
    accent: "#0D9488",
    mapMode: "network",
    availableMetrics: ["partnerHospitals", "participantsCount", "countriesCount", "coursesCount"],
    availableGeographies: ["world", "country"],
    doorNumber: "02",
    tagline: "Global consultancy and healthcare leadership training",
    visualGrammar: "Knowledge flow vectors emanating from LAICO (Madurai) across global partner hospitals",
    primaryMetric: {
      label: "Mentored Hospitals",
      value: "409",
      unit: "globally",
    },
    secondaryMetrics: [
      { label: "Countries Reached", value: "30+" },
      { label: "Trained Leaders", value: "3,000+" },
      { label: "Added Capacity", value: "1.2M surgeries/yr" },
    ],
    storyNarrative: "LAICO shares Aravind's operational blueprint with eye hospitals worldwide to eliminate avoidable blindness globally.",
  },
  amrf: {
    id: "amrf",
    label: "AMRF",
    entity: "Aravind Medical Research Foundation",
    shortName: "AMRF",
    question: "Where does research connect?",
    description: "Translational scientific studies in genomics, stem cells, proteomics, and ocular microbiology.",
    accent: "#7C3AED",
    mapMode: "network",
    availableMetrics: ["publicationsCount", "phdCompletedCount", "ongoingPhdCount", "globalPartnersCount"],
    availableGeographies: ["world", "country", "state"],
    doorNumber: "03",
    tagline: "Translational scientific research into ocular diseases",
    visualGrammar: "Interconnected research constellation nodes linking global scientific partners",
    primaryMetric: {
      label: "Publications",
      value: "650+",
      unit: "peer-reviewed",
    },
    secondaryMetrics: [
      { label: "PhD Scholars", value: "45+" },
      { label: "Global Collaborators", value: "25+ Universities" },
      { label: "Patents & Discoveries", value: "18" },
    ],
    storyNarrative: "AMRF bridges clinical practice with laboratory research to solve major causes of ocular disease in developing nations.",
  },
  aurolab: {
    id: "aurolab",
    label: "Aurolab",
    entity: "Aurolab",
    shortName: "Aurolab",
    question: "How far does affordable eye-care access travel?",
    description: "Manufacturing division producing high-quality intraocular lenses exported to 160+ nations.",
    accent: "#EA580C",
    mapMode: "choropleth",
    availableMetrics: ["iolsProduced", "nationalDealersCount", "exportCountriesCount", "productsCount"],
    availableGeographies: ["world", "country", "state"],
    doorNumber: "04",
    tagline: "High-quality, low-cost intraocular lenses and ophthalmic supplies",
    visualGrammar: "Global distribution heatmap & national aggregate density badges (Privacy-protected)",
    primaryMetric: {
      label: "Lenses Distributed",
      value: "35,000,000+",
      unit: "worldwide",
    },
    secondaryMetrics: [
      { label: "Countries Exported To", value: "160+" },
      { label: "Cost Reduction", value: "90%" },
      { label: "National Dealer Footprint", value: "Aggregate State Totals" },
    ],
    storyNarrative: "Aurolab reduced the cost of intraocular lenses from $100 to under $10, making cataract surgery accessible worldwide.",
  },
  auroitech: {
    id: "auroitech",
    label: "AuroiTech",
    entity: "AuroiTech",
    shortName: "AuroiTech",
    question: "Where does technology extend eye care?",
    description: "Digital health platform development including EMR (Eyenotes), AI diagnostic tools, and telemedicine.",
    accent: "#0284C7",
    mapMode: "clusters",
    availableMetrics: ["digitalPatientsCount", "clientInstitutionsCount", "productsDeployedCount", "teleconsultsCount"],
    availableGeographies: ["country", "state"],
    doorNumber: "05",
    tagline: "8970 patients are registered daily across 185 centres",
    visualGrammar: "Dynamic product layer filters (AuroEMR, VisionScreen AI, Telemedicine) with software pulse points",
    primaryMetric: {
      label: "Daily Patients Registered",
      value: "8,970",
      unit: "across 185 centres",
    },
    secondaryMetrics: [
      { label: "Eyenotes EMR Deployments", value: "185 Centres" },
      { label: "Daily Registrations", value: "8,970 Patients" },
      { label: "Telemedicine Vision Centers", value: "398" },
    ],
    storyNarrative: "AuroiTech leverages EMR, AI, and telemedicine to reach remote rural populations through digital diagnostics.",
  },
  eyebank: {
    id: "eyebank",
    label: "Eye bank",
    entity: "Rotary Aravind International Eye Bank",
    shortName: "Eye bank",
    question: "How does a network help restore sight?",
    description: "Corneal tissue retrieval, processing, evaluation, and distribution for sight-restoring transplants.",
    accent: "#059669",
    mapMode: "network",
    availableMetrics: ["corneasCollectedAnnual", "transplantsAnnual", "collectionCentresCount", "pledgesCount"],
    availableGeographies: ["country", "state"],
    doorNumber: "06",
    tagline: "Rotary Aravind International Eye Bank & corneal transplant network",
    visualGrammar: "Dual-tinted tissue collection and distribution network flow paths",
    primaryMetric: {
      label: "Corneas Collected",
      value: "4,500+",
      unit: "annually",
    },
    secondaryMetrics: [
      { label: "Corneal Transplants", value: "2,800+/yr" },
      { label: "Collection Centers", value: "18 Regions" },
      { label: "Utilization Rate", value: "72%" },
    ],
    storyNarrative: "The Eye Bank network raises community awareness, collects donor corneas, and restores vision to corneal blind patients.",
  },
  staffs: {
    id: "staffs",
    label: "Staffs directory",
    entity: "Staffs directory",
    shortName: "Staffs",
    question: "Where does our healthcare workforce come from?",
    description: "Comprehensive directory of Aravind Eye Care System workforce across healthcare facilities.",
    accent: "#1E293B",
    mapMode: "markers",
    availableMetrics: ["employeeCount", "adminCount", "doctorsCount", "aopCount", "supportCount"],
    availableGeographies: ["country", "state", "city"],
    doorNumber: "07",
    tagline: "Aravind Eye Hospital Workforce",
    visualGrammar: "State-wise staff workforce density and category distribution",
    primaryMetric: {
      label: "Total Employees",
      value: "3,995",
      unit: "workforce",
    },
    secondaryMetrics: [
      { label: "AOP Personnel", value: "2,416" },
      { label: "Admin Staff", value: "843" },
      { label: "Doctors", value: "446" },
      { label: "Support Services", value: "290" },
    ],
    storyNarrative: "Aravind's dedicated workforce of 3,995 employees delivers world-class eye care services across South India.",
  },
  all: {
    id: "all",
    label: "One system",
    entity: "Aravind Golden Jubilee Ecosystem",
    shortName: "All Impact",
    question: "How does one system create a world of impact?",
    description: "Integrating Care, Capacity Building, Research, Access, Technology, Vision Restoration, and Workforce into one unified impact model.",
    accent: "#D97706",
    mapMode: "all",
    availableMetrics: ["totalLocations", "entitiesCount", "statesCount", "countriesCount"],
    availableGeographies: ["world", "country", "state"],
    doorNumber: "★",
    tagline: "Combined Aravind Golden Jubilee Ecosystem",
    visualGrammar: "Unified multi-layer emergence showcasing the 7 connected dimensions",
    primaryMetric: {
      label: "Total Patient Touchpoints",
      value: "75,000,000+",
      unit: "since 1976",
    },
    secondaryMetrics: [
      { label: "Active Countries", value: "160+" },
      { label: "Entities Integrated", value: "7 Core Entities" },
      { label: "Golden Jubilee Year", value: "1976 – 2026" },
    ],
    storyNarrative: "One system. Seven connected dimensions. A world of impact eliminating needless blindness.",
  },
};
