import { EntityId } from "@/types/entity";
import { GeoLocationItem } from "@/types/geo";

export type SceneId =
  | "arrival"
  | "dimensions"
  | "story_exploration"
  | "one_system"
  | "attract";

export type ExperienceMode = "guided" | "explore" | "attract";

export interface SceneState {
  currentScene: SceneId;
  currentMode: ExperienceMode;
  selectedEntityId: EntityId;
  selectedSubcategoryId: string;
  selectedCountry: string | null;
  selectedState: string | null;
  selectedLocation: GeoLocationItem | null;
  productFilterId: string | null;
  isGuidedPlaying: boolean;
  guidedStepIndex: number;
}

export interface ImpactStoryDefinition {
  entityId: EntityId;
  doorNumber: string;
  title: string;
  shortName: string;
  question: string;
  tagline: string;
  description: string;
  accentColor: string;
  visualGrammar: string;
  primaryMetric: {
    label: string;
    value: string;
    unit?: string;
  };
  secondaryMetrics: Array<{
    label: string;
    value: string;
  }>;
  storyNarrative: string;
}
