/**
 * Motion Tokens for ARAVIND 50 — IMPACT ATLAS
 * Defines standard durations, delays, and easings for museum-grade choreography.
 */
export const MOTION_TOKENS = {
  // Durations (in seconds for GSAP)
  duration: {
    micro: 0.15,       // Touch feedback / button states
    fast: 0.35,        // Micro UI reveals / tooltips
    standard: 0.6,     // Card transitions & panel reveals
    slow: 1.0,         // Metric count-ups & layer emergence
    cinematic: 1.4,    // Geographic camera fly-to & scene transitions
  },
  
  // Staggers
  stagger: {
    fast: 0.04,
    standard: 0.08,
    slow: 0.15,
  },

  // Easing Curves
  ease: {
    standard: "power2.out",
    emphasis: "power3.out",
    geographic: "power3.inOut",
    subtle: "sine.inOut",
    sharp: "power1.in",
  },
};

/**
 * Checks if user has requested reduced motion in system preferences.
 */
export function isReducedMotionPreferred(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
