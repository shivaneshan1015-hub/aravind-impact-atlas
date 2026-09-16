"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation, GeographicGrammar, GeographicLevel } from "@/types/geo";
import { LIGHT_ATLAS_MAP_STYLE, hexToRgba } from "@/lib/map-utils";
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";

export interface MapEngineProps {
  entityConfig: EntityConfig;
  locations: GeoLocationItem[];
  stateAggregations: StateAggregation[];
  selectedState: string | null;
  selectedLocation: GeoLocationItem | null;
  onSelectState: (stateName: string, bounds?: [[number, number], [number, number]]) => void;
  onSelectLocation: (location: GeoLocationItem) => void;
  onClearLocation: () => void;
  modeGrammar?: GeographicGrammar;
  geographicLevel?: GeographicLevel;
  careTypeFilter?: "all" | "tertiary" | "secondary" | "community";
  revealMaxYear?: number | null;
  isLabMode?: boolean;
}

export function MapEngine({
  entityConfig,
  locations,
  stateAggregations,
  selectedState,
  selectedLocation,
  onSelectState,
  onSelectLocation,
  modeGrammar = "auto",
  geographicLevel = "country",
  careTypeFilter = "all",
  revealMaxYear = null,
  isLabMode = false,
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

      // 3. AUROLAB DOMESTIC SUPPLY NETWORK (42 Dealers Radiating from Madurai)
      map.addSource("aurolab-network-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", properties: { city: "Delhi" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.1025, 28.7041]] } },
            { type: "Feature", properties: { city: "Amritsar" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [74.8723, 31.6340]] } },
            { type: "Feature", properties: { city: "Srinagar" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [74.7973, 34.0837]] } },
            { type: "Feature", properties: { city: "Chandigarh" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [76.7794, 30.7333]] } },
            { type: "Feature", properties: { city: "Jaipur" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [75.7873, 26.9124]] } },
            { type: "Feature", properties: { city: "Varanasi" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [82.9739, 25.3176]] } },
            { type: "Feature", properties: { city: "Lucknow" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [80.9462, 26.8467]] } },
            { type: "Feature", properties: { city: "Kolkata" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [88.3639, 22.5726]] } },
            { type: "Feature", properties: { city: "Guwahati" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [91.7362, 26.1445]] } },
            { type: "Feature", properties: { city: "Patna" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [85.1376, 25.5941]] } },
            { type: "Feature", properties: { city: "Hyderabad" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [78.4867, 17.3850]] } },
            { type: "Feature", properties: { city: "Bangalore" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.5946, 12.9716]] } },
            { type: "Feature", properties: { city: "Cochin" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [76.2711, 9.9816]] } },
            { type: "Feature", properties: { city: "Chennai" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [80.2707, 13.0827]] } },
            { type: "Feature", properties: { city: "Mumbai" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [72.8777, 19.0760]] } },
            { type: "Feature", properties: { city: "Ahmedabad" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [72.5714, 23.0225]] } },
          ],
        },
      });

      map.addLayer({
        id: "aurolab-network-layer",
        type: "line",
        source: "aurolab-network-source",
        paint: {
          "line-color": "#EA580C",
          "line-width": 2.5,
          "line-opacity": 0.85,
          "line-dasharray": [3, 2],
        },
        layout: { visibility: "none" },
      });

      // 4. VISION RESTORATION (Eye Bank Flow Vectors)
      map.addSource("eyebank-flow-source", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            { type: "Feature", properties: { flow: "Coimbatore -> Madurai Lab" }, geometry: { type: "LineString", coordinates: [[76.9558, 11.0168], [78.1198, 9.9252]] } },
            { type: "Feature", properties: { flow: "Tirunelveli -> Madurai Lab" }, geometry: { type: "LineString", coordinates: [[77.7567, 8.7139], [78.1198, 9.9252]] } },
            { type: "Feature", properties: { flow: "Puducherry -> Madurai Lab" }, geometry: { type: "LineString", coordinates: [[79.8083, 11.9416], [78.1198, 9.9252]] } },
            { type: "Feature", properties: { flow: "Madurai Hub -> Bengaluru" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.5946, 12.9716]] } },
            { type: "Feature", properties: { flow: "Madurai Hub -> Mumbai" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [72.8777, 19.0760]] } },
            { type: "Feature", properties: { flow: "Madurai Hub -> Delhi NCR" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [77.1025, 28.7041]] } },
            { type: "Feature", properties: { flow: "Madurai Hub -> Kolkata" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [88.3639, 22.5726]] } },
            { type: "Feature", properties: { flow: "Madurai Hub -> Haridwar" }, geometry: { type: "LineString", coordinates: [[78.1198, 9.9252], [78.1642, 29.9457]] } },
          ],
        },
      });

      map.addLayer({
        id: "eyebank-flow-layer",
        type: "line",
        source: "eyebank-flow-source",
        paint: {
          "line-color": "#059669",
          "line-width": 3.0,
          "line-opacity": 0.9,
          "line-dasharray": [4, 2],
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
    if (map.getLayer("eyebank-flow-layer")) {
      map.setLayoutProperty(
        "eyebank-flow-layer",
        "visibility",
        activeGrammar === "flow" || entityConfig.id === "eyebank" ? "visible" : "none"
      );
    }
  }, [mapLoaded, entityConfig.id, activeGrammar]);

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

      // CARE Centre visual hierarchy styling
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
      }

      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div style="width: ${markerSize}; height: ${markerSize}; background-color: ${markerBg}; border: ${markerBorder}; border-radius: 9999px; box-shadow: ${outerShadow}; transition: all 0.2s ease-out;">
          </div>
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectLocation(loc);

        map.flyTo({
          center: [loc.longitude, loc.latitude],
          zoom: Math.max(map.getZoom(), 6.8),
          duration: 1000,
        });

        if (popupRef.current) popupRef.current.remove();

        const isAurolab = entityConfig?.id === "aurolab" || activeGrammar === "distribution";
        const displayName = loc.rawName || loc.name;
        const popTitle = isAurolab ? `${loc.state} Aggregate Distribution` : displayName;
        
        let popSub = isAurolab
          ? `Regional Aggregate Footprint · ${loc.state}`
          : `${loc.city}, ${loc.state}`;
          
        if (loc.establishedYear && !isAurolab) {
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
  ]);

  return (
    <div className="relative w-full h-full bg-[#E7EEF2] overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
