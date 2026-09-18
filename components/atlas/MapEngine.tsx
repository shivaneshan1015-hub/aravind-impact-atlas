"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { LIGHT_ATLAS_MAP_STYLE, hexToRgba, MapVarietyId } from "@/lib/map-utils";
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";
import { EYEBANK_DATA } from "@/data/eyebank/eyebank-data";
import { MapVarietySwitcher } from "@/components/atlas/MapVarietySwitcher";

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
  selectedSubcategoryId,
  modeGrammar = "auto",
  geographicLevel = "country",
  careTypeFilter = "all",
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
    } else if (activeVariety === "warm_ivory") {
      if (map.getLayer("basemap-ocean")) map.setLayoutProperty("basemap-ocean", "visibility", "visible");
    } else if (activeVariety === "voyager_topo") {
      if (map.getLayer("basemap-topo")) map.setLayoutProperty("basemap-topo", "visibility", "visible");
    } else if (activeVariety === "glassmorphic") {
      if (map.getLayer("basemap-dark")) map.setLayoutProperty("basemap-dark", "visibility", "visible");
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
      // Add local India States GeoJSON vector source
      map.addSource("india-states-source", {
        type: "geojson",
        data: "/maps/india/states.geojson",
      });

      // Layer 1: Vector Fill layer for states (subtle quiet overlay)
      map.addLayer({
        id: "india-states-fill",
        type: "fill",
        source: "india-states-source",
        paint: {
          "fill-color": entityConfig?.color || "#EA580C",
          "fill-opacity": 0.12,
        },
      });



      // State polygon click handler (pointer cursor only, no outline lines)
      map.on("mousemove", "india-states-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "india-states-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      map.on("click", "india-states-fill", (e) => {
        if (e.features && e.features.length > 0) {
          const stName = e.features[0].properties?.ST_NM;
          if (stName) {
            onSelectState(stName);
          }
        }
      });

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

      EYEBANK_DATA.forEach((item) => {
        if (item.metadata?.isDistributionDestination || item.subcategoryId === "distribution_network") {
          const mainHub = EYEBANK_DATA.find(
            (h) =>
              h.metadata?.isMainHub &&
              (h.name === item.metadata?.sourceHubName ||
                h.rawName === item.metadata?.sourceHubName ||
                (h as any).centerName === item.metadata?.sourceHubName)
          );
          if (mainHub) {
            const dist = Math.hypot(item.longitude - mainHub.longitude, item.latitude - mainHub.latitude);
            if (dist > 0.001) {
              eyeBankDistributionFeatures.push({
                type: "Feature",
                properties: {
                  hubName: mainHub.name,
                  destCity: item.city,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [mainHub.longitude, mainHub.latitude],
                    [item.longitude, item.latitude],
                  ],
                },
              });
            }
          }
        } else if (!item.metadata?.isMainHub && item.metadata?.attachedMainCenter) {
          const mainHub = EYEBANK_DATA.find(
            (h) =>
              h.metadata?.isMainHub &&
              (h.name === item.metadata?.attachedMainCenter ||
                h.rawName === item.metadata?.attachedMainCenter)
          );
          if (mainHub) {
            const dist = Math.hypot(item.longitude - mainHub.longitude, item.latitude - mainHub.latitude);
            if (dist > 0.001) {
              eyeBankCollectionFeatures.push({
                type: "Feature",
                properties: {
                  hubName: mainHub.name,
                  collCity: item.city,
                },
                geometry: {
                  type: "LineString",
                  coordinates: [
                    [item.longitude, item.latitude],
                    [mainHub.longitude, mainHub.latitude],
                  ],
                },
              });
            }
          }
        }
      });

      // Collection Network Source & Dotted Layer (Emerald Green)
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
          "line-color": "#059669",
          "line-width": 2.5,
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
          "line-color": "#0284C7",
          "line-width": 2.5,
          "line-opacity": 0.85,
          "line-dasharray": [6, 3],
        },
        layout: { visibility: "none" },
      });

      setMapLoaded(true);
    });

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update State Fill Density colors based on count aggregations
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    const themeColor = entityConfig?.color || "#EA580C";

    const matchExpression: any[] = ["match", ["get", "ST_NM"]];
    stateAggregations.forEach((s) => {
      let opacity = 0.12;
      if (s.count >= 6) opacity = 0.32;
      else if (s.count >= 3) opacity = 0.22;

      matchExpression.push(s.stateName, hexToRgba(themeColor, opacity));
    });
    matchExpression.push("rgba(0, 0, 0, 0)");

    if (map.getLayer("india-states-fill")) {
      map.setPaintProperty("india-states-fill", "fill-color", matchExpression);
    }
  }, [mapLoaded, stateAggregations, entityConfig]);

  // Toggle Map Variety Styles, Basemaps, and Boundary Outline Colors
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    // Hide all basemaps first
    const basemaps = ["basemap-light", "basemap-dark", "basemap-topo", "basemap-ocean"];
    basemaps.forEach((b) => {
      if (map.getLayer(b)) map.setLayoutProperty(b, "visibility", "none");
    });

    if (activeVariety === "teal_coastal") {
      // 1. Electric Teal & Chalk
      if (map.getLayer("basemap-light")) map.setLayoutProperty("basemap-light", "visibility", "visible");
      if (map.getLayer("india-states-outline")) {
        map.setPaintProperty("india-states-outline", "line-color", "#0D9488");
        map.setPaintProperty("india-states-outline", "line-width", 2.0);
        map.setPaintProperty("india-states-outline", "line-opacity", 0.90);
      }
    } else if (activeVariety === "warm_ivory") {
      // 2. Warm Ivory & Cobalt (Healthcare Palette)
      if (map.getLayer("basemap-ocean")) map.setLayoutProperty("basemap-ocean", "visibility", "visible");
      if (map.getLayer("india-states-outline")) {
        map.setPaintProperty("india-states-outline", "line-color", "#1E3A8A");
        map.setPaintProperty("india-states-outline", "line-width", 2.0);
        map.setPaintProperty("india-states-outline", "line-opacity", 0.90);
      }
    } else if (activeVariety === "voyager_topo") {
      // 3. Voyager Topo Terrain
      if (map.getLayer("basemap-topo")) map.setLayoutProperty("basemap-topo", "visibility", "visible");
      if (map.getLayer("india-states-outline")) {
        map.setPaintProperty("india-states-outline", "line-color", "#059669");
        map.setPaintProperty("india-states-outline", "line-width", 2.0);
        map.setPaintProperty("india-states-outline", "line-opacity", 0.90);
      }
    } else if (activeVariety === "glassmorphic") {
      // 4. Glassmorphic Midnight
      if (map.getLayer("basemap-dark")) map.setLayoutProperty("basemap-dark", "visibility", "visible");
      if (map.getLayer("india-states-outline")) {
        map.setPaintProperty("india-states-outline", "line-color", "#38BDF8");
        map.setPaintProperty("india-states-outline", "line-width", 2.0);
        map.setPaintProperty("india-states-outline", "line-opacity", 0.95);
      }
    }
  }, [mapLoaded, activeVariety]);

  // Toggle Vector Grammar Layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (map.getLayer("laico-network-layer")) {
      map.setLayoutProperty(
        "laico-network-layer",
        "visibility",
        activeGrammar === "capacity" || entityConfig.id === "laico" ? "visible" : "none"
      );
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
          isDistributedOnly ? "none" : "visible"
        );
      }
      if (map.getLayer("eyebank-distribution-layer")) {
        map.setLayoutProperty(
          "eyebank-distribution-layer",
          "visibility",
          isCollectedOnly ? "none" : "visible"
        );
      }
    } else {
      if (map.getLayer("eyebank-flow-layer")) {
        map.setLayoutProperty("eyebank-flow-layer", "visibility", "none");
      }
      if (map.getLayer("eyebank-distribution-layer")) {
        map.setLayoutProperty("eyebank-distribution-layer", "visibility", "none");
      }
    }
  }, [mapLoaded, entityConfig.id, activeGrammar, selectedSubcategoryId]);

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

    const themeColor = entityConfig?.color || "#EA580C";

    // 1. State filter
    let filtered = selectedState
      ? locations.filter((l) => l.state === selectedState)
      : locations;

    // 2. CARE Type filter (Skip for Staff Dots so staff dots always render)
    if (careTypeFilter !== "all") {
      filtered = filtered.filter((l) => l.careType === careTypeFilter || l.type === "Staff Dot");
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

      const isStaffDot = loc.type === "Staff Dot";
      const isAurolabLoc = loc.entityId === "aurolab";
      const isEyeBankLoc = loc.entityId === "eyebank";
      const isIhmsLoc = loc.subcategoryId === "ihms";
      const isEyenotesLoc = loc.subcategoryId === "eyenotes";
      const isVcmsLoc = loc.subcategoryId === "vcms";
      const isOneSystemActive = isOneSystem || entityConfig.id === "all";

      if (isStaffDot) {
        const dotColor = loc.metadata?.color || "#2563EB";
        const dotSize = isSelected ? "10px" : "6px";
        const catName = loc.metrics?.category || loc.metadata?.category || "Staff";
        const distName = (loc as any).districtName || loc.metadata?.districtName || loc.city || loc.state;
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="${catName} (${distName})">
            <div style="width: ${dotSize}; height: ${dotSize}; background-color: ${dotColor}; border: 1px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 5px ${dotColor}bb, 0 1px 2px rgba(0,0,0,0.3); transition: transform 0.15s ease-out;" class="group-hover:scale-150">
            </div>
          </div>
        `;
      } else if (isIhmsLoc) {
        // High-Tech Cyber Amber IT Chip Node Pin for IHMS Client Location
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="IHMS Client Location (${loc.city}, ${loc.country})">
            <!-- Dual Concentric Tech Scanning Pulse Rings -->
            <div class="absolute w-8 h-8 rounded-full bg-orange-500/35 border border-orange-400/60 animate-ping opacity-85 pointer-events-none"></div>
            <div class="absolute w-5 h-5 rounded-full bg-amber-400/25 border border-amber-300/40 animate-pulse pointer-events-none"></div>

            <!-- High-Tech Server Chip Node Badge -->
            <div class="w-5.5 h-5.5 rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3.5 h-3.5 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="5" y="5" width="14" height="14" rx="2" />
                <rect x="9" y="9" width="6" height="6" fill="#FFFFFF" fill-opacity="0.3" />
                <path d="M9 1v4M15 1v4M9 19v4M15 19v4M1 9h4M1 15h4M19 9h4M19 15h4" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        `;
      } else if (isEyenotesLoc) {
        // Digital Cyan-Turquoise EMR Record Badge Pin for Eyenotes
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="Eyenotes EMR: ${loc.rawName || loc.name} (${loc.city}, ${loc.country})">
            <!-- Micro Pulse Scanning Halo Ring -->
            <div class="absolute w-7 h-7 rounded-full bg-cyan-500/40 border border-cyan-400/60 animate-ping opacity-85 pointer-events-none"></div>
            <div class="absolute w-5 h-5 rounded-full bg-teal-400/25 border border-teal-300/40 animate-pulse pointer-events-none"></div>

            <!-- EMR Record Badge -->
            <div class="w-5.5 h-5.5 rounded-md bg-gradient-to-br from-cyan-500 to-teal-600 border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3 h-3 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke-linecap="round" />
              </svg>
            </div>
          </div>
        `;
      } else if (isVcmsLoc) {
        // VCMS Vision Centre Pin - Emerald Vision Node Pin
        el.innerHTML = `
          <div class="relative flex items-center justify-center pointer-events-auto group" title="VCMS Vision Centre: ${loc.rawName || loc.name} (${loc.city}, ${loc.country})">
            <!-- Vision Scanning Pulse Rings -->
            <div class="absolute w-7 h-7 rounded-full bg-emerald-500/40 border border-emerald-400/60 animate-ping opacity-85 pointer-events-none"></div>
            <div class="absolute w-5 h-5 rounded-full bg-teal-400/25 border border-teal-300/40 animate-pulse pointer-events-none"></div>

            <!-- VCMS Eye Pin Badge -->
            <div class="w-5.5 h-5.5 rounded-md bg-gradient-to-br from-emerald-500 to-teal-600 border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
              <svg class="w-3 h-3 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                <circle cx="12" cy="12" r="3" fill="#FFFFFF" fill-opacity="0.8" />
              </svg>
            </div>
          </div>
        `;
      } else if (isOneSystemActive) {
        // Compact Micro-Orb Pins for One System view so all colors are clearly visible across the map
        const entityColors: Record<string, string> = {
          hospitals: "#2563EB",  // Royal Blue
          laico: "#0D9488",      // Teal
          amrf: "#7C3AED",       // Violet
          aurolab: "#D97706",    // Amber
          auroitech: "#EA580C",  // Orange
          eyebank: "#059669",    // Emerald
        };
        const pointColor = entityColors[loc.entityId] || themeColor;
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

        // Display short city name alone for Main Hubs (e.g., "Madurai", "Salem")
        const cityOnlyName = loc.city || loc.rawName || loc.name;
        const showLabel = !isDistributedSubcategoryActive && !isOneSystem && !hidePinLabels && entityConfig.id !== "all";

        if (isMainHub) {
          if (isDistributedSubcategoryActive) {
            // Small compact Main Hub Pin when Distributed subcategory is active to prevent overlapping
            el.innerHTML = `
              <div class="relative flex items-center justify-center pointer-events-auto group" title="${loc.name}">
                <div style="width: 9px; height: 9px; background-color: #059669; border: 2px solid #F59E0B; border-radius: 9999px; box-shadow: 0 0 6px rgba(5, 150, 105, 0.8), 0 1px 3px rgba(0,0,0,0.4); transition: all 0.2s ease-out;" class="group-hover:scale-150">
                </div>
              </div>
            `;
          } else {
            // Main Eye Bank Hub Pin with City Name Alone & Radar Pulse Rings
            el.innerHTML = `
              <div class="relative flex flex-col items-center justify-center pointer-events-auto group">
                <!-- Radar Pulse Scanning Halo Rings for Main Hub -->
                <div class="absolute w-12 h-12 rounded-full bg-emerald-500/30 border border-emerald-400/50 animate-ping opacity-75 pointer-events-none"></div>
                <div class="absolute w-8 h-8 rounded-full bg-emerald-400/20 border border-emerald-500/40 animate-pulse pointer-events-none"></div>
                
                <!-- Main Hub Badge Label displaying City Name Alone -->
                ${
                  showLabel
                    ? `<span class="mb-1 text-[10px] font-black text-white bg-slate-900/95 px-2.5 py-1 rounded-lg shadow-xl border-2 border-emerald-400 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                         <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                         <span>${cityOnlyName}</span>
                       </span>`
                    : ""
                }

                <!-- Central Main Hub Pin Badge with Eye Icon -->
                <div class="w-7 h-7 rounded-full bg-emerald-700 border-2 border-amber-300 shadow-xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-125">
                  <svg class="w-4 h-4 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
              </div>
            `;
          }
        } else if (isDistribution) {
          // Small non-overlapping Distribution Network Pin (Sky Blue Dot, NO text label)
          el.innerHTML = `
            <div class="relative flex items-center justify-center pointer-events-auto group" title="${loc.name}">
              <div style="width: 7px; height: 7px; background-color: #0284C7; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 4px rgba(2, 132, 199, 0.7), 0 1px 3px rgba(0,0,0,0.3); transition: all 0.2s ease-out;" class="group-hover:scale-150">
              </div>
            </div>
          `;
        } else {
          // Small non-overlapping Collection Centre Pin (Emerald Green Dot, NO text label)
          el.innerHTML = `
            <div class="relative flex items-center justify-center pointer-events-auto group" title="${loc.name}">
              <div style="width: 7px; height: 7px; background-color: #059669; border: 1.5px solid #FFFFFF; border-radius: 9999px; box-shadow: 0 0 4px rgba(5, 150, 105, 0.7), 0 1px 3px rgba(0,0,0,0.3); transition: all 0.2s ease-out;" class="group-hover:scale-150">
              </div>
            </div>
          `;
        }
      } else if (loc.entityId === "amrf") {
        const isHq = loc.id === "amrf_hq" || loc.metadata?.isHq;
        const isCollaborator = loc.metadata?.isCollaborator || loc.subcategoryId === "collaboratives";
        const isStudentAbroad = loc.metadata?.isStudentAbroad || loc.subcategoryId === "students_abroad";
        const isOngoing = loc.metadata?.status === "ongoing" || loc.subcategoryId === "ongoing_phd";

        if (isHq) {
          // 1. DISTINCT AMRF RESEARCH HQ PIN AT MADURAI
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${loc.name}">
              <!-- Double Radar Scanning Pulse Rings for AMRF HQ -->
              <div class="absolute w-14 h-14 rounded-full bg-purple-600/35 border border-purple-400/60 animate-ping pointer-events-none"></div>
              <div class="absolute w-10 h-10 rounded-full bg-purple-500/30 border border-purple-400/50 animate-pulse pointer-events-none"></div>
              
              <!-- HQ Floating Label Badge displaying AMRF Research HQ (Madurai) -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[11px] font-black text-white bg-purple-950/95 px-3 py-1 rounded-lg shadow-2xl border-2 border-amber-400 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                       <span>AMRF Research HQ (Madurai)</span>
                     </span>`
                  : ""
              }

              <!-- Central HQ Pin Badge -->
              <div class="w-8 h-8 rounded-full bg-purple-800 border-2 border-amber-400 shadow-2xl flex items-center justify-center relative overflow-hidden transition-all group-hover:scale-125">
                <svg class="w-4.5 h-4.5 text-amber-300 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M6 18h12M12 2v14M8 10l4-4 4 4" />
                </svg>
              </div>
            </div>
          `;
        } else if (isCollaborator) {
          // 2. GLOBAL UNIVERSITY / INSTITUTION COLLABORATOR PIN
          const instName = loc.metadata?.institutionName || loc.rawName || loc.name;
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${instName} (${loc.city}, ${loc.country})">
              <!-- Micro Radar Pulse Ring -->
              <div class="absolute w-8 h-8 rounded-full bg-indigo-500/35 border border-indigo-400/60 animate-ping pointer-events-none"></div>

              <!-- University / Institution Floating Label -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-purple-300 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse"></span>
                       <span>${instName}</span>
                     </span>`
                  : ""
              }

              <!-- Academic Cap / University Badge -->
              <div class="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-purple-700 to-indigo-800 border-2 border-white shadow-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-130">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                  <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
                </svg>
              </div>
            </div>
          `;
        } else if (isStudentAbroad) {
          // 3. INTERNATIONAL STUDENT / FELLOW PIN
          const instName = loc.metadata?.institutionName || loc.rawName || loc.name;
          el.innerHTML = `
            <div class="relative flex flex-col items-center justify-center pointer-events-auto group" title="${instName} (${loc.city}, ${loc.country})">
              <!-- Micro Radar Pulse Ring -->
              <div class="absolute w-8 h-8 rounded-full bg-amber-500/35 border border-amber-400/60 animate-ping pointer-events-none"></div>

              <!-- Institution Floating Label Badge -->
              ${
                !hidePinLabels
                  ? `<span class="mb-1 text-[10px] font-black text-slate-900 bg-white/95 px-2.5 py-1 rounded-lg shadow-xl border border-amber-400 whitespace-nowrap tracking-wide flex items-center gap-1.5 transition-transform group-hover:scale-110">
                       <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                       <span>${instName}</span>
                     </span>`
                  : ""
              }

              <!-- International Fellow Badge -->
              <div class="w-6.5 h-6.5 rounded-full bg-gradient-to-br from-amber-500 to-emerald-600 border-2 border-white shadow-xl flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-130">
                <svg class="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M12 6a6 6 0 0 0-6 6c0 3.31 6 9 6 9s6-5.69 6-9a6 6 0 0 0-6-6z"/>
                </svg>
              </div>
            </div>
          `;
        } else if (isOngoing) {
          // 3. ONGOING Ph.D. SCHOLAR: Glowing Vibrant Pink/Magenta Badge with Rotating Atomic Pupil Ring
          el.innerHTML = `
            <div class="relative flex items-center justify-center pointer-events-auto group" title="${loc.name} (${loc.city}, ${loc.state})">
              <!-- Micro Scanning Radar Pulse Ring -->
              <div class="absolute w-7 h-7 rounded-full bg-pink-500/40 border border-pink-400/60 animate-ping opacity-85 pointer-events-none"></div>
              <div class="absolute w-5 h-5 rounded-full bg-pink-400/25 border border-pink-300/40 animate-pulse pointer-events-none"></div>

              <!-- Eye Care Research Atomic Pupil Badge -->
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
                <svg class="w-3 h-3 text-white animate-spin" style="animation-duration: 5s;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="12" cy="12" r="7" stroke-dasharray="3 2" />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          `;
        } else {
          // 4. COMPLETED Ph.D. SCHOLAR: Glowing Bright Cyan/Sapphire Badge with Pulsing Eye Science Lens
          el.innerHTML = `
            <div class="relative flex items-center justify-center pointer-events-auto group" title="${loc.name} (${loc.city}, ${loc.state})">
              <!-- Micro Scanning Radar Pulse Ring -->
              <div class="absolute w-7 h-7 rounded-full bg-cyan-500/40 border border-cyan-400/60 animate-ping opacity-85 pointer-events-none"></div>
              <div class="absolute w-5 h-5 rounded-full bg-cyan-400/25 border border-cyan-300/40 animate-pulse pointer-events-none"></div>

              <!-- Eye Science Iris / Lens Badge -->
              <div class="w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden transition-transform duration-200 group-hover:scale-150">
                <svg class="w-3 h-3 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M2 12s3-6 10-6 10 6 10 6-3 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          `;
        }
      } else if (isAurolabLoc) {
        el.innerHTML = `
          <div class="relative flex items-center justify-center group pointer-events-auto">
            <div class="relative w-8 h-8 flex items-center justify-center">
              <!-- Left Curved Haptic Loop -->
              <svg class="absolute -left-2 w-4 h-4 text-amber-500 opacity-90 transition-transform group-hover:-translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10" />
              </svg>
              <!-- Central Optic Lens Ring with Inner Reflection -->
              <div class="w-4 h-4 rounded-full bg-amber-400/30 border-2 border-amber-600 shadow-md flex items-center justify-center backdrop-blur-xs relative overflow-hidden transition-all group-hover:scale-125">
                <div class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping opacity-75"></div>
                <div class="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
              </div>
              <!-- Right Curved Haptic Loop -->
              <svg class="absolute -right-2 w-4 h-4 text-amber-500 opacity-90 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 2c5.5 0 10 4.5 10 10s-4.5 10-10 10" />
              </svg>
            </div>
          </div>
        `;
      } else {
        // CARE Centre & Standard Visual Hierarchy
        let markerSize = isSelected ? "20px" : "12px";
        let markerBg = themeColor;
        let markerBorder = "2px solid #FFFFFF";
        let outerShadow = "0 2px 6px rgba(0,0,0,0.15)";

        if (loc.careType === "tertiary") {
          markerSize = isSelected ? "22px" : "18px";
          markerBg = "#2563EB"; // Solid Primary Royal Blue
          markerBorder = "2.5px solid #FFFFFF";
          outerShadow = "0 0 0 4px rgba(37,99,235,0.25), 0 3px 8px rgba(0,0,0,0.25)";
        } else if (loc.careType === "secondary") {
          markerSize = isSelected ? "18px" : "14px";
          markerBg = "#3B82F6"; // Mid Blue
          markerBorder = "2px solid #FFFFFF";
          outerShadow = "0 0 0 3px rgba(59,130,246,0.2), 0 2px 6px rgba(0,0,0,0.2)";
        } else if (loc.careType === "community") {
          markerSize = isSelected ? "14px" : "10px";
          markerBg = "#60A5FA"; // Light Blue
          markerBorder = "2px solid #FFFFFF";
          outerShadow = "0 1px 4px rgba(0,0,0,0.18)";
        } else if (loc.careType === "vision_centre") {
          markerSize = isSelected ? "12px" : "7px";
          markerBg = "#0D9488"; // Teal
          markerBorder = "1.5px solid #FFFFFF";
          outerShadow = "0 0 4px rgba(13,148,136,0.6)";
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
        if (loc.type === "Staff Dot") {
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
          popTitle = `${loc.state} Aggregate Distribution`;
          popSub = `Regional Aggregate Footprint · ${loc.state}`;
        }
          
        if (loc.establishedYear && !isAurolab && !isEyeBank) {
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
          "px-3 py-2 bg-white/95 text-slate-900 rounded-lg shadow-xl text-xs font-bold border border-slate-200 select-none pointer-events-none min-w-[160px]";
        popupDom.innerHTML = `
          <div class="flex items-center justify-between gap-2 mb-0.5">
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

      let filtered = locations;
      if (careTypeFilter && careTypeFilter !== "all") {
        filtered = filtered.filter((l) => l.careType === careTypeFilter);
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

      {/* Floating Map Variety Switcher (Top Left) */}
      <div className="absolute top-4 left-4 z-20">
        <MapVarietySwitcher
          activeVariety={activeVariety}
          onSelectVariety={setActiveVariety}
        />
      </div>
    </div>
  );
}
