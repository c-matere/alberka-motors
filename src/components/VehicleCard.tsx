import React from 'react';
import { Heart, ArrowUpRight, Gauge, Shield, Fuel } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';
import { SkeletonImage } from './SkeletonImage';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
  disableScrollReveal?: boolean;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
  disableScrollReveal = false,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const shouldReveal = disableScrollReveal || isVisible;

  return (
    <div
      ref={disableScrollReveal ? undefined : ref}
      className={`apple-card apple-card-interactive p-5 sm:p-7 md:p-8 flex flex-col justify-between bg-[#121215] border border-[#27272a] hover:border-zinc-500 group active:scale-[0.985] transition-transform ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Media Frame — Progressive Skeleton with Shimmer */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[220px] xs:h-[250px] sm:h-[290px] md:h-[320px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#09090b] border border-[#27272a] mb-5 sm:mb-6 relative cursor-pointer"
        >
          <SkeletonImage
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap items-center gap-1.5 sm:gap-2 z-20">
            <span className="bg-black/85 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-bold text-white border border-white/20 shadow-md">
              {vehicle.auctionGrade}
            </span>
            <span className="bg-white/15 backdrop-blur-md px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-semibold text-white border border-white/20 shadow-md">
              {vehicle.status}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md z-20 active:scale-90 ${
              isFavorite 
                ? 'bg-[#dc2626] text-white' 
                : 'bg-black/75 hover:bg-black text-white border border-white/20'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="flex items-center justify-between text-[12px] text-zinc-400 mb-2 font-medium tracking-wide">
          <span>{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="font-mono text-[11px] bg-[#18181c] border border-[#27272a] px-2 py-0.5 rounded text-zinc-300">{vehicle.stockNo}</span>
        </div>

        {/* Persona Moniker */}
        <div className="text-[11px] font-semibold text-zinc-400 tracking-[0.12em] uppercase mb-1">
          {vehicle.moniker}
        </div>

        {/* Model Headline */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-[22px] sm:text-[26px] font-bold text-white mb-2 leading-tight tracking-tight hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {vehicle.name}
        </h3>

        {/* Editorial Essence Quote */}
        <p className="text-[14px] text-zinc-400 line-clamp-2 leading-relaxed mb-6 font-normal">
          {vehicle.tagline}
        </p>

        {/* Mechanical Integrity Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-zinc-200 font-medium border border-[#27272a]">
            <Gauge className="w-3.5 h-3.5 text-zinc-400" />
            {vehicle.power.split('@')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-zinc-200 font-medium border border-[#27272a]">
            <Fuel className="w-3.5 h-3.5 text-zinc-400" />
            {vehicle.fuelEconomy.split('(')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-zinc-200 font-medium border border-[#27272a]">
            <Shield className="w-3.5 h-3.5 text-zinc-400" />
            Certified Warranty
          </span>
        </div>
      </div>

      {/* Bottom Conversion & Pricing Row */}
      <div className="pt-5 border-t border-[#27272a] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] text-zinc-400 uppercase tracking-wider block font-semibold mb-0.5">
            Delivered Handover
          </span>
          <span className="text-[20px] sm:text-[24px] font-bold text-white tracking-tight">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="outlined-explore-pill cursor-pointer px-4 py-2 text-[13px]"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-blue-pill px-4 py-2 text-[13px]"
          >
            Inquire
          </a>
        </div>
      </div>
    </div>
  );
};
