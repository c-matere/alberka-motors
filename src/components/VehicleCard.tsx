import React, { useState } from 'react';
import { Bookmark, ArrowRight, MessageCircle, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { useScrollReveal } from '../hooks/useAnimations';

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

  // Multi-angle studio suite: Front Exterior, Cabin Interior, Rear / Inspection Angle
  const cardImages = [
    { url: vehicle.heroImage, label: 'Front Exterior' },
    ...(vehicle.gallery[1] ? [{ url: vehicle.gallery[1].url, label: 'Cabin Interior' }] : []),
    ...(vehicle.gallery[0] && vehicle.gallery[0].url !== vehicle.heroImage
      ? [{ url: vehicle.gallery[0].url, label: 'Inspection Angle' }]
      : vehicle.gallery[2]
      ? [{ url: vehicle.gallery[2].url, label: 'Rear Stance' }]
      : []),
  ].slice(0, 3);

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const currentImage = cardImages[activeImageIdx] || cardImages[0];

  const handleNextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveImageIdx((prev) => (prev + 1) % cardImages.length);
  };

  const handlePrevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  // Concise, plain English powertrain label for ordinary car buyers
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
      className={`relative bg-[#0e0e11] hover:bg-[#121216] border border-zinc-800/80 hover:border-zinc-500/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between group transition-all duration-300 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:z-10 ${
        disableScrollReveal ? '' : `scroll-reveal ${shouldReveal ? 'is-visible' : ''}`
      }`}
    >
      <div>
        {/* Widescreen 16:10 Theatrical Media Aperture with Smooth Cross-Fade */}
        <div 
          onClick={() => onSelect(vehicle)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="w-full aspect-[16/10.4] overflow-hidden bg-black border border-white/[0.08] group-hover:border-zinc-700/80 mb-4 relative cursor-pointer rounded-xl transition-colors select-none"
        >
          {/* Layered Crossfade Angles */}
          {cardImages.map((img, idx) => (
            <img
              key={img.url}
              src={img.url}
              alt={`${vehicle.name} - ${img.label}`}
              className={`absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out ${
                idx === activeImageIdx ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none z-0'
              }`}
              loading="lazy"
            />
          ))}

          {/* Cinematic Vignette & Scrim for Legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none z-10" />

          {/* Top Left: Japanese Auction Dossier Badge (Grade + Auction Hall + Red Dot) */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
            <div className="font-mono text-[10.5px] font-semibold bg-black/85 backdrop-blur-md text-white border border-white/15 px-2.5 py-1 rounded-md flex items-center gap-2 shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span>Grade {vehicle.auctionGrade}</span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-300 font-normal">{vehicle.auctionHall}</span>
            </div>
          </div>

          {/* Top Right: Hairline Bookmark Save Action */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(vehicle.id);
            }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer z-20 backdrop-blur-md shadow-lg ${
              isFavorite 
                ? 'bg-white text-zinc-950 font-bold border-white' 
                : 'bg-black/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/15'
            }`}
            title={isFavorite ? 'Remove from saved cars' : 'Save car'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isFavorite ? 'fill-black' : ''}`} />
          </button>

          {/* Hairline Carousel Chevrons */}
          {cardImages.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-md shadow-md active:scale-95"
                title="Previous angle"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/80 hover:bg-black text-white border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20 backdrop-blur-md shadow-md active:scale-95"
                title="Next angle"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Bottom Bar: Angle Label & Rolls-Royce Segmented Timeline Rails */}
          <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between z-20 pointer-events-none">
            <span className="bg-black/85 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-white/10 shadow-sm">
              0{activeImageIdx + 1} · {currentImage.label}
            </span>

            {/* Segmented Timeline Rails */}
            {cardImages.length > 1 && (
              <div 
                className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {cardImages.map((img, idx) => {
                  const isActive = idx === activeImageIdx;
                  return (
                    <button
                      key={idx}
                      onMouseEnter={() => setActiveImageIdx(idx)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImageIdx(idx);
                      }}
                      className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                        isActive ? 'w-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'w-2 bg-white/30 hover:bg-white/60'
                      }`}
                      title={`View ${img.label}`}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Year, Mileage & Certified Stock Badge */}
        <div className="flex items-center justify-between text-xs font-mono mb-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white text-[13px]">{vehicle.year}</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-300 text-[12px]">{vehicle.mileageKm.toLocaleString()} KM</span>
            <span className="text-zinc-600 hidden xs:inline">·</span>
            <span className="text-zinc-400 text-[11px] hidden xs:inline uppercase">{vehicle.bodyType.split(' ')[0]}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400 text-[11px] bg-zinc-900/80 px-2 py-0.5 rounded border border-zinc-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="text-zinc-300 font-mono">#{vehicle.stockNo}</span>
          </div>
        </div>

        {/* Vehicle Name */}
        <h3
          onClick={() => onSelect(vehicle)}
          className="text-lg sm:text-[19px] font-bold text-white mb-1.5 leading-snug tracking-[-0.025em] hover:text-zinc-200 transition-colors cursor-pointer truncate"
          title={vehicle.name}
        >
          {vehicle.name}
        </h3>

        {/* Human, Simple Words Description */}
        <p className="text-xs sm:text-[13px] text-zinc-400 line-clamp-2 leading-relaxed mb-4 min-h-[38px]">
          {vehicle.tagline}
        </p>

        {/* Rolls-Royce Architectural Specification Strip (Hairline Dividers) */}
        <div className="border-y border-zinc-800/80 py-3 mb-4 grid grid-cols-3 gap-2 text-left">
          <div>
            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider block mb-0.5">
              POWERTRAIN
            </span>
            <span className="text-[12px] sm:text-[12.5px] font-bold text-white block truncate">
              {getPowertrainBadge(vehicle)}
            </span>
          </div>

          <div className="border-l border-zinc-800/80 pl-2.5">
            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider block mb-0.5">
              CONSUMPTION
            </span>
            <span className="text-[12px] sm:text-[12.5px] font-bold text-white block truncate font-mono">
              {vehicle.fuelEconomy.split(' ')[0]} km/L
            </span>
          </div>

          <div className="border-l border-zinc-800/80 pl-2.5">
            <span className="text-[9px] font-mono uppercase text-zinc-400 tracking-wider block mb-0.5">
              WORKSHOP
            </span>
            <span className="text-[12px] sm:text-[12.5px] font-bold text-emerald-400 block truncate font-mono">
              5,000 KM
            </span>
          </div>
        </div>
      </div>

      {/* Pricing & Primary Action Footer */}
      <div className="pt-3.5 border-t border-zinc-800/80 flex items-center justify-between gap-2.5">
        <div>
          <span className="text-[9px] text-zinc-400 uppercase tracking-widest block font-mono mb-0.5">
            MOMBASA DUTY-PAID
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[11px] font-mono text-zinc-400 font-medium">KES</span>
            <span className="font-mono text-base sm:text-[19px] font-bold text-white tracking-tight">
              {vehicle.priceKes.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onSelect(vehicle)}
            className="btn-white !text-xs !py-2 !px-3.5 !rounded-lg cursor-pointer font-semibold inline-flex items-center shadow-md active:scale-98 transition-transform"
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(vehicle.name)}%20(${vehicle.stockNo})%20priced%20at%20KES%20${vehicle.priceKes.toLocaleString()}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/80 hover:border-zinc-500 inline-flex items-center justify-center transition-colors cursor-pointer"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
          </a>
        </div>
      </div>
    </div>
  );
};
