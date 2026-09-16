"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { NarrationPlaybackState, NarrationCue, NarrationChapter } from "./types";
import { careHospitalsChapter } from "./care-hospitals-script";
import { getGlobalAudioManager } from "./AudioManager";

export function useNarration(chapter: NarrationChapter = careHospitalsChapter) {
  const [playbackState, setPlaybackState] = useState<NarrationPlaybackState>("idle");
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(65);
  const [currentCueIndex, setCurrentCueIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isTranscriptOpen, setIsTranscriptOpen] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const audioMgrRef = useRef(getGlobalAudioManager());

  // Initialize chapter audio
  useEffect(() => {
    const mgr = audioMgrRef.current;
    mgr.load(chapter.audioSrc, 65);

    const unsubscribe = mgr.subscribe(({ type, currentTime: time, duration: dur }) => {
      setCurrentTime(time);
      if (dur > 0) setDuration(dur);

      if (type === "ended") {
        setPlaybackState("completed");
      } else if (type === "error" || type === "fallback") {
        setHasError(true);
      }

      // Find active cue index based on current time
      const cueIdx = chapter.cues.reduce((acc, cue, idx) => {
        if (time >= cue.time) return idx;
        return acc;
      }, 0);

      setCurrentCueIndex(cueIdx);
    });

    return () => {
      unsubscribe();
    };
  }, [chapter]);

  // Current active cue & segment
  const activeCue: NarrationCue = chapter.cues[currentCueIndex] || chapter.cues[0];
  const activeSegment = chapter.segments.find((s) => s.cueId === activeCue.id) || chapter.segments[0];

  const play = useCallback(() => {
    setPlaybackState("playing");
    audioMgrRef.current.play();
  }, []);

  const pause = useCallback(() => {
    setPlaybackState("paused");
    audioMgrRef.current.pause();
  }, []);

  const resume = useCallback(() => {
    setPlaybackState("playing");
    audioMgrRef.current.play();
  }, []);

  const seekToCue = useCallback((cueIndex: number) => {
    const targetCue = chapter.cues[cueIndex];
    if (targetCue) {
      setCurrentCueIndex(cueIndex);
      audioMgrRef.current.seek(targetCue.time);
    }
  }, [chapter]);

  const explore = useCallback(() => {
    setPlaybackState("exploring");
    audioMgrRef.current.pause();
  }, []);

  const exit = useCallback(() => {
    setPlaybackState("idle");
    audioMgrRef.current.stop();
    setCurrentCueIndex(0);
    setCurrentTime(0);
  }, []);

  const toggleMute = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    audioMgrRef.current.setMuted(newMuted);
  }, [isMuted]);

  const toggleTranscript = useCallback(() => {
    setIsTranscriptOpen((prev) => !prev);
  }, []);

  // Visitor Interruption Hook: Pauses narration gracefully when visitor touches map/pins
  const handleVisitorInterruption = useCallback(() => {
    if (playbackState === "playing") {
      pause();
      setPlaybackState("paused");
    }
  }, [playbackState, pause]);

  return {
    playbackState,
    currentTime,
    duration,
    currentCueIndex,
    activeCue,
    activeSegment,
    isMuted,
    isTranscriptOpen,
    hasError,
    chapter,
    play,
    pause,
    resume,
    seekToCue,
    explore,
    exit,
    toggleMute,
    toggleTranscript,
    handleVisitorInterruption,
  };
}
