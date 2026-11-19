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

  // Extract Make and Model cleanly
  const parts = vehicle.name.trim().split(' ');
  const make = parts[0] || 'TOYOTA';
  const model = parts.slice(1).join(' ') || vehicle.name;

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
      className={`hero-card group cursor-pointer ${
        disableScrollReveal ? '' : `scroll-reveal ${delayClass} ${shouldReveal ? 'is-visible' : ''}`
      }`}
      style={{
        backgroundImage: `url(${vehicle.heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '3 / 4',
        minHeight: '450px',
      }}
    >
      {/* Dark Film Gradient Overlay (1:1 Smart Team Layout) */}
      <div className="hero-card_overlay" />

      {/* Content Layer */}
      <div className="hero-card_content">
        
        {/* Top Header Section: Badges Row + Car Name on Top */}
        <div className="flex flex-col gap-2.5 z-20">
          {/* Top Badges Row */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold bg-white/95 text-zinc-950 border-white/40 shadow-sm backdrop-blur-md">
                Grade {vehicle.auctionGrade || '4.5'}
              </span>
              {pricing.hasDiscount && (
                <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold bg-red-600 text-white shadow-md font-mono">
                  Save KES {pricing.savingsKes.toLocaleString()}
                </span>
              )}
              <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] font-bold bg-zinc-950 text-white border-zinc-800 shadow-sm backdrop-blur-md">
                In Stock
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(vehicle.id);
              }}
              className={`w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center border cursor-pointer backdrop-blur-md active:scale-95 shrink-0 ${
                isFavorite
                  ? 'bg-red-600 text-white border-red-500 shadow-md'
                  : 'bg-black/35 text-white/90 border-white/20 hover:bg-white hover:text-zinc-950'
              }`}
              title={isFavorite ? 'Remove from saved fleet' : 'Bookmark vehicle'}
              aria-label={isFavorite ? 'Remove from saved fleet' : 'Bookmark vehicle'}
            >
              <Heart width={15} height={15} className={isFavorite ? 'fill-white text-white' : ''} />
            </button>
          </div>

          {/* Car Name on Top */}
          <div className="leading-tight pt-1">
            <div className="text-xl sm:text-2xl font-semibold text-white drop-shadow-md" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}>
              {vehicle.year} {make}<br />
              <span className="font-bold">{model}</span>
            </div>
          </div>
        </div>

        {/* Bottom Section: Category Tags + Price Action Button */}
        <div className="flex flex-col gap-3 z-20">
          
          {/* Category Tags: Brand, Fuel, and Was Price if discounted */}
          <div className="service-card_tags margin-0 z-index-1">
            <div className="category-tag text-white font-bold" style={{ background: '#DC2626', borderColor: '#DC2626' }}>
              {make}
            </div>
            <div className="category-tag text-white" style={{ background: 'rgba(255,255,255,0.16)', borderColor: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(6px)' }}>
              {vehicle.fuelType}
            </div>
            {pricing.hasDiscount && (
              <div className="category-tag text-zinc-300 font-mono line-through" style={{ background: 'rgba(0,0,0,0.4)', borderColor: 'rgba(255,255,255,0.15)' }}>
                Was KES {pricing.originalPrice.toLocaleString()}
              </div>
            )}
          </div>

          {/* Action Buttons Row: Price of the car + Round WhatsApp button */}
          <div className="flex items-center gap-2 pt-0.5 card-link-actions">
            <button
              onClick={() => onSelect(vehicle)}
              className="flex-1 h-11 inline-flex items-center justify-center gap-2 px-3 text-[14px] font-bold rounded-[14px] transition-all duration-200 cursor-pointer text-white shadow-md hover:shadow-lg active:scale-98 font-mono tracking-tight"
              style={{ background: '#DC2626', border: '1px solid #DC2626' }}
            >
              <span>KES {pricing.currentPrice.toLocaleString()}</span>
              <ArrowRight width={15} height={15} className="shrink-0" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onInquire) onInquire(vehicle);
                else handleInquire(e);
              }}
              className="w-11 h-11 rounded-full inline-flex items-center justify-center transition-all duration-200 cursor-pointer text-white shadow-md hover:shadow-lg hover:scale-105 active:scale-95 bg-[#25D366] hover:bg-[#20ba59] shrink-0"
              title="Inquire on WhatsApp"
              aria-label="Inquire on WhatsApp"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.11 7.44C8.95 7.44 8.68 7.5 8.46 7.74C8.24 7.97 7.61 8.56 7.61 9.77C7.61 10.98 8.49 12.14 8.61 12.31C8.74 12.47 10.33 14.93 12.78 15.98C13.36 16.23 13.82 16.39 14.17 16.5C14.76 16.69 15.3 16.66 15.73 16.6C16.21 16.53 17.2 16 17.41 15.42C17.62 14.84 17.62 14.34 17.55 14.24C17.49 14.13 17.33 14.07 17.08 13.95C16.84 13.83 15.65 13.24 15.43 13.16C15.21 13.08 15.05 13.04 14.89 13.28C14.73 13.53 14.26 14.07 14.12 14.24C13.98 14.4 13.84 14.42 13.6 14.3C13.36 14.18 12.57 13.92 11.64 13.09C10.91 12.44 10.42 11.64 10.28 11.4C10.14 11.16 10.26 11.02 10.38 10.9C10.49 10.79 10.63 10.61 10.75 10.47C10.87 10.33 10.91 10.23 10.99 10.07C11.07 9.91 11.03 9.77 10.97 9.65C10.91 9.53 10.42 8.33 10.22 7.84C10.02 7.36 9.82 7.42 9.67 7.42C9.52 7.42 9.35 7.44 9.11 7.44Z" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

// Animated Loading Skeleton for Vehicle Cards (1:1 Smart Team Style)
export const VehicleCardSkeleton: React.FC = () => {
  return (
    <div
      className="hero-card animate-pulse"
      style={{
        aspectRatio: '3 / 4',
        minHeight: '450px',
        backgroundColor: '#18181b',
        borderRadius: '28px',
      }}
    >
      <div className="hero-card_content">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-6 w-28 bg-white/10 rounded-md" />
            <div className="h-8 w-8 bg-white/10 rounded-full" />
          </div>
          <div className="h-6 w-3/4 bg-white/20 rounded mt-2" />
          <div className="h-5 w-1/2 bg-white/15 rounded" />
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-white/15 rounded-full" />
            <div className="h-6 w-16 bg-white/15 rounded-full" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-11 flex-1 bg-white/20 rounded-[14px]" />
            <div className="h-11 w-11 bg-white/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
