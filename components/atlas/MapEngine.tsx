"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { LIGHT_ATLAS_MAP_STYLE, hexToRgba } from "@/lib/map-utils";
import { INDIA_CENTER, INDIA_DEFAULT_ZOOM } from "@/config/entities";

interface MapEngineProps {
  entityConfig: EntityConfig;
  locations: GeoLocationItem[];
  stateAggregations: StateAggregation[];
  selectedState: string | null;
  selectedLocation: GeoLocationItem | null;
  onSelectState: (stateName: string, bounds?: [[number, number], [number, number]]) => void;
  onSelectLocation: (location: GeoLocationItem) => void;
  onClearLocation: () => void;
}

export function MapEngine({
  entityConfig,
  locations,
  stateAggregations,
  selectedState,
  selectedLocation,
  onSelectState,
  onSelectLocation,
}: MapEngineProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const stateMarkersRef = useRef<maplibregl.Marker[]>([]);
  const locationMarkersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize MapLibre GL map instance with CARTO Light basemap
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: LIGHT_ATLAS_MAP_STYLE,
      center: INDIA_CENTER,
      zoom: INDIA_DEFAULT_ZOOM,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

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
          "fill-color": "#EA580C",
          "fill-opacity": 0.12,
        },
      });

      // Layer 2: Vector Border outline layer (restrained boundaries)
      map.addLayer({
        id: "india-states-border",
        type: "line",
        source: "india-states-source",
        paint: {
          "line-color": "#CBD5E1",
          "line-width": 1.0,
          "line-opacity": 0.6,
        },
      });

      // Layer 3: Hover highlight line
      map.addLayer({
        id: "india-states-hover",
        type: "line",
        source: "india-states-source",
        paint: {
          "line-color": entityConfig?.color || "#EA580C",
          "line-width": 2.5,
        },
        filter: ["==", "ST_NM", ""],
      });

      // Mouse events on state polygons
      map.on("mousemove", "india-states-fill", (e) => {
        if (e.features && e.features.length > 0) {
          const stName = e.features[0].properties?.ST_NM;
          if (stName) {
            map.setFilter("india-states-hover", ["==", "ST_NM", stName]);
            map.getCanvas().style.cursor = "pointer";
          }
        }
      });

      map.on("mouseleave", "india-states-fill", () => {
        map.setFilter("india-states-hover", ["==", "ST_NM", ""]);
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

    // Build dynamic paint expression for state fills
    const matchExpression: any[] = ["match", ["get", "ST_NM"]];
    stateAggregations.forEach((s) => {
      let opacity = 0.12;
      if (s.count >= 6) opacity = 0.32;
      else if (s.count >= 3) opacity = 0.22;

      matchExpression.push(s.stateName, hexToRgba(themeColor, opacity));
    });
    matchExpression.push("rgba(0, 0, 0, 0)"); // Transparent default fill

    if (map.getLayer("india-states-fill")) {
      map.setPaintProperty("india-states-fill", "fill-color", matchExpression);
    }
  }, [mapLoaded, stateAggregations, entityConfig]);

  // Render Markers with concentric aura rings (matching reference sample aesthetic)
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    // Clear previous markers
    stateMarkersRef.current.forEach((m) => m.remove());
    stateMarkersRef.current = [];

    locationMarkersRef.current.forEach((m) => m.remove());
    locationMarkersRef.current = [];

    if (popupRef.current) {
      popupRef.current.remove();
      popupRef.current = null;
    }

    const themeColor = entityConfig?.color || "#EA580C";

    // RENDER SLEEK GLOWING CIRCULAR PINS MATCHING REFERENCE SPECIMEN (media__1789481991797.png)
    const activeLocations = selectedState
      ? locations.filter((l) => l.state === selectedState)
      : locations;

    activeLocations.forEach((loc) => {
      const isSelected = selectedLocation?.id === loc.id;
      const el = document.createElement("div");
      el.className = "group cursor-pointer transition-all duration-300 select-none";

      el.innerHTML = `
        <div class="relative flex items-center justify-center">
          <div class="absolute w-11 h-11 rounded-full opacity-20 pointer-events-none group-hover:scale-150 transition-transform duration-300" style="background-color: ${themeColor}"></div>
          <div class="absolute w-7 h-7 rounded-full opacity-35 pointer-events-none" style="background-color: ${themeColor}"></div>
          ${
            isSelected
              ? `<div class="absolute w-9 h-9 rounded-full animate-ping opacity-60" style="background-color: ${themeColor}"></div>`
              : ""
          }
          <div class="relative w-4 h-4 rounded-full border-2 border-white shadow-xl flex items-center justify-center transition-transform transform group-hover:scale-125"
               style="background-color: ${themeColor}; box-shadow: 0 4px 14px ${themeColor}70">
            <div class="w-1 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelectLocation(loc);

        // Fly map smoothly to touched pin
        map.flyTo({
          center: [loc.longitude, loc.latitude],
          zoom: Math.max(map.getZoom(), 6.8),
          duration: 1000,
        });

        // Show minimal popover label
        if (popupRef.current) popupRef.current.remove();

        const popupDom = document.createElement("div");
        popupDom.className =
          "px-3 py-1.5 bg-white/95 text-slate-900 rounded-lg shadow-md text-xs font-bold border border-slate-200 select-none pointer-events-none";
        popupDom.innerHTML = `
          <div class="text-xs font-black text-slate-900">${loc.name}</div>
          <div class="text-[10px] text-slate-500 font-medium">${loc.city}, ${loc.state}</div>
        `;

        popupRef.current = new maplibregl.Popup({ offset: 12, closeButton: false })
          .setLngLat([loc.longitude, loc.latitude])
          .setDOMContent(popupDom)
          .addTo(map);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map);

      locationMarkersRef.current.push(marker);
    });
  }, [mapLoaded, selectedState, stateAggregations, locations, entityConfig, selectedLocation]);

  // Handle smooth map camera transitions when selectedState changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (!selectedState) {
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
  }, [selectedState, entityConfig, mapLoaded]);

  return (
    <div className="relative w-full h-full bg-[#E7EEF2] overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
