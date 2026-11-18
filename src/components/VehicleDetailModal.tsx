import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageCircle,
  FileText,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Check,
  Minus,
  Sparkles,
  Ship,
  Gauge,
  Sliders,
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
  const [specTab, setSpecTab] = useState<'sbt' | 'dimensions' | 'options' | 'finance'>('sbt');

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

  const optionsList = [
    { label: 'Push Start Button', key: 'pushStart', val: vehicle.options?.pushStart },
    { label: 'Smart Keyless Entry', key: 'smartKey', val: vehicle.options?.smartKey },
    { label: 'Power Windows', key: 'powerWindows', val: vehicle.options?.powerWindows },
    { label: 'Dual Climate AC', key: 'airConditioner', val: vehicle.options?.airConditioner },
    { label: 'Power Driver Seat', key: 'powerSeats', val: vehicle.options?.powerSeats },
    { label: 'Leather Upholstery', key: 'leatherSeats', val: vehicle.options?.leatherSeats },
    { label: 'Sunroof / Moonroof', key: 'sunroof', val: vehicle.options?.sunroof },
    { label: 'Original Alloy Wheels', key: 'alloyWheels', val: vehicle.options?.alloyWheels },
    { label: 'Anti-Lock Brakes (ABS)', key: 'abs', val: vehicle.options?.abs },
    { label: 'Dual & Curtain Airbags', key: 'airbags', val: vehicle.options?.airbags },
    { label: 'Backup / Rear Camera', key: 'backCamera', val: vehicle.options?.backCamera },
    { label: 'Around View 360° Camera', key: 'camera360', val: vehicle.options?.camera360 },
    { label: 'Radar Adaptive Cruise', key: 'radarCruise', val: vehicle.options?.radarCruise },
    { label: 'Lane Departure Assist', key: 'laneAssist', val: vehicle.options?.laneAssist },
    { label: 'LED Headlamps & Fogs', key: 'ledLights', val: vehicle.options?.ledLights },
    { label: 'Display Navigation Audio', key: 'navigation', val: vehicle.options?.navigation },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex justify-center p-0 md:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl overflow-hidden min-h-screen md:min-h-0 rounded-2xl flex flex-col border border-zinc-200 relative my-auto text-zinc-950 shadow-2xl">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-zinc-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 border border-zinc-300 rounded">
              <span className="font-mono text-xs text-zinc-900 font-bold">
                {vehicle.stockNo}
              </span>
            </div>
            <span className="text-sm sm:text-base font-bold text-zinc-950 truncate max-w-[240px] sm:max-w-none">
              {vehicle.name}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 border rounded-lg transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-zinc-950 text-white border-zinc-950'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-300 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
              title="Save vehicle"
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 border border-zinc-300 hover:border-zinc-500 text-zinc-700 hover:text-zinc-950 rounded-lg transition-colors cursor-pointer bg-zinc-100 hover:bg-zinc-200"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 md:p-8 space-y-8 overflow-y-auto bg-white">
          
          {/* Main Showcase Hero */}
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Direct Japanese Import • {vehicle.status}
              </span>
              <span className="text-xs font-mono text-zinc-500 font-semibold">
                SBT Ref: {vehicle.sbtStockId || `SBT-${vehicle.stockNo}`}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-950 mb-2">
              {vehicle.name}
            </h1>
            <p className="text-zinc-600 text-sm sm:text-base mb-6 font-medium">
              {vehicle.tagline}
            </p>

            {/* Media Viewer */}
            <div className="space-y-4">
              <div className="w-full h-72 sm:h-96 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 relative select-none">
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

                {/* Counter Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-zinc-800 border border-zinc-200 z-10 shadow-sm">
                  <span className="text-zinc-950 font-bold">{String(activeMediaIndex + 1).padStart(2, '0')}</span>
                  <span className="text-zinc-400"> / </span>
                  <span className="text-zinc-600">{String(vehicle.gallery.length + 1).padStart(2, '0')}</span>
                </div>

                {/* Hairline Side Arrows */}
                <button
                  onClick={() => setActiveMediaIndex((prev) => (prev === 0 ? vehicle.gallery.length : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-950 border border-zinc-300 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md shadow-md"
                  title="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveMediaIndex((prev) => (prev + 1) % (vehicle.gallery.length + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-950 border border-zinc-300 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md shadow-md"
                  title="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Media Title Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 border border-zinc-200 rounded-lg text-left z-10 shadow-lg">
                  <span className="text-xs font-bold text-zinc-950 block">
                    {activeMediaIndex === 0 ? 'Road Test Video' : vehicle.gallery[activeMediaIndex - 1]?.title}
                  </span>
                  <p className="text-xs text-zinc-700 mt-0.5 leading-relaxed font-normal">
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
                    activeMediaIndex === 0 ? 'border-zinc-950 ring-2 ring-zinc-400' : 'border-zinc-200 opacity-70 hover:opacity-100'
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
                      activeMediaIndex === i + 1 ? 'border-zinc-950 ring-2 ring-zinc-400' : 'border-zinc-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick SBT Metrics Grid */}
            <div className="p-4 mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left bg-zinc-50 border border-zinc-200 rounded-xl">
              <div>
                <span className="text-xs text-zinc-600 block mb-1">Chassis / Model Code</span>
                <span className="font-mono font-bold text-xs sm:text-sm text-zinc-950 truncate block">
                  {vehicle.modelCode}
                </span>
                <span className="text-[11px] text-zinc-500 font-mono">{vehicle.steering} • {vehicle.year}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-600 block mb-1">Auction Condition</span>
                <span className="font-semibold text-sm text-zinc-950">Grade {vehicle.auctionGrade}</span>
                <span className="text-[11px] text-zinc-500 block">{vehicle.auctionHall}</span>
              </div>
              <div>
                <span className="text-xs text-zinc-600 block mb-1">M3 Freight Volume</span>
                <span className="font-mono font-bold text-sm text-zinc-950">{vehicle.m3 || '14.5 m³'}</span>
                <span className="text-[11px] text-zinc-500 block">SBT Shipping Spec</span>
              </div>
              <div>
                <span className="text-xs text-zinc-600 block mb-1">Delivered Price</span>
                <span className="font-mono font-bold text-sm text-zinc-950">KES {vehicle.priceKes.toLocaleString()}</span>
                <span className="text-[11px] text-emerald-700 font-medium block">Duty Cleared</span>
              </div>
            </div>
          </div>

          {/* SBT Car Exporter Verified Specification Section */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-zinc-200">
              <div>
                <div className="flex items-center gap-2">
                  <Ship className="w-4 h-4 text-zinc-700" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900">
                    SBT Japan Car Exporter Specification Sheet
                  </span>
                </div>
                <p className="text-xs text-zinc-600 mt-0.5">
                  Verified against Japanese Export Certificate, USS/TAA Auction Data & QISJ/JEVIC Inspection.
                </p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-zinc-200">
                <button
                  onClick={() => setSpecTab('sbt')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    specTab === 'sbt' ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  Vehicle Details
                </button>
                <button
                  onClick={() => setSpecTab('dimensions')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    specTab === 'dimensions' ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  Dimensions & M3
                </button>
                <button
                  onClick={() => setSpecTab('options')}
                  className={`px-3 py-1 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    specTab === 'options' ? 'bg-zinc-950 text-white' : 'text-zinc-600 hover:text-zinc-950'
                  }`}
                >
                  Car Options
                </button>
              </div>
            </div>

            {/* Tab 1: SBT Core Vehicle Details Table */}
            {specTab === 'sbt' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Stock ID</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.stockNo}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">SBT Stock Reference</span>
                  <span className="font-mono font-semibold text-zinc-950">{vehicle.sbtStockId || `SBT-${vehicle.stockNo}`}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Chassis / Frame #</span>
                  <span className="font-mono font-bold text-zinc-950 bg-zinc-100 px-1.5 py-0.5 rounded border border-zinc-200">
                    {vehicle.chassisNo}
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Model Code</span>
                  <span className="font-mono font-bold text-zinc-950">{vehicle.modelCode}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Engine Size & Code</span>
                  <span className="font-semibold text-zinc-950">{vehicle.engine} ({vehicle.engineCode})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Year / Month (Reg.)</span>
                  <span className="font-semibold text-zinc-950">{vehicle.year} / {vehicle.registrationMonth || '01'}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Manufacture Date</span>
                  <span className="font-semibold text-zinc-950">{vehicle.manufactureYearMonth || `${vehicle.year} / 01`}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Steering</span>
                  <span className="font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    {vehicle.steering} (Right-Hand Drive)
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Transmission</span>
                  <span className="font-semibold text-zinc-950">{vehicle.transmission}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Drive Train</span>
                  <span className="font-semibold text-zinc-950">{vehicle.drivetrain}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Fuel Type</span>
                  <span className="font-semibold text-zinc-950">{vehicle.fuelType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Body Type</span>
                  <span className="font-semibold text-zinc-950">{vehicle.bodyType}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Body Color</span>
                  <span className="font-semibold text-zinc-950">{vehicle.exteriorColor} ({vehicle.colorCode})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Interior Color / Trim</span>
                  <span className="font-semibold text-zinc-950">{vehicle.interiorColor}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Doors / Seats</span>
                  <span className="font-semibold text-zinc-950">{vehicle.doors} Doors / {vehicle.seats} Seats</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-zinc-200">
                  <span className="text-zinc-600">Port / Delivery Location</span>
                  <span className="font-semibold text-zinc-950">{vehicle.locationYard}</span>
                </div>
              </div>
            )}

            {/* Tab 2: Dimensions & M3 Shipping Specifications */}
            {specTab === 'dimensions' && (
              <div className="space-y-4">
                <div className="p-3 bg-white rounded-lg border border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider block">
                      SBT Japan Shipping Volume
                    </span>
                    <span className="text-xl font-bold font-mono text-zinc-950">{vehicle.m3}</span>
                  </div>
                  <span className="text-xs text-zinc-500 max-w-[280px] text-right">
                    Official cubic meter rating used for RoRo freight booking from Yokohama/Nagoya to Mombasa.
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Dimensions (L × W × H)</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.dimensions}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Wheelbase</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.wheelbase}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Ground Clearance</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.groundClearance}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Vehicle Curb Weight</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.curbWeight}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Gross Vehicle Weight (GVW)</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.grossWeight}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Max Loading Capacity</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.maxLoadingCapacity || '450 kg'}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Fuel Tank Capacity</span>
                    <span className="font-mono font-semibold text-zinc-950">{vehicle.fuelTankCapacity}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-zinc-200">
                    <span className="text-zinc-600">Fuel Economy Test</span>
                    <span className="font-semibold text-zinc-950">{vehicle.fuelEconomy}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: SBT Equipment & Options Checklist */}
            {specTab === 'options' && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                {optionsList.map((opt) => (
                  <div
                    key={opt.key}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                      opt.val
                        ? 'bg-white border-zinc-200 text-zinc-950'
                        : 'bg-zinc-100/60 border-zinc-200 text-zinc-400'
                    }`}
                  >
                    {opt.val ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    ) : (
                      <Minus className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    )}
                    <span className={`text-[11px] truncate ${opt.val ? 'font-semibold' : ''}`}>
                      {opt.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Financing Studio */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <span className="text-xs text-zinc-600 font-semibold uppercase tracking-wider block mb-1">
                  Bank Asset Financing
                </span>
                <h3 className="text-base font-bold text-zinc-950">Monthly Payment Calculator</h3>
                <p className="text-xs text-zinc-600 mt-0.5">Financing available via NCBA, Stanbic, and I&M Bank Kenya.</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-zinc-600 block">Estimated Payment</span>
                <span className="font-mono text-xl font-bold text-zinc-950">
                  KES {monthlyPayment.toLocaleString()}<span className="text-xs font-normal text-zinc-600">/mo</span>
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-600">Down Payment ({depositPercent}%)</span>
                  <span className="font-semibold text-zinc-950">KES {depositAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  step="5"
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>15% (Min)</span>
                  <span>40%</span>
                  <span>60%</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-zinc-600">Loan Duration ({loanTenureMonths} Months / {loanTenureMonths / 12} Years)</span>
                  <span className="font-semibold text-zinc-950">{loanTenureMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="60"
                  step="12"
                  value={loanTenureMonths}
                  onChange={(e) => setLoanTenureMonths(Number(e.target.value))}
                  className="w-full accent-zinc-950 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-zinc-500 mt-1">
                  <span>1 Year</span>
                  <span>3 Years</span>
                  <span>5 Years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Workshop Pre-Delivery Inspection Certificate Box */}
          <div className="p-6 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="text-sm font-bold text-zinc-950">
                    100-Point Workshop Inspection Certificate
                  </h4>
                  <p className="text-xs text-zinc-600">Inspected and certified for Stock #{vehicle.stockNo} • {vehicle.chassisNo}</p>
                </div>
              </div>
              <button
                onClick={() => setShowAuctionModal(true)}
                className="btn-ghost !py-1.5 !px-3 !text-xs cursor-pointer inline-flex items-center border border-zinc-300 rounded hover:bg-zinc-100"
              >
                <FileText className="w-3.5 h-3.5 text-zinc-700 mr-1.5" />
                <span>Japanese Auction Sheet</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {vehicle.workshopProtocol.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout Bar */}
          <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-zinc-600 block">
                Total Price (Duty Paid & Registered)
              </span>
              <span className="font-mono text-xl sm:text-2xl font-bold text-zinc-950">KES {vehicle.priceKes.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onScheduleTestDrive(vehicle)}
                className="btn-ghost !py-2.5 !px-4 !text-xs cursor-pointer w-full sm:w-auto inline-flex items-center justify-center border border-zinc-300 rounded-lg hover:bg-zinc-100 text-zinc-900 font-semibold"
              >
                <Calendar className="w-3.5 h-3.5 mr-2" />
                <span>Book Test Drive</span>
              </button>

              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(vehicle.name)}%20(Stock%20${vehicle.stockNo},%20Chassis%20${vehicle.chassisNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold !py-2.5 !px-5 !text-xs rounded-lg w-full sm:w-auto inline-flex items-center justify-center shadow transition-colors"
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
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-6 relative border border-zinc-200 rounded-xl text-left shadow-2xl">
            <button
              onClick={() => setShowAuctionModal(false)}
              className="absolute top-4 right-4 p-2 text-zinc-600 hover:text-zinc-950 cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="inline-flex items-center gap-2 mb-1">
              <span className="text-xs uppercase tracking-wider text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 block">
                Official Japanese Auction Document
              </span>
            </div>
            <h3 className="text-lg font-bold text-zinc-950 mb-1">
              {vehicle.auctionHall} Auction Sheet & SBT Inspection
            </h3>
            <p className="text-xs text-zinc-600 mb-5 font-mono">
              Chassis: {vehicle.chassisNo} • Grade: {vehicle.auctionGrade} • Interior: {vehicle.interiorGrade}
            </p>

            <div className="bg-zinc-50 p-4 rounded-lg text-xs font-mono space-y-2 border border-zinc-200">
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Auction Hall:</span>
                <span className="text-zinc-950 font-bold">{vehicle.auctionHall} (Japan)</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Stock No / SBT Ref:</span>
                <span className="text-zinc-950 font-bold">{vehicle.stockNo} / {vehicle.sbtStockId || `SBT-${vehicle.stockNo}`}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Frame / Chassis #:</span>
                <span className="text-zinc-950 font-bold">{vehicle.chassisNo}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Auction Score:</span>
                <span className="text-zinc-950 font-bold">{vehicle.auctionGrade}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Interior / Exterior Score:</span>
                <span className="text-zinc-950 font-bold">{vehicle.interiorGrade}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-200 pb-1.5">
                <span className="text-zinc-600">Accident History:</span>
                <span className="text-emerald-700 font-bold">ZERO (Clean Original Chassis)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-600">QISJ Pre-Shipment Inspection:</span>
                <span className="text-emerald-700 font-bold">PASSED & AUTHENTICATED</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <a
                href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20please%20send%20the%20original%20scanned%20Japanese%20auction%20sheet%20PDF%20for%20${encodeURIComponent(vehicle.name)}%20(Chassis%20${vehicle.chassisNo}).`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-950 hover:bg-zinc-800 text-white font-bold !py-2.5 !px-4 !text-xs rounded-lg transition-colors inline-flex items-center shadow"
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
