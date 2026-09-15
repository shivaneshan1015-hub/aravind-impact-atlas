"use client";

import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { EntityConfig } from "@/types/entity";
import { GeoLocationItem, StateAggregation } from "@/types/geo";
import { DARK_ATLAS_MAP_STYLE, hexToRgba } from "@/lib/map-utils";
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
  onClearLocation,
}: MapEngineProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const stateMarkersRef = useRef<maplibregl.Marker[]>([]);
  const locationMarkersRef = useRef<maplibregl.Marker[]>([]);
  const popupRef = useRef<maplibregl.Popup | null>(null);

  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize MapLibre GL map instance
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: DARK_ATLAS_MAP_STYLE,
      center: INDIA_CENTER,
      zoom: INDIA_DEFAULT_ZOOM,
      attributionControl: false,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: false }),
      "bottom-right"
    );

    map.on("load", () => {
      // Add local India States GeoJSON vector source
      map.addSource("india-states-source", {
        type: "geojson",
        data: "/maps/india/states.geojson",
      });

      // Layer 1: Fill layer for states
      map.addLayer({
        id: "india-states-fill",
        type: "fill",
        source: "india-states-source",
        paint: {
          "fill-color": "#0f172a",
          "fill-opacity": 0.4,
        },
      });

      // Layer 2: Border outline layer
      map.addLayer({
        id: "india-states-border",
        type: "line",
        source: "india-states-source",
        paint: {
          "line-color": "rgba(148, 163, 184, 0.3)",
          "line-width": 1.2,
        },
      });

      // Layer 3: Hover highlight layer
      map.addLayer({
        id: "india-states-hover",
        type: "line",
        source: "india-states-source",
        paint: {
          "line-color": "#F97316",
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

    const themeColor = entityConfig.color;

    // Build dynamic paint expression for state fills
    const countMap: Record<string, number> = {};
    stateAggregations.forEach((s) => {
      countMap[s.stateName] = s.count;
    });

    // Color intensity scale
    const matchExpression: any[] = ["match", ["get", "ST_NM"]];
    stateAggregations.forEach((s) => {
      let opacity = 0.25;
      if (s.count >= 6) opacity = 0.65;
      else if (s.count >= 3) opacity = 0.45;

      matchExpression.push(s.stateName, hexToRgba(themeColor, opacity));
    });
    matchExpression.push("rgba(15, 23, 42, 0.4)"); // Default fill

    if (map.getLayer("india-states-fill")) {
      map.setPaintProperty("india-states-fill", "fill-color", matchExpression);
    }
  }, [mapLoaded, stateAggregations, entityConfig]);

  // Render Markers (Centroid Badges in Overview Mode vs Point Markers in State Detail Mode)
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

    const themeColor = entityConfig.color;

    if (!selectedState) {
      // OVERVIEW MODE: Render State Centroid Badges
      stateAggregations.forEach((agg) => {
        const el = document.createElement("div");
        el.className =
          "group cursor-pointer transition-all duration-300 transform hover:scale-110 select-none";

        el.innerHTML = `
          <div class="flex flex-col items-center">
            <div class="px-2.5 py-1 rounded-full text-xs font-bold text-white shadow-xl border border-white/30 flex items-center gap-1.5 backdrop-blur-md transition-shadow"
                 style="background-color: ${themeColor}; box-shadow: 0 4px 16px ${themeColor}70">
              <span class="text-[10px] tracking-wider uppercase font-extrabold opacity-95">${agg.stateName}</span>
              <span class="bg-black/40 px-1.5 py-0.5 rounded-full text-[11px] font-black tracking-tight border border-white/20">${agg.count}</span>
            </div>
            <div class="w-2 h-2 rounded-full mt-0.5 opacity-90 shadow-sm" style="background-color: ${themeColor}"></div>
          </div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectState(agg.stateName, agg.bounds);
          if (agg.bounds) {
            map.fitBounds(agg.bounds, { padding: 90, duration: 1200 });
          } else {
            map.flyTo({ center: agg.centroid, zoom: 7.2, duration: 1200 });
          }
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat(agg.centroid)
          .addTo(map);

        stateMarkersRef.current.push(marker);
      });
    } else {
      // STATE DETAIL MODE: Render individual Location Markers
      const stateLocs = locations.filter((l) => l.state === selectedState);

      stateLocs.forEach((loc) => {
        const isSelected = selectedLocation?.id === loc.id;
        const el = document.createElement("div");
        el.className = "group cursor-pointer transition-all duration-300 select-none";

        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            ${
              isSelected
                ? `<div class="absolute w-9 h-9 rounded-full animate-ping opacity-80" style="background-color: ${themeColor}"></div>`
                : ""
            }
            <div class="w-6 h-6 rounded-full border-2 border-white shadow-2xl flex items-center justify-center transition-transform transform group-hover:scale-125"
                 style="background-color: ${themeColor}; box-shadow: 0 0 16px ${themeColor}">
              <div class="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        `;

        el.addEventListener("click", (e) => {
          e.stopPropagation();
          onSelectLocation(loc);

          // Show minimal popover
          if (popupRef.current) popupRef.current.remove();

          const popupDom = document.createElement("div");
          popupDom.className =
            "p-3 bg-slate-950 text-slate-100 rounded-lg shadow-2xl text-xs border border-slate-800 space-y-1 select-none min-w-[180px]";
          popupDom.innerHTML = `
            <div class="font-bold text-sm text-slate-100">${loc.name}</div>
            <div class="text-[11px] text-slate-400 font-medium">${loc.city}, ${loc.state}</div>
            <div class="mt-1.5 pt-1.5 border-t border-slate-800/80 font-semibold text-[11px]" style="color: ${entityConfig.colorLight}">
              ${entityConfig.shortName} Record
            </div>
          `;

          popupRef.current = new maplibregl.Popup({ offset: 15, closeButton: false })
            .setLngLat([loc.longitude, loc.latitude])
            .setDOMContent(popupDom)
            .addTo(map);
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([loc.longitude, loc.latitude])
          .addTo(map);

        locationMarkersRef.current.push(marker);
      });
    }
  }, [mapLoaded, selectedState, stateAggregations, locations, entityConfig, selectedLocation]);

  // Handle smooth map camera transitions when selectedState changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapLoaded) return;

    if (!selectedState) {
      map.flyTo({
        center: entityConfig.defaultCenter || INDIA_CENTER,
        zoom: entityConfig.defaultZoom || INDIA_DEFAULT_ZOOM,
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
    <div className="relative w-full h-full bg-slate-950 overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}
