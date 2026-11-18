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
        
        {/* Top Badges Row */}
        <div className="flex items-center justify-between gap-2 z-20">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold bg-white/95 text-zinc-950 border-white/40 shadow-sm backdrop-blur-md">
              Grade {vehicle.auctionGrade || '4.5'}
            </span>
            {pricing.hasDiscount && (
              <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold bg-red-600 text-white shadow-md font-mono">
                Save KES {pricing.savingsKes.toLocaleString()}
              </span>
            )}
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-[10.5px] font-bold bg-emerald-600 text-white border-emerald-500 shadow-sm backdrop-blur-md">
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

        {/* Bottom Vehicle Details Stack (1:1 Smart Team Layout) */}
        <div className="flex flex-col gap-3 z-20">
          
          {/* Title Stack: Year & Make on top, Model below */}
          <div className="leading-tight">
            <div className="text-xl sm:text-2xl font-semibold text-white" style={{ textShadow: '0 1px 12px rgba(0,0,0,0.6)' }}>
              {vehicle.year} {make}<br />
              <span className="font-bold">{model}</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline flex-wrap gap-2 pt-0.5">
            <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight drop-shadow-md">
              KES {pricing.currentPrice.toLocaleString()}
            </span>
            {pricing.hasDiscount && (
              <span className="text-xs font-mono line-through text-zinc-400 drop-shadow-sm">
                KES {pricing.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Category Tags (1:1 Smart Team: Brand/Year in Alberka Red, Fuel in Glass, Price in Badge) */}
          <div className="service-card_tags margin-0 z-index-1">
            <div className="category-tag text-white font-bold" style={{ background: '#DC2626', borderColor: '#DC2626' }}>
              {make}
            </div>
            <div className="category-tag text-white" style={{ background: 'rgba(255,255,255,0.14)', borderColor: 'rgba(255,255,255,0.32)', backdropFilter: 'blur(6px)' }}>
              {vehicle.fuelType}
            </div>
            <div className="category-tag text-white font-bold" style={{ background: '#09090b', borderColor: 'rgba(255,255,255,0.2)' }}>
              KES {(vehicle.priceKes / 1000000).toFixed(2)}M
            </div>
          </div>

          {/* Action Buttons Row (1:1 Smart Team: Explore + WhatsApp Inquire) */}
          <div className="flex items-center gap-2 pt-1 card-link-actions">
            <button
              onClick={() => onSelect(vehicle)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 text-[13px] font-semibold rounded-[14px] transition-all duration-200 cursor-pointer text-white shadow-md hover:shadow-lg active:scale-98"
              style={{ background: '#DC2626', border: '1px solid #DC2626' }}
            >
              <span>Explore</span>
              <ArrowRight width={14} height={14} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onInquire) onInquire(vehicle);
                else handleInquire(e);
              }}
              className="inline-flex items-center justify-center gap-1.5 py-3 px-3.5 text-[13px] font-semibold rounded-[14px] transition-all duration-200 cursor-pointer text-white shadow-md active:scale-98 bg-[#25D366] hover:bg-[#20ba59]"
              title="Send WhatsApp Inquiry"
            >
              <MessageCircle width={15} height={15} className="fill-white text-white" />
              <span className="hidden xs:inline">Inquire</span>
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
        minHeight: '440px',
        backgroundColor: '#18181b',
        borderRadius: '28px',
      }}
    >
      <div className="hero-card_content">
        <div className="flex justify-between items-center">
          <div className="h-6 w-20 bg-white/10 rounded-md" />
          <div className="h-8 w-8 bg-white/10 rounded-full" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-3/4 bg-white/20 rounded" />
          <div className="h-5 w-1/2 bg-white/25 rounded" />
          <div className="flex gap-2">
            <div className="h-6 w-14 bg-white/15 rounded-full" />
            <div className="h-6 w-14 bg-white/15 rounded-full" />
            <div className="h-6 w-16 bg-white/15 rounded-full" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-10 flex-1 bg-white/20 rounded-[14px]" />
            <div className="h-10 w-24 bg-white/20 rounded-[14px]" />
          </div>
        </div>
      </div>
    </div>
  );
};
