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

    const themeColor = entityConfig?.color || "#EA580C";

    if (!selectedState) {
      // OVERVIEW MODE: Render State Centroid Badges
      stateAggregations.forEach((agg) => {
        const el = document.createElement("div");
        el.className =
          "group cursor-pointer transition-all duration-200 transform hover:scale-105 select-none";

        el.innerHTML = `
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white shadow-lg border border-white/90 font-extrabold text-xs"
               style="background-color: ${themeColor}; box-shadow: 0 4px 14px ${themeColor}50">
            <span class="text-[10px] tracking-wider uppercase font-black">${agg.stateName}</span>
            <span class="bg-black/25 px-1.5 py-0.2 rounded-full text-[10px] font-black">${agg.count}</span>
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
      // STATE DETAIL MODE: Render individual Location Nodes (Restrained Museum Node Language)
      const stateLocs = locations.filter((l) => l.state === selectedState);

      stateLocs.forEach((loc) => {
        const isSelected = selectedLocation?.id === loc.id;
        const el = document.createElement("div");
        el.className = "group cursor-pointer transition-all duration-300 select-none";

        el.innerHTML = `
          <div class="relative flex items-center justify-center">
            ${
              isSelected
                ? `<div class="absolute w-8 h-8 rounded-full animate-ping opacity-75" style="background-color: ${themeColor}"></div>`
                : `<div class="absolute w-6 h-6 rounded-full opacity-25 group-hover:scale-150 transition-transform" style="background-color: ${themeColor}"></div>`
            }
            <div class="w-5 h-5 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-transform transform group-hover:scale-125"
                 style="background-color: ${themeColor}; box-shadow: 0 2px 10px ${themeColor}60">
              <div class="w-1.5 h-1.5 bg-white rounded-full"></div>
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
            "p-3 bg-white text-slate-900 rounded-xl shadow-xl text-xs border border-slate-200 space-y-1 select-none min-w-[180px]";
          popupDom.innerHTML = `
            <div class="font-extrabold text-sm text-slate-900">${loc.name}</div>
            <div class="text-[11px] text-slate-500 font-medium">${loc.city}, ${loc.state}</div>
            <div class="mt-1.5 pt-1.5 border-t border-slate-100 font-bold text-[11px]" style="color: ${themeColor}">
              ${entityConfig?.shortName || "Impact"} Record
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
