import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Calculator,
  FileText,
  Sliders,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  Car,
  Zap,
  RotateCcw
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface VehicleDetailModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onScheduleTestDrive: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  isFavorite,
  onToggleFavorite,
  onScheduleTestDrive,
}) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [showAuctionModal, setShowAuctionModal] = useState(false);

  // Financing Calculator State
  const [depositPercent, setDepositPercent] = useState(25);
  const [loanTenureMonths, setLoanTenureMonths] = useState(48);

  const depositAmount = (vehicle.priceKes * depositPercent) / 100;
  const loanPrincipal = vehicle.priceKes - depositAmount;
  const annualInterestRate = 0.135; // 13.5% typical Kenyan bank asset finance (NCBA / Stanbic)
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-md flex justify-center p-0 md:p-6 animate-in fade-in duration-200">
      
      <div className="bg-[#121215] w-full max-w-[1040px] md:rounded-[28px] overflow-hidden min-h-screen md:min-h-0 flex flex-col shadow-2xl relative my-auto">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#121215]/95 backdrop-blur-md px-6 py-4 border-b border-[#27272a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[12px] font-semibold text-zinc-400 bg-[#121215] px-2.5 py-0.5 rounded-full">
              {vehicle.stockNo}
            </span>
            <span className="text-[14px] font-semibold text-white truncate max-w-[240px] sm:max-w-none">
              {vehicle.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 rounded-full border border-[#27272a] hover:bg-[#121215] transition-colors cursor-pointer ${
                isFavorite ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
              title="Save vehicle"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full border border-[#27272a] hover:bg-[#121215] transition-colors cursor-pointer text-white"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-10 space-y-12">
          
          {/* Main Showcase Hero */}
          <div>
            <span className="launch-status-label mb-2">
              Japanese Import · {vehicle.status}
            </span>
            <h1 className="text-[32px] sm:text-[44px] font-semibold text-white leading-[1.08] tracking-tight mb-3">
              {vehicle.name}
            </h1>
            <p className="text-[18px] text-zinc-400 max-w-[680px] leading-relaxed mb-8">
              {vehicle.tagline}
            </p>

            {/* Media Viewer */}
            <div className="space-y-4">
              <div className="w-full h-[360px] sm:h-[480px] rounded-[24px] overflow-hidden bg-[#121215] relative">
                {activeMediaIndex === 0 ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                    poster={vehicle.gallery[0]?.url || vehicle.heroImage}
                  >
                    <source src={vehicle.heroVideo} type="video/mp4" />
                    <img src={vehicle.heroImage} alt={vehicle.name} className="w-full h-full object-cover" />
                  </video>
                ) : (
                  <img
                    src={vehicle.gallery[activeMediaIndex - 1]?.url || vehicle.heroImage}
                    alt={vehicle.gallery[activeMediaIndex - 1]?.title || vehicle.name}
                    className="w-full h-full object-cover transition-opacity duration-300"
                  />
                )}

                {/* Media Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#121215]/90 backdrop-blur-md p-4 rounded-[16px] text-left">
                  <span className="text-[11px] font-semibold text-[#dc2626] uppercase tracking-wide block">
                    {activeMediaIndex === 0 ? 'Cinematic Driving Test' : vehicle.gallery[activeMediaIndex - 1]?.title}
                  </span>
                  <p className="text-[13px] text-zinc-400 mt-0.5">
                    {activeMediaIndex === 0
                      ? 'Pre-delivery road calibration along Kenyan coastal and high-elevation routes.'
                      : vehicle.gallery[activeMediaIndex - 1]?.description}
                  </p>
                </div>
              </div>

              {/* Angle Switcher Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setActiveMediaIndex(0)}
                  className={`h-16 w-24 rounded-[12px] overflow-hidden border-2 shrink-0 transition-all cursor-pointer relative ${
                    activeMediaIndex === 0 ? 'border-[#dc2626] ring-2 ring-[#dc2626]/20' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={vehicle.heroImage} alt="Video preview" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-black/30 flex items-center justify-center text-[10px] text-white font-semibold">
                    VIDEO
                  </span>
                </button>

                {vehicle.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMediaIndex(i + 1)}
                    className={`h-16 w-24 rounded-[12px] overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeMediaIndex === i + 1 ? 'border-[#dc2626] ring-2 ring-[#dc2626]/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Capsule */}
            <div className="floating-capsule p-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Year / Mileage</span>
                <span className="text-[16px] font-semibold text-white">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} km</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Auction Condition</span>
                <span className="text-[16px] font-semibold text-[#dc2626]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Drivetrain</span>
                <span className="text-[16px] font-semibold text-white">{vehicle.drivetrain.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-[11px] text-zinc-400 uppercase tracking-wide block font-medium">Delivered Cash Price</span>
                <span className="text-[18px] font-semibold text-white">KES {vehicle.priceKes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Architectural Highlights */}
          {((vehicle as any).highlights || []).length > 0 && (
            <div>
              <span className="launch-status-label mb-2">Engineering & Provenance</span>
              <h2 className="feature-heading mb-6">
                Calibrated for zero downtime.
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {((vehicle as any).highlights as any[]).map((h: any, i: number) => (
                  <div key={i} className="apple-card p-6 bg-[#121215] border-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider block mb-1">
                        {h.eyebrow}
                      </span>
                      <h3 className="text-[20px] font-semibold text-white mb-2 leading-snug">
                        {h.title}
                      </h3>
                      <p className="text-[14px] text-zinc-400 leading-relaxed">
                        {h.description}
                      </p>
                    </div>
                    <div className="pt-6 mt-6 border-t border-[#27272a] flex items-center justify-between text-[12px]">
                      <span className="text-zinc-400 font-medium">{h.metricTitle}</span>
                      <span className="text-[#dc2626] font-semibold">{h.metricValue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Financing Studio */}
          <div className="apple-card p-8 bg-[#121215]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272a]">
              <div>
                <span className="launch-status-label mb-1">Banking Partnership Calculator</span>
                <h3 className="text-[22px] font-semibold text-white">Asset Finance Estimator</h3>
                <p className="text-[13px] text-zinc-400">Available through NCBA Bank, Stanbic Bank, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[11px] text-zinc-400 uppercase block">Estimated Monthly Tenure</span>
                <span className="text-[26px] font-semibold text-[#dc2626]">
                  KES {monthlyPayment.toLocaleString()}<span className="text-[14px] font-normal text-zinc-400">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-white">Down Payment ({depositPercent}%)</span>
                  <span className="font-semibold text-[#dc2626]">KES {depositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#dc2626] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>15% (Minimum)</span>
                  <span>40%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[13px] mb-2">
                  <span className="font-medium text-white">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="font-semibold text-[#dc2626]">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#dc2626] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-400 mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Accordion Table */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="launch-status-label mb-1">Factory Engineering Data</span>
                <h3 className="feature-heading">Technical Specifications</h3>
              </div>
              <button
                onClick={() => setShowAuctionModal(true)}
                className="outlined-explore-pill cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#dc2626]" />
                <span>View Japanese Auction Sheet</span>
              </button>
            </div>

            <div className="border-t border-[#27272a] divide-y divide-[#27272a]">
              {vehicle.specifications.map((group, idx) => (
                <div key={idx} className="py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <span className="text-[15px] font-semibold text-white">{group.category}</span>
                  <div className="md:col-span-2 space-y-2 text-[14px]">
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between py-1 border-b border-[#121215] last:border-0">
                        <span className="text-zinc-400">{item.label}</span>
                        <span className="text-white font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mombasa Pre-Delivery Inspection Certificate Box */}
          <div className="apple-card p-8 bg-[#0d0d10]">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-[#27272a]">
              <ShieldCheck className="w-6 h-6 text-[#dc2626]" />
              <div>
                <h4 className="text-[18px] font-semibold text-white">Mombasa 48-Hour Pre-Delivery Overhaul Stamp</h4>
                <p className="text-[12px] text-zinc-400">Certified on Tangana Road for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] text-white">
                  <CheckCircle2 className="w-4 h-4 text-[#dc2626] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-zinc-400 block">Total Handover (KRA Duty Cleared)</span>
              <span className="text-[24px] font-semibold text-white">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="outlined-explore-pill py-2.5 px-5 text-[13px] cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book VIP Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill-lg w-full sm:w-auto justify-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Auction Sheet Inspection Submodal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121215] rounded-[24px] max-w-[680px] w-full p-6 relative">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#121215] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="launch-status-label mb-1">Authentic Japanese Export Document</span>
            <h3 className="text-[22px] font-semibold text-white mb-1">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-[13px] text-zinc-400 mb-6">
              Verified Odometer: {vehicle.mileageKm.toLocaleString()} KM · Overall Grade: {vehicle.auctionGrade} · Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-[#121215] rounded-[16px] p-6 text-[13px] font-mono space-y-2 border border-[#27272a]">
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Auction Hall:</span>
                <span className="font-semibold">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Stock Identification:</span>
                <span className="font-semibold">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Overall Inspection Score:</span>
                <span className="font-semibold text-[#dc2626]">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Interior / Exterior Score:</span>
                <span className="font-semibold">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[#27272a] pb-1.5">
                <span className="text-zinc-400">Accident / Frame Damage:</span>
                <span className="font-semibold text-emerald-600">ZERO (Clean Original Pillars)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">QISJ Pre-Shipment Inspection:</span>
                <span className="font-semibold text-emerald-600">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Cars%20R%20Us,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="pricing-blue-pill"
              >
                Request Original Japanese PDF via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
