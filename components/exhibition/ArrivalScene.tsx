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

        {/* Large Touchscreen CTA Buttons (Min height 60px) */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center gap-5 pt-4 w-full max-w-md justify-center"
        >
          <button
            onClick={goToDimensions}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all active:scale-95 min-h-[64px] border border-slate-800"
          >
            <Compass className="w-6 h-6 text-amber-400" />
            <span>EXPLORE THE IMPACT</span>
          </button>

          <button
            onClick={startGuidedJourney}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-amber-50 text-slate-900 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all active:scale-95 border border-slate-200 min-h-[64px]"
          >
            <Play className="w-5 h-5 text-amber-600 fill-amber-600" />
            <span>START GUIDED TOUR</span>
          </button>
        </div>
      </div>

      {/* Footer Exhibition Callout */}
      <div className="absolute bottom-8 text-center text-xs text-slate-400 font-medium tracking-wider uppercase">
        Touchscreen Interactive Exhibition Installation
      </div>
    </div>
  );
}
