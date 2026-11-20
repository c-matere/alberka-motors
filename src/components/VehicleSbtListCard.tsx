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
  Sparkles,
  MessageCircle
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
      className="bg-white border border-[#ebebeb] hover:border-[#dddddd] rounded-[14px] p-3.5 sm:p-4 transition-all duration-200 flex flex-col lg:flex-row gap-4 lg:gap-5 text-left relative group cursor-pointer hover:shadow-xs"
    >
      {/* 1. LEFT COLUMN: Media Viewer & Gallery Preview */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2">
        <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#f7f7f7] border border-[#ebebeb] group/img">
          <img
            src={activeImageUrl}
            alt={vehicle.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover/img:scale-103 transition-transform duration-500 ease-out"
          />

          {/* Gradient Film */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15 pointer-events-none" />

          {/* Top-Left: Guest Favorite / Auction Grade Pill */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#222222] border border-black/5 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff385c]" />
              <span>Grade {vehicle.auctionGrade || '4.5'}</span>
            </span>
          </div>

          {/* Top-Right: Airbnb Wishlist Heart Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs ${
              isFavorite
                ? 'bg-white text-[#ff385c] shadow-xs'
                : 'bg-white/85 hover:bg-white text-[#222222] hover:text-[#ff385c] shadow-xs border border-white/60'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
            aria-label={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#ff385c] text-[#ff385c]' : 'stroke-[2.2]'}`} />
          </button>

          {/* Bottom-Left: Photo Count Pill */}
          <div className="absolute bottom-2.5 left-2.5 z-10">
            <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md text-[#222222] border border-black/5 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full shadow-2xs">
              <Camera className="w-3 h-3 text-[#ff385c]" />
              <span>{vehicle.gallery?.length || 15} Photos</span>
            </span>
          </div>

          {/* Bottom-Right: Stock Location */}
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#222222] border border-black/5 text-[10px] font-medium px-2 py-0.5 rounded-full shadow-2xs">
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
                className={`aspect-[4/3] rounded-[8px] overflow-hidden border transition-all cursor-pointer bg-[#f7f7f7] ${
                  activeThumbIndex === tIdx
                    ? 'border-[#ff385c] ring-1 ring-[#ff385c]/30 shadow-2xs scale-102'
                    : 'border-[#ebebeb] opacity-75 hover:opacity-100 hover:border-[#dddddd]'
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
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5 space-y-3">
        
        {/* Identity & Reference Header */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[11px] font-medium text-[#ff385c] bg-[#fff0f3] border border-[#ff385c]/25 px-2.5 py-0.5 rounded-full">
              STOCK: {vehicle.stockNo}
            </span>
            {vehicle.sbtStockId && (
              <span className="font-mono text-[11px] font-normal text-[#6a6a6a] bg-[#f7f7f7] border border-[#ebebeb] px-2.5 py-0.5 rounded-full">
                SBT Ref: {vehicle.sbtStockId}
              </span>
            )}
            {vehicle.modelCode && (
              <span className="font-mono text-[11px] font-normal text-[#6a6a6a] hidden sm:inline">
                Code: {vehicle.modelCode}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#222222] bg-[#f7f7f7] border border-[#ebebeb] px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-[#ff385c]" />
              <span>JEVIC Verified</span>
            </span>
          </div>

          {/* Vehicle Title & Maker Logo */}
          <div className="flex items-center gap-2.5 pt-0.5">
            {makeLogo && (
              <div className="w-8 h-8 rounded-[8px] bg-[#f7f7f7] border border-[#ebebeb] p-1 flex items-center justify-center shrink-0 group-hover:bg-white group-hover:border-[#dddddd] transition-all">
                <img
                  src={makeLogo}
                  alt={makeKey}
                  className="w-6 h-6 object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 shrink-0"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            )}
            <h2 className="text-lg sm:text-[20px] font-medium text-[#222222] group-hover:text-[#ff385c] transition-colors tracking-tight leading-snug">
              {vehicle.year} {vehicle.name}
            </h2>
          </div>

          <p className="text-xs sm:text-[13px] text-[#6a6a6a] font-normal line-clamp-1">
            {vehicle.tagline || vehicle.moniker}
          </p>
        </div>

        {/* 6-Specification Matrix (Quiet, Architectural) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3 bg-white border border-[#ebebeb] rounded-[10px] p-3 sm:p-3.5 text-xs">
          {/* Mileage */}
          <div className="flex items-center gap-2 min-w-0">
            <Gauge className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Mileage
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight">
                {vehicle.mileageKm.toLocaleString()} KM
              </span>
            </div>
          </div>

          {/* Year / Reg */}
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Year / Reg
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight">
                {vehicle.year} / {vehicle.registrationMonth || '08'}
              </span>
            </div>
          </div>

          {/* Engine Capacity */}
          <div className="flex items-center gap-2 min-w-0">
            <Cpu className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Engine
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight truncate" title={vehicle.engine}>
                {formatEngineSummary(vehicle.engine)}
              </span>
            </div>
          </div>

          {/* Transmission */}
          <div className="flex items-center gap-2 min-w-0">
            <Sliders className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Gearbox
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight">
                {vehicle.transmission || 'Automatic'}
              </span>
            </div>
          </div>

          {/* Drivetrain */}
          <div className="flex items-center gap-2 min-w-0">
            <Compass className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Drive
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight">
                {vehicle.drivetrain || '2WD'}
              </span>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="flex items-center gap-2 min-w-0">
            <Fuel className="w-3.5 h-3.5 text-[#6a6a6a] shrink-0" />
            <div className="min-w-0">
              <span className="text-[10px] font-mono text-[#6a6a6a] uppercase block font-normal leading-tight mb-0.5">
                Fuel
              </span>
              <span className="font-medium text-[#222222] font-mono text-[13px] block leading-tight">
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
                className="bg-white text-[#6a6a6a] hover:text-[#222222] font-normal text-[11px] px-2.5 py-0.5 rounded-full border border-[#ebebeb]"
              >
                {opt}
              </span>
            ))}
            {activeOptions.length > 6 && (
              <span className="text-[10px] font-mono text-[#6a6a6a]">
                +{activeOptions.length - 6} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. RIGHT COLUMN: Pricing & Direct Actions */}
      <div className="w-full lg:w-64 xl:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-[#ebebeb] pt-3 lg:pt-0 lg:pl-5 flex flex-col justify-between space-y-3.5">
        
        {/* Delivered Cash Price Block */}
        <div className="space-y-1">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="font-mono text-[10px] text-[#6a6a6a] uppercase tracking-wider font-medium block whitespace-nowrap">
              DELIVERED CASH PRICE
            </span>
            {pricing.hasDiscount && (
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold bg-[#fff0f3] text-[#ff385c] border border-[#ff385c]/25 font-mono shadow-2xs whitespace-nowrap shrink-0">
                Save KES {pricing.savingsKes.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-2">
            <div className="text-2xl sm:text-[26px] font-semibold text-[#222222] font-mono tracking-tight leading-none">
              KES {vehicle.priceKes.toLocaleString()}
            </div>
          </div>

          {pricing.hasDiscount && (
            <div className="text-xs font-mono text-[#6a6a6a] line-through">
              Was KES {pricing.originalPrice.toLocaleString()}
            </div>
          )}

          <p className="text-[11px] text-[#6a6a6a] font-normal leading-tight pt-0.5">
            Includes KRA customs duty, port clearance & Mombasa yard handover.
          </p>
        </div>

        {/* Action Buttons (Pill-shaped, Airbnb Hierarchy) */}
        <div className="space-y-2 pt-1" onClick={(e) => e.stopPropagation()}>
          {/* Primary View Car Dossier */}
          <button
            onClick={() => onSelect(vehicle)}
            className="w-full bg-[#ff385c] hover:bg-[#e00b41] text-white font-medium py-2.5 px-4 rounded-full text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs hover:shadow active:scale-[0.98]"
          >
            <span>Explore Vehicle Dossier</span>
            <ArrowRight className="w-3.5 h-3.5 text-white/90" />
          </button>

          {/* WhatsApp Direct Inquiry */}
          <button
            onClick={handleWhatsAppInquiry}
            className="w-full bg-white hover:bg-[#f7f7f7] text-[#222222] border border-[#ebebeb] hover:border-[#dddddd] font-medium py-2 px-4 rounded-full text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs active:scale-[0.98]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
            <span>Chat WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export const VehicleSbtListCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-[#ebebeb] rounded-[14px] p-3.5 sm:p-4 shadow-2xs flex flex-col lg:flex-row gap-4 lg:gap-5 animate-pulse text-left">
      {/* Left Media skeleton */}
      <div className="w-full lg:w-72 xl:w-80 shrink-0 space-y-2">
        <div className="aspect-[4/3] rounded-[12px] bg-[#f7f7f7] border border-[#ebebeb]" />
        <div className="grid grid-cols-4 gap-1.5">
          <div className="aspect-[4/3] rounded-[8px] bg-[#f7f7f7]" />
          <div className="aspect-[4/3] rounded-[8px] bg-[#f7f7f7]" />
          <div className="aspect-[4/3] rounded-[8px] bg-[#f7f7f7]" />
          <div className="aspect-[4/3] rounded-[8px] bg-[#f7f7f7]" />
        </div>
      </div>

      {/* Middle Specs skeleton */}
      <div className="flex-1 space-y-3 py-1">
        <div className="flex gap-2">
          <div className="h-5 w-24 bg-[#f7f7f7] border border-[#ebebeb] rounded-full" />
          <div className="h-5 w-28 bg-[#f7f7f7] border border-[#ebebeb] rounded-full" />
        </div>
        <div className="h-6 w-3/4 bg-[#f7f7f7] rounded" />
        <div className="h-4 w-1/2 bg-[#f7f7f7] rounded" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-5 gap-y-3 bg-white border border-[#ebebeb] rounded-[10px] p-3 sm:p-3.5">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-8 bg-[#ebebeb]/60 rounded" />
          ))}
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 w-20 bg-[#f7f7f7] border border-[#ebebeb] rounded-full" />
          <div className="h-5 w-20 bg-[#f7f7f7] border border-[#ebebeb] rounded-full" />
          <div className="h-5 w-20 bg-[#f7f7f7] border border-[#ebebeb] rounded-full" />
        </div>
      </div>

      {/* Right Price skeleton */}
      <div className="w-full lg:w-64 xl:w-72 shrink-0 border-t lg:border-t-0 lg:border-l border-[#ebebeb] pt-3 lg:pt-0 lg:pl-5 flex flex-col justify-between space-y-3.5">
        <div className="space-y-2">
          <div className="h-3 w-32 bg-[#f7f7f7] rounded" />
          <div className="h-8 w-44 bg-[#f7f7f7] rounded" />
          <div className="h-3 w-full bg-[#f7f7f7] rounded" />
        </div>
        <div className="space-y-2">
          <div className="h-9 w-full bg-[#f7f7f7] rounded-full border border-[#ebebeb]" />
          <div className="h-9 w-full bg-[#f7f7f7] rounded-full border border-[#ebebeb]" />
        </div>
      </div>
    </div>
  );
};
