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
  Bookmark,
  Car,
  Zap,
  RotateCcw,
  ArrowRight
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { SkeletonImage } from './SkeletonImage';

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080809]/95 backdrop-blur-xl flex justify-center p-0 md:p-6 animate-in fade-in duration-300">
      
      <div className="bg-[#131316] w-full max-w-[1080px] overflow-hidden min-h-screen md:min-h-0 flex flex-col border border-[rgba(197,168,128,0.35)] relative my-auto text-[#f5f5f7]">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#0f0714]/95 backdrop-blur-md px-6 py-4 border-b border-[rgba(197,168,128,0.2)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-[#c5a880] tracking-widest bg-[#160a1d] px-2.5 py-1 border border-[rgba(197,168,128,0.25)] uppercase">
              {vehicle.stockNo}
            </span>
            <span className="font-['Cinzel'] text-[14px] text-[#f5f5f7] tracking-wider uppercase truncate max-w-[240px] sm:max-w-none">
              {vehicle.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-[#c5a880] text-[#0f0714] border-[#c5a880]'
                  : 'bg-[#131316] text-[#8c8a94] border-[rgba(197,168,128,0.2)] hover:text-[#dfc7a5]'
              }`}
              title="Save to Curated Dossier"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-[#0f0714]' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-[rgba(197,168,128,0.2)] hover:border-[#dfc7a5] text-[#8c8a94] hover:text-[#f5f5f7] transition-colors cursor-pointer bg-[#131316]"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-10 space-y-12 overflow-y-auto">
          
          {/* Main Showcase Hero */}
          <div>
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="rr-eyebrow">
                JAPANESE IMPORT PROVENANCE // {vehicle.status}
              </span>
            </div>
            <h1 className="rr-title-h1 text-[28px] sm:text-[40px] mb-3">
              {vehicle.name}
            </h1>
            <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[20px] italic leading-relaxed max-w-[720px] mb-8">
              "{vehicle.tagline}"
            </p>

            {/* Media Viewer */}
            <div className="space-y-4">
              <div className="w-full h-[360px] sm:h-[480px] overflow-hidden bg-[#080809] border border-[rgba(197,168,128,0.25)] relative">
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
                <div className="absolute bottom-4 left-4 right-4 bg-[#0f0714]/90 backdrop-blur-md p-4 border border-[rgba(197,168,128,0.25)] text-left">
                  <span className="font-['Cinzel'] text-[10px] text-[#c5a880] uppercase tracking-widest block">
                    {activeMediaIndex === 0 ? 'CINEMATIC DRIVING TEST' : vehicle.gallery[activeMediaIndex - 1]?.title}
                  </span>
                  <p className="text-[12.5px] text-[#8c8a94] mt-1 font-light">
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
                  className={`h-16 w-24 overflow-hidden border shrink-0 transition-all cursor-pointer relative ${
                    activeMediaIndex === 0 ? 'border-[#c5a880] ring-1 ring-[#c5a880]' : 'border-[rgba(255,255,255,0.1)] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={vehicle.heroImage} alt="Video preview" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-[#080809]/40 flex items-center justify-center font-['Cinzel'] text-[9.5px] text-[#dfc7a5] tracking-widest">
                    MOTION
                  </span>
                </button>

                {vehicle.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMediaIndex(i + 1)}
                    className={`h-16 w-24 overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      activeMediaIndex === i + 1 ? 'border-[#c5a880] ring-1 ring-[#c5a880]' : 'border-[rgba(255,255,255,0.1)] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="p-6 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left bg-[#0f0714] border border-[rgba(197,168,128,0.25)]">
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">Year / Mileage</span>
                <span className="font-mono text-[15px] text-[#f5f5f7]">{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">Auction Condition</span>
                <span className="font-mono text-[15px] text-[#c5a880]">{vehicle.auctionGrade} / {vehicle.interiorGrade}</span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">Drivetrain</span>
                <span className="font-mono text-[15px] text-[#f5f5f7]">{vehicle.drivetrain.split('(')[0]}</span>
              </div>
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block mb-1">Delivered Handover</span>
                <span className="font-mono text-[17px] text-[#dfc7a5]">KES {vehicle.priceKes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Financing Studio */}
          <div className="p-8 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(197,168,128,0.18)]">
              <div>
                <span className="font-['Cinzel'] text-[9.5px] text-[#c5a880] uppercase tracking-widest block mb-1">BANKING PARTNERSHIP CALCULATOR</span>
                <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] tracking-wider uppercase">Asset Finance Estimator</h3>
                <p className="text-[12.5px] text-[#8c8a94] font-light mt-0.5">Underwritten via NCBA Bank, Stanbic Bank, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block">ESTIMATED MONTHLY TENURE</span>
                <span className="font-mono text-[24px] text-[#c5a880]">
                  KES {monthlyPayment.toLocaleString()}<span className="text-[13px] font-normal text-[#8c8a94]">/MO</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              <div>
                <div className="flex justify-between text-[12.5px] mb-2 font-mono">
                  <span className="text-[#8c8a94]">Down Payment ({depositPercent}%)</span>
                  <span className="text-[#dfc7a5]">KES {depositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-[#c5a880] cursor-pointer"
                />
                <div className="flex justify-between text-[10.5px] text-[#8c8a94] mt-1 font-mono">
                  <span>15% (Minimum)</span>
                  <span>40%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12.5px] mb-2 font-mono">
                  <span className="text-[#8c8a94]">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="text-[#dfc7a5]">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-[#c5a880] cursor-pointer"
                />
                <div className="flex justify-between text-[10.5px] text-[#8c8a94] mt-1 font-mono">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="rr-eyebrow block mb-1">FACTORY ARCHIVES</span>
                <h3 className="rr-title-h2 text-[22px]">Technical Specifications</h3>
              </div>
              <button
                onClick={() => setShowAuctionModal(true)}
                className="btn-rr-ghost !py-2 !px-4 !text-[11px] cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-[#c5a880] mr-2" />
                <span>VIEW JAPANESE AUCTION SHEET</span>
              </button>
            </div>

            <div className="border-t border-[rgba(197,168,128,0.2)] divide-y divide-[rgba(197,168,128,0.1)]">
              {vehicle.specifications.map((group, idx) => (
                <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <span className="font-['Cinzel'] text-[13px] text-[#c5a880] uppercase tracking-wider">{group.category}</span>
                  <div className="md:col-span-2 space-y-2 text-[13px] font-mono">
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between py-1 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                        <span className="text-[#8c8a94]">{item.label}</span>
                        <span className="text-[#f5f5f7]">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mombasa Pre-Delivery Inspection Certificate Box */}
          <div className="p-8 bg-[#0f0714] border border-[rgba(197,168,128,0.25)] space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-[rgba(197,168,128,0.18)]">
              <ShieldCheck className="w-6 h-6 text-[#c5a880]" />
              <div>
                <h4 className="font-['Cinzel'] text-[16px] text-[#f5f5f7] uppercase tracking-wider">
                  Mombasa 48-Hour Pre-Delivery Overhaul Stamp
                </h4>
                <p className="text-[12px] text-[#8c8a94] font-mono">Certified on Tangana Road for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12.5px] text-[#dfc7a5]">
                  <CheckCircle2 className="w-4 h-4 text-[#27a644] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className="pt-6 border-t border-[rgba(197,168,128,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="font-['Cinzel'] text-[9.5px] text-[#8c8a94] uppercase tracking-wider block">
                TOTAL HANDOVER (KRA DUTY CLEARED)
              </span>
              <span className="font-mono text-[24px] text-[#dfc7a5]">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="btn-rr-ghost !py-3 !px-5 !text-[11px] cursor-pointer w-full sm:w-auto"
              >
                <Calendar className="w-3.5 h-3.5 mr-2" />
                <span>BOOK VIP TEST DRIVE</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20would%20like%20to%20reserve%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid w-full sm:w-auto text-center"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                <span>WHATSAPP CONCIERGE</span>
              </a>
            </div>
          </div>

        </div>

      </div>

      {/* Auction Sheet Inspection Submodal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-[#080809]/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#131316] max-w-[680px] w-full p-6 sm:p-8 relative border border-[rgba(197,168,128,0.4)] text-left">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-2 text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="rr-eyebrow block mb-1">AUTHENTIC JAPANESE EXPORT DOCUMENT</span>
            <h3 className="font-['Cinzel'] text-[20px] text-[#f5f5f7] mb-1 uppercase tracking-wider">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-[12.5px] text-[#8c8a94] mb-6 font-mono">
              Verified Odometer: {vehicle.mileageKm.toLocaleString()} KM · Overall Grade: {vehicle.auctionGrade} · Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-[#0f0714] p-5 text-[12.5px] font-mono space-y-2.5 border border-[rgba(197,168,128,0.2)]">
              <div className="flex justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                <span className="text-[#8c8a94]">Auction Hall:</span>
                <span className="text-[#dfc7a5]">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                <span className="text-[#8c8a94]">Stock Identification:</span>
                <span className="text-[#c5a880]">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                <span className="text-[#8c8a94]">Overall Inspection Score:</span>
                <span className="text-[#f5f5f7] font-semibold">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                <span className="text-[#8c8a94]">Interior / Exterior Score:</span>
                <span className="text-[#dfc7a5]">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-[rgba(255,255,255,0.06)] pb-1.5">
                <span className="text-[#8c8a94]">Accident / Frame Damage:</span>
                <span className="text-[#27a644]">ZERO (Clean Original Pillars)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8c8a94]">QISJ Pre-Shipment Inspection:</span>
                <span className="text-[#27a644]">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rr-solid"
              >
                REQUEST ORIGINAL PDF VIA WHATSAPP
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
