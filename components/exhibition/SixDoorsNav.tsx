"use client";

import React, { useRef } from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { EntityId } from "@/types/entity";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowRight, Sparkles, Globe2, Activity, GraduationCap, Microscope, Package, Cpu, Eye } from "lucide-react";

const ICON_MAP: Record<EntityId, React.ElementType> = {
  hospitals: Activity,
  laico: GraduationCap,
  amrf: Microscope,
  aurolab: Package,
  auroitech: Cpu,
  eyebank: Eye,
  all: Globe2,
};

export function SixDoorsNav() {
  const { selectStory } = useScene();
  const containerRef = useRef<HTMLDivElement>(null);
  const doorCardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const storiesList = [
    IMPACT_STORIES.hospitals,
    IMPACT_STORIES.laico,
    IMPACT_STORIES.amrf,
    IMPACT_STORIES.aurolab,
    IMPACT_STORIES.auroitech,
    IMPACT_STORIES.eyebank,
  ];

  useGSAP(
    () => {
      if (doorCardsRef.current.length > 0) {
        gsap.fromTo(
          doorCardsRef.current.filter(Boolean),
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-[#F7F8F6]/90 backdrop-blur-md flex flex-col justify-between p-8 z-20 select-none overflow-y-auto"
    >
      {/* Top Title & Invitation */}
      <div className="text-center max-w-2xl mx-auto space-y-2 mt-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest border border-amber-200">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Six Doors Into Six Geographic Stories</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
          Select an Impact Dimension
        </h2>
        <p className="text-sm text-slate-600">
          Discover how each part of the Aravind ecosystem extends care, knowledge, research, access, technology, and sight restoration.
        </p>
      </div>

      {/* Grid of 6 Doors (Touch-first cards, min height 130px) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl w-full mx-auto my-6">
        {storiesList.map((story, idx) => {
          const Icon = ICON_MAP[story.entityId] || Activity;
          return (
            <div
              key={story.entityId}
              ref={(el) => {
                doorCardsRef.current[idx] = el;
              }}
              onClick={() => selectStory(story.entityId)}
              className="group relative bg-white/95 hover:bg-white rounded-2xl p-6 shadow-xl border border-slate-200/80 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 active:scale-98 flex flex-col justify-between min-h-[140px]"
            >
              {/* Top Accent Color Bar */}
              <div
                className="absolute top-0 left-6 right-6 h-1.5 rounded-b-full transition-all group-hover:h-2"
                style={{ backgroundColor: story.accentColor }}
              />

              {/* Card Header */}
              <div className="flex items-start justify-between gap-3 pt-2">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md font-extrabold text-sm"
                    style={{ backgroundColor: story.accentColor }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[11px] font-black tracking-widest text-slate-400 uppercase">
                      DOOR {story.doorNumber}
                    </div>
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-amber-700 transition-colors">
                      {story.title}
                    </h3>
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
              </div>

              {/* Core Visitor Question */}
              <div className="my-3">
                <p className="text-sm font-bold text-slate-800 italic font-serif group-hover:text-slate-900">
                  “{story.question}”
                </p>
                <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                  {story.tagline}
                </p>
              </div>

              {/* Card Footer Metric Highlight */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">Primary Reach</span>
                <span className="font-extrabold text-slate-900" style={{ color: story.accentColor }}>
                  {story.primaryMetric.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Special "One System" Finale Door at Bottom */}
      <div className="max-w-6xl w-full mx-auto mb-4">
        <div
          onClick={() => selectStory("all")}
          className="group relative bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white rounded-2xl p-5 shadow-2xl border border-amber-500/40 cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-98 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-200 font-extrabold">
              <Globe2 className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-amber-200">
                MASTER ECOSYSTEM VIEW
              </div>
              <h3 className="text-xl font-black text-white">
                SEE THE CONNECTION — ONE SYSTEM
              </h3>
              <p className="text-xs text-amber-100 font-medium">
                Combine all 6 dimensions onto one unified map canvas.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md group-hover:bg-amber-100 transition-colors">
            <span>SEE ALL IMPACT</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
