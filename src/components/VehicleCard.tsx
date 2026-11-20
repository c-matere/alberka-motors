import React from 'react';
import { ArrowRight, MessageCircle, Heart } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';
import { getVehiclePricing } from '../data/modelHubs';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
  onInquire?: (vehicle: Vehicle) => void;
  disableScrollReveal?: boolean;
  staggerIndex?: number;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onInquire,
  disableScrollReveal = false,
  staggerIndex = 0,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const shouldReveal = disableScrollReveal || isVisible;

  const delays = ['', 'delay-75', 'delay-150', 'delay-225'];
  const delayClass = delays[staggerIndex % 4] || '';

  const pricing = getVehiclePricing(vehicle);

  // Extract Engine Displacement
  const getDisplacement = (engineStr: string) => {
    if (!engineStr) return '2.0L';
    const clean = engineStr.replace(/,/g, '');
    const match = clean.match(/(\d+\.?\d*)\s*(L|cc)/i);
    if (match) {
      if (match[2].toLowerCase() === 'cc') {
        const cc = parseFloat(match[1]);
        return `${(cc / 1000).toFixed(1)}L`;
      }
      return `${match[1]}L`;
    }
    const firstWord = engineStr.split(' ')[0];
    if (firstWord && /\d/.test(firstWord)) return firstWord;
    return '2.0L';
  };

  const getTransmission = (trans: string) => {
    if (!trans) return 'Automatic';
    const t = trans.toLowerCase();
    if (t.includes('auto') || t.includes('at') || t.includes('cvt')) return 'Automatic';
    if (t.includes('manual')) return 'Manual';
    return trans;
  };

  const getDrivetrain = (drive: string) => {
    if (!drive) return '4WD';
    const d = drive.toUpperCase();
    if (d.includes('4WD')) return '4WD';
    if (d.includes('AWD')) return 'AWD';
    if (d.includes('2WD') || d.includes('FWD')) return '2WD';
    return drive;
  };

  const handleInquire = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Hello Alberka Enterprises, I am inquiring about the ${vehicle.year} ${vehicle.name} (Stock ID: ${vehicle.sbtStockId || vehicle.stockNo}), priced at KES ${vehicle.priceKes.toLocaleString()} at your showroom next to Ganjoni Primary School, Mombasa. Please share viewing details.`
    );
    window.open(`https://wa.me/254180423075?text=${text}`, '_blank');
  };

  return (
    <div
      ref={disableScrollReveal ? undefined : ref}
      onClick={() => onSelect(vehicle)}
      className={`bg-white rounded-[14px] border border-[#ebebeb] hover:border-[#dddddd] p-3 text-left relative group cursor-pointer transition-all duration-300 shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 flex flex-col justify-between ${
        disableScrollReveal ? '' : `scroll-reveal ${delayClass} ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* 1. Full-Bleed Photograph Container (Airbnb 12px Card Pattern) */}
        <div className="relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#f7f7f7] border border-[#ebebeb]/50 mb-2.5 group/img">
          <img
            src={vehicle.heroImage}
            alt={vehicle.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover/img:scale-103 transition-transform duration-500 ease-out"
          />

          {/* Top-Left: Guest Favorite / Inspection Grade Pill */}
          <div className="absolute top-2 left-2 z-10">
            <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-md text-[#222222] border border-black/5 text-[10.5px] font-semibold px-2 py-0.5 rounded-full shadow-2xs">
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
            className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-xs ${
              isFavorite
                ? 'bg-white text-[#ff385c] shadow-xs'
                : 'bg-white/85 hover:bg-white text-[#222222] hover:text-[#ff385c] shadow-xs border border-white/60'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
            aria-label={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-[#ff385c] text-[#ff385c]' : 'stroke-[2.2]'}`} />
          </button>

          {/* Bottom-Left: Savings Pill */}
          {pricing.hasDiscount && (
            <div className="absolute bottom-2 left-2 z-10">
              <span className="inline-flex items-center rounded-full px-2 py-0.5 text-[9.5px] font-medium bg-white/95 backdrop-blur-md text-[#222222] border border-black/5 font-mono shadow-2xs whitespace-nowrap shrink-0">
                Save KES {pricing.savingsKes.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        {/* 2. Content Block: Title + Metadata */}
        <div className="space-y-0.5 px-0.5">
          <h3 className="text-[14px] sm:text-[15px] font-medium text-[#222222] group-hover:text-black transition-colors truncate leading-snug">
            {vehicle.year} {vehicle.name}
          </h3>
          <p className="text-xs text-[#6a6a6a] font-normal truncate">
            {getDisplacement(vehicle.engine)} · {getTransmission(vehicle.transmission)} · {getDrivetrain(vehicle.drivetrain)} · {vehicle.mileageKm.toLocaleString()} KM
          </p>
        </div>
      </div>

      {/* 3. Bottom Row: Price & Inspection Link */}
      <div className="mt-2.5 pt-2 border-t border-[#ebebeb] flex items-center justify-between px-0.5">
        <div className="flex items-baseline gap-1">
          <span className="text-[#222222] font-semibold text-sm sm:text-[15px] font-mono leading-none">
            KES {pricing.currentPrice.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#6a6a6a] font-normal">
            duty-paid
          </span>
        </div>

        <span className="text-xs font-semibold text-[#222222] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
          <span>Inspect</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};

// Airbnb-Style Loading Skeleton for Vehicle Cards
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[14px] border border-[#ebebeb] p-3 flex flex-col justify-between animate-pulse text-left shadow-[0_1px_2px_rgba(0,0,0,0.08),0_4px_12px_rgba(0,0,0,0.05)]">
      <div>
        <div className="aspect-[4/3] rounded-[12px] bg-[#f7f7f7] border border-[#ebebeb] mb-2.5" />
        <div className="space-y-1.5 px-0.5">
          <div className="h-4 w-3/4 bg-[#f7f7f7] rounded" />
          <div className="h-3 w-1/2 bg-[#f7f7f7] rounded" />
        </div>
      </div>
      <div className="mt-3 pt-2 border-t border-[#ebebeb] flex items-center justify-between px-0.5">
        <div className="h-4 w-24 bg-[#f7f7f7] rounded" />
        <div className="h-4 w-12 bg-[#f7f7f7] rounded" />
      </div>
    </div>
  );
};

export default VehicleCard;
