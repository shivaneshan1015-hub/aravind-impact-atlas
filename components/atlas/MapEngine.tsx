"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { LIGHT_ATLAS_MAP_STYLE, hexToRgba } from "@/lib/map-utils";
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";
import { EYEBANK_DATA } from "@/data/eyebank/eyebank-data";

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
      // Add local India States GeoJSON vector source for choropleth & hover fills
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
          "fill-opacity": 0.05,
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

      // 2. RESEARCH (AMRF Collaboration Network)
      map.addSource("amrf-collaboration-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", properties: { partner: "Johns Hopkins USA" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [-76.6122, 39.2904]] } },
            { type: "Feature", properties: { partner: "UCL London UK" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [-0.1278, 51.5074]] } },
            { type: "Feature", properties: { partner: "SERI Singapore" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [103.8198, 1.3521]] } },
          ],
        },
      });

      map.addLayer({
        id: "amrf-collaboration-layer",
        type: "line",
        source: "amrf-collaboration-source",
        paint: {
          "line-color": "#7C3AED",
          "line-width": 3.0,
          "line-opacity": 0.85,
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
      map.setLayoutProperty(
        "amrf-collaboration-layer",
        "visibility",
        activeGrammar === "collaboration" || entityConfig.id === "amrf" ? "visible" : "none"
      );
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

    // 2. CARE Type filter
    if (careTypeFilter !== "all") {
      filtered = filtered.filter((l) => l.careType === careTypeFilter);
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

      const isAurolabLoc = loc.entityId === "aurolab";
      const isEyeBankLoc = loc.entityId === "eyebank";
      const isOneSystemActive = isOneSystem || entityConfig.id === "all";

      if (isOneSystemActive) {
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

        if (isEyeBank) {
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

  return (
    <div className="relative w-full h-full bg-[#E7EEF2] overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
