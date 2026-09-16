"use client";

export type AudioManagerCallback = (event: {
  type: "timeupdate" | "play" | "pause" | "ended" | "error" | "fallback";
  currentTime: number;
  duration: number;
}) => void;

export class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private listeners: Set<AudioManagerCallback> = new Set();
  private isFallbackMode: boolean = false;
  private fallbackTimer: NodeJS.Timeout | null = null;
  private virtualTime: number = 0;
  private virtualDuration: number = 65; // Fallback duration in seconds

  constructor() {
    if (typeof window !== "undefined") {
      this.audio = new Audio();
      this.bindAudioEvents();
    }
  }

  private bindAudioEvents() {
    if (!this.audio) return;

    this.audio.addEventListener("timeupdate", () => {
      if (!this.isFallbackMode) {
        this.notifyListeners({
          type: "timeupdate",
          currentTime: this.audio?.currentTime || 0,
          duration: this.audio?.duration || 0,
        });
      }
    });

    this.audio.addEventListener("play", () => {
      this.notifyListeners({
        type: "play",
        currentTime: this.audio?.currentTime || 0,
        duration: this.audio?.duration || 0,
      });
    });

    this.audio.addEventListener("pause", () => {
      this.notifyListeners({
        type: "pause",
        currentTime: this.audio?.currentTime || 0,
        duration: this.audio?.duration || 0,
      });
    });

    this.audio.addEventListener("ended", () => {
      this.notifyListeners({
        type: "ended",
        currentTime: this.audio?.duration || 0,
        duration: this.audio?.duration || 0,
      });
    });

    this.audio.addEventListener("error", (e) => {
      console.warn("Audio load failed or unavailable. Falling back to visual guided tour.", e);
      this.startFallbackTimer();
    });
  }

  private notifyListeners(event: {
    type: "timeupdate" | "play" | "pause" | "ended" | "error" | "fallback";
    currentTime: number;
    duration: number;
  }) {
    this.listeners.forEach((cb) => cb(event));
  }

  public load(audioSrc: string, durationEstimate: number = 65) {
    this.stop();
    this.virtualDuration = durationEstimate;
    this.virtualTime = 0;
    this.isFallbackMode = false;

    if (this.audio) {
      this.audio.src = audioSrc;
      this.audio.load();
    }
  }

  public play(): Promise<void> {
    if (this.isFallbackMode) {
      this.resumeFallbackTimer();
      return Promise.resolve();
    }

    if (this.audio && this.audio.src) {
      return this.audio.play().catch((err) => {
        console.warn("Autoplay blocked or audio file missing. Activating visual guided mode.", err);
        this.startFallbackTimer();
      });
    }

    this.startFallbackTimer();
    return Promise.resolve();
  }

  public pause() {
    if (this.audio && !this.audio.paused) {
      this.audio.pause();
    }
    if (this.isFallbackMode) {
      this.pauseFallbackTimer();
    }
  }

  public seek(seconds: number) {
    if (this.audio && !isNaN(seconds)) {
      try {
        this.audio.currentTime = Math.max(0, Math.min(seconds, this.audio.duration || seconds));
      } catch (err) {
        // Fallback catch
      }
    }
    if (this.isFallbackMode) {
      this.virtualTime = seconds;
      this.notifyListeners({
        type: "timeupdate",
        currentTime: this.virtualTime,
        duration: this.virtualDuration,
      });
    }
  }

  public setMuted(muted: boolean) {
    if (this.audio) {
      this.audio.muted = muted;
    }
  }

  public isMuted(): boolean {
    return this.audio ? this.audio.muted : false;
  }

  public stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.stopFallbackTimer();
    this.virtualTime = 0;
  }

  // Visual Fallback Timer Logic when audio file is absent or blocked
  private startFallbackTimer() {
    this.isFallbackMode = true;
    this.notifyListeners({
      type: "fallback",
      currentTime: this.virtualTime,
      duration: this.virtualDuration,
    });
    this.resumeFallbackTimer();
  }

  private resumeFallbackTimer() {
    this.pauseFallbackTimer();
    this.fallbackTimer = setInterval(() => {
      this.virtualTime += 0.5;
      if (this.virtualTime >= this.virtualDuration) {
        this.stopFallbackTimer();
        this.notifyListeners({
          type: "ended",
          currentTime: this.virtualDuration,
          duration: this.virtualDuration,
        });
      } else {
        this.notifyListeners({
          type: "timeupdate",
          currentTime: this.virtualTime,
          duration: this.virtualDuration,
        });
      }
    }, 500);
  }

  private pauseFallbackTimer() {
    if (this.fallbackTimer) {
      clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
  }

  private stopFallbackTimer() {
    this.pauseFallbackTimer();
    this.isFallbackMode = false;
  }

  public subscribe(cb: AudioManagerCallback) {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  public destroy() {
    this.stop();
    this.listeners.clear();
    if (this.audio) {
      this.audio.removeAttribute("src");
      this.audio = null;
    }
  }
}

// Global Singleton for seamless execution across components
let globalAudioManager: AudioManager | null = null;

export function getGlobalAudioManager(): AudioManager {
  if (typeof window === "undefined") {
    return new AudioManager();
  }
  if (!globalAudioManager) {
    globalAudioManager = new AudioManager();
  }
  return globalAudioManager;
}
