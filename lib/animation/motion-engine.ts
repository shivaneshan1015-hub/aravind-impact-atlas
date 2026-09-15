import gsap from "gsap";
import { MOTION_TOKENS, isReducedMotionPreferred } from "./motion-tokens";

// Registry of active GSAP timelines by name for interruption management
const activeTimelines: Map<string, gsap.core.Timeline> = new Map();

/**
 * Creates or retrieves an interruptible GSAP timeline.
 * If a timeline with the same key exists, it is safely killed before creating the new one.
 */
export function getOrCreateTimeline(key: string): gsap.core.Timeline {
  if (activeTimelines.has(key)) {
    const active = activeTimelines.get(key);
    if (active) {
      active.kill();
    }
  }

  const tl = gsap.timeline();
  activeTimelines.set(key, tl);
  return tl;
}

/**
 * Halts and kills all running animation timelines (called on RESET ATLAS or abrupt scene changes).
 */
export function killAllTimelines(): void {
  activeTimelines.forEach((tl) => {
    if (tl) tl.kill();
  });
  activeTimelines.clear();
  gsap.killTweensOf("*");
}

/**
 * Animate Metric Number Count-up (Factual Evidence Reveal)
 */
export function animateMetricCount(
  element: HTMLElement | null,
  startValue: number,
  endValue: number,
  suffix: string = "",
  duration: number = MOTION_TOKENS.duration.slow
): void {
  if (!element) return;
  if (isReducedMotionPreferred()) {
    element.textContent = `${endValue.toLocaleString()}${suffix}`;
    return;
  }

  const obj = { val: startValue };
  gsap.to(obj, {
    val: endValue,
    duration,
    ease: MOTION_TOKENS.ease.emphasis,
    onUpdate: () => {
      element.textContent = `${Math.round(obj.val).toLocaleString()}${suffix}`;
    },
  });
}

/**
 * Animate Scene Transition
 */
export function animateSceneEntrance(
  element: HTMLElement | null,
  key: string = "scene_transition",
  onComplete?: () => void
): void {
  if (!element) return;

  if (isReducedMotionPreferred()) {
    gsap.set(element, { opacity: 1, y: 0 });
    if (onComplete) onComplete();
    return;
  }

  const tl = getOrCreateTimeline(key);
  tl.fromTo(
    element,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: MOTION_TOKENS.duration.standard,
      ease: MOTION_TOKENS.ease.standard,
      onComplete,
    }
  );
}

/**
 * Animate Impact Emergence Pulse
 */
export function animateImpactPulse(
  element: HTMLElement | null,
  key: string = "impact_pulse"
): void {
  if (!element) return;

  if (isReducedMotionPreferred()) {
    gsap.set(element, { opacity: 1, scale: 1 });
    return;
  }

  const tl = getOrCreateTimeline(key);
  tl.fromTo(
    element,
    { opacity: 0, scale: 0.96 },
    {
      opacity: 1,
      scale: 1,
      duration: MOTION_TOKENS.duration.standard,
      ease: MOTION_TOKENS.ease.emphasis,
    }
  );
}
