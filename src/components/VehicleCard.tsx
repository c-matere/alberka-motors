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
      className={`card-linear p-5 sm:p-6 flex flex-col justify-between group active:scale-[0.99] transition-all ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Media Frame — Linear 8px radius, #08090a backdrop, hairline border */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[220px] xs:h-[250px] sm:h-[280px] rounded-[8px] overflow-hidden bg-[#08090a] border border-[#23252a] mb-5 relative cursor-pointer group/media"
        >
          <SkeletonImage
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="group-hover/media:scale-102 transition-transform duration-500 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Badges Overlay (Linear 4px badges) */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-20">
            <span className="badge-linear bg-[#08090a]/85 backdrop-blur-md border border-[#23252a] text-[11px] font-mono text-white px-2 py-0.5">
              {vehicle.auctionGrade}
            </span>
            <span className="badge-linear bg-[#08090a]/85 backdrop-blur-md border border-[#23252a] text-[11px] font-mono text-[#8a8f98] px-2 py-0.5">
              {vehicle.status.split('—')[0]}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-7 h-7 rounded-[4px] backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer z-20 ${
              isFavorite 
                ? 'bg-[#eb5757] text-white' 
                : 'bg-[#08090a]/70 hover:bg-[#08090a] text-[#8a8f98] hover:text-white border border-[#23252a]'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="flex items-center justify-between text-[12px] text-[#8a8f98] mb-2 font-mono">
          <span>{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="bg-[#161718] border border-[#23252a] px-1.5 py-0.5 rounded-[4px] text-[#8a8f98]">{vehicle.stockNo}</span>
        </div>

        {/* Persona Moniker */}
        <div className="text-[11px] font-mono text-[#8a8f98] tracking-wider uppercase mb-1">
          {vehicle.moniker}
        </div>

        {/* Model Headline (Linear 20px / 510) */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-[19px] sm:text-[21px] font-[510] text-white mb-2 leading-snug tracking-[-0.012em] hover:text-[#d0d6e0] transition-colors cursor-pointer"
        >
          {vehicle.name}
        </h3>

        {/* Tagline */}
        <p className="text-[14px] text-[#8a8f98] line-clamp-2 leading-[1.5] mb-5 font-normal">
          {vehicle.tagline}
        </p>

        {/* Mechanical Integrity Badges (Linear 4px chips) */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#161718] px-2.5 py-1 rounded-[4px] text-[#d0d6e0] border border-[#23252a]">
            <Gauge className="w-3 h-3 text-[#8a8f98]" />
            {vehicle.power.split('@')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#161718] px-2.5 py-1 rounded-[4px] text-[#d0d6e0] border border-[#23252a]">
            <Fuel className="w-3 h-3 text-[#8a8f98]" />
            {vehicle.fuelEconomy.split('(')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono bg-[#161718] px-2.5 py-1 rounded-[4px] text-[#d0d6e0] border border-[#23252a]">
            <Shield className="w-3 h-3 text-[#8a8f98]" />
            5K Cover
          </span>
        </div>
      </div>

      {/* Bottom Conversion & Pricing Row */}
      <div className="pt-4 border-t border-[#23252a] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#8a8f98] font-mono uppercase tracking-wider block">
            Delivered Price
          </span>
          <span className="text-[18px] sm:text-[20px] font-[510] text-white tracking-[-0.012em]">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-ghost !text-[12px] !py-1.5 !px-3 !rounded-[6px] cursor-pointer"
          >
            <span>Explore</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary !text-[12px] !py-1.5 !px-3.5 !rounded-[6px] font-[510]"
          >
            Inquire
          </a>
        </div>
      </div>
    </div>
  );
};
