"use client";

import React, { useRef } from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Compass, Play, Sparkles, Globe } from "lucide-react";

export function ArrivalScene() {
  const { goToDimensions, startGuidedJourney } = useScene();
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.4"
        )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          actionsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-gradient-to-b from-[#F7F8F6] via-[#EEF0EC]/80 to-[#E7EEF2] flex flex-col items-center justify-center p-8 z-20 text-slate-900 select-none overflow-hidden"
    >
      {/* Background Decorative Graphic Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />

      {/* Main Content Container */}
      <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 relative z-10">
        {/* Golden Jubilee Exhibition Emblem */}
        <div
          ref={badgeRef}
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 shadow-md border border-amber-200/80 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-800">
            Aravind Eye Care System · Golden Jubilee (1976 – 2026)
          </span>
        </div>

        {/* Eye Movement Visual Animation for Eye Care Organisation */}
        <div className="relative flex items-center justify-center my-2">
          <svg
            className="w-20 h-12 text-[#0D282E]"
            viewBox="0 0 64 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Eye Contour */}
            <path
              d="M2 18C2 18 12 4 32 4C52 4 62 18 62 18C62 18 52 32 32 32C12 32 2 18 2 18Z"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-800"
            />
            {/* Animated Iris & Pupil Looking Around */}
            <g className="animate-eye-scan">
              <circle cx="32" cy="18" r="8.5" fill="#0D282E" />
              <circle cx="32" cy="18" r="4" fill="#0284C7" />
              <circle cx="33.5" cy="16.5" r="1.3" fill="#FFFFFF" />
            </g>
          </svg>
          <style jsx>{`
            @keyframes eyeScan {
              0%, 100% { transform: translateX(0px); }
              25% { transform: translateX(-6px); }
              50% { transform: translateX(0px); }
              75% { transform: translateX(6px); }
            }
            .animate-eye-scan {
              animation: eyeScan 3.5s ease-in-out infinite;
            }
          `}</style>
        </div>

        {/* Exhibition Main Title */}
        <div className="space-y-3">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-none"
          >
            ARAVIND 50
            <span className="block mt-2 text-4xl md:text-5xl font-light text-slate-600 tracking-wide">
              IMPACT ATLAS
            </span>
          </h1>

          <p
            ref={taglineRef}
            className="text-2xl md:text-3xl font-medium text-amber-800/90 tracking-wide font-serif italic"
          >
            One system. A world of impact.
          </p>
        </div>

        {/* Narrative Teaser Statement */}
        <p className="max-w-2xl text-base text-slate-600 leading-relaxed font-normal">
          Explore five decades of transforming global eye care across clinical services, healthcare leadership training, scientific research, affordable access, digital health, and sight restoration.
        </p>

        {/* Large Touchscreen CTA Buttons (Identical 256px x 80px dimensions) */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center gap-5 pt-4 w-full max-w-xl justify-center"
        >
          <button
            onClick={goToDimensions}
            className="w-64 h-20 flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-base shadow-xl hover:shadow-2xl transition-all active:scale-95 border border-slate-800 text-center leading-tight shrink-0"
          >
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <span>EXPLORE THE IMPACT</span>
          </button>

          <button
            onClick={startGuidedJourney}
            className="w-64 h-20 flex items-center justify-center gap-3 bg-white hover:bg-amber-50 text-slate-900 rounded-2xl font-bold text-base shadow-lg hover:shadow-xl transition-all active:scale-95 border border-slate-200 text-center leading-tight shrink-0"
          >
            <Play className="w-5 h-5 text-amber-600 fill-amber-600 shrink-0" />
            <span>START GUIDED TOUR</span>
          </button>
        </div>

        {/* Starting Page Bottom Institutional Logos (LAICO stacked on top of ARAVIND EYE CARE SYSTEM) */}
        <div className="pt-6 flex flex-col items-center justify-center space-y-3">
          {/* Top Logo: LAICO */}
          <div className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105">
            <img
              src="/images/laico-logo.png"
              alt="Lions Aravind Institute of Community Ophthalmology (LAICO)"
              className="h-14 md:h-16 object-contain"
            />
          </div>

          {/* Bottom Logo: ARAVIND EYE CARE SYSTEM */}
          <div className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-2xl shadow-sm border border-slate-200/80 flex items-center justify-center transition-transform hover:scale-105">
            <img
              src="/images/aravind-logo.png"
              alt="Aravind Eye Care System"
              className="h-9 md:h-10 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
