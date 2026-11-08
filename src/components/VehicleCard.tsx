import React, { useState } from 'react';
import { Bookmark, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';

interface VehicleCardProps {
  vehicle: Vehicle;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (vehicle: Vehicle) => void;
  disableScrollReveal?: boolean;
  staggerIndex?: number;
}

export const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  isFavorite,
  onToggleFavorite,
  onSelect,
  disableScrollReveal = false,
  staggerIndex = 0,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.05 });
  const shouldReveal = disableScrollReveal || isVisible;

  const delays = ['', 'delay-75', 'delay-150', 'delay-225'];
  const delayClass = delays[staggerIndex % 4] || '';

  // Curated 2-angle studio suite: Exterior Stance & Interior Cabin
  const cardImages = [
    { url: vehicle.heroImage, label: 'Exterior' },
    ...(vehicle.gallery[1] ? [{ url: vehicle.gallery[1].url, label: 'Cabin' }] : []),
  ];

  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Punchy powertrain description for luxury specification
  const getPowertrainBadge = (v: Vehicle) => {
    if (v.id === 'toyota-rav4-adventure') return '2.0L Petrol AWD';
    if (v.id === 'toyota-harrier-hybrid') return '2.5L Hybrid AWD';
    if (v.id === 'nissan-serena-highway-star') return '1.2L e-POWER';
    if (v.id === 'nissan-note-epower') return '1.2L e-POWER';
    const eng = v.engine.split(' ')[0] || '';
    const isHyb = v.fuelType.toLowerCase().includes('hybrid') || v.fuelType.toLowerCase().includes('power');
    const isAwd = v.drivetrain.includes('AWD') || v.drivetrain.includes('4WD');
    return `${eng} ${isHyb ? 'Hybrid' : 'Petrol'} ${isAwd ? 'AWD' : '2WD'}`.trim();
  };

  return (
    <div
      ref={disableScrollReveal ? undefined : ref}
      onClick={() => onSelect(vehicle)}
      className={`group relative bg-[#0b0b0e] hover:bg-[#111115] border border-white/[0.08] hover:border-white/30 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_24px_50px_rgba(0,0,0,0.85)] hover:-translate-y-1 cursor-pointer select-none overflow-hidden before:absolute before:inset-x-8 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:z-10 ${
        disableScrollReveal ? '' : `scroll-reveal ${delayClass} ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Widescreen 16:10 Theatrical Media Aperture */}
        <div 
          onMouseEnter={() => cardImages[1] && setActiveImageIdx(1)}
          onMouseLeave={() => setActiveImageIdx(0)}
          className="w-full aspect-[16/10.4] overflow-hidden bg-black border border-white/[0.06] group-hover:border-white/20 mb-4 relative rounded-xl transition-colors"
        >
          {/* Smooth Crossfade Media */}
          {cardImages.map((img, idx) => (
            <img
              key={img.url}
              src={img.url}
              alt={`${vehicle.name} - ${img.label}`}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-104 transition-all duration-700 ease-out ${
                idx === activeImageIdx ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
              loading="lazy"
            />
          ))}

          {/* Discreet Scrim Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none z-10" />

          {/* Top Left: Authentic Japanese Provenance Seal */}
          <div className="absolute top-3 left-3 z-20 pointer-events-none">
            <div className="font-mono text-[10.5px] font-semibold bg-black/80 backdrop-blur-md text-white border border-white/15 px-2.5 py-1 rounded-md flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Grade {vehicle.auctionGrade}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-300 font-normal">{vehicle.auctionHall}</span>
            </div>
          </div>

          {/* Top Right: Minimalist Hairline Bookmark Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md shadow-lg ${
              isFavorite 
                ? 'bg-white text-zinc-950 font-bold border-white' 
                : 'bg-black/75 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/15'
            }`}
            title={isFavorite ? 'Remove from saved cars' : 'Save car'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
          </button>

          {/* Bottom Right: Discreet Multi-Angle Indicator */}
          {cardImages.length > 1 && (
            <div className="absolute bottom-2.5 right-3 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              {cardImages.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    idx === activeImageIdx ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Clean Line 1: Year, Mileage & Drivetrain */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-1.5">
          <span className="font-bold text-white text-[13px]">{vehicle.year}</span>
          <span className="text-zinc-600">·</span>
          <span>{vehicle.mileageKm.toLocaleString()} KM</span>
          <span className="text-zinc-600">·</span>
          <span>{getPowertrainBadge(vehicle)}</span>
        </div>

        {/* Clean Line 2: Vehicle Model Title (Full Model Title, 2 Lines Max) */}
        <h3 className="text-lg sm:text-[20px] font-bold text-white tracking-[-0.025em] leading-snug group-hover:text-zinc-200 transition-colors line-clamp-2 min-h-[1.75rem] sm:min-h-[2.75rem] mb-2">
          {vehicle.name}
        </h3>
      </div>

      {/* Clean Line 3: Delivered Price & Subtle Exploration Link */}
      <div className="pt-3.5 mt-2 border-t border-white/[0.07] flex items-center justify-between">
        <div className="flex items-baseline gap-1 font-mono">
          <span className="text-xs text-zinc-400 font-normal">KES</span>
          <span className="text-base sm:text-lg font-bold text-white tracking-tight">
            {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="text-xs font-semibold text-zinc-300 group-hover:text-white group-hover:translate-x-0.5 inline-flex items-center gap-1.5 transition-all">
          <span>Explore</span>
          <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
        </div>
      </div>
    </div>
  );
};
