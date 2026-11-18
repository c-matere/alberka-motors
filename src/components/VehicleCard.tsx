import React from 'react';
import { Calendar, Cog, Compass, Fuel, Users, Gauge, MessageCircle, Bookmark } from 'lucide-react';
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

  // Extract Make and Model cleanly
  const parts = vehicle.name.trim().split(' ');
  const make = parts[0] || 'TOYOTA';
  const model = parts.slice(1).join(' ') || vehicle.name;

  // Extract Engine Displacement (e.g. 2.7L, 3.0L, 2.5L)
  const getDisplacement = (engineStr: string) => {
    if (!engineStr) return '2.0L';
    const match = engineStr.match(/(\d+\.?\d*)\s*(L|cc)/i);
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

  // Extract Transmission
  const getTransmission = (trans: string) => {
    if (!trans) return 'Automatic';
    const t = trans.toLowerCase();
    if (t.includes('auto') || t.includes('at') || t.includes('cvt')) return 'Automatic';
    if (t.includes('manual')) return 'Manual';
    return trans;
  };

  // Extract Drivetrain
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
      className={`bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-2xl shadow-[0_2px_8px_-1px_rgba(0,0,0,0.05),0_1px_3px_0_rgba(0,0,0,0.03)] hover:shadow-[0_14px_28px_-6px_rgba(0,0,0,0.07),0_3px_10px_-2px_rgba(0,0,0,0.03)] hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden cursor-pointer flex flex-col justify-between ${
        disableScrollReveal ? '' : `scroll-reveal ${delayClass} ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      {/* Hover Ambient Gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-red-600/[0.04] via-transparent to-red-600/[0.02]" />

      <div>
        {/* Media Window */}
        <div className="relative w-full h-48 sm:h-52 bg-gray-100 overflow-hidden">
          {/* Top Scrim Gradient */}
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-black/35 via-black/10 to-transparent z-10 pointer-events-none" />

          {/* Top Left Japanese Provenance Grade Tag */}
          <div className="absolute top-2.5 left-2.5 z-20 pointer-events-none">
            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-bold bg-white/95 text-zinc-900 border-gray-200 shadow-sm backdrop-blur-sm">
              Grade {vehicle.auctionGrade || '4.5'}
            </span>
          </div>

          {/* Top Right: Promotional Discount Sticker (Only if vehicle has discount, NO fire emoji) */}
          {pricing.hasDiscount && (
            <div className="absolute top-2.5 right-2.5 z-20 pointer-events-none">
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10.5px] font-black bg-red-600 text-white shadow-sm uppercase tracking-wider">
                {pricing.discountPercent}% OFF
              </span>
            </div>
          )}

          {/* Bottom Right "In Stock" Status Badge */}
          <div className="absolute right-2.5 bottom-2.5 z-20 pointer-events-none">
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 border-emerald-200 shadow-sm backdrop-blur-sm">
              In Stock
            </span>
          </div>

          {/* Primary Vehicle Image */}
          <div className="absolute inset-0 transition-opacity duration-500 opacity-100">
            <img
              src={vehicle.heroImage}
              alt={`${vehicle.year} ${vehicle.name}`}
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="p-3.5 sm:p-4">
          {/* Make, Model & Price Row */}
          <div className="flex items-start justify-between gap-2.5 mb-3 min-h-[3.25rem]">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide truncate mb-0.5">
                {make}
              </p>
              <h3 className="font-bold text-gray-900 text-[14.5px] sm:text-base leading-tight truncate group-hover:text-red-600 transition-colors">
                {model}
              </h3>
            </div>
            <div className="text-right shrink-0 flex flex-col items-end justify-start">
              {pricing.hasDiscount && (
                <span className="text-[11px] font-mono line-through text-gray-400 leading-none">
                  KES {pricing.originalPrice.toLocaleString()}
                </span>
              )}
              <div className="flex items-baseline justify-end gap-1 mt-0.5">
                <span className="text-red-600 font-black text-base sm:text-lg font-mono tracking-tight leading-tight">
                  KES {pricing.currentPrice.toLocaleString()}
                </span>
              </div>
              {pricing.hasDiscount && (
                <span className="text-[10px] font-mono text-emerald-700 font-bold leading-none mt-0.5">
                  Save KES {pricing.savingsKes.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* 6-Grid Feature Pills Matrix */}
          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            {/* 1: Year */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Calendar className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{vehicle.year}</span>
            </div>

            {/* 2: Transmission */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Cog className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{getTransmission(vehicle.transmission)}</span>
            </div>

            {/* 3: Drivetrain */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Compass className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{getDrivetrain(vehicle.drivetrain)}</span>
            </div>

            {/* 4: Fuel */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Fuel className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{vehicle.fuelType}</span>
            </div>

            {/* 5: Seats */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Users className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{vehicle.seats || 5} Seats</span>
            </div>

            {/* 6: Engine Displacement */}
            <div className="flex items-center gap-1.5 text-gray-700 bg-gray-50 rounded px-2 py-1.5 border border-gray-100/80">
              <Gauge className="text-gray-500 flex-shrink-0" width={14} height={14} />
              <span className="truncate font-medium">{getDisplacement(vehicle.engine)}</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
            {/* Send Inquiry via WhatsApp / Drawer */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onInquire) {
                  onInquire(vehicle);
                } else {
                  handleInquire(e);
                }
              }}
              className="flex-1 py-2.5 px-4 text-xs font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white shadow-sm hover:shadow cursor-pointer active:scale-98"
              title="Send inquiry"
            >
              <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                <MessageCircle width={14} height={14} className="text-white fill-white" />
              </span>
              <span>Send Inquiry</span>
            </button>

            {/* Bookmark Vehicle (Round Button) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(vehicle.id);
              }}
              className={`w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center border cursor-pointer active:scale-95 shrink-0 ${
                isFavorite
                  ? 'bg-red-50 text-red-600 border-red-200 shadow-sm'
                  : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-zinc-200 hover:text-zinc-950'
              }`}
              title={isFavorite ? 'Remove from saved fleet' : 'Bookmark vehicle'}
              aria-label={isFavorite ? 'Remove from saved fleet' : 'Bookmark vehicle'}
            >
              <Bookmark width={14} height={14} className={isFavorite ? 'fill-red-600 text-red-600' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Animated Loading Skeleton for Vehicle Cards
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse shadow-sm flex flex-col justify-between">
      <div>
        <div className="relative w-full h-52 sm:h-56 bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-3 min-h-[3.25rem]">
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-16 bg-gray-200 rounded" />
              <div className="h-4 w-3/4 bg-gray-300 rounded" />
            </div>
            <div className="space-y-1 w-24 flex flex-col items-end">
              <div className="h-5 w-20 bg-gray-300 rounded" />
              <div className="h-3 w-14 bg-gray-200 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-7 bg-gray-100 rounded" />
            ))}
          </div>
          <div className="flex gap-2 pt-3 border-t border-gray-200">
            <div className="h-9 flex-1 bg-gray-200 rounded" />
            <div className="h-9 w-9 bg-gray-200 rounded" />
            <div className="h-9 w-9 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};
