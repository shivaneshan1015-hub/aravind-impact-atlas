"use client";

import React from "react";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import {
  EMPLOYEE_CATEGORIES,
  TRAINEE_CATEGORIES,
  StaffGroup,
  StaffCategory,
} from "@/data/hospitals/staff-data";
import {
  PATIENT_PAY_TOTAL,
  PATIENT_FREE_TOTAL,
  PATIENT_CAMP_TOTAL,
  PATIENT_COMBINED_TOTAL,
} from "@/data/hospitals/patient-pay-data";
import {
  ChevronRight,
  Layers,
  CheckCircle2,
  Building2,
  GraduationCap,
  Microscope,
  Package,
  Cpu,
  Eye,
  Activity,
  Users,
  Award,
  Globe2,
  UserCheck,
  UserPlus,
} from "lucide-react";

import {
  VISION_CENTRE_HOSPITALS,
  VisionCentreHospitalCategory,
} from "@/data/hospitals/vision-centres-data";
import { LAICO_DATA } from "@/data/laico/laico-data";
import { EYE_BANK_CATEGORIES, EYE_BANK_DISTRIBUTION_CATEGORIES } from "@/data/eyebank/eyebank-data";

export interface SidebarPanelProps {
  entityConfig: EntityConfig;
  locations: GeoLocationItem[];
  stateAggregations: StateAggregation[];
  careTypeFilter: "all" | "tertiary" | "secondary" | "community" | "vision_centre";
  onSelectCareTypeFilter: (filter: "all" | "tertiary" | "secondary" | "community" | "vision_centre") => void;
  selectedState: string | null;
  onSelectState: (stateName: string | null) => void;
  selectedSubcategoryId?: string;
  onSelectSubcategory?: (subcategoryId: string) => void;
  selectedLocation?: GeoLocationItem | null;
  onSelectLocation?: (location: GeoLocationItem | null) => void;
  staffGroup?: StaffGroup;
  onSelectStaffGroup?: (group: StaffGroup) => void;
  staffCategory?: StaffCategory | "all";
  onSelectStaffCategory?: (cat: StaffCategory | "all") => void;
  patientFilter?: "pay" | "free" | "camp" | "all";
  onSelectPatientFilter?: (filter: "pay" | "free" | "camp" | "all") => void;
  visionCentreHubFilter?: VisionCentreHospitalCategory;
  onSelectVisionCentreHubFilter?: (hub: VisionCentreHospitalCategory) => void;
  laicoCountryFilter?: string;
  onSelectLaicoCountryFilter?: (country: string) => void;
  eyeBankCategoryFilter?: string;
  onSelectEyeBankCategoryFilter?: (category: string) => void;
}

export function SidebarPanel({
  entityConfig,
  locations,
  stateAggregations,
  careTypeFilter,
  onSelectCareTypeFilter,
  selectedState,
  onSelectState,
  selectedSubcategoryId,
  onSelectSubcategory,
  selectedLocation,
  onSelectLocation,
  staffGroup = "employees",
  onSelectStaffGroup,
  staffCategory = "all",
  onSelectStaffCategory,
  patientFilter = "all",
  onSelectPatientFilter,
  visionCentreHubFilter = "all",
  onSelectVisionCentreHubFilter,
  laicoCountryFilter = "all",
  onSelectLaicoCountryFilter,
  eyeBankCategoryFilter = "all",
  onSelectEyeBankCategoryFilter,
}: SidebarPanelProps) {
  const story = IMPACT_STORIES[entityConfig.id] || IMPACT_STORIES.hospitals;

  // Active subcategory ID with fallback
  const activeSubId = selectedSubcategoryId || entityConfig.subcategories[0]?.id || "";

  // Course list for LAICO Training Programmes
  const laicoCourses = [
    "Ophthalmic Nursing",
    "Vision Technician",
    "Hospital Administration",
    "Eye Care Management",
    "Instruments Maintenance",
    "Small Incision Cataract Surgery",
    "Refraction Techniques",
  ];

  const [activeCourse, setActiveCourse] = React.useState<string>("Ophthalmic Nursing");
  const [countrySearchQuery, setCountrySearchQuery] = React.useState<string>("");

  const laicoCountryStats = React.useMemo(() => {
    const cbItems = LAICO_DATA.filter((item) => item.subcategoryId === "capacity_building");
    const statsMap: Record<string, { country: string; districts: number; hospitals: number }> = {};
    
    let grandTotalHospitals = 0;
    let grandTotalDistricts = cbItems.length;

    cbItems.forEach((item) => {
      const country = item.country || "India";
      const hospCount = (item.metadata?.partnerCount as number) || (item.metrics?.hospitalCount as number) || 1;
      if (!statsMap[country]) {
        statsMap[country] = { country, districts: 0, hospitals: 0 };
      }
      statsMap[country].districts += 1;
      statsMap[country].hospitals += hospCount;
      grandTotalHospitals += hospCount;
    });

    const sortedList = Object.values(statsMap).sort((a, b) => b.hospitals - a.hospitals);
    return { sortedList, grandTotalHospitals, grandTotalDistricts };
  }, []);

  const filteredCountries = React.useMemo(() => {
    if (!countrySearchQuery.trim()) return laicoCountryStats.sortedList;
    const q = countrySearchQuery.toLowerCase().trim();
    return laicoCountryStats.sortedList.filter((c) => c.country.toLowerCase().includes(q));
  }, [laicoCountryStats.sortedList, countrySearchQuery]);

  return (
    <aside className="w-80 h-full bg-white border-r border-slate-200/90 flex flex-col z-20 text-slate-900 select-none overflow-y-auto shrink-0 p-5 space-y-5 shadow-sm font-sans">
      {/* Top Header Title */}
      <div>
        <span
          className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border inline-block mb-1 shadow-2xs"
          style={{
            backgroundColor: `${story.accentColor}15`,
            borderColor: `${story.accentColor}40`,
            color: story.accentColor,
          }}
        >
          {entityConfig.shortName.toUpperCase()}
        </span>
        <h1 className="text-xl font-black text-slate-900 leading-tight">
          {entityConfig.name}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {story.question}
        </p>
      </div>

      {/* Main Subcategories Section */}
      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Categories</span>
          </span>
          <span className="text-[10px] text-slate-400 font-extrabold">
            {entityConfig.subcategories.length} Sections
          </span>
        </div>

        {/* 1. CARE / HOSPITALS CATEGORY */}
        {entityConfig.id === "hospitals" && (
          <div className="space-y-3">
            {/* Primary Category 1: Hospitals */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Hospitals</span>
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  24 Centres
                </span>
              </div>

              {/* Subcategories under Hospitals */}
              <div className="space-y-1.5 pt-1">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("hospitals_tertiary");
                    onSelectCareTypeFilter("tertiary");
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    careTypeFilter === "tertiary" || activeSubId === "hospitals_tertiary"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                    Tertiary Eye Care
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded font-black">
                    8
                  </span>
                </button>

                <button
                  onClick={() => {
                    onSelectSubcategory?.("hospitals_secondary");
                    onSelectCareTypeFilter("secondary");
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    careTypeFilter === "secondary" || activeSubId === "hospitals_secondary"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-300 inline-block" />
                    Secondary Eye Care
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded font-black">
                    8
                  </span>
                </button>

                <button
                  onClick={() => {
                    onSelectSubcategory?.("hospitals_community");
                    onSelectCareTypeFilter("community");
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    careTypeFilter === "community" || activeSubId === "hospitals_community"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-400 inline-block" />
                    Community Eye Clinic
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded font-black">
                    8
                  </span>
                </button>

                <button
                  onClick={() => {
                    onSelectSubcategory?.("hospitals_vision_centres");
                    onSelectCareTypeFilter("vision_centre");
                  }}
                  className={`w-full p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all ${
                    activeSubId === "hospitals_vision_centres"
                      ? "bg-slate-900 text-white border-slate-800 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-400 inline-block" />
                    Vision Centres
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded font-black">
                    120 Centres
                  </span>
                </button>

                {/* 7 Hospital Hub Categories Selection UI */}
                {(activeSubId === "hospitals_vision_centres" || careTypeFilter === "vision_centre") && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-200/80 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400 tracking-wider px-1">
                      <span>Hospital Hub Categories</span>
                      <span>7 Base Hospitals</span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => onSelectVisionCentreHubFilter?.("all")}
                        className={`col-span-2 py-1.5 px-2.5 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                          visionCentreHubFilter === "all"
                            ? "bg-teal-700 text-white border-teal-700 shadow-xs ring-2 ring-teal-500/30"
                            : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-teal-400" />
                          <span>All 120 Vision Centres</span>
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded font-black">120</span>
                      </button>

                      {VISION_CENTRE_HOSPITALS.map((h) => {
                        const isSelected = visionCentreHubFilter === h.id;
                        return (
                          <button
                            key={h.id}
                            onClick={() => {
                              onSelectSubcategory?.("hospitals_vision_centres");
                              onSelectCareTypeFilter?.("vision_centre");
                              onSelectVisionCentreHubFilter?.(h.id);
                            }}
                            className={`py-1.5 px-2 rounded-xl text-xs font-bold border flex items-center justify-between transition-all ${
                              isSelected
                                ? "text-white shadow-xs ring-2 ring-slate-900/30"
                                : "bg-white text-slate-800 border-slate-200 hover:bg-slate-100"
                            }`}
                            style={{
                              backgroundColor: isSelected ? h.color : undefined,
                              borderColor: isSelected ? h.color : undefined,
                            }}
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/50"
                                style={{ backgroundColor: h.color }}
                              />
                              <span className="truncate">{h.name}</span>
                            </span>
                            <span className="text-[10px] opacity-90 font-black shrink-0 ml-1">
                              {h.count}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Primary Category 2: Patients */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2.5">
              <button
                onClick={() => {
                  onSelectSubcategory?.("patients");
                  onSelectPatientFilter?.("all");
                }}
                className="w-full text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <div>
                    <span className="text-xs font-black text-slate-900 uppercase tracking-wider block">Patients Reach</span>
                    <span className="text-[10px] text-amber-700 font-black block">Data Period: Jan – Dec 2025</span>
                  </div>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-900 px-2 py-0.5 rounded-full font-bold">
                  {(PATIENT_COMBINED_TOTAL / 1000000).toFixed(2)}M Total
                </span>
              </button>

              {/* Data Type Tabs: Pay (3.27M) | Free (1.25M) | Camp (188K) | All (4.71M) */}
              <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/60 rounded-xl">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("patients");
                    onSelectPatientFilter?.("pay");
                  }}
                  className={`py-1.5 px-0.5 rounded-lg text-[10px] font-extrabold flex flex-col items-center justify-center transition-all ${
                    patientFilter === "pay"
                      ? "bg-[#1E3A8A] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                  title={`${PATIENT_PAY_TOTAL.toLocaleString()} Pay Patients`}
                >
                  <span className="font-black text-[11px]">{(PATIENT_PAY_TOTAL / 1000000).toFixed(2)}M</span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-90">Pay</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("patients");
                    onSelectPatientFilter?.("free");
                  }}
                  className={`py-1.5 px-0.5 rounded-lg text-[10px] font-extrabold flex flex-col items-center justify-center transition-all ${
                    patientFilter === "free"
                      ? "bg-[#064E3B] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                  title={`${PATIENT_FREE_TOTAL.toLocaleString()} Free Patients`}
                >
                  <span className="font-black text-[11px]">{(PATIENT_FREE_TOTAL / 1000000).toFixed(2)}M</span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-90">Free</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("patients");
                    onSelectPatientFilter?.("camp");
                  }}
                  className={`py-1.5 px-0.5 rounded-lg text-[10px] font-extrabold flex flex-col items-center justify-center transition-all ${
                    patientFilter === "camp"
                      ? "bg-[#78350F] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                  title={`${PATIENT_CAMP_TOTAL.toLocaleString()} Camp Patients`}
                >
                  <span className="font-black text-[11px]">{(PATIENT_CAMP_TOTAL / 1000).toFixed(0)}K</span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-90">Camp</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("patients");
                    onSelectPatientFilter?.("all");
                  }}
                  className={`py-1.5 px-0.5 rounded-lg text-[10px] font-extrabold flex flex-col items-center justify-center transition-all ${
                    patientFilter === "all"
                      ? "bg-[#0F172A] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                  title={`${PATIENT_COMBINED_TOTAL.toLocaleString()} Total Patients`}
                >
                  <span className="font-black text-[11px]">{(PATIENT_COMBINED_TOTAL / 1000000).toFixed(2)}M</span>
                  <span className="text-[8px] uppercase tracking-tighter opacity-90">All</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STANDALONE ENTITY: STAFFS DIRECTORY */}
        {entityConfig.id === "staffs" && (
          <div className="space-y-3">
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-700" />
                    <span>Staffs directory</span>
                  </span>
                  <span className="text-[10px] text-slate-600 font-extrabold block mt-0.5">
                    Aravind Eye Hospital Workforce • <span className="font-bold underline decoration-slate-400/50">As of Sep 2026</span>
                  </span>
                </div>
                <span className="text-[10px] bg-slate-200 text-slate-900 px-2 py-0.5 rounded-full font-black">
                  {staffGroup === "employees" ? "3,995 Employees" : "2,677 Trainees"}
                </span>
              </div>

              {/* Sub-Menus: Employees | Trainees */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("employees");
                    onSelectStaffGroup?.("employees");
                    onSelectStaffCategory?.("all");
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                    staffGroup === "employees"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Employees (3,995)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("trainees");
                    onSelectStaffGroup?.("trainees");
                    onSelectStaffCategory?.("all");
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                    staffGroup === "trainees"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Trainees (2,677)</span>
                </button>
              </div>

              {/* Category Filters for Active Group */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex justify-between px-1">
                  <span>Categories ({staffGroup === "employees" ? "Employees" : "Trainees"})</span>
                  <button
                    onClick={() => onSelectStaffCategory?.("all")}
                    className={`underline text-[10px] ${staffCategory === "all" ? "text-slate-900 font-bold" : "text-slate-400"}`}
                  >
                    View All
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  {(staffGroup === "employees"
                    ? (["admin", "doctors", "aop", "support"] as StaffCategory[])
                    : (["admin", "doctors", "post_graduates", "aop", "support"] as StaffCategory[])
                  ).map((catKey) => {
                    const catMeta = (staffGroup === "employees" ? EMPLOYEE_CATEGORIES : TRAINEE_CATEGORIES)[catKey];
                    const isCatSelected = staffCategory === catKey;

                    return (
                      <button
                        key={catKey}
                        onClick={() => {
                          onSelectSubcategory?.(staffGroup === "employees" ? "employees" : "trainees");
                          onSelectStaffCategory?.(isCatSelected ? "all" : catKey);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isCatSelected
                            ? "text-white shadow-md font-black ring-2 ring-slate-900/20"
                            : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200 font-bold"
                        }`}
                        style={{
                          backgroundColor: isCatSelected ? catMeta.color : undefined,
                          borderColor: isCatSelected ? catMeta.color : undefined,
                          borderLeftColor: isCatSelected ? undefined : catMeta.color,
                          borderLeftWidth: isCatSelected ? undefined : "4px",
                        }}
                      >
                        <div className="text-[11px] font-bold truncate">{catMeta.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black">{catMeta.count.toLocaleString()}</span>
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-white/40 shrink-0"
                            style={{ backgroundColor: isCatSelected ? "#FFFFFF" : catMeta.color }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. LAICO CATEGORY */}
        {entityConfig.id === "laico" && (
          <div className="space-y-3">
            {/* Primary Category 1: Capacity Building */}
            <button
              onClick={() => onSelectSubcategory?.("capacity_building")}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "capacity_building"
                  ? "bg-[#064E3B] text-white border-[#064E3B] shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <div className="font-black">Capacity Building</div>
                  <div className="text-[10px] font-normal opacity-90">Mentored Eye Hospitals Worldwide • <span className="font-bold underline decoration-emerald-400/50">As of Sep 2026</span></div>
                </div>
              </div>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                activeSubId === "capacity_building" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-900"
              }`}>
                {laicoCountryStats.grandTotalHospitals} Hospitals
              </span>
            </button>

            {/* Country Wise Filter Panel for Capacity Building */}
            <div className="bg-emerald-950/5 border border-emerald-800/20 rounded-2xl p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Globe2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Country Wise Filter</span>
                  </span>
                  <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {laicoCountryStats.sortedList.length} Countries
                  </span>
                </div>

                {/* Country List & Counts */}
                <div className="space-y-1 max-h-56 overflow-y-auto pr-1">
                  {/* ALL Countries Option */}
                  <button
                    onClick={() => onSelectLaicoCountryFilter?.("all")}
                    className={`w-full px-2.5 py-1.5 rounded-xl border text-left text-[11px] font-extrabold transition-all flex items-center justify-between ${
                      laicoCountryFilter === "all"
                        ? "bg-[#064E3B] text-white border-[#064E3B] shadow-xs"
                        : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span>ALL Countries</span>
                    </span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                      laicoCountryFilter === "all" ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-900"
                    }`}>
                      {laicoCountryStats.grandTotalHospitals} Hosps
                    </span>
                  </button>

                  {/* List of Filtered Countries */}
                  {filteredCountries.map((c) => {
                    const isSelected = laicoCountryFilter.toLowerCase() === c.country.toLowerCase();
                    return (
                      <button
                        key={c.country}
                        onClick={() => onSelectLaicoCountryFilter?.(isSelected ? "all" : c.country.toLowerCase())}
                        className={`w-full px-2.5 py-1.5 rounded-xl border text-left text-[11px] font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#064E3B] text-white border-[#064E3B] shadow-xs ring-1 ring-emerald-900"
                            : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <span className="truncate pr-1">{c.country}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-black ${
                            isSelected ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-900"
                          }`}>
                            {c.hospitals} {c.hospitals === 1 ? 'Hosp' : 'Hosps'}
                          </span>
                          <span className="text-[9px] text-slate-400 font-semibold">
                            ({c.districts} {c.districts === 1 ? 'Dist' : 'Dists'})
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            {/* Primary Category 2: Training Programmes */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2.5">
              <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                <div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-600" />
                    <span>Training Programmes</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">As of Sep 2026</span>
                </div>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-black">
                  6 Categories
                </span>
              </div>

              {/* 6 Category Divisions with Matching Colors */}
              <div className="space-y-1.5 pt-1">
                {[
                  { id: "management_courses", name: "Management Courses", color: "#0D9488", desc: "Executive Leadership & Management", countBadge: "2,048 Alumni" },
                  { id: "long_term_trainees", name: "Long Term Fellows", color: "#3B82F6", desc: "Clinical Fellowships", countBadge: "2,167 Fellows" },
                  { id: "short_term_trainees", name: "Short Term Fellows", color: "#F59E0B", desc: "Specialized Clinical Training", countBadge: "1,759 Fellows" },
                  { id: "post_graduates", name: "Post Graduates", color: "#8B5CF6", desc: "Residency & Specialization", countBadge: "1,136 Scholars" },
                  { id: "technicians", name: "Technicians", color: "#E11D48", desc: "Ophthalmic & Instrument Techs", countBadge: "512 Techs" },
                  { id: "paramedics", name: "Paramedics", color: "#06B6D4", desc: "Mid-level Personnel & Nursing", countBadge: "505 Paramedics" },
                ].map((cat) => {
                  const isSelected = activeSubId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => onSelectSubcategory?.(cat.id)}
                      className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? "text-white shadow-md font-black ring-2 ring-slate-900/20"
                          : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200 font-bold"
                      }`}
                      style={{
                        backgroundColor: isSelected ? cat.color : undefined,
                        borderColor: isSelected ? cat.color : undefined,
                      }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/40"
                          style={{ backgroundColor: isSelected ? "#FFFFFF" : cat.color }}
                        />
                        <div className="truncate">
                          <div className="text-xs truncate">{cat.name}</div>
                          <div className="text-[9px] opacity-80 font-normal truncate">{cat.desc}</div>
                        </div>
                      </div>
                      {cat.countBadge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ml-1 ${
                          isSelected ? "bg-white/20 text-white" : "bg-amber-100 text-amber-900"
                        }`}>
                          {cat.countBadge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. AMRF CATEGORY */}
        {entityConfig.id === "amrf" && (
          <div className="space-y-3">
            {/* Primary Category 1: Doctorate */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2.5">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <div>
                  <span className="flex items-center gap-1.5">
                    <Microscope className="w-4 h-4 text-purple-600" />
                    <span>Ph.D. Doctoral Program</span>
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">As of Sep 2026</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                  54 Scholars Total
                </span>
              </div>

              {/* Status Switcher: Completed (46) vs Ongoing (8) with matching Dark Pin colors */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("phd_completed");
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activeSubId === "doctorate" || activeSubId === "phd_completed"
                      ? "bg-[#155E75] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#38BDF8] inline-block" />
                  <span>Completed (46)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("ongoing_phd");
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activeSubId === "ongoing_phd"
                      ? "bg-[#9D174D] text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-[#F472B6] inline-block" />
                  <span>Ongoing (8)</span>
                </button>
              </div>

              {/* Selected Pin Thesis Details Card (Rendered below Ongoing & Completed buttons) */}
              {selectedLocation && (selectedLocation.subcategoryId === "phd_completed" || selectedLocation.subcategoryId === "ongoing_phd" || selectedLocation.metadata?.status) && (
                <div className={`p-3 rounded-xl border text-xs space-y-2 mt-2 transition-all ${
                  selectedLocation.metadata?.status === "ongoing" || selectedLocation.subcategoryId === "ongoing_phd"
                    ? "bg-pink-50/95 border-[#9D174D]/40 text-slate-900"
                    : "bg-cyan-50/95 border-[#155E75]/40 text-slate-900"
                }`}>
                  <div className="flex items-center justify-between border-b pb-1.5 border-slate-200">
                    <div className="font-black flex items-center gap-1.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${
                        selectedLocation.metadata?.status === "ongoing" || selectedLocation.subcategoryId === "ongoing_phd"
                          ? "bg-[#9D174D]"
                          : "bg-[#155E75]"
                      }`} />
                      <span className="text-sm font-black">{selectedLocation.city || selectedLocation.name}</span>
                    </div>
                    <button
                      onClick={() => onSelectLocation?.(null)}
                      className="text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200 transition-colors"
                    >
                      × Deselect
                    </button>
                  </div>

                  <div className="text-[11px] font-extrabold flex items-center justify-between">
                    <span>
                      {(selectedLocation.metadata?.count as number) || 1} {selectedLocation.metadata?.status === "ongoing" || selectedLocation.subcategoryId === "ongoing_phd" ? "Ongoing" : "Completed"} Ph.D. {((selectedLocation.metadata?.count as number) || 1) > 1 ? "Theses" : "Thesis"}
                    </span>
                  </div>

                  <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                    {((selectedLocation.metadata?.thesesList as string[]) || [selectedLocation.metadata?.thesisTitle || selectedLocation.name]).map((thesis, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white border border-slate-200/80 text-[10.5px] leading-snug font-medium flex items-start gap-1.5 shadow-2xs">
                        <span className="font-black shrink-0" style={{
                          color: selectedLocation.metadata?.status === "ongoing" || selectedLocation.subcategoryId === "ongoing_phd" ? "#9D174D" : "#155E75"
                        }}>{idx + 1}.</span>
                        <span>{thesis}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Primary Category 2: Collaboration */}
            <button
              onClick={() => onSelectSubcategory?.("collaboratives")}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "collaboratives"
                  ? "bg-purple-800 text-white border-purple-800 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-purple-500 shrink-0" />
                <div>
                  <div className="font-black">Collaboration</div>
                  <div className="text-[10px] font-normal opacity-80">12 Global University Partners</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            {/* Primary Category 3: Students from abroad */}
            <button
              onClick={() => onSelectSubcategory?.("students_abroad")}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "students_abroad"
                  ? "bg-purple-800 text-white border-purple-800 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-purple-500 shrink-0" />
                <div>
                  <div className="font-black">Students from abroad</div>
                  <div className="text-[10px] font-normal opacity-80">6 International Research Fellows</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          </div>
        )}

        {/* 4. AUROLAB CATEGORY */}
        {entityConfig.id === "aurolab" && (
          <div className="space-y-3">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
              <span>Aurolab Distribution Network</span>
              <span className="text-amber-700 font-extrabold">As of Sep 2026</span>
            </div>
            {/* Primary Category 1: Domestic */}
            <button
              onClick={() => onSelectSubcategory?.("domestic")}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "domestic"
                  ? "bg-amber-700 text-white border-amber-700 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-black">Domestic</div>
                  <div className="text-[10px] font-normal opacity-80">42 Domestic Dealers Across India</div>
                </div>
              </div>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-black">
                42 Dealers
              </span>
            </button>

            {/* Primary Category 2: International */}
            <button
              onClick={() => onSelectSubcategory?.("international")}
              className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "international"
                  ? "bg-amber-700 text-white border-amber-700 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Globe2 className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="font-black">International</div>
                  <div className="text-[10px] font-normal opacity-80">83 Dealers across the world</div>
                </div>
              </div>
              <span className="text-[10px] bg-white/20 text-white px-2 py-0.5 rounded font-black">
                83 Dealers
              </span>
            </button>
          </div>
        )}

        {/* 5. AUROITECH CATEGORY */}
        {entityConfig.id === "auroitech" && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between mb-1">
              <span>AuroiTech Digital Health</span>
              <span className="text-sky-700 font-extrabold">As of Sep 2026</span>
            </div>
            {[
              { id: "ihms", name: "IHMS", desc: "154 Global Deployments across 12 Nations" },
              { id: "eyenotes", name: "Eyenotes", desc: "28970 patients are registered daily across 209 centres" },
              { id: "vcms", name: "VCMS", desc: "398 Vision Centres across Bangladesh, India & Nepal" },
            ].map((m) => {
              const isSelected = activeSubId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectSubcategory?.(m.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                    isSelected
                      ? "bg-sky-700 text-white border-sky-700 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-sky-500 shrink-0" />
                    <div>
                      <div className="font-black">{m.name}</div>
                      <div className="text-[10px] font-normal opacity-80">{m.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>
        )}

        {/* 6. EYE BANK CATEGORY */}
        {entityConfig.id === "eyebank" && (
          <div className="space-y-3">
            {/* Primary Subcategory Switcher: Collected vs Distributed */}
            <div className="space-y-2">
              {[
                { id: "collected", name: "Collected", desc: "7 Collection Centres" },
                { id: "distributed", name: "Distributed", desc: "National Distribution Network" },
              ].map((m) => {
                const isSelected = activeSubId === m.id || (m.id === "collected" && activeSubId === "collection_network");
                return (
                  <button
                    key={m.id}
                    onClick={() => onSelectSubcategory?.(m.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                      isSelected
                        ? "bg-emerald-800 text-white border-emerald-800 shadow-md"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Eye className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="font-black">{m.name}</div>
                        <div className="text-[10px] font-normal opacity-80">{m.desc}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-60" />
                  </button>
                );
              })}
            </div>

            {/* Eye Bank Category Filters & Banners */}
            {(activeSubId === "collected" || activeSubId === "collection_network" || activeSubId === "distributed" || activeSubId === "distribution_network" || activeSubId === "overview") && (
              <div className="space-y-3 pt-1">
                {/* 51888 Eyes Collected Banner (Shown in Collected / Overview Mode) */}
                {(activeSubId === "collected" || activeSubId === "collection_network" || activeSubId === "overview") && (
                  <div className="bg-emerald-950 text-white rounded-2xl p-3 border border-emerald-800 shadow-sm space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-emerald-300 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Total Cornea Collection</span>
                    </div>
                    <div className="text-sm font-black text-amber-300 leading-tight">
                      51,888 Eyes collected
                    </div>
                    <div className="text-[10px] text-emerald-200 font-medium">
                      Period: <span className="font-extrabold text-white">Apr 2016 – MAR 2026</span>
                    </div>
                  </div>
                )}

                {/* 23,420 Utilised Banner (Shown in Distributed Mode) */}
                {(activeSubId === "distributed" || activeSubId === "distribution_network") && (
                  <div className="bg-sky-950 text-white rounded-2xl p-3 border border-sky-800 shadow-sm space-y-1">
                    <div className="text-[10px] font-black uppercase tracking-widest text-sky-300 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-sky-400" />
                      <span>Total Cornea Utilization</span>
                    </div>
                    <div className="text-sm font-black text-amber-300 leading-tight">
                      23,420 Corneas Utilised
                    </div>
                    <div className="text-[10px] text-sky-200 font-medium">
                      Period: <span className="font-extrabold text-white">Apr 2016 to Mar 2026</span>
                    </div>
                  </div>
                )}

                {/* Category Filter (5 Centres for Distribution, 7 for Collection) */}
                {(() => {
                  const isDistributedMode = activeSubId === "distributed" || activeSubId === "distribution_network";
                  const availableCategories = isDistributedMode ? EYE_BANK_DISTRIBUTION_CATEGORIES : EYE_BANK_CATEGORIES;
                  const categoryCount = availableCategories.length;

                  return (
                    <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
                      <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{categoryCount} Centres</span>
                        </span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">
                          Filter
                        </span>
                      </div>

                      {/* ALL Categories Option */}
                      <button
                        onClick={() => onSelectEyeBankCategoryFilter?.("all")}
                        className={`w-full p-2 rounded-xl border text-left text-[11px] font-extrabold transition-all flex items-center justify-between ${
                          eyeBankCategoryFilter === "all"
                            ? "bg-slate-900 text-white border-slate-900 shadow-2xs"
                            : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <span>ALL {categoryCount} Categories</span>
                        {eyeBankCategoryFilter === "all" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </button>

                      {/* Individual Category Buttons */}
                      <div className="space-y-1">
                        {availableCategories.map((cat) => {
                          const isSelected = eyeBankCategoryFilter === cat.id;
                          const distCount = isDistributedMode
                            ? (cat.distributionDistricts?.length || 0)
                            : cat.districts.length;

                          return (
                            <button
                              key={cat.id}
                              onClick={() => onSelectEyeBankCategoryFilter?.(isSelected ? "all" : cat.id)}
                              className={`w-full p-2.5 rounded-xl border text-left text-[11px] font-bold transition-all flex items-center justify-between ${
                                isSelected
                                  ? "text-white shadow-sm ring-2 ring-slate-900"
                                  : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                              }`}
                              style={{
                                backgroundColor: isSelected ? cat.color : undefined,
                                borderColor: isSelected ? cat.color : undefined,
                              }}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-white/50 shrink-0"
                                  style={{ backgroundColor: cat.color }}
                                />
                                <span className="truncate">{cat.name}</span>
                              </div>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded-full font-extrabold ${
                                  isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"
                                }`}
                              >
                                {distCount} Dists
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
