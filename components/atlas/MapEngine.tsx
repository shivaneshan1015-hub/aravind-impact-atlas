"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { LIGHT_ATLAS_MAP_STYLE, hexToRgba, MapVarietyId } from "@/lib/map-utils";
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";
import { EYEBANK_DATA, EYE_BANK_CATEGORIES } from "@/data/eyebank/eyebank-data";

import { VisionCentreHospitalCategory } from "@/data/hospitals/vision-centres-data";

export interface MapEngineProps {
  entityConfig: EntityConfig;
  locations: GeoLocationItem[];
  stateAggregations: StateAggregation[];
  selectedState: string | null;
  selectedLocation: GeoLocationItem | null;
  onSelectState: (stateName: string, bounds?: [[number, number], [number, number]]) => void;
  onSelectLocation: (location: GeoLocationItem) => void;
  onClearLocation: () => void;
  selectedSubcategoryId?: string;
  modeGrammar?: GeographicGrammar;
  geographicLevel?: GeographicLevel;
  careTypeFilter?: "all" | "tertiary" | "secondary" | "community" | "vision_centre";
  visionCentreHubFilter?: VisionCentreHospitalCategory;
  eyeBankCategoryFilter?: string;
  revealMaxYear?: number | null;
  isLabMode?: boolean;
  isOneSystem?: boolean;
  hidePinLabels?: boolean;
}

export function MapEngine({
  entityConfig,
  locations,
  stateAggregations,
  selectedState,
  selectedLocation,
  onSelectState,
  onSelectLocation,
  onClearLocation,
  selectedSubcategoryId,
  modeGrammar = "auto",
  geographicLevel = "country",
  careTypeFilter = "all",
  visionCentreHubFilter = "all",
  eyeBankCategoryFilter = "all",
  revealMaxYear = null,
  isLabMode = false,
  isOneSystem = false,
  hidePinLabels = false,
}: MapEngineProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const locationMarkersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);
  const [activeVariety, setActiveVariety] = useState<MapVarietyId>("teal_coastal");
  const [activeScope, setActiveScope] = useState<"global" | "bangladesh" | "india" | "nepal">("global");

  // Handle Map Variety (Basemap Theme) Switching
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const basemaps = ["basemap-light", "basemap-dark", "basemap-topo", "basemap-ocean"];
    basemaps.forEach((b) => {
      if (map.getLayer(b)) map.setLayoutProperty(b, "visibility", "none");
    });

    if (activeVariety === "teal_coastal") {
      if (map.getLayer("basemap-light")) map.setLayoutProperty("basemap-light", "visibility", "visible");
      if (map.getLayer("basemap-labels-overlay")) map.setLayoutProperty("basemap-labels-overlay", "visibility", "visible");
    } else if (activeVariety === "warm_ivory") {
      if (map.getLayer("basemap-ocean")) map.setLayoutProperty("basemap-ocean", "visibility", "visible");
      if (map.getLayer("basemap-labels-overlay")) map.setLayoutProperty("basemap-labels-overlay", "visibility", "visible");
    } else if (activeVariety === "voyager_topo") {
      if (map.getLayer("basemap-topo")) map.setLayoutProperty("basemap-topo", "visibility", "visible");
      if (map.getLayer("basemap-labels-overlay")) map.setLayoutProperty("basemap-labels-overlay", "visibility", "visible");
    } else if (activeVariety === "glassmorphic") {
      if (map.getLayer("basemap-dark")) map.setLayoutProperty("basemap-dark", "visibility", "visible");
      if (map.getLayer("basemap-labels-overlay")) map.setLayoutProperty("basemap-labels-overlay", "visibility", "none");
    }

    if (map.getLayer("india-states-labels")) {
      const isDark = activeVariety === "glassmorphic";
      map.setPaintProperty("india-states-labels", "text-color", isDark ? "#F8FAFC" : "#0F172A");
      map.setPaintProperty("india-states-labels", "text-halo-color", isDark ? "#0F172A" : "#FFFFFF");
    }
  }, [mapLoaded, activeVariety]);

  // Compute active visual grammar based on entity or explicit grammar override
  const activeGrammar: GeographicGrammar =
    modeGrammar !== "auto"
      ? modeGrammar
      : entityConfig.id === "laico"
      ? "capacity"
      : entityConfig.id === "amrf"
      ? "collaboration"
      : entityConfig.id === "aurolab"
      ? "distribution"
      : entityConfig.id === "auroitech"
      ? "product"
      : entityConfig.id === "eyebank"
      ? "flow"
      : "footprint";

  const onClearLocationRef = useRef(onClearLocation);
  useEffect(() => {
    onClearLocationRef.current = onClearLocation;
  }, [onClearLocation]);

  // Initialize MapLibre GL map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: LIGHT_ATLAS_MAP_STYLE,
      center: INDIA_CENTER,
      zoom: INDIA_DEFAULT_ZOOM,
      attributionControl: false,
    });

    map.on("load", () => {
      // 1. CAPACITY BUILDING (LAICO Knowledge Arcs)
      map.addSource("laico-network-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", properties: { name: "Nepal Arc" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [83.4542, 27.5055]] } },
            { type: "Feature", properties: { name: "Kenya Arc" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [36.6622, -1.2467]] } },
            { type: "Feature", properties: { name: "Vietnam Arc" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [108.2022, 16.0544]] } },
            { type: "Feature", properties: { name: "Karnataka Path" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.5946, 12.9716]] } },
            { type: "Feature", properties: { name: "Maharashtra Path" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [72.8777, 19.0760]] } },
            { type: "Feature", properties: { name: "Delhi Path" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.2090, 28.6139]] } },
          ],
        },
      });

      map.addLayer({
        id: "laico-network-layer",
        type: "line",
        source: "laico-network-source",
        paint: {
          "line-color": "#0D9488",
          "line-width": 2.5,
          "line-opacity": 0.85,
          "line-dasharray": [2, 2],
        },
        layout: { visibility: "none" },
      });

      // 2. RESEARCH (AMRF Global Collaborator Arc Energy Beams)
      const hqCoord: [number, number] = [78.1198, 9.9252];
      const collabTargets: { name: string; coords: [number, number] }[] = [
        { name: "Ulster University", coords: [-6.6766, 55.1487] },
        { name: "University of Paris", coords: [2.3522, 48.8566] },
        { name: "University of Liverpool", coords: [-2.9660, 53.4060] },
        { name: "University College of London", coords: [-0.1340, 51.5246] },
        { name: "McMaster University", coords: [-79.9192, 43.2609] },
        { name: "University of IOWA", coords: [-91.5549, 41.6627] },
        { name: "London School of Hygiene & Tropical Medicine", coords: [-0.1302, 51.5208] },
        { name: "University of Edinburgh", coords: [-3.1892, 55.9445] },
        { name: "Dartmouth Hitchcock Medical Center", coords: [-72.2725, 43.6706] },
        { name: "Moorfields Eye Hospital", coords: [-0.0886, 51.5258] },
        { name: "Institut Pasteur", coords: [2.3117, 48.8397] },
        { name: "CSIR-CCMB", coords: [78.5446, 17.4243] },
      ];

      const collabArcFeatures = collabTargets.map((t) => {
        const numPoints = 40;
        const coords: [number, number][] = [];
        const [sLng, sLat] = hqCoord;
        const [eLng, eLat] = t.coords;
        const midLng = (sLng + eLng) / 2;
        const midLat = (sLat + eLat) / 2;
        const dist = Math.hypot(eLng - sLng, eLat - sLat);
        const arcHeight = Math.min(dist * 0.22, 18);

        for (let i = 0; i <= numPoints; i++) {
          const p = i / numPoints;
          const lat = (1 - p) * (1 - p) * sLat + 2 * (1 - p) * p * (midLat + arcHeight) + p * p * eLat;
          const lng = (1 - p) * (1 - p) * sLng + 2 * (1 - p) * p * midLng + p * p * eLng;
          coords.push([Number(lng.toFixed(4)), Number(lat.toFixed(4))]);
        }

        return {
          type: "Feature" as const,
          properties: { name: t.name },
          geometry: { type: "LineString" as const, coordinates: coords },
        };
      });

      map.addSource("amrf-collaboration-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: collabArcFeatures,
        },
      });

      map.addLayer({
        id: "amrf-collaboration-layer",
        type: "line",
        source: "amrf-collaboration-source",
        paint: {
          "line-color": "#7C3AED",
          "line-width": 3,
          "line-opacity": 0.75,
        },
        layout: { visibility: "none" },
      });

      map.addLayer({
        id: "amrf-collaboration-beam-layer",
        type: "line",
        source: "amrf-collaboration-source",
        paint: {
          "line-color": "#38BDF8",
          "line-width": 2,
          "line-opacity": 0.9,
          "line-dasharray": [3, 4],
        },
        layout: { visibility: "none" },
      });

      // 2b. INTERNATIONAL STUDENTS / FELLOWS RAYS (Gold & Emerald Flow Arcs)
      const studentTargets: { name: string; coords: [number, number] }[] = [
        { name: "Royal Tropical Institute, Amsterdam", coords: [4.9221, 52.3622] },
        { name: "Drexel University College of Medicine", coords: [-75.1899, 39.9566] },
        { name: "University of Giessen", coords: [8.6835, 50.5873] },
        { name: "London School of Hygiene & Tropical Medicine", coords: [-0.1302, 51.5208] },
        { name: "Institut Pasteur, Paris", coords: [2.3117, 48.8397] },
      ];

      const studentArcFeatures = studentTargets.map((t) => {
        const numPoints = 40;
        const coords: [number, number][] = [];
        const [sLng, sLat] = hqCoord;
        const [eLng, eLat] = t.coords;
        const midLng = (sLng + eLng) / 2;
        const midLat = (sLat + eLat) / 2;
        const dist = Math.hypot(eLng - sLng, eLat - sLat);
        const arcHeight = -Math.min(dist * 0.22, 18);

        for (let i = 0; i <= numPoints; i++) {
          const p = i / numPoints;
          const lat = (1 - p) * (1 - p) * sLat + 2 * (1 - p) * p * (midLat + arcHeight) + p * p * eLat;
          const lng = (1 - p) * (1 - p) * sLng + 2 * (1 - p) * p * midLng + p * p * eLng;
          coords.push([Number(lng.toFixed(4)), Number(lat.toFixed(4))]);
        }

        return {
          type: "Feature" as const,
          properties: { name: t.name },
          geometry: { type: "LineString" as const, coordinates: coords },
        };
      });

      map.addSource("amrf-students-abroad-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: studentArcFeatures,
        },
      });

      map.addLayer({
        id: "amrf-students-abroad-layer",
        type: "line",
        source: "amrf-students-abroad-source",
        paint: {
          "line-color": "#F59E0B",
          "line-width": 3,
          "line-opacity": 0.85,
        },
        layout: { visibility: "none" },
      });

      map.addLayer({
        id: "amrf-students-abroad-beam-layer",
        type: "line",
        source: "amrf-students-abroad-source",
        paint: {
          "line-color": "#10B981",
          "line-width": 2.5,
          "line-opacity": 0.95,
          "line-dasharray": [4, 4],
        },
        layout: { visibility: "none" },
      });

      // 3. VISION RESTORATION (Eye Bank Collection & Distribution Vector Networks)
      const eyeBankCollectionFeatures: any[] = [];
      const eyeBankDistributionFeatures: any[] = [];

      EYE_BANK_CATEGORIES.forEach((cat) => {
        const hub = EYEBANK_DATA.find((h) => h.metadata?.isMainHub && (h.metadata?.categoryId === cat.id || h.id.includes(cat.id)));
        if (!hub) return;

        cat.districts.forEach((distName) => {
          const collNode = EYEBANK_DATA.find(
            (c) =>
              !c.metadata?.isMainHub &&
              (c.city.toLowerCase().trim() === distName.toLowerCase().trim() ||
                (c.rawName || c.name || "").toLowerCase().trim() === distName.toLowerCase().trim())
          );
          if (collNode) {
            const dist = Math.hypot(collNode.longitude - hub.longitude, collNode.latitude - hub.latitude);
            if (dist > 0.001) {
              eyeBankCollectionFeatures.push({
                type: "Feature",
                properties: {
                  categoryId: cat.id,
                  color: cat.color,
                  hubName: cat.name,
                  collCity: collNode.city,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [collNode.longitude, collNode.latitude],
                    [hub.longitude, hub.latitude],
                  ],
                },
              });
            }
          }
        });
      });

      EYE_BANK_CATEGORIES.forEach((cat) => {
        const hub = EYEBANK_DATA.find((h) => h.metadata?.isMainHub && (h.metadata?.categoryId === cat.id || h.id.includes(cat.id)));
        if (!hub) return;

        const catDistricts = cat.distributionDistricts || [];
        catDistricts.forEach((distName) => {
          const distNode = EYEBANK_DATA.find(
            (c) =>
              c.metadata?.isDistributionDestination &&
              (c.city.toLowerCase().trim() === distName.toLowerCase().trim() ||
                (c.rawName || c.name || "").toLowerCase().trim() === distName.toLowerCase().trim())
          );
          if (distNode) {
            const dist = Math.hypot(distNode.longitude - hub.longitude, distNode.latitude - hub.latitude);
            if (dist > 0.001) {
              eyeBankDistributionFeatures.push({
                type: "Feature",
                properties: {
                  categoryId: cat.id,
                  color: cat.color,
                  hubName: cat.name,
                  destCity: distNode.city,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [hub.longitude, hub.latitude],
                    [distNode.longitude, distNode.latitude],
                  ],
                },
              });
            }
          }
        });
      });

      // Collection Network Source & Category-colored Dotted Layer
      map.addSource("eyebank-flow-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: eyeBankCollectionFeatures,
        },
      });

      map.addLayer({
        id: "eyebank-flow-layer",
        type: "line",
        source: "eyebank-flow-source",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 3,
          "line-opacity": 0.85,
          "line-dasharray": [3, 3],
        },
        layout: { visibility: "none" },
      });

      // Distribution Network Source & Dashed Layer (Sky Blue)
      map.addSource("eyebank-distribution-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: eyeBankDistributionFeatures,
        },
      });

      map.addLayer({
        id: "eyebank-distribution-layer",
        type: "line",
        source: "eyebank-distribution-source",
        paint: {
          "line-color": ["get", "color"],
          "line-width": 2.5,
          "line-opacity": 0.85,
          "line-dasharray": [6, 3],
        },
        layout: { visibility: "none" },
      });

      setMapLoaded(true);
    });

    map.on("click", (e) => {
      const target = e.originalEvent.target as HTMLElement;
      if (
        !target.closest(".group") &&
        !target.closest(".maplibregl-marker") &&
        !target.closest(".maplibregl-popup")
      ) {
        if (popupRef.current) {
          popupRef.current.remove();
          popupRef.current = null;
        }
        onClearLocationRef.current?.();
      }
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Toggle Vector Grammar Layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (map.getLayer("laico-network-layer")) {
      map.setLayoutProperty("laico-network-layer", "visibility", "none");
    }
    if (map.getLayer("amrf-collaboration-layer")) {
      const isCollabActive = selectedSubcategoryId === "collaboratives";
      map.setLayoutProperty(
        "amrf-collaboration-layer",
        "visibility",
        isCollabActive ? "visible" : "none"
      );
      if (map.getLayer("amrf-collaboration-beam-layer")) {
        map.setLayoutProperty(
          "amrf-collaboration-beam-layer",
          "visibility",
          isCollabActive ? "visible" : "none"
        );
      }
    }
    if (map.getLayer("amrf-students-abroad-layer")) {
      const isStudentsActive = selectedSubcategoryId === "students_abroad";
      map.setLayoutProperty(
        "amrf-students-abroad-layer",
        "visibility",
        isStudentsActive ? "visible" : "none"
      );
      if (map.getLayer("amrf-students-abroad-beam-layer")) {
        map.setLayoutProperty(
          "amrf-students-abroad-beam-layer",
          "visibility",
          isStudentsActive ? "visible" : "none"
        );
      }
    }
    if (map.getLayer("aurolab-network-layer")) {
      map.setLayoutProperty(
        "aurolab-network-layer",
        "visibility",
        activeGrammar === "distribution" || entityConfig.id === "aurolab" ? "visible" : "none"
      );
    }
    if (entityConfig.id === "eyebank") {
      const isDistributedOnly = selectedSubcategoryId === "distributed";
      const isCollectedOnly = selectedSubcategoryId === "collected";

      if (map.getLayer("eyebank-flow-layer")) {
        map.setLayoutProperty(
          "eyebank-flow-layer",
          "visibility",
          isDistributedOnly || isCollectedOnly ? "none" : "visible"
        );
        if (eyeBankCategoryFilter && eyeBankCategoryFilter !== "all") {
          map.setFilter("eyebank-flow-layer", ["==", ["get", "categoryId"], eyeBankCategoryFilter]);
        } else {
          map.setFilter("eyebank-flow-layer", null);
        }
      }
      if (map.getLayer("eyebank-distribution-layer")) {
        map.setLayoutProperty(
          "eyebank-distribution-layer",
          "visibility",
          isCollectedOnly ? "none" : "visible"
        );
        if (eyeBankCategoryFilter && eyeBankCategoryFilter !== "all") {
          map.setFilter("eyebank-distribution-layer", ["==", ["get", "categoryId"], eyeBankCategoryFilter]);
        } else {
          map.setFilter("eyebank-distribution-layer", null);
        }
      }
    } else {
      if (map.getLayer("eyebank-flow-layer")) {
        map.setLayoutProperty("eyebank-flow-layer", "visibility", "none");
      }
      if (map.getLayer("eyebank-distribution-layer")) {
        map.setLayoutProperty("eyebank-distribution-layer", "visibility", "none");
      }
    }
  }, [mapLoaded, entityConfig.id, activeGrammar, selectedSubcategoryId, eyeBankCategoryFilter]);

  // Render Restrained Pins with 48px Hit Targets, CARE Visual Hierarchy, and Privacy Protection
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    locationMarkersRef.current.forEach((m) => m.remove());
    locationMarkersRef.current = [];

    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    // 0. Geographic State Filter (fallback to all locations if selectedState has no matches in current view)
    let filtered = selectedState && locations.some((l) => l.state === selectedState)
      ? locations.filter((l) => l.state === selectedState)
      : locations;

    // 2. CARE Type filter (Skip for Staff Dots and Patient Hubs so they always render)
    if (careTypeFilter !== "all") {
      filtered = filtered.filter(
        (l) =>
          l.careType === careTypeFilter ||
          l.type === "Staff Dot" ||
          l.type === "Patient Hub" ||
          l.subcategoryId === "patients"
      );
    }

    // 2b. Vision Centre Hospital Hub Category filter
    if (visionCentreHubFilter && visionCentreHubFilter !== "all") {
      filtered = filtered.filter((l) => l.metadata?.hospitalHub === visionCentreHubFilter);
    }

    // 3. Reveal Max Year filter
    if (revealMaxYear !== null && revealMaxYear !== undefined) {
      filtered = filtered.filter(
        (l) => !l.establishedYear || l.establishedYear <= revealMaxYear
      );
    }

    filtered.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const el = document.createElement("div");
      el.className =
        "group cursor-pointer transition-all duration-200 select-none w-12 h-12 flex items-center justify-center";

      const isStaffDot = loc.type === "Staff Dot" || loc.type === "Staff State Dot" || loc.subcategoryId === "staffs" || loc.entityId === "staffs";
      const isAurolabLoc = loc.entityId === "aurolab";
      const isEyeBankLoc = loc.entityId === "eyebank";
      const isIhmsLoc = loc.subcategoryId === "ihms";
      const isEyenotesLoc = loc.subcategoryId === "eyenotes";
      const isVcmsLoc = loc.subcategoryId === "vcms";
      const isOneSystemActive = isOneSystem || entityConfig.id === "all";

      const isPatientHub = loc.type === "Patient Hub";
      const isPatientDot = loc.type === "Patient Dot" || loc.subcategoryId === "patients";
      const isVisionCentre = loc.careType === "vision_centre" || loc.subcategoryId === "hospitals_vision_centres";
      const isCategoryHub = !!loc.metadata?.isCategoryHub;

      if (isVisionCentre) {
        const hubName = (loc.metadata?.hospitalHub as string) || "Madurai";
        const hubColors: Record<string, string> = {
          Madurai: "#991B1B",     // Dark Crimson Red
          Chennai: "#1E3A8A",     // Dark Royal Blue
          Theni: "#0F172A",       // Deep Slate Black
          Coimbatore: "#065F46",  // Dark Emerald Green
          Tirunelveli: "#115E59",  // Dark Teal
          Salem: "#78350F",       // Dark Chocolate
          Pondicherry: "#581C87", // Dark Purple
        };
        const hubColor = hubColors[hubName] || (loc.metadata?.hubColor as string) || "#064E3B";
        const placeName = loc.rawName || loc.city || loc.name;

        if (isCategoryHub) {
          // Category Base Hospital Hub Badge & Building Pin (larger size with Building Icon)
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-30" title="${loc.name}">
              <!-- Hospital Name Label Badge -->
              <span class="mb-1 text-[11px] font-black text-white px-2.5 py-1 rounded-lg shadow-2xl border border-white/40 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110" style="background-color: ${hubColor}">
                <svg class="w-3.5 h-3.5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6"/>
                </svg>
                <span>${loc.city || placeName.replace(/\s*Base Hospital\s*/gi, '')}</span>
              </span>

              <!-- Large Base Hospital Building Icon Badge -->
              <div class="w-8 h-8 rounded-xl border-2 border-white shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-125" style="background-color: ${hubColor}">
                <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6"/>
                </svg>
              </div>
            </div>
          `;
        } else {
          // Vision Centre Pin with Touch/Click/Hover Label over Pin
          const dotSize = isSelected ? "14px" : "9px";
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer">
              <!-- Touch / Click Place Name Label over Pin -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2 py-0.5 rounded-md shadow-lg border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
                ${placeName}
              </span>

              <!-- Vision Centre Dark-Colored Pin Dot -->
              <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${hubColor}; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 6px ${hubColor}dd, 0 1px 3px rgba(0,0,0,0.3); transition: transform 0.15s ease-out;" class="group-hover:scale-150 group-active:scale-150">
              </div>
            </div>
          `;
        }
      } else if (isPatientHub || isPatientDot) {
        const displayCount = (loc.metadata?.displayCount || loc.metadata?.totalPatients || 0) as number;
        const activeFilter = (loc.metadata?.activeFilter as string) || "all";

        // 3 Distinct Dark Colors:
        // Pay -> #1E3A8A (Dark Royal Blue)
        // Free -> #064E3B (Dark Emerald Green)
        // Camp -> #78350F (Dark Burnt Amber)
        let dotColor = "#1E3A8A";
        if (activeFilter === "free" || loc.metadata?.isFreeDot) {
          dotColor = "#064E3B";
        } else if (activeFilter === "camp" || loc.metadata?.isCampDot) {
          dotColor = "#78350F";
        } else if (activeFilter === "pay") {
          dotColor = "#1E3A8A";
        } else {
          dotColor = "#0F172A";
        }

        // Proportional Sizing Formula (Min 10px, Max 36px based on patient volume)
        const minSize = 10;
        const maxSize = 36;
        const logCount = Math.log10(Math.max(1, displayCount));
        const logMax = Math.log10(150000);
        const calculatedSize = Math.round(minSize + (logCount / logMax) * (maxSize - minSize));
        const dotSize = `${Math.min(maxSize, Math.max(minSize, calculatedSize))}px`;

        const distName = loc.city || loc.rawName || loc.name;

        el.innerHTML = `
          <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${distName}: ${displayCount.toLocaleString()}">
            <!-- Touch / Click Place Name & Count Label directly over Pin -->
            <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
              <span class="font-extrabold">${distName}:</span> <span style="color: ${dotColor}">${displayCount.toLocaleString()}</span>
            </span>

            <!-- Proportional Patient Pin Marker Circle -->
            <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 2px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 10px ${dotColor}dd, 0 2px 5px rgba(0,0,0,0.4);" class="transition-transform duration-150 group-hover:scale-125 group-active:scale-125">
            </div>
          </div>
        `;
      } else if (isStaffDot) {
        const dotColor = (loc.metadata?.color as string) || "#1E293B";
        const dotSize = isSelected ? "10px" : "6px";
        const distCount = (loc.metadata?.districtCount as number) || (loc.metrics?.["Staff Count"] as number) || 1;
        const distName = (loc as any).districtName || loc.metadata?.districtName || loc.city || loc.state;
        const titleText = `${distCount} ${distName}`;
        el.innerHTML = `
          <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${titleText}">
            <!-- Touch / Hover Label over Staff Dot -->
            <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2 py-0.5 rounded-md shadow-lg border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
              ${titleText}
            </span>
            <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 1px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 5px ${dotColor}bb, 0 1px 2px rgba(0,0,0,0.3); transition: transform 0.15s ease-out;" class="group-hover:scale-150 group-active:scale-150">
            </div>
          </div>
        `;
      } else if (isIhmsLoc) {
        // Server Chip Node Badge Pin for IHMS Client Location (Sky 700 #0369A1)
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="IHMS Client Location (${loc.city}, ${loc.country})">
            <!-- High-Tech Server Chip Node Badge -->
            <div class="w-5.5 h-5.5 rounded-lg bg-[#0369A1] border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="5" width="14" height="14" rx="2" />
                <rect x="9" y="9" width="6" height="6" fill="#FFFFFF" fill-opacity="0.3" />
                <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        `;
      } else if (isEyenotesLoc) {
        // Digital EMR Record Badge Pin for Eyenotes (Sky 700 #0369A1)
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="Eyenotes EMR: ${loc.rawName || loc.name} (${loc.city}, ${loc.country})">
            <!-- EMR Record Badge -->
            <div class="w-5.5 h-5.5 rounded-md bg-[#0369A1] border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        `;
      } else if (isVcmsLoc) {
        // VCMS Vision Centre Pin (Sky 700 #0369A1)
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="VCMS Vision Centre: ${loc.rawName || loc.name} (${loc.city}, ${loc.country})">
            <!-- VCMS Eye Pin Badge -->
            <div class="w-5.5 h-5.5 rounded-md bg-[#0369A1] border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" fill="#FFFFFF" fill-opacity="0.8" />
              </svg>
            </div>
          </div>
        `;
      } else if (isOneSystemActive) {
        // Compact Micro-Orb Pins for One System view with distinct rich dark colors
        const entityColors: Record<string, string> = {
          hospitals: "#1E3A8A",  // Rich Dark Royal Blue
          laico: "#042F2E",      // Rich Dark Deep Teal
          amrf: "#4C1D95",       // Rich Dark Deep Violet
          aurolab: "#78350F",    // Rich Dark Deep Amber/Bronze
          auroitech: "#7C2D12",  // Rich Dark Burnt Copper
          eyebank: "#064E3B",    // Rich Dark Emerald
        };
        const pointColor = entityColors[loc.entityId] || "#1E3A8A";
        const orbSize = isSelected ? "13px" : "8px";
        const orbShadow = `0 0 6px ${pointColor}, 0 1px 3px rgba(0,0,0,0.3)`;

        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group">
            <div style="width: ${orbSize}; height: ${orbSize}; background-color: ${pointColor}; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: ${orbShadow}; transition: all 0.2s ease-out;" class="group-hover:scale-150">
            </div>
          </div>
        `;
      } else if (isEyeBankLoc) {
        const isMainHub = loc.metadata?.isMainHub || loc.id.startsWith("eb_hub_");
        const isDistribution = loc.metadata?.isDistributionDestination || loc.subcategoryId === "distribution_network";
        const isDistributedSubcategoryActive = selectedSubcategoryId === "distributed";

        const distName = loc.city || loc.rawName || (loc.metadata?.district as string) || loc.name;
        const hubColor = (loc.metadata?.color as string) || "#991B1B";

        if (isMainHub) {
          // Distinct Base Eye Bank Centre Pin Badge with Hub Name Label and Category Color
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto cursor-pointer z-30" title="${loc.name}">
              <!-- Touch / Click / Hover District Name Label over Pin -->
              <span class="mb-1 text-[11px] font-black text-white px-2.5 py-1 rounded-lg shadow-2xl border border-white/40 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform ${isSelected ? 'scale-110 ring-2 ring-white opacity-100' : 'opacity-90 group-hover:opacity-100 group-active:opacity-100'}" style="background-color: ${hubColor}">
                <svg class="w-3 h-3 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h6M9 13h6M9 17h6"/>
                </svg>
                <span>${distName}</span>
              </span>

              <!-- Large Eye Bank Base Hub Building Badge Pin -->
              <div class="w-8 h-8 rounded-xl border-2 border-white shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-125" style="background-color: ${hubColor}">
                <svg class="w-4.5 h-4.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                  <circle cx="12" cy="12" r="3" fill="#FFFFFF" fill-opacity="0.9" />
                </svg>
              </div>
            </div>
          `;
        } else if (isDistribution) {
          // Distribution Destination Pin with District Name on Hover & Dual 50/50 Split Gradient for Shared Hubs
          const isShared = loc.metadata?.isShared;
          const bgStyle = (loc.metadata?.gradientStyle as string) || (loc.metadata?.primaryColor as string) || "#312E81";

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${distName}">
              <!-- Touch / Click / Hover District Name Label directly over Pin -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
                <span class="font-extrabold">${distName}</span>${isShared ? ' <span class="text-[9px] text-amber-700 font-bold">(Shared Hub)</span>' : ''}
              </span>

              <!-- Distribution Node Circular Pin Dot with Dual 50/50 CSS Split Gradient for Shared Destinations -->
              <div style="width: 13px; height: 13px; background: ${bgStyle}; border: 2px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 8px rgba(0,0,0,0.4), 0 1.5px 4px rgba(0,0,0,0.35); transition: transform 0.15s ease-out;" class="group-hover:scale-135 group-active:scale-135">
              </div>
            </div>
          `;
        } else {
          // Collection Centre Pin with District Name on Hover & Dual 50/50 Split Gradient for Shared Hubs
          const isShared = loc.metadata?.isShared;
          const bgStyle = (loc.metadata?.gradientStyle as string) || (loc.metadata?.primaryColor as string) || "#064E3B";

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${distName}">
              <!-- Touch / Click / Hover District Name Label directly over Pin -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
                <span class="font-extrabold">${distName}</span>${isShared ? ' <span class="text-[9px] text-amber-700 font-bold">(Shared Hub)</span>' : ''}
              </span>

              <!-- Collection Node Circular Pin Dot with Dual 50/50 CSS Split Gradient for Shared Centres -->
              <div style="width: 14px; height: 14px; background: ${bgStyle}; border: 2px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 8px rgba(0,0,0,0.4), 0 1.5px 4px rgba(0,0,0,0.35); transition: transform 0.15s ease-out;" class="group-hover:scale-135 group-active:scale-135">
              </div>
            </div>
          `;
        }
      } else if (loc.entityId === "laico") {
        const isCbDot = loc.subcategoryId === "capacity_building";

        if (isCbDot) {
          // 2. CAPACITY BUILDING MENTORED HOSPITAL DOT (Dark Emerald Green #064E3B)
          const partnerCount = (loc.metadata?.partnerCount as number) || (loc.metrics?.hospitalCount as number) || 1;
          const distName = loc.city || (loc.metadata?.district as string) || loc.name;
          const dotColor = "#064E3B"; // Dark Emerald Green matching menu
          
          // Scaled dot size (11px for 1 partner up to 20px for 9 partners)
          const baseSize = 11;
          const calculatedSize = baseSize + Math.min(9, partnerCount - 1) * 1.2;
          const dotSize = `${calculatedSize}px`;

          const countBadge = partnerCount > 1 ? `<span style="color: ${dotColor}">: ${partnerCount}</span>` : '';

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${distName} (${loc.country}): ${partnerCount} Capacity Building Partner${partnerCount > 1 ? 's' : ''}">
              <!-- Touch / Click / Hover District Name Label directly over Pin -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
                <span class="font-extrabold">${distName}</span>${countBadge}
              </span>

              <!-- Dark Emerald Pin Marker Dot -->
              <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 8px ${dotColor}dd, 0 1.5px 4px rgba(0,0,0,0.35); transition: transform 0.15s ease-out;" class="group-hover:scale-125 group-active:scale-125">
              </div>
            </div>
          `;
        } else {
          // LAICO TRAINING PROGRAMME STATE/COUNTRY HUB WITH COUNT OVER PIN
          const categoryColors: Record<string, string> = {
            management_courses: "#0D9488",
            long_term_trainees: "#3B82F6",
            short_term_trainees: "#F59E0B",
            post_graduates: "#8B5CF6",
            technicians: "#E11D48",
            paramedics: "#06B6D4",
          };
          const dotColor = (loc.metadata?.color as string) || categoryColors[loc.subcategoryId] || "#F59E0B";

          const traineeCount = (loc.metadata?.traineeCount as number) || (loc.metrics?.["Trainees Count"] as number) || 1;
          const placeName = loc.rawName || loc.city || loc.state || loc.name;

          // Scaled dot size (11px to 26px based on trainee volume)
          const minSize = 11;
          const maxSize = 26;
          const logCount = Math.log10(Math.max(1, traineeCount));
          const logMax = Math.log10(250);
          const calculatedSize = Math.round(minSize + (logCount / logMax) * (maxSize - minSize));
          const dotSize = `${Math.min(maxSize, Math.max(minSize, calculatedSize))}px`;

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${placeName}: ${traineeCount} Fellows">
              <!-- Touch / Click / Hover Place Name & Count Label directly over Pin -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
                <span class="font-extrabold">${placeName}:</span> <span style="color: ${dotColor}" class="font-black">${traineeCount} Fellows</span>
              </span>

              <!-- Training Programme Pin Marker Dot with matching Category Color -->
              <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 10px ${dotColor}dd, 0 2px 5px rgba(0,0,0,0.35); transition: transform 0.15s ease-out;" class="group-hover:scale-130 group-active:scale-130">
              </div>
            </div>
          `;
        }
      } else if (loc.entityId === "staffs" || loc.type === "Staff State Dot") {
        const staffCategoryColors: Record<string, string> = {
          admin: "#1E293B",
          doctors: "#065F46",
          post_graduates: "#3730A3",
          aop: "#312E81",
          support: "#701A75",
        };
        const dotColor = (loc.metadata?.color as string) || staffCategoryColors[loc.metadata?.category as string] || "#1E293B";
        const count = (loc.metadata?.traineeCount as number) || (loc.metrics?.["Employees Count"] as number) || (loc.metrics?.["Trainees Count"] as number) || 1;
        const stateName = loc.rawName || loc.state || loc.city || loc.name;
        const catName = (loc.metadata?.categoryName as string) || (loc.metrics?.Category as string) || "Staff";

        // Scaled dot size (12px to 28px based on staff volume)
        const minSize = 12;
        const maxSize = 28;
        const logCount = Math.log10(Math.max(1, count));
        const logMax = Math.log10(2500);
        const calculatedSize = Math.round(minSize + (logCount / logMax) * (maxSize - minSize));
        const dotSize = `${Math.min(maxSize, Math.max(minSize, calculatedSize))}px`;

        el.innerHTML = `
          <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${stateName}: ${count.toLocaleString()} ${catName}">
            <!-- Touch / Click / Hover State Name & Count Label directly over Pin -->
            <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-slate-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-slate-900 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
              <span class="font-extrabold">${stateName}:</span> <span style="color: ${dotColor}" class="font-black">${count.toLocaleString()} ${catName}</span>
            </span>

            <!-- Staff Pin Marker Dot with matching Category Dark Color -->
            <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 10px ${dotColor}dd, 0 2px 5px rgba(0,0,0,0.35); transition: transform 0.15s ease-out;" class="group-hover:scale-130 group-active:scale-130">
            </div>
          </div>
        `;
      } else if (loc.entityId === "amrf") {
        const isHq = loc.id === "amrf_hq" || loc.metadata?.isHq;
        const isCollaborator = loc.metadata?.isCollaborator || loc.subcategoryId === "collaboratives";
        const isStudentAbroad = loc.metadata?.isStudentAbroad || loc.subcategoryId === "students_abroad";
        const isOngoing = loc.metadata?.status === "ongoing" || loc.subcategoryId === "ongoing_phd";

        if (isHq) {
          // 1. DISTINCT AMRF RESEARCH HQ PIN AT MADURAI (Rich Dark Deep Purple)
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${loc.name}">
              <!-- HQ Floating Label Badge displaying AMRF Research HQ (Madurai) -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[11px] font-black text-white bg-purple-950/95 px-3 py-1 rounded-lg shadow-2xl border-2 border-purple-500 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-2 h-2 rounded-full bg-purple-400"></span>
                       <span>AMRF Research HQ (Madurai)</span>
                     </span>`
                  : ""
              }

              <!-- Central HQ Pin Badge -->
              <div class="w-8 h-8 rounded-full bg-purple-900 border-2 border-purple-400 shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-125">
                <svg class="w-4.5 h-4.5 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 18h12M12 2v14M8 10l4-4 4 4" />
                </svg>
              </div>
            </div>
          `;
        } else if (isCollaborator) {
          // 2. GLOBAL UNIVERSITY / INSTITUTION COLLABORATOR PIN (Rich Dark Deep Indigo)
          const instName = loc.metadata?.institutionName || loc.rawName || loc.name;
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${instName} (${loc.city}, ${loc.country})">
              <!-- University / Institution Floating Label -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[10px] font-black text-slate-100 bg-indigo-950/95 px-2.5 py-1 rounded-lg shadow-xl border border-indigo-500/50 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                       <span>${instName}</span>
                     </span>`
                  : ""
              }

              <!-- Academic Cap / University Badge -->
              <div class="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-indigo-900 to-indigo-950 border-2 border-indigo-400 shadow-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-130">
                <svg class="w-3.5 h-3.5 text-indigo-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
            </div>
          `;
        } else if (isStudentAbroad) {
          // 3. INTERNATIONAL STUDENT / FELLOW PIN (Rich Dark Deep Amber/Bronze)
          const instName = loc.metadata?.institutionName || loc.rawName || loc.name;
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${instName} (${loc.city}, ${loc.country})">
              <!-- Institution Floating Label Badge -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[10px] font-black text-slate-100 bg-amber-950/95 px-2.5 py-1 rounded-lg shadow-xl border border-amber-600/50 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                       <span>${instName}</span>
                     </span>`
                  : ""
              }

              <!-- International Fellow Badge -->
              <div class="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-amber-900 to-stone-950 border-2 border-amber-500 shadow-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-130">
                <svg class="w-3.5 h-3.5 text-amber-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6a6 6 0 0 0-6 6c0 3.31 6 9 6 9s6-5.69 6-9a6 6 0 0 0-6-6z"/>
                </svg>
              </div>
            </div>
          `;
        } else if (isOngoing) {
          // 3. ONGOING Ph.D. SCHOLAR (Dark Pink #9D174D matching menu)
          const cityName = loc.city || loc.metadata?.city || loc.state;
          const count = (loc.metadata?.count as number) || 1;

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-30" title="${cityName}: ${count} Ongoing Ph.D. Scholar${count > 1 ? 's' : ''}">
              <!-- City & Count Label Badge - Visible when clicked or hovered -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-0.5 rounded-lg shadow-xl border border-pink-300 whitespace-nowrap flex items-center gap-1.5 transition-all duration-150 ${isSelected ? 'opacity-100 ring-2 ring-[#9D174D] scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} pointer-events-none">
                <span class="w-2 h-2 rounded-full bg-[#9D174D]"></span>
                <span>${cityName}</span> <span class="text-[#9D174D] font-extrabold">(${count})</span>
              </span>

              <!-- Sleek Ongoing Ph.D. Dark Pin Marker (#9D174D) -->
              <div class="w-5 h-5 rounded-full bg-[#9D174D] border-2 border-white shadow-xl relative transition-transform duration-200 group-hover:scale-130 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-white opacity-80"></div>
              </div>
            </div>
          `;
        } else {
          // 4. COMPLETED Ph.D. SCHOLAR (Dark Cyan #155E75 matching menu)
          const cityName = loc.city || loc.metadata?.city || loc.state;
          const count = (loc.metadata?.count as number) || 1;

          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-30" title="${cityName}: ${count} Completed Ph.D. Scholar${count > 1 ? 's' : ''}">
              <!-- City & Count Label Badge - Visible when clicked or hovered -->
              <span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-0.5 rounded-lg shadow-xl border border-cyan-300 whitespace-nowrap flex items-center gap-1.5 transition-all duration-150 ${isSelected ? 'opacity-100 ring-2 ring-[#155E75] scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} pointer-events-none">
                <span class="w-2 h-2 rounded-full bg-[#155E75]"></span>
                <span>${cityName}</span> <span class="text-[#155E75] font-extrabold">(${count})</span>
              </span>

              <!-- Sleek Completed Ph.D. Dark Pin Marker (#155E75) -->
              <div class="w-5 h-5 rounded-full bg-[#155E75] border-2 border-white shadow-xl relative transition-transform duration-200 group-hover:scale-130 flex items-center justify-center">
                <div class="w-2 h-2 rounded-full bg-white opacity-80"></div>
              </div>
            </div>
          `;
        }
      } else if (isAurolabLoc) {
        const isDomestic = loc.subcategoryId === "domestic" || loc.country === "India";
        const placeName = isDomestic ? (loc.city || loc.rawName || loc.name) : (loc.country || loc.city || loc.name);

        el.innerHTML = `
          <div class="relative flex flex-col items-center justify-center pointer-events-auto group cursor-pointer z-20" title="${placeName}">
            <!-- Touch / Click / Hover Place Name Label directly over Pin -->
            <span class="mb-1 text-[10px] font-black text-amber-950 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-amber-300 whitespace-nowrap ${isSelected ? 'opacity-100 ring-2 ring-amber-700 scale-105' : 'opacity-0 group-hover:opacity-100 group-active:opacity-100'} transition-all duration-150 pointer-events-none">
              <span class="font-extrabold text-amber-900">${placeName}</span>
            </span>

            <!-- Central Optic Lens Ring & Curved Haptic Loops Pin Icon -->
            <div class="relative w-8 h-8 flex items-center justify-center transition-transform duration-150 group-hover:scale-125 group-active:scale-125">
              <!-- Left Curved Haptic Loop -->
              <svg class="absolute -left-2 w-4 h-4 text-amber-700 opacity-90 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10" />
              </svg>
              <!-- Central Optic Lens Ring -->
              <div class="w-4 h-4 rounded-full bg-amber-900 border-2 border-amber-600 shadow-md flex items-center justify-center relative overflow-hidden">
                <div class="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
              </div>
              <!-- Right Curved Haptic Loop -->
              <svg class="absolute -right-2 w-4 h-4 text-amber-700 opacity-90 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10" />
              </svg>
            </div>
          </div>
        `;
      } else {
        // CARE Centre & Standard Visual Hierarchy (Rich Dark Color Variations)
        let markerSize = isSelected ? "20px" : "12px";
        let markerBg = "#1E3A8A"; // Dark Royal Blue default
        let markerBorder = "2px solid #FFFFFF";
        let outerShadow = "0 2px 6px rgba(0,0,0,0.3)";

        if (loc.careType === "tertiary") {
          markerSize = isSelected ? "22px" : "18px";
          markerBg = "#1E3A8A"; // Rich Dark Royal Blue (Tertiary Care Hospital)
          markerBorder = "2.5px solid #FFFFFF";
          outerShadow = "0 0 0 4px rgba(30,58,138,0.4), 0 3px 8px rgba(0,0,0,0.3)";
        } else if (loc.careType === "secondary") {
          markerSize = isSelected ? "18px" : "14px";
          markerBg = "#312E81"; // Rich Dark Indigo (Secondary Care Hospital)
          markerBorder = "2px solid #FFFFFF";
          outerShadow = "0 0 0 3px rgba(49,46,129,0.35), 0 2px 6px rgba(0,0,0,0.25)";
        } else if (loc.careType === "community") {
          markerSize = isSelected ? "14px" : "10px";
          markerBg = "#065F46"; // Rich Dark Teal Green (Community Eye Clinic)
          markerBorder = "2px solid #FFFFFF";
          outerShadow = "0 1px 4px rgba(6,95,70,0.4)";
        } else if (loc.careType === "vision_centre") {
          markerSize = isSelected ? "12px" : "7px";
          markerBg = "#064E3B"; // Rich Dark Emerald (Vision Centre)
          markerBorder = "1.5px solid #FFFFFF";
          outerShadow = "0 0 4px rgba(6,78,59,0.8)";
        }

        const labelText = loc.rawName || loc.city || loc.name;
        // Only prefix "AEH-" to Eye Hospitals (Tertiary, Secondary, Community clinics)
        const isEyeHospital = loc.entityId === "hospitals" || !!loc.careType;
        const displayLabel = isEyeHospital
          ? (labelText.startsWith("AEH-") ? labelText : `AEH-${labelText}`)
          : labelText;

        const isVisionCentre = loc.careType === "vision_centre" || loc.subcategoryId === "hospitals_vision_centres";
        const showLabel = !isOneSystem && !hidePinLabels && entityConfig.id !== "all" && !isVisionCentre;

        el.innerHTML = `
          <div class="relative flex flex-col items-center justify-center pointer-events-auto">
            ${
              showLabel
                ? `<span class="mb-1 text-[10px] font-black text-slate-800 bg-white/95 px-2 py-0.5 rounded-md shadow-md border border-slate-200/90 whitespace-nowrap tracking-wide pointer-events-none">
                     ${displayLabel}
                   </span>`
                : ""
            }
            <div style="width: ${markerSize}; height: ${markerSize}; background-color: ${markerBg}; border: ${markerBorder}; border-radius: 9999px; box-shadow: ${outerShadow}; transition: all 0.2s ease-out;">
            </div>
          </div>
        `;
      }

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectLocation(loc);

        map.flyTo({
          center: [loc.longitude, loc.latitude],
          zoom: Math.max(map.getZoom(), 6.8),
          duration: 1000,
        });

        if (popupRef.current) popupRef.current.remove();

        const isEyeBank = loc.entityId === "eyebank";
        const isAurolab = entityConfig?.id === "aurolab" || activeGrammar === "distribution";
        const displayName = loc.rawName || loc.name;
        
        let popTitle = displayName;
        let popSub = `${loc.city}, ${loc.state}`;

        const isIhmsLoc = loc.subcategoryId === "ihms";
        const isEyenotesLoc = loc.subcategoryId === "eyenotes";
        const isVcmsLoc = loc.subcategoryId === "vcms";
        if (loc.type === "Patient Dot" || loc.type === "Patient Hub" || loc.subcategoryId === "patients") {
          const pay = ((loc.metadata?.payCount || 0) as number).toLocaleString();
          const free = ((loc.metadata?.freeCount || 0) as number).toLocaleString();
          const camp = ((loc.metadata?.campCount || 0) as number).toLocaleString();
          const totalP = ((loc.metadata?.totalPatients || 0) as number).toLocaleString();

          popTitle = `${loc.name} Patients`;
          popSub = `Pay: ${pay} · Free: ${free} · Camp: ${camp} (Total: ${totalP})`;
        } else if (loc.type === "Staff Dot") {
          const groupName = (loc as any).staffGroup === "employees" ? "Employee" : "Trainee";
          popTitle = `${loc.metrics?.category || loc.metadata?.category || "Staff"} (${groupName})`;
          popSub = `District of Origin: ${(loc as any).districtName || loc.metadata?.districtName || loc.city}, Tamil Nadu`;
        } else if (isIhmsLoc) {
          popTitle = "IHMS Client Location";
          popSub = `${loc.city}${loc.state ? ", " + loc.state : ""}, ${loc.country}`;
        } else if (isEyenotesLoc) {
          popTitle = `Eyenotes EMR: ${loc.rawName || loc.name}`;
          popSub = `${loc.city}${loc.state ? ", " + loc.state : ""}, ${loc.country}`;
        } else if (isVcmsLoc) {
          popTitle = `VCMS: ${loc.rawName || loc.name}`;
          popSub = `${loc.city}${loc.state ? ", " + loc.state : ""}, ${loc.country}`;
        } else if (isEyeBank) {
          const isMainHub = loc.metadata?.isMainHub || loc.id.startsWith("eb_hub_");
          if (isMainHub) {
            popTitle = loc.name;
            popSub = `Main Eye Bank Hub · ${loc.city}, ${loc.state}`;
          } else {
            popTitle = `${loc.rawName || loc.city} Collection Centre`;
            popSub = `Attached Hub: ${loc.metadata?.attachedMainCenter || "Main Eye Bank"}`;
          }
        } else if (isAurolab) {
          const isDomestic = loc.subcategoryId === "domestic" || loc.country === "India";
          const placeName = isDomestic ? (loc.city || loc.rawName || loc.name) : (loc.country || loc.city || loc.name);
          if (isDomestic) {
            popTitle = `${placeName} District`;
            popSub = `Aurolab Domestic Distribution Node · ${loc.state}, India`;
          } else {
            popTitle = placeName;
            popSub = `Aurolab International Distribution · ${loc.state}`;
          }
        } else if (loc.entityId === "laico") {
          const isCb = loc.subcategoryId === "capacity_building";
          if (isCb) {
            popTitle = `${loc.city} Partner Hub`;
            popSub = `Mentored Hospital · ${loc.state ? loc.state + ", " : ""}${loc.country}`;
          } else {
            const placeName = loc.rawName || loc.city || loc.state || loc.name;
            const count = (loc.metadata?.traineeCount as number) || (loc.metrics?.["Trainees Count"] as number) || 1;
            const catName = (loc.metrics?.Category as string) || "Training Programme";
            popTitle = `${placeName}: ${count} Trainees`;
            popSub = `LAICO ${catName} · ${loc.country}`;
          }
        } else if (loc.entityId === "amrf" && (loc.subcategoryId === "phd_completed" || loc.subcategoryId === "ongoing_phd")) {
          const isCompleted = loc.subcategoryId === "phd_completed";
          const cityName = loc.city || loc.metadata?.city || loc.state;
          const count = (loc.metadata?.count as number) || 1;
          const thesesList = (loc.metadata?.thesesList as string[]) || [loc.metadata?.thesisTitle || loc.name];
          const badgeColor = isCompleted ? "text-[#155E75]" : "text-[#9D174D]";

          popTitle = `${cityName} (${count} ${isCompleted ? "Completed" : "Ongoing"} Ph.D. ${count > 1 ? "Theses" : "Thesis"})`;
          
          const itemsList = thesesList.map((t, idx) => `
            <div class="py-1 border-b border-slate-100 last:border-0 flex items-start gap-1.5">
              <span class="font-black ${badgeColor} shrink-0 text-[10px]">${idx + 1}.</span>
              <span class="text-slate-700 text-[10px] font-semibold leading-tight">${t}</span>
            </div>
          `).join("");

          popSub = `<div class="max-h-56 overflow-y-auto pr-1 mt-1 font-sans space-y-0.5 pointer-events-auto select-text" style="overscroll-behavior: contain;">${itemsList}</div>`;
        } else if (loc.entityId === "staffs" || loc.type === "Staff State Dot") {
          const stateName = loc.rawName || loc.state || loc.city || loc.name;
          const count = (loc.metadata?.traineeCount as number) || (loc.metrics?.["Employees Count"] as number) || (loc.metrics?.["Trainees Count"] as number) || 1;
          const catName = (loc.metadata?.categoryName as string) || (loc.metrics?.Category as string) || "Staff";
          popTitle = `${stateName}: ${count.toLocaleString()} ${catName}`;
          popSub = `Aravind Staffs Directory · ${loc.country || "India"}`;
        }
          
        if (loc.establishedYear && !isAurolab && !isEyeBank && loc.subcategoryId !== "phd_completed" && loc.subcategoryId !== "ongoing_phd") {
          popSub += ` · Est. ${loc.establishedYear}`;
        }

        const typeBadge = loc.careType
          ? `<span class="px-1.5 py-0.5 text-[9px] font-extrabold uppercase rounded tracking-wider ${
              loc.careType === "tertiary"
                ? "bg-blue-600 text-white"
                : loc.careType === "secondary"
                ? "bg-blue-500 text-white"
                : "bg-sky-400 text-slate-900"
            }">${loc.careType}</span>`
          : "";

        const popupDom = document.createElement("div");
        popupDom.className =
          "px-3 py-2 bg-white/95 text-slate-900 rounded-lg shadow-xl text-xs font-bold border border-slate-200 pointer-events-auto min-w-[200px] max-w-xs";
        popupDom.innerHTML = `
          <div class="flex items-center justify-between gap-2 mb-0.5 border-b border-slate-200 pb-1">
            <span class="text-xs font-black text-slate-900 leading-tight">${popTitle}</span>
            ${typeBadge}
          </div>
          <div class="text-[10px] text-slate-500 font-medium">${popSub}</div>
        `;

        popupRef.current = new maplibregl.Popup({ offset: 14, closeButton: false })
          .setLngLat([loc.longitude, loc.latitude])
          .setDOMContent(popupDom)
          .addTo(map);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map);

      locationMarkersRef.current.push(marker);
    });
  }, [
    mapLoaded,
    selectedState,
    stateAggregations,
    locations,
    entityConfig,
    selectedLocation,
    activeGrammar,
    careTypeFilter,
    revealMaxYear,
    isOneSystem,
    hidePinLabels,
    selectedSubcategoryId,
    visionCentreHubFilter,
  ]);

  // Handle Camera Transitions for Geographic Levels (World -> Country -> State -> City)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (geographicLevel === "world") {
      map.flyTo({ center: [20.0, 15.0], zoom: 2.2, duration: 1200 });
      return;
    }

    if (!selectedState) {
      if (entityConfig.id === "eyebank") {
        if (selectedSubcategoryId === "distributed") {
          // Fit camera to full India extent so all national distribution destination nodes fit in view
          map.fitBounds(
            [
              [71.5, 7.5],   // SW: Gujarat coast / Southerntip
              [89.5, 31.5],  // NE: West Bengal / Haridwar / Delhi
            ],
            {
              padding: { top: 70, bottom: 70, left: 70, right: 70 },
              maxZoom: 5.2,
              duration: 1200,
            }
          );
          return;
        } else {
          // Tight South India camera focus for Eye Bank Collection Network
          map.fitBounds(
            [
              [76.2, 7.8],   // SW: Kanyakumari / Southern tip
              [80.6, 14.2],  // NE: Tirupati / Chennai region
            ],
            {
              padding: { top: 60, bottom: 60, left: 60, right: 60 },
              maxZoom: 7.8,
              duration: 1200,
            }
          );
          return;
        }
      }

      if (entityConfig.id === "amrf" && (selectedSubcategoryId === "phd_completed" || selectedSubcategoryId === "ongoing_phd")) {
        // Tight South India / Tamil Nadu camera focus for AMRF Ph.D. scholars so pins land cleanly on solid land
        map.fitBounds(
          [
            [74.2, 7.8],   // SW: Trivandrum / Kerala
            [81.8, 14.5],  // NE: Northern Tamil Nadu / AP border
          ],
          {
            padding: { top: 60, bottom: 60, left: 60, right: 60 },
            maxZoom: 7.2,
            duration: 1200,
          }
        );
        return;
      }

      let filtered = locations;
      if (careTypeFilter && careTypeFilter !== "all") {
        filtered = filtered.filter(
          (l) =>
            l.careType === careTypeFilter ||
            l.type === "Staff Dot" ||
            l.type === "Patient Hub" ||
            l.subcategoryId === "patients"
        );
      }
      if (visionCentreHubFilter && visionCentreHubFilter !== "all") {
        filtered = filtered.filter((l) => l.metadata?.hospitalHub === visionCentreHubFilter);
      }
      if (revealMaxYear !== null && revealMaxYear !== undefined) {
        filtered = filtered.filter(
          (l) => !l.establishedYear || l.establishedYear <= revealMaxYear
        );
      }

      if (filtered.length > 0) {
        let minLng = 180,
          maxLng = -180,
          minLat = 90,
          maxLat = -90;

        filtered.forEach((l) => {
          if (l.longitude < minLng) minLng = l.longitude;
          if (l.longitude > maxLng) maxLng = l.longitude;
          if (l.latitude < minLat) minLat = l.latitude;
          if (l.latitude > maxLat) maxLat = l.latitude;
        });

        if (minLng < maxLng && minLat < maxLat) {
          map.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            {
              padding: { top: 70, bottom: 70, left: 70, right: 70 },
              maxZoom: 7.8,
              duration: 1200,
            }
          );
          return;
        }
      }

      map.flyTo({
        center: entityConfig?.defaultCenter || INDIA_CENTER,
        zoom: entityConfig?.defaultZoom || INDIA_DEFAULT_ZOOM,
        duration: 1200,
      });
    } else {
      const agg = stateAggregations.find((s) => s.stateName === selectedState);
      if (agg && agg.bounds) {
        map.fitBounds(agg.bounds, { padding: 90, duration: 1200 });
      } else if (agg) {
        map.flyTo({ center: agg.centroid, zoom: 7.2, duration: 1200 });
      }
    }
  }, [
    selectedState,
    entityConfig,
    mapLoaded,
    geographicLevel,
    locations,
    careTypeFilter,
    revealMaxYear,
    selectedSubcategoryId,
    visionCentreHubFilter,
  ]);

  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleResetView = () => {
    mapRef.current?.flyTo({
      center: entityConfig?.defaultCenter || INDIA_CENTER,
      zoom: entityConfig?.defaultZoom || INDIA_DEFAULT_ZOOM,
      duration: 1200,
    });
  };
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleSelectScope = (scope: "global" | "bangladesh" | "india" | "nepal") => {
    setActiveScope(scope);
    const map = mapRef.current;
    if (!map) return;

    if (scope === "global") {
      map.flyTo({ center: [20, 20], zoom: 2.2, duration: 1400 });
    } else if (scope === "bangladesh") {
      map.fitBounds([[88.0, 20.7], [92.6, 26.6]], { padding: 80, duration: 1400 });
    } else if (scope === "india") {
      map.fitBounds([[68.1, 8.0], [97.4, 35.5]], { padding: 70, maxZoom: 5.5, duration: 1400 });
    } else if (scope === "nepal") {
      map.fitBounds([[80.0, 26.3], [88.2, 30.5]], { padding: 90, maxZoom: 7.5, duration: 1400 });
    }
  };

  return (
    <div className="relative w-full h-full bg-[#E7EEF2] overflow-hidden select-none">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
