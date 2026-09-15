import { EntityId } from "@/types/entity";

export const EXHIBITION_CONFIG = {
  // Attract Mode Exhibition Screen Saver Configuration
  attractMode: {
    enabled: true,
    idleTimeoutMs: 60000, // 60 seconds inactivity -> enter Attract Mode
    storyDurationMs: 8000, // 8 seconds per impact story reveal in attract loop
    loopSequence: [
      "hospitals",
      "laico",
      "amrf",
      "aurolab",
      "auroitech",
      "eyebank",
      "all",
    ] as EntityId[],
    invitationText: "TOUCH ANYWHERE TO EXPLORE THE IMPACT ATLAS",
  },

  // Guided Exhibition Tour Configuration
  guidedMode: {
    stepDurationMs: 12000, // 12 seconds per chapter in Guided Mode
    sequence: [
      "hospitals",
      "laico",
      "amrf",
      "aurolab",
      "auroitech",
      "eyebank",
      "all",
    ] as EntityId[],
  },

  // Motion Timing Tokens (GSAP & Map Camera)
  motion: {
    micro: 0.3,
    short: 0.6,
    medium: 1.0,
    long: 1.5,
    cameraFlyDuration: 1.2,
    boundsFitPadding: 90,
  },

  // Physical Touchscreen Guidelines
  touchscreen: {
    minTouchTargetPx: 48,
    targetWidth: 1920,
    targetHeight: 1080,
  },
};
