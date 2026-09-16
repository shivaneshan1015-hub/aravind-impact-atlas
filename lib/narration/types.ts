import { EntityId } from "@/types/entity";
import { CareCentreType } from "@/types/geo";

export type NarrationPlaybackState =
  | "idle"
  | "playing"
  | "paused"
  | "exploring"
  | "completed"
  | "error";

export type NarrationCueAction =
  | "focusCountry"
  | "focusState"
  | "focusLocation"
  | "revealCentre"
  | "revealCentreType"
  | "showContext"
  | "complete";

export interface NarrationCue {
  id: string;
  time: number; // In seconds
  action: NarrationCueAction;
  label: string;
  targetId?: string;
  centreType?: CareCentreType | "all";
  zoomLevel?: number;
}

export interface ScriptSegment {
  id: string;
  cueId: string;
  title: string;
  text: string;
}

export interface NarrationChapter {
  id: string;
  entityId: EntityId;
  subcategoryId?: string;
  title: string;
  question: string;
  audioSrc: string;
  language: string;
  cues: NarrationCue[];
  segments: ScriptSegment[];
}
