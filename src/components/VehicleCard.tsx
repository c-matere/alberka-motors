import React from 'react';
import { Bookmark, ArrowRight, MessageCircle } from 'lucide-react';
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
      className={`bg-[#121215] border border-[#27272a] hover:border-zinc-600 rounded-lg p-5 flex flex-col justify-between group transition-all duration-300 ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Media Frame */}
        <div 
          onClick={() => onSelect(vehicle)}
          className="w-full h-[220px] xs:h-[260px] sm:h-[270px] overflow-hidden bg-black border border-zinc-800 group-hover:border-zinc-700 mb-5 relative cursor-pointer rounded-md transition-colors"
        >
          <SkeletonImage
            src={vehicle.heroImage}
            alt={vehicle.name}
            className="group-hover:scale-103 transition-transform duration-500 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Badges — Clean Monochrome with Single Red Dot */}
          <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
            <span className="font-mono text-[10.5px] font-bold bg-black/85 text-white border border-zinc-700 px-2.5 py-0.5 rounded flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Grade {vehicle.auctionGrade}</span>
            </span>
            <span className="font-mono text-[10px] bg-black/85 text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded">
              {vehicle.status.split('—')[0]}
            </span>
          </div>

          {/* Save Car Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded flex items-center justify-center transition-all cursor-pointer z-20 ${
              isFavorite 
                ? 'bg-white text-zinc-950 font-bold' 
                : 'bg-black/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
            title={isFavorite ? 'Remove from saved cars' : 'Save car'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
          </button>
        </div>

        {/* Year, Mileage & Stock ID */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-2 font-mono">
          <span>{vehicle.year} · {vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="text-zinc-400">{vehicle.stockNo}</span>
        </div>

        {/* Vehicle Name */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug tracking-[-0.025em] hover:text-zinc-200 transition-colors cursor-pointer"
        >
          {vehicle.name}
        </h3>

        {/* Short Description */}
        <p className="text-xs sm:text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-5">
          {vehicle.tagline}
        </p>

        {/* Quick Specs 3-Box Grid */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs">
          <div className="border border-zinc-800/80 bg-zinc-900/60 p-2 rounded">
            <span className="text-[10px] text-zinc-500 uppercase block mb-0.5 font-mono">Engine</span>
            <span className="font-medium text-white truncate block">{vehicle.engine.split(' ')[0]}</span>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-900/60 p-2 rounded">
            <span className="text-[10px] text-zinc-500 uppercase block mb-0.5 font-mono">Fuel</span>
            <span className="font-medium text-white truncate block">{vehicle.fuelType}</span>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-900/60 p-2 rounded">
            <span className="text-[10px] text-zinc-500 uppercase block mb-0.5 font-mono">Warranty</span>
            <span className="font-medium text-zinc-200 truncate block">5,000 KM</span>
          </div>
        </div>
      </div>

      {/* Price & Action Buttons */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-zinc-500 uppercase tracking-wider block font-mono">
            Delivered Price
          </span>
          <span className="font-mono text-lg sm:text-xl font-bold text-white">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-white !text-xs !py-2 !px-3.5 !rounded cursor-pointer font-semibold"
          >
            <span>View Car</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !text-xs !py-2 !px-2.5 !rounded hidden xs:inline-flex"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 text-zinc-300" />
          </a>
        </div>
      </div>
    </div>
  );
};
