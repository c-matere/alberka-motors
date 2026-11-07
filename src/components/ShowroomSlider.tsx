import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ArrowRight,
  Bookmark,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Gauge,
  Fuel,
  Sparkles
} from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface ShowroomSliderProps {
  vehicles: Vehicle[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onViewAll: () => void;
}

export const ShowroomSlider: React.FC<ShowroomSliderProps> = ({
  vehicles,
  favorites,
  onToggleFavorite,
  onSelectVehicle,
  onViewAll,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 6500; // 6.5s per slide
  const activeVehicle = vehicles[activeIndex] || vehicles[0];
  const isFavorite = favorites.includes(activeVehicle?.id);

  // Next / Previous slide handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % vehicles.length);
    setProgress(0);
  }, [vehicles.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
    setProgress(0);
  }, [vehicles.length]);

  const handleSelectIndex = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Autoplay timer with smooth animated progress
  useEffect(() => {
    if (!isPlaying || isHovered || vehicles.length <= 1) return;

    const intervalMs = 50;
    const step = (intervalMs / SLIDE_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isPlaying, isHovered, vehicles.length, handleNext]);

  if (!activeVehicle) return null;

  return (
    <section
      className="w-full relative space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Row — Rolls-Royce Minimalist Typography & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[11px] font-mono uppercase tracking-widest text-red-500 font-semibold">
              FEATURED SHOWROOM FLEET // MOMBASA & NAIROBI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
            Cars Ready for Immediate Delivery
          </h2>
        </div>

        {/* Header Right: Numerical Sequencer + Hairline Circular Controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Rolls-Royce Slide Counter (01 / 06) */}
          <div className="text-xs font-mono tracking-wider flex items-center gap-1.5 text-zinc-400 bg-zinc-900/90 border border-zinc-800 px-3 py-1.5 rounded-md">
            <span className="text-red-500 font-bold">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-400">
              {String(vehicles.length).padStart(2, '0')}
            </span>
          </div>

          {/* Autoplay Play/Pause */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-red-500" />}
          </button>

          {/* Hairline Circular Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800"
              title="Previous Car (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800"
              title="Next Car (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onViewAll}
            className="btn-ghost !py-2 !px-3.5 !text-xs hidden sm:inline-flex items-center gap-1.5"
          >
            <span>All Cars ({vehicles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Model Navigation Pills (Rolls-Royce Bespoke Selector) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-b border-zinc-800/80">
        {vehicles.map((v, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={v.id}
              onClick={() => handleSelectIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-full whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-zinc-900 text-white border-red-600 shadow-sm'
                  : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <span className={`font-mono text-[10px] ${isActive ? 'text-red-500 font-bold' : 'text-zinc-500'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="font-medium">{v.name.split(' ')[0]} {v.name.split(' ')[1]}</span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {/* The Grand Cinematic Showcase Stage */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
        {/* Aspect Ratio Container (16:9 on desktop, responsive on mobile) */}
        <div className="relative w-full h-[460px] sm:h-[560px] md:h-[620px] lg:h-[660px] overflow-hidden">
          
          {/* Background Image / Video with Ken Burns Subtle Motion */}
          <div className="absolute inset-0 w-full h-full">
            <img
              key={activeVehicle.id}
              src={activeVehicle.heroImage}
              alt={activeVehicle.name}
              className="w-full h-full object-cover scale-100 transition-transform duration-[6000ms] ease-out hover:scale-103"
            />
          </div>

          {/* Theatrical Vignette & Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/40 pointer-events-none hidden sm:block" />

          {/* Top Stage Bar: Badges & Favorite Action */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="bg-red-600 text-white text-[11px] font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {activeVehicle.auctionGrade}
              </span>
              <span className="bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[11px] font-mono px-3 py-1 rounded-full">
                {activeVehicle.stockNo}
              </span>
              <span className="bg-black/75 backdrop-blur-md border border-zinc-800 text-emerald-400 text-[11px] font-medium px-3 py-1 rounded-full hidden xs:inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Duty Paid & Cleared</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleFavorite(activeVehicle.id)}
                className={`p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-red-600 text-white border-red-600'
                    : 'bg-black/70 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
                title={isFavorite ? 'Remove from saved' : 'Save car'}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Floating Theatrical HUD (Specs + Model Information) */}
          <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-8 z-20">
            <div className="bg-[#121215]/90 backdrop-blur-xl border border-zinc-800 rounded-xl p-5 sm:p-7 shadow-2xl max-w-4xl space-y-4">
              
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-red-500 font-semibold uppercase tracking-wider">
                    {activeVehicle.category.toUpperCase()}
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-zinc-400 font-medium">
                    {activeVehicle.status}
                  </span>
                </div>

                <div className="text-xs text-zinc-400 font-mono">
                  Auction: <span className="text-zinc-200 font-semibold">{activeVehicle.auctionHall}</span>
                </div>
              </div>

              {/* Model Name & Tagline */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                    {activeVehicle.tagline}
                  </p>
                </div>

                {/* Delivered Price */}
                <div className="text-left md:text-right shrink-0">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                    Delivered Price
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-extrabold text-white">
                    KES {activeVehicle.priceKes.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
                <div className="bg-zinc-900/70 border border-zinc-800/80 p-2.5 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Year & Mileage</span>
                  <span className="font-semibold text-white">
                    {activeVehicle.year} • {activeVehicle.mileageKm.toLocaleString()} KM
                  </span>
                </div>
                <div className="bg-zinc-900/70 border border-zinc-800/80 p-2.5 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Engine & Power</span>
                  <span className="font-semibold text-white">
                    {activeVehicle.engine.split(' ')[0]} • {activeVehicle.power.split('@')[0]}
                  </span>
                </div>
                <div className="bg-zinc-900/70 border border-zinc-800/80 p-2.5 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Drivetrain</span>
                  <span className="font-semibold text-white truncate block">
                    {activeVehicle.drivetrain.split('(')[0]}
                  </span>
                </div>
                <div className="bg-zinc-900/70 border border-zinc-800/80 p-2.5 rounded-lg">
                  <span className="text-[10px] text-zinc-400 block mb-0.5">Warranty Included</span>
                  <span className="font-semibold text-red-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>5,000 KM</span>
                  </span>
                </div>
              </div>

              {/* Actions Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectVehicle(activeVehicle)}
                    className="btn-white !py-2.5 !px-5 !text-xs !rounded-lg w-full sm:w-auto inline-flex items-center justify-center font-bold"
                  >
                    <span>View Car Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>

                  <a
                    href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(activeVehicle.name)}%20(${activeVehicle.stockNo})%20priced%20at%20KES%20${activeVehicle.priceKes.toLocaleString()}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-crimson !py-2.5 !px-5 !text-xs !rounded-lg w-full sm:w-auto inline-flex items-center justify-center font-semibold"
                  >
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                    <span>WhatsApp Showroom</span>
                  </a>
                </div>

                <span className="text-[11px] text-zinc-400 font-mono hidden md:inline">
                  Original Auction Sheet Verified
                </span>
              </div>

            </div>
          </div>

          {/* Stage Side Navigation Arrows (Floating on image) */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/60 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
            title="Previous car"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white border border-zinc-700/60 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20 hover:scale-105"
            title="Next car"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Rolls-Royce Animated Timing Progress Bar */}
        <div className="w-full h-1 bg-zinc-900 relative overflow-hidden">
          <div
            className="h-full bg-red-600 transition-all ease-linear"
            style={{
              width: `${isPlaying && !isHovered ? progress : ((activeIndex + 1) / vehicles.length) * 100}%`,
              transitionDuration: isPlaying && !isHovered ? '50ms' : '300ms',
            }}
          />
        </div>
      </div>

      {/* Fleet Thumbnail Runway Strip (Rolls-Royce Gallery Selector) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {vehicles.map((v, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={v.id}
              onClick={() => handleSelectIndex(idx)}
              className={`group text-left p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-zinc-900 border-red-600 ring-1 ring-red-600/40'
                  : 'bg-[#121215] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div className="aspect-[16/10] w-full rounded-lg overflow-hidden bg-black mb-2 relative">
                <img
                  src={v.heroImage}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-1 left-1 bg-black/80 font-mono text-[9px] text-zinc-300 px-1.5 py-0.5 rounded">
                  {v.year}
                </span>
              </div>

              <div>
                <span className="font-semibold text-xs text-white block truncate">
                  {v.name}
                </span>
                <span className="font-mono text-[11px] font-bold text-red-400 block mt-0.5">
                  KES {(v.priceKes / 1000000).toFixed(2)}M
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
};
