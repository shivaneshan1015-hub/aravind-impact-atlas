"use client";

import React, { useEffect, useState, useRef } from "react";
import { useScene } from "@/lib/scene-engine/SceneContext";
import { EXHIBITION_CONFIG } from "@/config/exhibition-config";
import { IMPACT_STORIES } from "@/lib/stories/definitions";
import { EntityId } from "@/types/entity";
import { Touchpad, Sparkles, Globe2, Compass } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ATTRACT_ENTITIES: EntityId[] = EXHIBITION_CONFIG.attractMode.loopSequence;

export function AttractOverlay() {
  const { wakeFromAttract, selectStory } = useScene();
  const [attractIndex, setAttractIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const activeEntity = ATTRACT_ENTITIES[attractIndex];
  const story = IMPACT_STORIES[activeEntity] || IMPACT_STORIES.hospitals;

  // Cycle through the 6 stories in Attract Mode
  useEffect(() => {
    const timer = setInterval(() => {
      setAttractIndex((prev) => {
        const nextIdx = (prev + 1) % ATTRACT_ENTITIES.length;
        const nextEntity = ATTRACT_ENTITIES[nextIdx];
        selectStory(nextEntity);
        return nextIdx;
      });
    }, EXHIBITION_CONFIG.attractMode.storyDurationMs);

    return () => clearInterval(timer);
  }, [selectStory]);

  // Gentle GSAP fade-in transition when story changes
  useGSAP(
    () => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
    },
    { dependencies: [attractIndex], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      onClick={wakeFromAttract}
      className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col justify-between p-12 z-50 cursor-pointer select-none overflow-hidden"
    >
      {/* Top Quiet Header */}
      <div className="flex items-center justify-between w-full">
        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/95 text-slate-900 text-xs font-black uppercase tracking-widest border border-amber-300/80 shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Aravind Eye Care System · Golden Jubilee (1976 – 2026)</span>
        </div>

        <div className="flex items-center gap-2 text-white/80 text-xs font-extrabold uppercase tracking-widest">
          <Globe2 className="w-4 h-4 text-amber-400" />
          <span>Exhibition Attract Mode</span>
        </div>
      </div>

      {/* Center Story Teaser Card (Communicates the 6 Impact Stories) */}
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto my-auto space-y-6">
        <div ref={titleRef} className="space-y-4">
          <span
            className="inline-block px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-md"
            style={{ backgroundColor: story.accentColor }}
          >
            {story.doorNumber}. {story.title}
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            “{story.question}”
          </h2>

          <p className="text-xl md:text-2xl font-medium text-amber-200/90 font-serif italic max-w-2xl mx-auto">
            {story.tagline}
          </p>

          <div className="pt-2 flex items-center justify-center gap-6 text-slate-300 text-sm font-bold">
            <span className="bg-white/10 px-4 py-1.5 rounded-xl border border-white/10">
              {story.primaryMetric.label}: <strong className="text-white font-black">{story.primaryMetric.value}</strong>
            </span>
          </div>
        </div>

        {/* Story Sequence Progress Indicators */}
        <div className="flex items-center gap-2 pt-4">
          {ATTRACT_ENTITIES.map((ent, idx) => {
            const entStory = IMPACT_STORIES[ent];
            const isActive = idx === attractIndex;
            return (
              <div
                key={ent}
                className={`h-2 rounded-full transition-all duration-500 ${
                  isActive ? "w-8 bg-amber-400" : "w-2 bg-white/30"
                }`}
                title={entStory?.title}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom Prominent Invitation to Touch */}
      <div className="flex flex-col items-center text-center space-y-3">
        <div className="flex items-center gap-4 px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 rounded-2xl text-lg font-black tracking-wider shadow-2xl animate-bounce border border-amber-300/60">
          <Touchpad className="w-7 h-7 text-slate-950" />
          <span>TOUCH ANYWHERE TO EXPLORE THE IMPACT ATLAS</span>
        </div>

        <p className="text-xs text-slate-400 font-medium">
          Exhibition Touchscreen Interactive Installation · Touch to wake up
        </p>
      </div>
    </div>
  );
}
