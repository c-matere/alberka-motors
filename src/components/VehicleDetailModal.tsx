import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Bookmark,
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
  const annualInterestRate = 0.135; // 13.5% typical Kenyan bank asset finance
  const monthlyRate = annualInterestRate / 12;
  const monthlyPayment = Math.round(
    (loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, loanTenureMonths)) /
      (Math.pow(1 + monthlyRate, loanTenureMonths) - 1)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex justify-center p-0 md:p-6 animate-in fade-in duration-300">
      <div className="bg-[#121215] w-full max-w-4xl overflow-hidden min-h-screen md:min-h-0 rounded-2xl flex flex-col border border-zinc-800 relative my-auto text-white shadow-2xl">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-[#09090b]/95 backdrop-blur-md px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-red-400 bg-red-950/40 px-2.5 py-1 border border-red-900/40 rounded">
              {vehicle.stockNo}
            </span>
            <span className="text-sm sm:text-base font-bold text-white truncate max-w-[240px] sm:max-w-none">
              {vehicle.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
              }`}
              title="Save vehicle"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-lg transition-colors cursor-pointer bg-zinc-900"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
          
          {/* Main Showcase Hero */}
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-red-500 font-semibold">
                Direct Japanese Import • {vehicle.status}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {vehicle.name}
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base mb-6">
              {vehicle.tagline}
            </p>

            {/* Media Viewer */}
            <div className="space-y-4">
              <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-black border border-zinc-800 relative">
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
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md p-3.5 border border-zinc-800 rounded-lg text-left">
                  <span className="text-xs font-semibold text-white block">
                    {activeMediaIndex === 0 ? 'Road Test Video' : vehicle.gallery[activeMediaIndex - 1]?.title}
                  </span>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {activeMediaIndex === 0
                      ? 'Pre-delivery testing on Kenyan roads.'
                      : vehicle.gallery[activeMediaIndex - 1]?.description}
                  </p>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                <button
                  onClick={() => setActiveMediaIndex(0)}
                  className={`h-14 w-20 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer relative ${
                    activeMediaIndex === 0 ? 'border-red-500 ring-2 ring-red-500/40' : 'border-zinc-800 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={vehicle.heroImage} alt="Video preview" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 bg-black/40 flex items-center justify-center text-[10px] font-bold text-white">
                    VIDEO
                  </span>
                </button>

                {vehicle.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveMediaIndex(i + 1)}
                    className={`h-14 w-20 rounded-lg overflow-hidden border shrink-0 transition-all cursor-pointer ${
                      activeMediaIndex === i + 1 ? 'border-red-500 ring-2 ring-red-500/40' : 'border-zinc-800 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="p-4 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left bg-zinc-900/60 border border-zinc-800 rounded-xl">
              <div>
                <span className="text-xs text-zinc-400 block mb-1">Year & Mileage</span>
                <span className="font-semibold text-sm text-white">{vehicle.year} • {vehicle.mileageKm.toLocaleString()} KM</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">Auction Condition</span>
                <span className="font-semibold text-sm text-red-400">Grade {vehicle.auctionGrade}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">Transmission</span>
                <span className="font-semibold text-sm text-white">{vehicle.drivetrain.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-400 block mb-1">Delivered Price</span>
                <span className="font-mono font-bold text-sm text-white">KES {vehicle.priceKes.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Interactive Financing Studio */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
              <div>
                <span className="text-xs text-red-500 font-semibold uppercase tracking-wider block mb-1">Bank Asset Financing</span>
                <h3 className="text-base font-bold text-white">Monthly Payment Calculator</h3>
                <p className="text-xs text-zinc-400 mt-0.5">Financing available via NCBA, Stanbic, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-400 block">Estimated Payment</span>
                <span className="font-mono text-xl font-bold text-red-400">
                  KES {monthlyPayment.toLocaleString()}<span className="text-xs font-normal text-zinc-400">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-400">Down Payment ({depositPercent}%)</span>
                  <span className="font-semibold text-white">KES {depositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>15% (Min)</span>
                  <span>40%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-400">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="font-semibold text-white">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs text-red-500 font-semibold uppercase tracking-wider block mb-1">Details</span>
                <h3 className="text-lg font-bold text-white">Technical Specifications</h3>
              </div>
              <button
                onClick={() => setShowAuctionModal(true)}
                className="btn-ghost !py-2 !px-3.5 !text-xs cursor-pointer inline-flex items-center"
              >
                <FileText className="w-3.5 h-3.5 text-red-500 mr-2" />
                <span>View Japanese Auction Sheet</span>
              </button>
            </div>

            <div className="border border-zinc-800 rounded-xl overflow-hidden divide-y divide-zinc-800">
              {vehicle.specifications.map((group, idx) => (
                <div key={idx} className="p-4 grid grid-cols-1 md:grid-cols-3 gap-3 bg-zinc-900/40">
                  <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">{group.category}</span>
                  <div className="md:col-span-2 space-y-2 text-xs">
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex justify-between py-1 border-b border-zinc-800/60 last:border-0">
                        <span className="text-zinc-400">{item.label}</span>
                        <span className="text-zinc-200 font-medium">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mombasa Pre-Delivery Inspection Certificate Box */}
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
            <div className="flex items-center gap-3 pb-3 border-b border-zinc-800">
              <ShieldCheck className="w-5 h-5 text-red-500" />
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Mombasa 100-Point Inspection Stamp
                </h4>
                <p className="text-xs text-zinc-400">Inspected and certified for Stock #{vehicle.stockNo}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-400 block">
                Total Price (Duty Paid & Registered)
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-white">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="btn-ghost !py-2.5 !px-4 !text-xs cursor-pointer w-full sm:w-auto inline-flex items-center justify-center"
              >
                <Calendar className="w-3.5 h-3.5 mr-2" />
                <span>Book Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white font-semibold !py-2.5 !px-5 !text-xs w-full sm:w-auto inline-flex items-center justify-center"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Auction Sheet Inspection Submodal */}
      {showAuctionModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121215] max-w-lg w-full p-6 relative border border-zinc-800 rounded-xl text-left shadow-2xl">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs uppercase tracking-wider text-red-500 font-semibold block mb-1">
              Japanese Auction Document
            </span>
            <h3 className="text-lg font-bold text-white mb-1">
              {vehicle.auctionHall} Auction Sheet
            </h3>
            <p className="text-xs text-zinc-400 mb-5 font-mono">
              Mileage: {vehicle.mileageKm.toLocaleString()} KM • Grade: {vehicle.auctionGrade} • Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-zinc-900/80 p-4 rounded-lg text-xs font-mono space-y-2 border border-zinc-800">
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-400">Auction Hall:</span>
                <span className="text-white font-medium">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-400">Stock No:</span>
                <span className="text-red-400 font-medium">{vehicle.stockNo}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-400">Auction Score:</span>
                <span className="text-white font-bold">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-400">Interior / Exterior Score:</span>
                <span className="text-white">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-800 pb-1.5">
                <span className="text-zinc-400">Accident History:</span>
                <span className="text-emerald-400 font-bold">ZERO (Clean Original Chassis)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">QISJ Pre-Shipment Inspection:</span>
                <span className="text-emerald-400 font-bold">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white font-semibold !py-2 !px-4 !text-xs"
              >
                Request Original PDF via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
