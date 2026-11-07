import React, { useState, useEffect, useCallback } from 'react';
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
  Maximize2,
  X,
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
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const SLIDE_DURATION = 6500; // 6.5s per slide
  const activeVehicle = vehicles[activeIndex] || vehicles[0];
  const isFavorite = favorites.includes(activeVehicle?.id);

  // Multi-angle gallery views for the active car
  const angles = [
    { label: 'Front Stance', url: activeVehicle.heroImage },
    ...(activeVehicle.gallery[1] ? [{ label: 'Cockpit & Cabin', url: activeVehicle.gallery[1].url }] : []),
    ...(activeVehicle.gallery[0] && activeVehicle.gallery[0].url !== activeVehicle.heroImage
      ? [{ label: 'Details', url: activeVehicle.gallery[0].url }]
      : activeVehicle.gallery[2]
      ? [{ label: 'Rear Stance', url: activeVehicle.gallery[2].url }]
      : []),
  ];

  // Next / Previous slide handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % vehicles.length);
    setActiveAngleIdx(0);
    setProgress(0);
  }, [vehicles.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
    setActiveAngleIdx(0);
    setProgress(0);
  }, [vehicles.length]);

  const handleSelectIndex = (idx: number) => {
    setActiveIndex(idx);
    setActiveAngleIdx(0);
    setProgress(0);
  };

  // Lock body scroll when fullscreen lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [isLightboxOpen]);

  // Keyboard navigation & ESC handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Touch gesture swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  // Autoplay timer with linear progress
  useEffect(() => {
    if (!isPlaying || isHovered || isLightboxOpen || vehicles.length <= 1) return;

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
  }, [isPlaying, isHovered, isLightboxOpen, vehicles.length, handleNext]);

  if (!activeVehicle) return null;

  return (
    <section
      className="w-full relative space-y-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Header Row — Black & White Precision with Single Red Dot Sprinkle */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            {/* The single disciplined red punctum */}
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-400 font-medium">
              FEATURED SHOWROOM FLEET // MOMBASA & NAIROBI
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.03em]">
            Cars Ready for Immediate Delivery
          </h2>
        </div>

        {/* Header Right: Numerical Sequencer + Hairline Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Slide Counter (01 / 06) — Crisp Pure White */}
          <div className="text-xs font-mono tracking-wider flex items-center gap-1.5 text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md">
            <span className="text-white font-bold">
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
            className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-white" />}
          </button>

          {/* Hairline Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800"
              title="Previous Car (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-md bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800"
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

      {/* Model Navigation Pills — Pure Black & White with Subtle Indicator */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar border-b border-zinc-800/80">
        {vehicles.map((v, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={v.id}
              onClick={() => handleSelectIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs rounded-md whitespace-nowrap transition-all cursor-pointer shrink-0 border ${
                isActive
                  ? 'bg-white text-zinc-950 font-semibold border-white shadow-sm'
                  : 'bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <span className={`font-mono text-[10px] ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span>{v.name.split(' ')[0]} {v.name.split(' ')[1]}</span>
            </button>
          );
        })}
      </div>

      {/* The Grand Theatrical Showcase Stage */}
      <div className="relative w-full rounded-xl overflow-hidden bg-black border border-zinc-800 shadow-2xl">
        <div 
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[460px] sm:h-[560px] md:h-[620px] lg:h-[660px] overflow-hidden select-none"
        >
          
          {/* Media Frame with smooth angle rendering */}
          <div className="absolute inset-0 w-full h-full">
            <img
              key={`${activeVehicle.id}-${activeAngleIdx}`}
              src={angles[activeAngleIdx]?.url || activeVehicle.heroImage}
              alt={`${activeVehicle.name} - ${angles[activeAngleIdx]?.label || 'Exterior'}`}
              className="w-full h-full object-cover scale-100 transition-transform duration-[6000ms] ease-out hover:scale-102"
            />
          </div>

          {/* Theatrical Vignette & Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/30 pointer-events-none hidden sm:block" />

          {/* Top Stage Bar: Badges, Angle Switcher & Fullscreen Action */}
          <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {/* Clean Monochrome Grade Badge with single tiny red dot */}
              <div className="bg-black/85 backdrop-blur-md border border-zinc-700 text-white text-[11px] font-mono px-3 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="font-bold">{activeVehicle.auctionGrade}</span>
              </div>
              <span className="bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[11px] font-mono px-3 py-1 rounded-md">
                {activeVehicle.stockNo}
              </span>
              <span className="bg-black/75 backdrop-blur-md border border-zinc-800 text-zinc-300 text-[11px] font-medium px-3 py-1 rounded-md hidden md:inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Duty Paid & Cleared</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Multi-Angle Mini Pills */}
              <div className="hidden xs:flex items-center gap-1 bg-black/75 backdrop-blur-md p-1 border border-zinc-800 rounded-lg">
                {angles.map((ang, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveAngleIdx(idx)}
                    className={`px-2.5 py-1 text-[11px] rounded font-mono transition-all cursor-pointer ${
                      activeAngleIdx === idx
                        ? 'bg-white text-zinc-950 font-bold'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {ang.label}
                  </button>
                ))}
              </div>

              {/* Fullscreen Lightbox Button */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2.5 rounded-md backdrop-blur-md border border-zinc-800 bg-black/70 hover:bg-black text-zinc-300 hover:text-white transition-all cursor-pointer"
                title="Expand full-screen theatrical gallery (Space / Click)"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleFavorite(activeVehicle.id)}
                className={`p-2.5 rounded-md backdrop-blur-md border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-white text-zinc-950 border-white font-bold'
                    : 'bg-black/70 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
                }`}
                title={isFavorite ? 'Remove from saved' : 'Save car'}
              >
                <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-black' : ''}`} />
              </button>
            </div>
          </div>

          {/* Bottom Floating Theatrical HUD (Specs + Model Information) */}
          <div className="absolute bottom-4 sm:bottom-8 inset-x-4 sm:inset-x-8 z-20">
            <div className="bg-[#121215]/95 backdrop-blur-xl border border-zinc-800 rounded-xl p-5 sm:p-7 shadow-2xl max-w-4xl space-y-4">
              
              {/* Category & Status */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-zinc-300 font-semibold uppercase tracking-wider">
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
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-[-0.03em]">
                    {activeVehicle.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                    {activeVehicle.tagline}
                  </p>
                </div>

                {/* Delivered Price — Pure White High-Contrast Typography */}
                <div className="text-left md:text-right shrink-0">
                  <span className="text-[11px] text-zinc-400 uppercase tracking-wider block">
                    Delivered Price
                  </span>
                  <span className="font-mono text-2xl sm:text-3xl font-bold text-white">
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
                  <span className="font-semibold text-zinc-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                    <span>5,000 KM</span>
                  </span>
                </div>
              </div>

              {/* Actions Row — High-Contrast Pure White Primary Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-zinc-800/80">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectVehicle(activeVehicle)}
                    className="btn-white !py-2.5 !px-5 !text-xs !rounded-md w-full sm:w-auto inline-flex items-center justify-center font-semibold"
                  >
                    <span>View Car Details</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </button>

                  <a
                    href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(activeVehicle.name)}%20(${activeVehicle.stockNo})%20priced%20at%20KES%20${activeVehicle.priceKes.toLocaleString()}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost !py-2.5 !px-5 !text-xs !rounded-md w-full sm:w-auto inline-flex items-center justify-center font-medium"
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

          {/* Stage Side Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/70 hover:bg-black text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
            title="Previous car"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-md bg-black/70 hover:bg-black text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer z-20"
            title="Next car"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

        </div>

        {/* Rolls-Royce Animated Timing Progress Bar — Pure Crisp White */}
        <div className="w-full h-[2px] bg-zinc-900 relative overflow-hidden">
          <div
            className="h-full bg-white transition-all ease-linear"
            style={{
              width: `${isPlaying && !isHovered ? progress : ((activeIndex + 1) / vehicles.length) * 100}%`,
              transitionDuration: isPlaying && !isHovered ? '50ms' : '250ms',
            }}
          />
        </div>
      </div>

      {/* Fleet Thumbnail Runway Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2">
        {vehicles.map((v, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={v.id}
              onClick={() => handleSelectIndex(idx)}
              className={`group text-left p-2.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-zinc-900 border-white'
                  : 'bg-[#121215] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/60'
              }`}
            >
              <div className="aspect-[16/10] w-full rounded overflow-hidden bg-black mb-2 relative">
                <img
                  src={v.heroImage}
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <span className="absolute top-1 left-1 bg-black/80 font-mono text-[9px] text-zinc-300 px-1.5 py-0.5 rounded">
                  {v.year}
                </span>
              </div>

              <div>
                <span className="font-semibold text-xs text-white block truncate">
                  {v.name}
                </span>
                <span className="font-mono text-[11px] font-medium text-zinc-300 block mt-0.5">
                  KES {(v.priceKes / 1000000).toFixed(2)}M
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Rolls-Royce Fullscreen Theatrical Lightbox Modal (Zero-Scroll Viewport) */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 w-screen h-[100dvh] max-h-[100dvh] z-[100] bg-black/98 backdrop-blur-2xl flex flex-col overflow-hidden select-none animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar: Fixed slim height */}
          <div 
            className="h-14 sm:h-16 px-4 sm:px-8 border-b border-zinc-800/80 flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="font-mono text-xs sm:text-sm text-white font-bold uppercase tracking-wider">
                {activeVehicle.stockNo} · {activeVehicle.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                Grade {activeVehicle.auctionGrade} · {activeVehicle.auctionHall}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-300">
                <span className="text-white font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
                <span className="text-zinc-600"> / </span>
                <span className="text-zinc-400">{String(vehicles.length).padStart(2, '0')}</span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-md cursor-pointer transition-colors"
                title="Close fullscreen view (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage: Constrained Zero-Scroll Media Viewer */}
          <div 
            className="flex-1 min-h-0 w-full relative flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={`${activeVehicle.id}-${activeAngleIdx}`}
              src={angles[activeAngleIdx]?.url || activeVehicle.heroImage}
              alt={`${activeVehicle.name} - ${angles[activeAngleIdx]?.label || 'Exterior'}`}
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl transition-all duration-300 pointer-events-none"
            />

            {/* Hairline Side Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous car (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next car (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Fixed slim height */}
          <div 
            className="h-20 sm:h-24 px-4 sm:px-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
              {angles.map((ang, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveAngleIdx(idx)}
                  className={`px-3 py-1.5 text-xs rounded-md font-mono border transition-all cursor-pointer whitespace-nowrap ${
                    activeAngleIdx === idx
                      ? 'bg-white text-zinc-950 font-bold border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span>{ang.label}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
              <div className="text-left sm:text-right font-mono">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">DELIVERED PRICE</span>
                <span className="text-base sm:text-lg font-bold text-white">
                  KES {activeVehicle.priceKes.toLocaleString()}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20the%20${encodeURIComponent(activeVehicle.name)}%20(${activeVehicle.stockNo})%20priced%20at%20KES%20${activeVehicle.priceKes.toLocaleString()}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost !py-2.5 !px-4 text-xs font-medium"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setIsLightboxOpen(false);
                    onSelectVehicle(activeVehicle);
                  }}
                  className="btn-white !py-2.5 !px-4 text-xs font-semibold cursor-pointer"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
