import React from 'react';
import { Bookmark, ArrowRight, Gauge, Shield, Fuel, MessageCircle } from 'lucide-react';
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
      className={`bg-[#121215] border border-[#27272a] hover:border-[#dc2626]/60 rounded-[4px] p-5 flex flex-col justify-between group transition-all duration-300 ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Media Frame */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[220px] xs:h-[260px] sm:h-[270px] overflow-hidden bg-[#09090b] border border-[#27272a] group-hover:border-[#dc2626]/40 mb-5 relative cursor-pointer rounded-[3px] transition-colors"
        >
          <SkeletonImage
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="group-hover:scale-104 transition-transform duration-500 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
            <span className="font-mono text-[10.5px] font-bold bg-[#dc2626] text-white px-2.5 py-0.5 rounded-[2px] shadow-sm">
              Grade {vehicle.auctionGrade}
            </span>
            <span className="font-mono text-[10px] bg-[#09090b]/90 text-[#e4e4e7] border border-[#27272a] px-2 py-0.5 rounded-[2px]">
              {vehicle.status.split('—')[0]}
            </span>
          </div>

          {/* Save Car Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-[3px] flex items-center justify-center transition-all cursor-pointer z-20 ${
              isFavorite 
                ? 'bg-[#dc2626] text-white' 
                : 'bg-[#09090b]/80 hover:bg-[#18181c] text-[#a1a1aa] hover:text-white border border-[#27272a]'
            }`}
            title={isFavorite ? 'Remove from saved cars' : 'Save car'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Year, Mileage & Stock ID */}
        <div className="flex items-center justify-between text-[12px] text-[#a1a1aa] mb-2 font-mono">
          <span>{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="text-[#ef4444] font-medium">{vehicle.stockNo}</span>
        </div>

        {/* Vehicle Name */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-[19px] sm:text-[20px] font-bold text-white mb-2 leading-snug hover:text-[#ef4444] transition-colors cursor-pointer"
        >
          {vehicle.name}
        </h3>

        {/* Short Description */}
        <p className="text-[13.5px] text-[#a1a1aa] line-clamp-2 leading-relaxed mb-5">
          {vehicle.tagline}
        </p>

        {/* Quick Specs 3-Box Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center text-[12px]">
          <div className="border border-[#27272a] bg-[#18181c] p-2 rounded-[2px]">
            <span className="text-[10px] text-[#71717a] uppercase block mb-0.5 font-mono">Engine</span>
            <span className="font-medium text-white truncate block">{vehicle.engine.split(' ')[0]}</span>
          </div>
          <div className="border border-[#27272a] bg-[#18181c] p-2 rounded-[2px]">
            <span className="text-[10px] text-[#71717a] uppercase block mb-0.5 font-mono">Fuel</span>
            <span className="font-medium text-white truncate block">{vehicle.fuelType}</span>
          </div>
          <div className="border border-[#27272a] bg-[#18181c] p-2 rounded-[2px]">
            <span className="text-[10px] text-[#71717a] uppercase block mb-0.5 font-mono">Warranty</span>
            <span className="font-medium text-[#ef4444] truncate block">5,000 KM</span>
          </div>
        </div>
      </div>

      {/* Price & Action Buttons */}
      <div className="pt-4 border-t border-[#27272a] flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#71717a] uppercase tracking-wider block font-mono">
            Delivered Price
          </span>
          <span className="font-mono text-[18px] sm:text-[20px] font-bold text-white">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-ghost !text-[12px] !py-2 !px-3 cursor-pointer"
          >
            <span>View Car</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-crimson !text-[12px] !py-2 !px-3 hidden xs:inline-flex"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
