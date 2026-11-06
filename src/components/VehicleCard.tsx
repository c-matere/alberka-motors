import React from 'react';
import { Heart, ArrowUpRight, Gauge, Shield, Fuel } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={`apple-card apple-card-interactive p-6 sm:p-8 flex flex-col justify-between bg-[#121215] border border-[#27272a] hover:border-[#dc2626] group scroll-reveal ${
        isVisible ? 'is-visible' : ''
      }`}
    >
      <div>
        {/* Media Frame — Spacious 16:10 aspect ratio */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[260px] sm:h-[300px] md:h-[320px] rounded-[24px] overflow-hidden bg-[#09090b] border border-[#27272a] mb-6 relative cursor-pointer"
        >
          <img
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="bg-black/85 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold text-white border border-white/20 shadow-md">
              {vehicle.auctionGrade}
            </span>
            <span className="bg-[#dc2626] px-3 py-1 rounded-full text-[12px] font-bold text-white shadow-md">
              {vehicle.status}
            </span>
          </div>

          {/* Favorite Toggle Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-4 right-4 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-md ${
              isFavorite 
                ? 'bg-[#dc2626] text-white' 
                : 'bg-black/75 hover:bg-black text-white border border-white/20'
            }`}
            title={isFavorite ? 'Remove from saved' : 'Save vehicle'}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : ''}`} />
          </button>
        </div>

        {/* Identity & Heritage Meta Line */}
        <div className="flex items-center justify-between text-[12px] text-zinc-400 mb-2 font-medium tracking-wide">
          <span>{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="font-mono text-[11px] bg-[#18181c] border border-[#27272a] px-2 py-0.5 rounded text-zinc-300">{vehicle.stockNo}</span>
        </div>

        {/* Persona Moniker */}
        <div className="text-[12px] font-bold text-[#ef4444] tracking-[0.08em] uppercase mb-1">
          {vehicle.moniker}
        </div>

        {/* Model Headline */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-[22px] sm:text-[26px] font-bold text-white mb-2 leading-tight tracking-tight hover:text-[#ef4444] transition-colors cursor-pointer"
        >
          {vehicle.name}
        </h3>

        {/* Editorial Essence Quote */}
        <p className="text-[14px] text-zinc-400 line-clamp-2 leading-relaxed mb-6 font-normal">
          {vehicle.tagline}
        </p>

        {/* Mechanical Integrity Badges */}
        <div className="flex flex-wrap items-center gap-2.5 mb-7">
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-white font-medium border border-[#27272a]">
            <Gauge className="w-3.5 h-3.5 text-[#ef4444]" />
            {vehicle.power.split('@')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-white font-medium border border-[#27272a]">
            <Fuel className="w-3.5 h-3.5 text-[#ef4444]" />
            {vehicle.fuelEconomy.split('(')[0]}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[12px] bg-[#18181c] px-3 py-1.5 rounded-full text-white font-medium border border-[#27272a]">
            <Shield className="w-3.5 h-3.5 text-[#ef4444]" />
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
