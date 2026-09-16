import { EntityId } from "@/types/entity";
import { CENTRAL_IMPACT_CONFIGS, ImpactConfig } from "@/config/impact-config";
import { ImpactStoryDefinition } from "@/lib/scene-engine/types";

export const IMPACT_STORIES: Record<EntityId, ImpactStoryDefinition> = Object.fromEntries(
  Object.entries(CENTRAL_IMPACT_CONFIGS).map(([key, cfg]) => [
    key,
    {
      ...cfg,
      entityId: cfg.id,
      title: cfg.label,
      accentColor: cfg.accent,
    },
  ])
) as unknown as Record<EntityId, ImpactStoryDefinition>;

export type { ImpactConfig };
