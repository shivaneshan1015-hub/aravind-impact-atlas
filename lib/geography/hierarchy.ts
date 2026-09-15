import { GeographicScope } from "@/types/entity";

export interface BreadcrumbItem {
  id: string;
  label: string;
  scope: GeographicScope;
  value?: string | null;
  active: boolean;
}

export function buildGeographicBreadcrumbs(
  entityName: string,
  subcategoryName: string,
  country: string | null = "India",
  state: string | null = null,
  city: string | null = null
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    {
      id: "entity",
      label: entityName,
      scope: "world",
      value: null,
      active: !country && !state && !city,
    },
    {
      id: "subcategory",
      label: subcategoryName,
      scope: "world",
      value: null,
      active: !country && !state && !city,
    },
  ];

  if (country) {
    items.push({
      id: "country",
      label: country,
      scope: "country",
      value: country,
      active: !!country && !state && !city,
    });
  }

  if (state) {
    items.push({
      id: "state",
      label: state,
      scope: "state",
      value: state,
      active: !!state && !city,
    });
  }

  if (city) {
    items.push({
      id: "city",
      label: city,
      scope: "city",
      value: city,
      active: true,
    });
  }

  return items;
}
