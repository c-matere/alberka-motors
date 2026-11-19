import React, { useState } from 'react';
import {
  Calendar,
  Gauge,
  Cpu,
  Sliders,
  Compass,
  Fuel,
  Palette,
  MapPin,
  Heart,
  ArrowRight,
  ShieldCheck,
  FileText,
  Camera,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { getVehiclePricing } from '../data/modelHubs';

interface VehicleSbtListCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
  onInquire?: (vehicle: Vehicle) => void;
}

export const VehicleSbtListCard: React.FC<VehicleSbtListCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onInquire,
}) => {
  const pricing = getVehiclePricing(vehicle);
  const [activeThumbIndex, setActiveThumbIndex] = useState<number>(0);

  // Compile quick thumbnail strip (up to 4 photos)
  const thumbnails = [
    vehicle.heroImage,
    ...(vehicle.gallery || []).slice(0, 3).map((g) => g.url),
  ].filter(Boolean);

  const activeImageUrl = thumbnails[activeThumbIndex] || vehicle.heroImage;

  // Active SBT equipment options
  const activeOptions: string[] = [];
  if (vehicle.options) {
    if (vehicle.options.pushStart) activeOptions.push('Push Start');
    if (vehicle.options.smartKey) activeOptions.push('Smart Key');
    if (vehicle.options.leatherSeats) activeOptions.push('Leather Seats');
    if (vehicle.options.sunroof) activeOptions.push('Sunroof');
    if (vehicle.options.camera360) activeOptions.push('360° Camera');
    else if (vehicle.options.backCamera) activeOptions.push('Rear Camera');
    if (vehicle.options.radarCruise) activeOptions.push('Radar Cruise');
    if (vehicle.options.laneAssist) activeOptions.push('Lane Assist');
    if (vehicle.options.alloyWheels) activeOptions.push('Alloy Wheels');
    if (vehicle.options.ledLights) activeOptions.push('LED Headlights');
    if (vehicle.options.powerBackDoor) activeOptions.push('Power Tailgate');
    if (vehicle.options.doubleAc) activeOptions.push('Dual A/C');
  }

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onInquire) {
      onInquire(vehicle);
      return;
    }
    const message = encodeURIComponent(
      `Hello Alberka Enterprises, I am interested in the ${vehicle.year} ${vehicle.name} (Stock: ${vehicle.stockNo}, SBT Ref: ${vehicle.sbtStockId || vehicle.stockNo}) listed for KES ${vehicle.priceKes.toLocaleString()}. Please share more details and availability.`
    );
    window.open(`https://wa.me/254180423075?text=${message}`, '_blank');
  };

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="bg-white border border-zinc-200/90 hover:border-red-600/50 rounded-2xl p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(220,38,38,0.08)] transition-all duration-300 flex flex-col lg:flex-row gap-5 lg:gap-6 text-left relative group cursor-pointer"
    >
      {/* 1. LEFT COLUMN: Media Viewer & Gallery Preview */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2.5">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-900 border border-zinc-200/80 shadow-xs group/img">
          <img
            src={activeImageUrl}
            alt={vehicle.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradient Film */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

          {/* Top-Left: Auction Grade Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-black/85 backdrop-blur-md text-white border border-white/20 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>Grade {vehicle.auctionGrade || '4.5'}</span>
            </span>
          </div>

          {/* Top-Right: Bookmark Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md border ${
              isFavorite
                ? 'bg-red-600 text-white border-red-500 shadow-md scale-105'
                : 'bg-black/40 text-white/90 border-white/20 hover:bg-white hover:text-zinc-950'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
            aria-label={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white text-white' : ''}`} />
          </button>

          {/* Bottom-Left: Photo Count Pill */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-white border border-white/20 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm">
              <Camera className="w-3 h-3 text-red-400" />
              <span>{vehicle.gallery?.length || 15} Photos</span>
            </span>
          </div>

          {/* Bottom-Right: Stock Location */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-emerald-600/95 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
              Mombasa Stock
            </span>
          </div>
        </div>

        {/* Thumbnail Preview Selector (Interactive 4-Photo Strip) */}
        {thumbnails.length > 1 && (
          <div className="grid grid-cols-4 gap-1.5" onClick={(e) => e.stopPropagation()}>
            {thumbnails.map((url, tIdx) => (
              <button
                key={tIdx}
                onMouseEnter={() => setActiveThumbIndex(tIdx)}
                onClick={() => setActiveThumbIndex(tIdx)}
                className={`aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-zinc-100 ${
                  activeThumbIndex === tIdx
                    ? 'border-red-600 ring-2 ring-red-600/30 shadow-xs scale-102'
                    : 'border-zinc-200 opacity-70 hover:opacity-100 hover:border-zinc-300'
                }`}
                title={`Preview photo ${tIdx + 1}`}
              >
                <img src={url} alt={`Preview ${tIdx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. MIDDLE COLUMN: Vehicle Identity & Detailed Specifications Table */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-3.5">
        
        {/* Identity & Reference Header */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-bold text-red-600 bg-red-50 border border-red-200/80 px-2 py-0.5 rounded">
              STOCK: {vehicle.stockNo}
            </span>
            {vehicle.sbtStockId && (
              <span className="font-mono text-[11px] font-semibold text-zinc-600 bg-zinc-100 px-2 py-0.5 rounded">
                SBT Ref: {vehicle.sbtStockId}
              </span>
            )}
            {vehicle.modelCode && (
              <span className="font-mono text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                Code: {vehicle.modelCode}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>JEVIC Odometer Verified</span>
            </span>
          </div>

          {/* Vehicle Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 group-hover:text-red-600 transition-colors tracking-tight leading-snug">
            {vehicle.year} {vehicle.name}
          </h2>

          <p className="text-xs sm:text-sm text-zinc-600 font-normal line-clamp-1">
            {vehicle.tagline || vehicle.moniker}
          </p>
        </div>

        {/* SBT Japan 4-Column Specification Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50/80 border border-zinc-200/80 rounded-xl p-3 text-xs">
          {/* Mileage */}
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Mileage
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.mileageKm.toLocaleString()} KM
              </span>
            </div>
          </div>

          {/* Year / Reg */}
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Year / Reg
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.year} / {vehicle.registrationMonth || '08'}
              </span>
            </div>
          </div>

          {/* Engine Capacity */}
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Engine
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.engine}
              </span>
            </div>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Gearbox
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.transmission || 'Automatic'}
              </span>
            </div>
          </div>

          {/* Drivetrain */}
          <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Drive
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.drivetrain || '2WD'}
              </span>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center gap-2">
            <Fuel className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Fuel
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.fuelType || 'Petrol'}
              </span>
            </div>
          </div>

          {/* Color & Steering */}
          <div className="flex items-center gap-2">
            <Palette className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Color
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                {vehicle.exteriorColor || 'Pearl'}
              </span>
            </div>
          </div>

          {/* Showroom Yard */}
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-600 uppercase block font-semibold leading-none mb-0.5">
                Location
              </span>
              <span className="font-bold text-zinc-900 font-mono text-[12px] truncate block">
                Mombasa Yard
              </span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Badges */}
        {activeOptions.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {activeOptions.slice(0, 6).map((opt, oIdx) => (
              <span
                key={oIdx}
                className="bg-zinc-100 text-zinc-700 font-medium text-[11px] px-2 py-0.5 rounded-md border border-zinc-200/70"
              >
                {opt}
              </span>
            ))}
            {activeOptions.length > 6 && (
              <span className="text-[10px] font-mono text-zinc-600 font-bold">
                +{activeOptions.length - 6} more options
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. RIGHT COLUMN: Pricing & Direct Actions */}
      <div className="w-full lg:w-60 xl:w-68 shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
        
        {/* Delivered Cash Price Block */}
        <div className="space-y-1">
          <div className="flex items-center justify-between lg:justify-start gap-2">
            <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider font-semibold block">
              DELIVERED CASH PRICE
            </span>
            {pricing.hasDiscount && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold bg-red-600 text-white font-mono shadow-xs">
                Save KES {pricing.savingsKes.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-3xl font-extrabold text-red-600 font-mono tracking-tight leading-none">
              KES {vehicle.priceKes.toLocaleString()}
            </div>
          </div>

          {pricing.hasDiscount && (
            <div className="text-xs font-mono text-zinc-600 line-through">
              Was KES {pricing.originalPrice.toLocaleString()}
            </div>
          )}

          <p className="text-[11px] text-zinc-600 font-normal leading-tight pt-1">
            Includes KRA customs duty, port clearance & Mombasa handover.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2" onClick={(e) => e.stopPropagation()}>
          {/* Primary View Car Dossier */}
          <button
            onClick={() => onSelect(vehicle)}
            className="w-full bg-zinc-950 hover:bg-zinc-800 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <span>Explore Vehicle Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* WhatsApp Direct Inquiry */}
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 fill-white shrink-0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
            </svg>
            <span>Inquire on WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export const VehicleSbtListCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-zinc-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row gap-5 lg:gap-6 animate-pulse text-left">
      {/* Left Media skeleton */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2.5">
        <div className="aspect-[4/3] rounded-xl bg-zinc-200/80" />
        <div className="grid grid-cols-4 gap-1.5">
          <div className="aspect-[4/3] rounded-lg bg-zinc-200/60" />
          <div className="aspect-[4/3] rounded-lg bg-zinc-200/60" />
          <div className="aspect-[4/3] rounded-lg bg-zinc-200/60" />
          <div className="aspect-[4/3] rounded-lg bg-zinc-200/60" />
        </div>
      </div>

      {/* Middle Specs skeleton */}
      <div className="flex-1 space-y-3 py-1">
        <div className="flex gap-2">
          <div className="h-5 w-24 bg-zinc-200/80 rounded" />
          <div className="h-5 w-28 bg-zinc-200/60 rounded" />
        </div>
        <div className="h-7 w-3/4 bg-zinc-200 rounded" />
        <div className="h-4 w-1/2 bg-zinc-200/60 rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-zinc-50 border border-zinc-100 rounded-xl p-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-8 bg-zinc-200/60 rounded" />
          ))}
        </div>
        <div className="flex gap-2">
          <div className="h-5 w-20 bg-zinc-200/60 rounded-md" />
          <div className="h-5 w-20 bg-zinc-200/60 rounded-md" />
          <div className="h-5 w-20 bg-zinc-200/60 rounded-md" />
        </div>
      </div>

      {/* Right Price skeleton */}
      <div className="w-full lg:w-60 xl:w-68 shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200/80 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-zinc-200/60 rounded" />
          <div className="h-8 w-44 bg-zinc-200 rounded" />
          <div className="h-3 w-full bg-zinc-200/40 rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-10 w-full bg-zinc-200 rounded-xl" />
          <div className="h-10 w-full bg-zinc-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
};
