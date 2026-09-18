"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { CENTRAL_IMPACT_CONFIGS } from "@/config/impact-config";
import { EntityId } from "@/types/entity";
import { Touchpad, Sparkles, Globe2, Compass, Layers } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ATTRACT_ENTITIES: EntityId[] = [
  "hospitals",
  "laico",
  "amrf",
  "aurolab",
  "auroitech",
  "eyebank",
];

export function AttractOverlay() {
  const { wakeFromAttract, setAttractStep } = useScene();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Total steps in sequence: 0..9 (0: Title, 1: Atlas, 2..7: 6 Entities, 8: One System, 9: Touch Invitation)
  const TOTAL_STEPS = 10;

  // Advance attract sequence step every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const nextStep = (prev + 1) % TOTAL_STEPS;
        let impactId: EntityId | undefined;
        if (nextStep >= 2 && nextStep <= 7) {
          impactId = ATTRACT_ENTITIES[nextStep - 2];
        }
        setAttractStep(nextStep, impactId);
        return nextStep;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [setAttractStep]);

  // Restrained GSAP transition when step changes
  useGSAP(
    () => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 12, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power2.out" }
        );
      }
    },
    { dependencies: [currentStep], scope: containerRef }
  );

  // Active Story if step corresponds to an entity (steps 2..7)
  const activeEntity = currentStep >= 2 && currentStep <= 7 ? ATTRACT_ENTITIES[currentStep - 2] : null;
  const activeConfig = activeEntity ? CENTRAL_IMPACT_CONFIGS[activeEntity] : null;

  return (
    <div
      ref={containerRef}
      onClick={wakeFromAttract}
      className="absolute inset-0 bg-transparent flex flex-col justify-between p-8 md:p-12 z-50 cursor-pointer select-none overflow-hidden"
    >
      {/* Top Light Institutional Header */}
      <div className="flex items-center justify-between w-full z-10">
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-black uppercase tracking-widest border border-amber-200/80 shadow-md backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Aravind Eye Care System · Golden Jubilee (1976 – 2026)</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 text-slate-700 text-xs font-bold uppercase tracking-wider border border-slate-200 shadow-sm backdrop-blur-md">
          <Globe2 className="w-3.5 h-3.5 text-slate-500" />
          <span>Exhibition Attract Mode</span>
        </div>
      </div>

      {/* Center Floating Institutional Reveal Card */}
      <div className="flex-1 flex items-center justify-center my-auto z-10 pointer-events-none">
        <div
          ref={cardRef}
          className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-200/80 max-w-3xl w-full text-center space-y-6"
        >
          {/* Step 0: Title Statement */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-100 text-amber-800 border border-amber-200">
                50 YEARS OF IMPACT
              </span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
                ARAVIND 50
              </h1>
              <p className="text-2xl md:text-3xl font-medium text-amber-800/90 font-serif italic">
                One system. A world of impact.
              </p>
              <p className="text-sm text-slate-600 max-w-xl mx-auto pt-2">
                Discover five decades of transforming global eye care across clinical services, capacity building, research, access, technology, and sight restoration.
              </p>
            </div>
          )}

          {/* Step 1: Atlas Statement */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-sky-100 text-sky-800 border border-sky-200">
                EXHIBITION INSTALLATION
              </span>
              <h2 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-none">
                IMPACT ATLAS
              </h2>
              <p className="text-2xl md:text-3xl font-medium text-slate-600 font-serif italic">
                Quiet geography. Visible impact.
              </p>
              <p className="text-sm text-slate-600 max-w-xl mx-auto pt-2">
                The map is the canvas. The data is the evidence. The interaction is the story.
              </p>
            </div>
          )}

          {/* Steps 2..7: 6 Impact Entity Previews */}
          {activeConfig && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2">
                <span
                  className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-xs"
                  style={{ backgroundColor: activeConfig.accent }}
                >
                  {activeConfig.label}
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                “{activeConfig.question}”
              </h2>

              <p className="text-lg md:text-xl font-medium text-slate-700 font-serif italic max-w-2xl mx-auto">
                {activeConfig.tagline}
              </p>


            </div>
          )}

          {/* Step 8: Master Ecosystem View */}
          {currentStep === 8 && (
            <div className="space-y-4">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-amber-500 text-slate-950 font-black">
                MASTER ECOSYSTEM VIEW
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                ONE SYSTEM
              </h2>
              <p className="text-xl font-medium text-amber-800 font-serif italic max-w-2xl mx-auto">
                Six connected dimensions working as one integrated healthcare network.
              </p>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                Care · Capacity Building · Research · Access · Technology · Vision Restoration
              </p>
            </div>
          )}

          {/* Step 9: Final Invitation */}
          {currentStep === 9 && (
            <div className="space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-slate-900 text-white">
                TOUCH TO EXPLORE
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                ARAVIND 50 — IMPACT ATLAS
              </h2>
              <p className="text-2xl font-medium text-amber-800 font-serif italic">
                One system. A world of impact.
              </p>
              <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-amber-500 text-slate-950 font-black text-sm shadow-md">
                <Touchpad className="w-5 h-5" />
                <span>TOUCH ANYWHERE TO START EXPLORING</span>
              </div>
            </div>
          )}

          {/* Progress Dots Indicator */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {Array.from({ length: TOTAL_STEPS }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep ? "w-8 bg-amber-600" : "w-2 bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Quiet Touch Invitation Banner */}
      <div className="flex flex-col items-center text-center space-y-2 z-10">
        <div className="flex items-center gap-3 px-8 py-3.5 bg-slate-900 text-white rounded-full text-sm font-extrabold tracking-wider shadow-xl border border-slate-800 backdrop-blur-md">
          <Touchpad className="w-5 h-5 text-amber-400" />
          <span>TOUCH ANYWHERE TO EXPLORE THE IMPACT ATLAS</span>
        </div>

        <p className="text-[11px] text-slate-600 font-semibold tracking-wide uppercase">
          Interactive Installation · Touch anywhere to enter
        </p>
      </div>
    </div>
  );
}
