import React from "react";
import { X, Globe } from "lucide-react";
import { BRANDING } from "@/config/branding";
import { Button } from "@/components/ui/Button";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoModal({ isOpen, onClose }: InfoModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-700 font-bold text-xs">
              50
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {BRANDING.title} — {BRANDING.subtitle}
              </h3>
              <p className="text-xs text-amber-700 font-medium">
                {BRANDING.celebrationText}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-slate-700 text-xs leading-relaxed">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg space-y-2">
            <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600" />
              About the Impact Atlas Engine
            </h4>
            <p>
              The <strong>Aravind Impact Atlas</strong> is an interactive geographic visualization system built to celebrate 50 years of the Aravind Eye Care System (1976–2026). It presents the global footprint and healthcare impact across seven core Aravind entities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-blue-700 font-bold text-xs">1. Patient care</span>
              <p className="text-slate-600 mt-1">High-volume, compassionate eye care network providing free and subsidized care.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-teal-700 font-bold text-xs">2. Training and capacity building</span>
              <p className="text-slate-600 mt-1">Capacity building consultancy training healthcare leaders in 100+ countries.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-purple-700 font-bold text-xs">3. AMRF</span>
              <p className="text-slate-600 mt-1">Pioneering molecular, genetic, and clinical ocular research.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-orange-700 font-bold text-xs">4. Aurolab</span>
              <p className="text-slate-600 mt-1">High-quality intraocular lens & ophthalmic manufacturing exported globally.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-sky-700 font-bold text-xs">5. Auroitech</span>
              <p className="text-slate-600 mt-1">Digital health innovation, telemedicine platforms, and hospital software.</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
              <span className="text-emerald-700 font-bold text-xs">6. Eye Bank</span>
              <p className="text-slate-600 mt-1">Corneal tissue retrieval and transplantation network to eradicate corneal blindness.</p>
            </div>
          </div>

          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-800">
            <strong>Demonstration Notice:</strong> This application currently utilizes prototype demo data for visual evaluation. Official production datasets will be loaded prior to exhibition deployment.
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close Overview
          </Button>
        </div>
      </div>
    </div>
  );
}
