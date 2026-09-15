"use client";

import React, { useRef } from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Touchpad, Sparkles, Globe2 } from "lucide-react";

export function AttractOverlay() {
  const { wakeFromAttract } = useScene();
  const containerRef = useRef<HTMLDivElement>(null);
  const pulseCircleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (pulseCircleRef.current) {
        gsap.to(pulseCircleRef.current, {
          scale: 1.25,
          opacity: 0.15,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      onClick={wakeFromAttract}
      className="absolute inset-0 bg-slate-950/75 backdrop-blur-md flex flex-col items-center justify-center p-8 z-50 cursor-pointer select-none overflow-hidden"
    >
      {/* Background Animated Pulse Effect */}
      <div
        ref={pulseCircleRef}
        className="absolute w-[600px] h-[600px] rounded-full bg-amber-500/30 blur-3xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col items-center text-center space-y-8 max-w-3xl">
        {/* Emblem */}
        <div className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/10 text-amber-300 text-xs font-black uppercase tracking-widest border border-amber-400/30 backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
          <span>ARAVIND EYE CARE SYSTEM · GOLDEN JUBILEE</span>
        </div>

        {/* Big Title */}
        <div className="space-y-3">
          <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight">
            ARAVIND 50
          </h1>
          <p className="text-3xl md:text-4xl font-light text-slate-300 tracking-wide">
            IMPACT ATLAS
          </p>
          <p className="text-2xl font-serif italic text-amber-400 pt-2">
            One system. A world of impact.
          </p>
        </div>

        {/* Touch to Explore Callout */}
        <div className="pt-6">
          <div className="flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full text-xl font-extrabold shadow-2xl animate-bounce border border-amber-300/40">
            <Touchpad className="w-8 h-8" />
            <span>TOUCH ANYWHERE TO EXPLORE</span>
          </div>
        </div>

        <p className="text-sm text-slate-400 pt-4">
          Discover how Aravind transforms eye care across Care, Capacity, Research, Access, Technology, and Vision Restoration.
        </p>
      </div>
    </div>
  );
}
