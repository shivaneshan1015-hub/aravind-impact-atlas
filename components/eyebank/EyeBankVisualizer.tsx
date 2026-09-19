"use client";

import React, { useState } from "react";
import {
  EYE_BANK_COLLECTION_CENTRES,
  EYE_BANK_DISTRIBUTION_RECORDS,
  AIEBS_YEARLY_METRICS,
} from "@/data/eyebank/eyebank-data-extended";
import { Eye, TrendingUp, Share2, Award, ChevronRight, Activity, ArrowUpRight } from "lucide-react";

interface EyeBankVisualizerProps {
  activeView: "collected" | "distributed" | "collection_vs_utilisation";
  onSelectView?: (view: "collected" | "distributed" | "collection_vs_utilisation") => void;
  selectedCenterName?: string;
  onSelectCenterName?: (name: string) => void;
}

export function EyeBankVisualizer({
  activeView,
  onSelectView,
  selectedCenterName,
  onSelectCenterName,
}: EyeBankVisualizerProps) {
  const [internalCenter, setInternalCenter] = useState<string>("Madurai");

  const selectedCenter = selectedCenterName || internalCenter;

  const handleSelectCenter = (centerName: string) => {
    setInternalCenter(centerName);
    if (onSelectCenterName) {
      onSelectCenterName(centerName);
    }
  };

  // Calculate overall 10-year statistics
  const totalCollected10Yr = AIEBS_YEARLY_METRICS.reduce((acc, m) => acc + m.collection, 0);
  const totalUtilized10Yr = AIEBS_YEARLY_METRICS.reduce((acc, m) => acc + m.utilization, 0);
  const overallUtilRate = ((totalUtilized10Yr / totalCollected10Yr) * 100).toFixed(1);

  // Latest year metric
  const latestMetric = AIEBS_YEARLY_METRICS[AIEBS_YEARLY_METRICS.length - 1];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-emerald-100 p-5 max-w-2xl w-full text-slate-900 select-none overflow-hidden space-y-4 animate-in fade-in duration-300">
      {/* Top Header Card */}
      <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md font-bold">
            <Eye className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 inline-block">
              ARAVIND INTEGRATED EYE BANK SERVICES (AIEBS)
            </div>
            <h3 className="text-base font-extrabold text-slate-900 leading-tight">
              {activeView === "collection_vs_utilisation"
                ? "Collection vs Utilisation (10-Year Dynamics)"
                : activeView === "distributed"
                ? "Collected Eyes Distribution Across India"
                : "District-wise Collection Network"}
            </h3>
          </div>
        </div>

        {/* View Switcher Tabs */}
        {onSelectView && (
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => onSelectView("collected")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeView === "collected"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Collected
            </button>
            <button
              onClick={() => onSelectView("distributed")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeView === "distributed"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Distributed
            </button>
            <button
              onClick={() => onSelectView("collection_vs_utilisation")}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeView === "collection_vs_utilisation"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Collection vs Utilisation
            </button>
          </div>
        )}
      </div>

      {/* VIEW 1: COLLECTION VS UTILISATION 10-YEAR CHART */}
      {activeView === "collection_vs_utilisation" && (
        <div className="space-y-4">
          {/* Key Summary Badges */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 block">
                Latest Annual Collection
              </span>
              <div className="text-xl font-black text-emerald-900 mt-0.5">
                {latestMetric.collection.toLocaleString()}
              </div>
              <span className="text-[10px] text-emerald-700 font-medium">Corneas (Apr 25–Mar 26)</span>
            </div>

            <div className="bg-teal-50/80 border border-teal-200/80 rounded-xl p-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-teal-800 block">
                Latest Utilization
              </span>
              <div className="text-xl font-black text-teal-900 mt-0.5">
                {latestMetric.utilization.toLocaleString()}
              </div>
              <span className="text-[10px] text-teal-700 font-medium">Transplants (38.7% Yield)</span>
            </div>

            <div className="bg-slate-900 text-white rounded-xl p-3 shadow-md">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 block">
                10-Year Cumulative
              </span>
              <div className="text-xl font-black text-emerald-400 mt-0.5">
                {totalCollected10Yr.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-300 font-medium">Total Corneas Collected</span>
            </div>
          </div>

          {/* Interactive Bar Chart Table Visualizer */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 border-b border-slate-200 pb-2">
              <span>PERIOD</span>
              <span className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  COLLECTION
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
                  UTILIZATION
                </span>
              </span>
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {AIEBS_YEARLY_METRICS.map((row) => {
                const maxVal = 7000;
                const collectionWidth = Math.min(100, (row.collection / maxVal) * 100);
                const utilizationWidth = Math.min(100, (row.utilization / maxVal) * 100);
                const rate = ((row.utilization / row.collection) * 100).toFixed(0);

                return (
                  <div key={row.sNo} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-800 text-[11px] w-28">
                        {row.year}
                      </span>
                      <div className="flex items-center gap-3 font-extrabold text-[11px]">
                        <span className="text-emerald-700">{row.collection.toLocaleString()}</span>
                        <span className="text-slate-400">/</span>
                        <span className="text-teal-700">{row.utilization.toLocaleString()}</span>
                        <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded text-[9px]">
                          {rate}%
                        </span>
                      </div>
                    </div>

                    {/* Dual Stacked Animated Progress Bar */}
                    <div className="w-full bg-slate-200/80 rounded-full h-2.5 relative overflow-hidden flex">
                      <div
                        className="bg-emerald-600 h-full rounded-l-full transition-all duration-500"
                        style={{ width: `${collectionWidth}%` }}
                      />
                      <div
                        className="bg-teal-400 h-full rounded-r-full transition-all duration-500"
                        style={{ width: `${utilizationWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DISTRICT-WISE COLLECTION */}
      {activeView === "collected" && (
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-700 block">
            Select Eye Bank Hub Centre:
          </label>
          <div className="flex flex-wrap gap-1.5">
            {EYE_BANK_COLLECTION_CENTRES.map((c) => {
              const isSelected = selectedCenter === c.centerName;
              return (
                <button
                  key={c.centerName}
                  onClick={() => handleSelectCenter(c.centerName)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                    isSelected
                      ? "bg-emerald-700 text-white border-emerald-700 shadow-xs"
                      : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                  }`}
                >
                  {c.centerName} ({c.districts.length})
                </button>
              );
            })}
          </div>

          {/* Collection Districts Breakdown */}
          {(() => {
            const centerObj = EYE_BANK_COLLECTION_CENTRES.find(
              (c) => c.centerName === selectedCenter
            ) || EYE_BANK_COLLECTION_CENTRES[0];

            return (
              <div className="bg-emerald-50/50 border border-emerald-200/80 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-emerald-900 uppercase tracking-wider">
                    {centerObj.centerName} Collection Coverage
                  </h4>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                    {centerObj.districts.length} Districts
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                  {centerObj.districts.map((dist, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-emerald-100 rounded-xl p-2.5 text-xs flex items-center gap-2 shadow-2xs hover:border-emerald-300 transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="font-bold text-slate-800 text-[11px] truncate">
                        {dist}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* VIEW 3: DISTRIBUTED EYES ACROSS INDIA */}
      {activeView === "distributed" && (
        <div className="space-y-3">
          <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-md flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">
                National Distribution Network
              </span>
              <h4 className="text-lg font-black text-white">
                Corneal Tissue Flow Across India
              </h4>
              <p className="text-xs text-emerald-100/80 mt-0.5">
                From South India Eye Bank hubs to surgical centers nationwide.
              </p>
            </div>
            <Share2 className="w-8 h-8 text-emerald-300 opacity-80" />
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {EYE_BANK_COLLECTION_CENTRES.map((c) => {
              const dests = EYE_BANK_DISTRIBUTION_RECORDS.filter(
                (d) => d.centerName === c.centerName
              );
              if (dests.length === 0) return null;

              return (
                <div key={c.centerName} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                      {c.centerName}
                    </span>
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-extrabold px-2 py-0.5 rounded-full">
                      {dests.length} Destination Hubs
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {dests.map((rec, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-slate-200 text-slate-700 rounded-md text-[10px] font-bold shadow-2xs"
                      >
                        <span>{rec.district}</span>
                        <span className="text-slate-400">({rec.state})</span>
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
