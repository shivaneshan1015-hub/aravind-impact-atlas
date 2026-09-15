import { EntityId } from "@/types/entity";
import { ImpactStoryDefinition } from "@/lib/scene-engine/types";

export const IMPACT_STORIES: Record<EntityId, ImpactStoryDefinition> = {
  hospitals: {
    entityId: "hospitals",
    doorNumber: "01",
    title: "CARE",
    shortName: "Eye Hospitals",
    question: "Where does care reach?",
    tagline: "Direct high-volume clinical eye care across South India",
    description: "Primary, secondary, and tertiary eye hospitals providing compassionate care to millions.",
    accentColor: "#2563EB", // Blue
    visualGrammar: "Hospital centroid hubs with expanding radial coverage footprints",
    primaryMetric: {
      label: "Outpatient Visits",
      value: "4,500,000+",
      unit: "annual patients",
    },
    secondaryMetrics: [
      { label: "Surgeries Performed", value: "550,000+" },
      { label: "Free/Subsidized Care", value: "50%" },
      { label: "Hospital Centers", value: "14 Main + 100+ Vision Centers" },
    ],
    storyNarrative: "Starting from a 11-bed clinic in 1976, Aravind now operates an integrated healthcare network treating millions regardless of ability to pay.",
  },
  laico: {
    entityId: "laico",
    doorNumber: "02",
    title: "CAPACITY BUILDING",
    shortName: "LAICO",
    question: "Where does eye-care knowledge travel?",
    tagline: "Global consultancy and healthcare leadership training",
    description: "Lions Aravind Institute for Community Ophthalmology trains leaders and mentors partner hospitals worldwide.",
    accentColor: "#0D9488", // Teal
    visualGrammar: "Knowledge flow vectors emanating from LAICO (Madurai) across global partner hospitals",
    primaryMetric: {
      label: "Mentored Hospitals",
      value: "350+",
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
    entityId: "amrf",
    doorNumber: "03",
    title: "RESEARCH",
    shortName: "AMRF",
    question: "Where does Aravind's research connect?",
    tagline: "Translational scientific research into ocular diseases",
    description: "Aravind Medical Research Foundation conducts basic and translational studies in genomics, stem cells, and microbiology.",
    accentColor: "#7C3AED", // Purple
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
    entityId: "aurolab",
    doorNumber: "04",
    title: "ACCESS",
    shortName: "Aurolab",
    question: "How far does affordable eye-care access travel?",
    tagline: "High-quality, low-cost intraocular lenses and ophthalmic supplies",
    description: "Manufacturing intraocular lenses and pharmaceuticals exported to over 160 countries.",
    accentColor: "#EA580C", // Orange
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
    entityId: "auroitech",
    doorNumber: "05",
    title: "TECHNOLOGY",
    shortName: "Auroitech",
    question: "Where does technology extend eye care?",
    tagline: "Digital health software and AI vision screening tools",
    description: "Developing electronic medical records (AuroEMR), AI diagnostic tools (VisionScreen AI), and telemedicine platforms.",
    accentColor: "#0284C7", // Sky Blue
    visualGrammar: "Dynamic product layer filters (AuroEMR, VisionScreen AI, Telemedicine) with software pulse points",
    primaryMetric: {
      label: "EyeNotes Consultations",
      value: "12,000,000+",
      unit: "digital records",
    },
    secondaryMetrics: [
      { label: "AuroEMR Centers", value: "120+" },
      { label: "AI Screenings", value: "500,000+" },
      { label: "Telemedicine Vision Centers", value: "105" },
    ],
    storyNarrative: "Auroitech leverages EMR, AI, and telemedicine to reach remote rural populations through digital diagnostics.",
  },
  eyebank: {
    entityId: "eyebank",
    doorNumber: "06",
    title: "VISION RESTORATION",
    shortName: "Eye Bank",
    question: "How does a network help restore sight?",
    tagline: "Rotary Aravind International Eye Bank & corneal transplant network",
    description: "Corneal tissue collection, evaluation, processing, and distribution for sight-restoring transplants.",
    accentColor: "#16A34A", // Green
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
  all: {
    entityId: "all",
    doorNumber: "★",
    title: "ONE SYSTEM",
    shortName: "All Impact",
    question: "How does one system create a world of impact?",
    tagline: "Combined Aravind Golden Jubilee Ecosystem",
    description: "Integrating Care, Capacity Building, Research, Access, Technology, and Vision Restoration into one unified impact model.",
    accentColor: "#D97706", // Amber Gold
    visualGrammar: "Unified multi-layer emergence showcasing the 6 connected dimensions",
    primaryMetric: {
      label: "Total Patient Touchpoints",
      value: "75,000,000+",
      unit: "since 1976",
    },
    secondaryMetrics: [
      { label: "Active Countries", value: "160+" },
      { label: "Entities Integrated", value: "6 Core Entities" },
      { label: "Golden Jubilee Year", value: "1976 – 2026" },
    ],
    storyNarrative: "One system. Six connected dimensions. A world of impact eliminating needless blindness.",
  },
};
