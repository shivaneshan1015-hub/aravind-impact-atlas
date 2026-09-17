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
          {entityConfig.shortName.toUpperCase()} DOOR
        </span>
        <h1 className="text-xl font-black text-slate-900 leading-tight">
          {entityConfig.name}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-1">
          {story.question}
        </p>
      </div>

      {/* Hero Primary Metric Card */}
      <div
        className="rounded-2xl p-4 text-white shadow-md relative overflow-hidden"
        style={{ backgroundColor: "#0B252C" }}
      >
        <div
          className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-xl pointer-events-none opacity-30"
          style={{ backgroundColor: story.accentColor }}
        />
        <span className="text-[10px] font-extrabold text-teal-200 tracking-wider uppercase block">
          Primary Dimension Metric
        </span>
        <div className="text-3xl font-black text-white tracking-tight my-1" style={{ color: story.accentColor }}>
          {story.primaryMetric.value}
        </div>
        <div className="text-[11px] text-teal-100/80 font-medium">
          {story.primaryMetric.label}
        </div>
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
                      ? "bg-teal-600 text-white border-teal-600 shadow-xs"
                      : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-300 inline-block" />
                    Vision Centres
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-white/20 rounded font-black">
                    120 Centres
                  </span>
                </button>
              </div>
            </div>

            {/* Primary Category 2: Patients */}
            <button
              onClick={() => onSelectSubcategory?.("patients")}
              className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                activeSubId === "patients"
                  ? "bg-blue-900 text-white border-blue-900 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-blue-500 shrink-0" />
                <div>
                  <div className="font-black">Patients</div>
                  <div className="text-[10px] font-normal opacity-80">Outpatient & Surgical Care</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            {/* Primary Category 3: Staffs */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-3">
              <button
                onClick={() => {
                  onSelectSubcategory?.("staffs");
                  onSelectCareTypeFilter("all");
                }}
                className="w-full text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Staffs Directory</span>
                </div>
                <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full font-bold">
                  {staffGroup === "employees" ? "3,995 Employees" : "2,677 Trainees"}
                </span>
              </button>

              {/* Sub-Menus: Employees | Trainees */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("staffs");
                    onSelectCareTypeFilter("all");
                    onSelectStaffGroup?.("employees");
                    onSelectStaffCategory?.("all");
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                    staffGroup === "employees"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Employees</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("staffs");
                    onSelectCareTypeFilter("all");
                    onSelectStaffGroup?.("trainees");
                    onSelectStaffCategory?.("all");
                  }}
                  className={`py-1.5 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1 transition-all ${
                    staffGroup === "trainees"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Trainees</span>
                </button>
              </div>

              {/* Category Filters: Admin, Doctors, Post Graduates, AOP, Support Services */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex justify-between px-1">
                  <span>Categories ({staffGroup})</span>
                  <button
                    onClick={() => onSelectStaffCategory?.("all")}
                    className={`underline text-[10px] ${staffCategory === "all" ? "text-blue-600 font-bold" : "text-slate-400"}`}
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
                          onSelectSubcategory?.("staffs");
                          onSelectCareTypeFilter("all");
                          onSelectStaffCategory?.(isCatSelected ? "all" : catKey);
                        }}
                        className={`p-2 rounded-xl border text-left transition-all flex flex-col justify-between ${
                          isCatSelected
                            ? "ring-2 ring-blue-500 bg-white shadow-xs"
                            : "bg-white hover:bg-slate-100/80 border-slate-200"
                        }`}
                        style={{ borderLeftColor: catMeta.color, borderLeftWidth: "4px" }}
                      >
                        <div className="text-[11px] font-bold text-slate-800 truncate">{catMeta.name}</div>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs font-black text-slate-900">{catMeta.count.toLocaleString()}</span>
                          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catMeta.color }} />
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
                  ? "bg-teal-700 text-white border-teal-700 shadow-md"
                  : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <GraduationCap className="w-4 h-4 text-teal-500 shrink-0" />
                <div>
                  <div className="font-black">Capacity Building</div>
                  <div className="text-[10px] font-normal opacity-80">Mentored Eye Hospitals Worldwide</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>

            {/* Primary Category 2: Training Programmes */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-teal-600" />
                  <span>Training Programmes</span>
                </span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded-full font-bold">
                  {laicoCourses.length} Courses
                </span>
              </div>

              {/* Subcategories under Training Programmes: Individual Courses */}
              <div className="space-y-1 pt-1 max-h-48 overflow-y-auto pr-1">
                {laicoCourses.map((course) => {
                  const isSelected = activeCourse === course;
                  return (
                    <button
                      key={course}
                      onClick={() => {
                        setActiveCourse(course);
                        onSelectSubcategory?.("training_programmes");
                      }}
                      className={`w-full p-2 rounded-xl border text-left text-[11px] font-bold transition-all flex items-center justify-between ${
                        isSelected
                          ? "bg-teal-700 text-white border-teal-700 shadow-2xs"
                          : "bg-white hover:bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                    >
                      <span className="truncate">{course}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-teal-300 shrink-0" />}
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
                <span className="flex items-center gap-1.5">
                  <Microscope className="w-4 h-4 text-purple-600" />
                  <span>Ph.D. Doctoral Program</span>
                </span>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                  54 Scholars Total
                </span>
              </div>

              {/* Status Switcher: Completed (46) vs Ongoing (8) */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-200/60 rounded-xl">
                <button
                  onClick={() => {
                    onSelectSubcategory?.("phd_completed");
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activeSubId === "doctorate" || activeSubId === "phd_completed"
                      ? "bg-cyan-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-300 inline-block" />
                  <span>Completed (46)</span>
                </button>
                <button
                  onClick={() => {
                    onSelectSubcategory?.("ongoing_phd");
                  }}
                  className={`py-2 px-2 rounded-lg text-xs font-extrabold flex items-center justify-center gap-1.5 transition-all ${
                    activeSubId === "ongoing_phd"
                      ? "bg-pink-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-300/50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-pink-300 inline-block" />
                  <span>Ongoing (8)</span>
                </button>
              </div>
            </div>

            {/* Primary Category 2: Collaboratives */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-2">
              <button
                onClick={() => onSelectSubcategory?.("collaboratives")}
                className="w-full text-left flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-black text-slate-900 uppercase tracking-wider">Collaboratives</span>
                </div>
                <span className="text-[10px] bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
                  12 Global Partners
                </span>
              </button>

              {activeSubId === "collaboratives" && (
                <div className="space-y-1 pt-1.5 max-h-64 overflow-y-auto pr-1">
                  {[
                    { id: "amrf_collab_ulster", name: "Ulster University", country: "United Kingdom" },
                    { id: "amrf_collab_paris", name: "University of Paris", country: "France" },
                    { id: "amrf_collab_liverpool", name: "University of Liverpool", country: "United Kingdom" },
                    { id: "amrf_collab_ucl", name: "University College of London", country: "United Kingdom" },
                    { id: "amrf_collab_mcmaster", name: "McMaster University", country: "Canada" },
                    { id: "amrf_collab_iowa", name: "University of IOWA", country: "USA" },
                    { id: "amrf_collab_lshtm", name: "London School of Hygiene & Tropical Medicine", country: "United Kingdom" },
                    { id: "amrf_collab_edinburgh", name: "University of Edinburgh", country: "United Kingdom" },
                    { id: "amrf_collab_dartmouth", name: "Dartmouth Hitchcock Medical Center", country: "USA" },
                    { id: "amrf_collab_moorfields", name: "Moorfields Eye Hospital", country: "United Kingdom" },
                    { id: "amrf_collab_pasteur", name: "Institut Pasteur", country: "France" },
                    { id: "amrf_collab_ccmb", name: "CSIR-CCMB", country: "India" },
                  ].map((partner) => {
                    const loc = locations.find((l) => l.id === partner.id);
                    const isSelected = selectedLocation?.id === partner.id;
                    return (
                      <button
                        key={partner.id}
                        onClick={() => {
                          onSelectSubcategory?.("collaboratives");
                          if (loc) onSelectLocation?.(loc);
                        }}
                        className={`w-full p-2 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-purple-700 text-white border-purple-700 shadow-2xs"
                            : "bg-white hover:bg-slate-100 text-slate-800 border-slate-200"
                        }`}
                      >
                        <div className="truncate pr-1">
                          <div className="font-extrabold text-[11px] truncate">{partner.name}</div>
                          <div className={`text-[9px] font-medium ${isSelected ? "text-purple-200" : "text-slate-400"}`}>
                            {partner.country}
                          </div>
                        </div>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                          isSelected ? "bg-white/20 text-white" : "bg-purple-50 text-purple-700 border border-purple-200"
                        }`}>
                          Partner
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

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
                  <div className="text-[10px] font-normal opacity-80">International Research Fellows</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          </div>
        )}

        {/* 4. AUROLAB CATEGORY */}
        {entityConfig.id === "aurolab" && (
          <div className="space-y-3">
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
            {[
              { id: "ihms", name: "IHMS", desc: "Hospital Management System" },
              { id: "eyenotes", name: "Eyenotes", desc: "Electronic Medical Records" },
              { id: "vcms", name: "VCMS", desc: "Vision Centre Software" },
              { id: "total_patients", name: "Total Patients Registered", desc: "Digital Health Telemetry" },
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
          <div className="space-y-2">
            {[
              { id: "collected", name: "Collected", desc: "7 District Collection Hubs" },
              { id: "distributed", name: "Distributed", desc: "National Distribution Network" },
              { id: "collection_vs_utilisation", name: "Collection vs Utilisation", desc: "10-Year Trend Dataset" },
            ].map((m) => {
              const isSelected = activeSubId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => onSelectSubcategory?.(m.id)}
                  className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold text-xs transition-all ${
                    isSelected
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-md"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-emerald-500 shrink-0" />
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
      </div>
    </aside>
  );
}
