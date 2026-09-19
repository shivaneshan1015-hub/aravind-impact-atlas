"use client";

import React, { useState } from "react";
import { EntityId } from "@/types/entity";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { Compass, ChevronRight, ChevronLeft, MapPin, Sparkles } from "lucide-react";

interface FollowImpactStep {
  stepNumber: string;
  title: string;
  geographyLabel: string;
  detail: string;
  coordinates?: [number, number]; // [lng, lat]
}

const FOLLOW_IMPACT_STEPS: Record<EntityId, FollowImpactStep[]> = {
  hospitals: [
    {
      stepNumber: "01",
      title: "Origin Hospital",
      geographyLabel: "Madurai, Tamil Nadu",
      detail: "11-bed clinic established by Dr. V. Govindappa in 1976",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "02",
      title: "Tertiary Network",
      geographyLabel: "South India Hubs",
      detail: "14 Main Hospitals across Tamil Nadu & Pondicherry",
      coordinates: [76.9558, 11.0168],
    },
    {
      stepNumber: "03",
      title: "Primary Vision Centers",
      geographyLabel: "Rural Periphery",
      detail: "120 Vision Centers bringing primary care to remote villages",
      coordinates: [77.7567, 8.7139],
    },
    {
      stepNumber: "04",
      title: "Patient Scale",
      geographyLabel: "Systemwide Reach",
      detail: "4,500,000+ annual patient consultations & 550,000+ surgeries",
      coordinates: [78.9629, 20.5937],
    },
  ],
  laico: [
    {
      stepNumber: "01",
      title: "Knowledge Origin",
      geographyLabel: "LAICO Institute, Madurai",
      detail: "Established in 1992 to share Aravind operational model globally",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "02",
      title: "Trainee Leadership",
      geographyLabel: "104 Countries",
      detail: "3,000+ hospital administrators & eye-care leaders trained",
      coordinates: [77.5946, 12.9716],
    },
    {
      stepNumber: "03",
      title: "Mentored Institutions",
      geographyLabel: "350+ Partner Hospitals",
      detail: "Capacity building partnerships across Nepal, Kenya, Vietnam, etc.",
      coordinates: [83.4542, 27.5055],
    },
    {
      stepNumber: "04",
      title: "Surgical Impact",
      geographyLabel: "Global Eye Ecosystem",
      detail: "1.2 Million additional cataract surgeries performed annually by partners",
      coordinates: [36.6622, -1.2467],
    },
  ],
  amrf: [
    {
      stepNumber: "01",
      title: "Research Hub",
      geographyLabel: "AMRF Laboratories, Madurai",
      detail: "Translational research into ocular genetics, stem cells, and microbiology",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "02",
      title: "Global Collaborations",
      geographyLabel: "Baltimore, London, Singapore",
      detail: "Joint studies with Johns Hopkins, UCL, and Singapore Eye Research Institute",
      coordinates: [-76.6122, 39.2904],
    },
    {
      stepNumber: "03",
      title: "Scholar Constellation",
      geographyLabel: "Academic Network",
      detail: "45+ Ph.D. scholars & 650+ peer-reviewed scientific publications",
      coordinates: [-0.1278, 51.5074],
    },
  ],
  aurolab: [
    {
      stepNumber: "01",
      title: "Manufacturing Division",
      geographyLabel: "Aurolab Plant, Madurai",
      detail: "High-quality IOL manufacturing established to eliminate cost barriers",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "02",
      title: "Cost Revolution",
      geographyLabel: "Global Healthcare Access",
      detail: "Reduced intraocular lens cost from $100 to under $10 (90% reduction)",
      coordinates: [77.209, 28.6139],
    },
    {
      stepNumber: "03",
      title: "Worldwide Export",
      geographyLabel: "160+ Nations",
      detail: "35,000,000+ intraocular lenses distributed globally (Aggregate reach)",
      coordinates: [-46.6333, -23.5505],
    },
  ],
  auroitech: [
    {
      stepNumber: "01",
      title: "Digital Health Division",
      geographyLabel: "Auroitech Software Hub",
      detail: "Development of EMR, AI diagnostics, and tele-ophthalmology tools",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "02",
      title: "Digital Products",
      geographyLabel: "Product Ecosystem",
      detail: "AuroEMR, VisionScreen AI, and Telemedicine Suite",
      coordinates: [77.5946, 12.9716],
    },
    {
      stepNumber: "03",
      title: "Remote Diagnostics",
      geographyLabel: "105 Rural Centers",
      detail: "12,000,000+ EyeNotes consultations & digital medical records",
      coordinates: [72.8777, 19.0760],
    },
  ],
  eyebank: [
    {
      stepNumber: "01",
      title: "Tissue Collection",
      geographyLabel: "18 Retrieval Facilities",
      detail: "Rotary Aravind International Eye Bank donor collection network",
      coordinates: [77.7567, 8.7139],
    },
    {
      stepNumber: "02",
      title: "Processing Laboratory",
      geographyLabel: "Madurai Central Hub",
      detail: "Evaluation, preservation, and quality testing of corneal tissue",
      coordinates: [78.1198, 9.9252],
    },
    {
      stepNumber: "03",
      title: "Sight Restoration",
      geographyLabel: "Recipient Network",
      detail: "4,500+ corneas collected & 2,800+ corneal transplants annually",
      coordinates: [76.2673, 9.9312],
    },
  ],
  all: [
    {
      stepNumber: "01",
      title: "One Integrated System",
      geographyLabel: "Golden Jubilee Ecosystem",
      detail: "6 Interconnected Entity Dimensions working as one unified system",
      coordinates: [78.9629, 20.5937],
    },
  ],
  staffs: [
    {
      stepNumber: "01",
      title: "Workforce Footprint",
      geographyLabel: "South India Network",
      detail: "3,995 Healthcare Employees & 2,677 Trainees across administrative, medical, paramedical, and support teams",
      coordinates: [78.6569, 11.1271],
    },
  ],
};

interface FollowImpactNavProps {
  entityId: EntityId;
  onFlyToLocation?: (coordinates: [number, number]) => void;
}

export function FollowImpactNav({ entityId, onFlyToLocation }: FollowImpactNavProps) {
  const steps = FOLLOW_IMPACT_STEPS[entityId] || FOLLOW_IMPACT_STEPS.hospitals;
  const story = IMPACT_STORIES[entityId] || IMPACT_STORIES.hospitals;
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const activeStep = steps[activeStepIndex];

  const handleNext = () => {
    const nextIdx = (activeStepIndex + 1) % steps.length;
    setActiveStepIndex(nextIdx);
    if (steps[nextIdx].coordinates && onFlyToLocation) {
      onFlyToLocation(steps[nextIdx].coordinates!);
    }
  };

  const handlePrev = () => {
    const prevIdx = (activeStepIndex - 1 + steps.length) % steps.length;
    setActiveStepIndex(prevIdx);
    if (steps[prevIdx].coordinates && onFlyToLocation) {
      onFlyToLocation(steps[prevIdx].coordinates!);
    }
  };

  return (
    <div className="absolute top-20 left-6 z-20 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-100 p-4 select-none animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-3">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-700">
            Follow the Impact
          </span>
        </div>
        <span className="text-[10px] font-black text-slate-400">
          Step {activeStepIndex + 1} of {steps.length}
        </span>
      </div>

      {/* Active Step Content */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span
            className="w-5 h-5 rounded-full text-white text-[10px] font-black flex items-center justify-center shrink-0 shadow-2xs"
            style={{ backgroundColor: story.accentColor }}
          >
            {activeStep.stepNumber}
          </span>
          <h4 className="text-sm font-black text-slate-900 leading-snug">
            {activeStep.title}
          </h4>
        </div>

        <p className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span>{activeStep.geographyLabel}</span>
        </p>

        <p className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 border border-slate-100 p-2.5 rounded-xl font-medium">
          {activeStep.detail}
        </p>
      </div>

      {/* Step Navigation Controls */}
      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
        <button
          onClick={handlePrev}
          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 text-[11px] font-bold"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>Prev</span>
        </button>

        {/* Step Indicators */}
        <div className="flex items-center gap-1">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveStepIndex(idx);
                if (steps[idx].coordinates && onFlyToLocation) {
                  onFlyToLocation(steps[idx].coordinates!);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === activeStepIndex ? "w-4 bg-slate-800" : "bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-1 text-[11px] font-bold"
        >
          <span>Next</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
