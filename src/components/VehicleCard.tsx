import React, { useState } from 'react';
import { Bookmark, ArrowRight, MessageCircle, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
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

  // Multi-angle preview array: Front Stance, Cabin Interior, Rear & Details
  const cardImages = [
    { url: vehicle.heroImage, label: 'Front Stance' },
    ...(vehicle.gallery[1] ? [{ url: vehicle.gallery[1].url, label: 'Cabin Interior' }] : []),
    ...(vehicle.gallery[0] && vehicle.gallery[0].url !== vehicle.heroImage
      ? [{ url: vehicle.gallery[0].url, label: 'Detail' }]
      : vehicle.gallery[2]
      ? [{ url: vehicle.gallery[2].url, label: 'Rear View' }]
      : []),
  ].slice(0, 3);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentImage = cardImages[activeImageIdx] || cardImages[0];

  const handleNextImage = () => {
    setActiveImageIdx((prev) => (prev + 1) % cardImages.length);
  };

  const handlePrevImage = () => {
    setActiveImageIdx((prev) => (prev - 1 + cardImages.length) % cardImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNextImage();
      else handlePrevImage();
    }
    setTouchStartX(null);
  };

  return (
    <div
      ref={disableScrollReveal ? undefined : ref}
      className={`bg-[#111114] border border-[#27272a] hover:border-zinc-500 rounded-xl p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Compact Media Frame with Multi-Angle Carousel & Touch Gestures */}
        <div 
          onClick={() => onSelect(vehicle)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full h-[180px] xs:h-[200px] sm:h-[215px] overflow-hidden bg-black border border-zinc-800/90 group-hover:border-zinc-700 mb-3.5 relative cursor-pointer rounded-lg transition-colors select-none"
        >
          <SkeletonImage
            key={currentImage.url}
            src={currentImage.url}
            alt={`${vehicle.name} - ${currentImage.label}`}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
            containerClassName="w-full h-full"
            loading="lazy"
          />

          {/* Scrim Gradient for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Badges — Clean Monochrome with Single Red Dot */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-20">
            <span className="font-mono text-[10.5px] font-bold bg-black/85 backdrop-blur-md text-white border border-zinc-700/80 px-2 py-0.5 rounded flex items-center gap-1.5 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Grade {vehicle.auctionGrade}</span>
            </span>
            <span className="font-mono text-[10px] bg-black/80 backdrop-blur-md text-zinc-300 border border-zinc-800 px-2 py-0.5 rounded hidden xs:inline-block">
              {vehicle.auctionHall}
            </span>
          </div>

          {/* Save Car Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-2.5 right-2.5 w-7 h-7 rounded flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md ${
              isFavorite 
                ? 'bg-white text-zinc-950 font-bold' 
                : 'bg-black/75 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
            }`}
            title={isFavorite ? 'Remove from saved cars' : 'Save car'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
          </button>

          {/* Hairline Left/Right Carousel Chevrons */}
          {cardImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevImage();
                }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-black text-white border border-zinc-700/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-md shadow-md"
                title="Previous angle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/75 hover:bg-black text-white border border-zinc-700/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-md shadow-md"
                title="Next angle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Active Angle Badge Pill & 3-Segment Progress Rails */}
          <div className="absolute bottom-2 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
            <span className="bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded text-[9.5px] font-mono text-zinc-300 border border-zinc-800">
              {currentImage.label}
            </span>

            {/* Segmented Rails Indicator */}
            {cardImages.length > 1 && (
              <div 
                className="flex items-center gap-1 bg-black/70 backdrop-blur-md px-2 py-0.5 rounded-full border border-zinc-800 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {cardImages.map((img, idx) => {
                  const isActive = idx === activeImageIdx;
                  return (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveImageIdx(idx)}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`h-1 rounded-full transition-all cursor-pointer ${
                        isActive ? 'w-4 bg-white' : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'
                      }`}
                      title={`View ${img.label}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Year, Mileage & Stock ID */}
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold">{vehicle.year}</span>
            <span className="text-zinc-600">·</span>
            <span>{vehicle.mileageKm.toLocaleString()} KM</span>
          </div>
          <span className="text-zinc-500 font-medium">#{vehicle.stockNo}</span>
        </div>

        {/* Vehicle Name */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-base sm:text-lg font-bold text-white mb-1 leading-snug tracking-[-0.025em] hover:text-zinc-300 transition-colors cursor-pointer truncate"
        >
          {vehicle.name}
        </h3>

        {/* Human, Simple Words Description */}
        <p className="text-xs text-zinc-400 line-clamp-1 sm:line-clamp-2 leading-relaxed mb-3.5">
          {vehicle.tagline}
        </p>

        {/* Quick Specs 3-Box Precision Grid (Compact) */}
        <div className="grid grid-cols-3 gap-1.5 mb-4 text-center text-xs">
          <div className="border border-zinc-800/80 bg-zinc-900/60 py-1.5 px-2 rounded-md flex flex-col justify-between">
            <span className="text-[9px] text-zinc-500 uppercase block font-mono">Drivetrain</span>
            <span className="font-semibold text-white truncate block text-[11px]">{vehicle.drivetrain.split(' ')[0]} {vehicle.drivetrain.includes('AWD') ? 'AWD' : 'Drive'}</span>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-900/60 py-1.5 px-2 rounded-md flex flex-col justify-between">
            <span className="text-[9px] text-zinc-500 uppercase block font-mono">Fuel Econ</span>
            <span className="font-semibold text-white truncate block text-[11px]">{vehicle.fuelEconomy.split(' ')[0]} km/L</span>
          </div>
          <div className="border border-zinc-800/80 bg-zinc-900/60 py-1.5 px-2 rounded-md flex flex-col justify-between">
            <span className="text-[9px] text-zinc-500 uppercase block font-mono">Warranty</span>
            <span className="font-semibold text-emerald-400 truncate block text-[11px]">5,000 KM</span>
          </div>
        </div>
      </div>

      {/* Compact Price & Action Footer */}
      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2.5">
        <div>
          <span className="text-[9px] text-zinc-400 uppercase tracking-wider block font-mono">
            DELIVERED CASH
          </span>
          <span className="font-mono text-base sm:text-lg font-bold text-white tracking-tight">
            KES {vehicle.priceKes.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-white !text-xs !py-2 !px-3 !rounded-md cursor-pointer font-semibold inline-flex items-center"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost !text-xs !py-2 !px-2 !rounded-md hidden xs:inline-flex items-center justify-center"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-zinc-300" />
          </a>
        </div>
      </div>
    </div>
  );
};
