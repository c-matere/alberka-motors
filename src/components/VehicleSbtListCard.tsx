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

  // Car Maker Brand Logo Mapping
  const makeKey = vehicle.name.split(' ')[0].toLowerCase();
  const makerLogos: Record<string, string> = {
    toyota: '/logos/toyota.png',
    nissan: '/logos/nissan.png',
    subaru: '/logos/subaru.png',
    suzuki: '/logos/suzuki.png',
    volvo: '/logos/volvo.png',
    mazda: '/logos/mazda.png',
    honda: '/logos/honda.png',
    mitsubishi: '/logos/mitsubishi.png',
    lexus: '/logos/lexus.png',
    mercedes: '/logos/mercedes.png',
    bmw: '/logos/bmw.png',
    volkswagen: '/logos/volkswagen.png',
    audi: '/logos/audi.png',
    landrover: '/logos/landrover.png',
    isuzu: '/logos/isuzu.png',
    daihatsu: '/logos/daihatsu.png',
    hyundai: '/logos/hyundai.png',
    porsche: '/logos/porsche.png',
    ford: '/logos/ford.png',
    peugeot: '/logos/peugeot.png',
    jeep: '/logos/jeep.png',
    kia: '/logos/kia.png',
    renault: '/logos/renault.png',
  };
  const makeLogo = makerLogos[makeKey] || null;

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

  // Format engine summary displacement to prevent grid squeezing
  const formatEngineSummary = (eng: string) => {
    if (!eng) return 'Petrol';
    const m = eng.match(/^(\d[\d,]*\s*(?:cc|L))/i);
    if (m) return m[1];
    return eng.split(' ')[0] || eng;
  };

  return (
    <div
      onClick={() => onSelect(vehicle)}
      className="bg-white border border-zinc-200/70 hover:border-red-600/40 rounded-2xl p-4 sm:p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_rgba(220,38,38,0.07)] transition-all duration-300 flex flex-col lg:flex-row gap-5 lg:gap-6 text-left relative group cursor-pointer"
    >
      {/* 1. LEFT COLUMN: Media Viewer & Gallery Preview */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2.5">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200/80 shadow-xs group/img">
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
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-zinc-950 border border-zinc-200/80 text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
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
                : 'bg-white/90 text-zinc-700 border-zinc-200 hover:bg-white hover:text-red-600 shadow-xs'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
            aria-label={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white text-white' : ''}`} />
          </button>

          {/* Bottom-Left: Photo Count Pill */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-zinc-900 border border-zinc-200 text-[10px] font-mono font-bold px-2 py-0.5 rounded shadow-sm">
              <Camera className="w-3 h-3 text-red-600" />
              <span>{vehicle.gallery?.length || 15} Photos</span>
            </span>
          </div>

          {/* Bottom-Right: Stock Location */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-emerald-800 border border-emerald-200/80 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wide">
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
              <span className="font-mono text-[11px] font-semibold text-zinc-600 bg-[#F8F9FB] border border-zinc-200/70 px-2 py-0.5 rounded">
                SBT Ref: {vehicle.sbtStockId}
              </span>
            )}
            {vehicle.modelCode && (
              <span className="font-mono text-[11px] font-semibold text-zinc-500 hidden sm:inline">
                Code: {vehicle.modelCode}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-800 bg-[#F8F9FB] border border-zinc-200/80 px-2 py-0.5 rounded">
              <CheckCircle2 className="w-3 h-3 text-red-600" />
              <span>JEVIC Odometer Verified</span>
            </span>
          </div>

          {/* Vehicle Title & Maker Logo (B/W by default, color on hover) */}
          <div className="flex items-center gap-3 pt-0.5">
            {makeLogo && (
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#F8F9FB] border border-zinc-200/70 p-1 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-zinc-300 transition-all">
                <img
                  src={makeLogo}
                  alt={makeKey}
                  className="w-7 h-7 sm:w-8 sm:h-8 object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 shrink-0"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            )}
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-950 group-hover:text-red-600 transition-colors tracking-tight leading-snug">
              {vehicle.year} {vehicle.name}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-zinc-600 font-normal line-clamp-1">
            {vehicle.tagline || vehicle.moniker}
          </p>
        </div>

        {/* SBT Japan 6-Specification Matrix (Spacious, Un-squeezed 3x2 Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5 bg-[#F8F9FB] border border-zinc-200/80 rounded-xl p-4 sm:p-4.5 text-xs">
          {/* Mileage */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Gauge className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Mileage
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight">
                {vehicle.mileageKm.toLocaleString()} KM
              </span>
            </div>
          </div>

          {/* Year / Reg */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Calendar className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Year / Reg
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight">
                {vehicle.year} / {vehicle.registrationMonth || '08'}
              </span>
            </div>
          </div>

          {/* Engine Capacity */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Cpu className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Engine
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight truncate" title={vehicle.engine}>
                {formatEngineSummary(vehicle.engine)}
              </span>
            </div>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Sliders className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Gearbox
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight">
                {vehicle.transmission || 'Automatic'}
              </span>
            </div>
          </div>

          {/* Drivetrain */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Compass className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Drive
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight">
                {vehicle.drivetrain || '2WD'}
              </span>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center gap-2.5 min-w-0">
            <Fuel className="w-4 h-4 text-zinc-500 shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block font-semibold leading-tight mb-0.5">
                Fuel
              </span>
              <span className="font-bold text-zinc-950 font-mono text-[13px] block leading-tight">
                {vehicle.fuelType || 'Petrol'}
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
                className="bg-[#F8F9FB] text-zinc-700 font-medium text-[11px] px-2.5 py-0.5 rounded-md border border-zinc-200/70"
              >
                {opt}
              </span>
            ))}
            {activeOptions.length > 6 && (
              <span className="text-[10px] font-mono text-zinc-500 font-bold">
                +{activeOptions.length - 6} more options
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. RIGHT COLUMN: Pricing & Direct Actions */}
      <div className="w-full lg:w-60 xl:w-68 shrink-0 border-t lg:border-t-0 lg:border-l border-zinc-200/70 pt-4 lg:pt-0 lg:pl-6 flex flex-col justify-between space-y-4">
        
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
            className="w-full bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200/90 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-[0.98]"
          >
            <span>Explore Vehicle Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-zinc-600" />
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
    <div className="bg-white border border-zinc-200/70 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col lg:flex-row gap-5 lg:gap-6 animate-pulse text-left">
      {/* Left Media skeleton */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2.5">
        <div className="aspect-[4/3] rounded-xl bg-zinc-200/60" />
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3.5 bg-zinc-50 border border-zinc-100 rounded-xl p-4 sm:p-4.5">
          {[...Array(6)].map((_, i) => (
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
