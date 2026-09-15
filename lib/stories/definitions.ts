import { EntityId } from "@/types/entity";
import { CENTRAL_IMPACT_CONFIGS, ImpactConfig } from "@/config/impact-config";
import { ImpactStoryDefinition } from "@/lib/scene-engine/types";

export const IMPACT_STORIES: Record<EntityId, ImpactStoryDefinition> = CENTRAL_IMPACT_CONFIGS;
export type { ImpactConfig };
