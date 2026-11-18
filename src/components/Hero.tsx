import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  Globe,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

import { CmsPage } from '../services/cmsContent';

interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
  pageData?: CmsPage;
}

interface FlagshipSlide {
  id: string;
  category: string;
  name: string;
  tagline: string;
  year: number;
  mileageKm: number;
  grade: string;
  auctionHall: string;
  priceKes: number;
  videoUrl?: string;
  imageUrl: string;
}

const FLAGSHIP_SLIDES: FlagshipSlide[] = [
  {
    id: 'toyota-harrier-2020-grey',
    category: '80-Series Dynamic Force Luxury SUV',
    name: 'Toyota Harrier 2020 Grey',
    tagline: 'New generation 80-Series Harrier with 2.0L Dynamic Force petrol engine, continuous rear LED bar, and luxury ash grey leather interior.',
    year: 2020,
    mileageKm: 74000,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo / SBT Japan Export Center',
    priceKes: 4950000,
    imageUrl: '/vehicles/toyota-harrier-2020-grey/hero-front-34.jpg',
  },
  {
    id: 'volvo-xc40-r-design-2019',
    category: 'Scandinavian Luxury Performance SUV',
    name: 'Volvo XC40 R-Design 2019',
    tagline: "2.0L Turbo petrol with R-Design sport chassis, Thor's Hammer LED lights, digital cockpit, and premium Harman Kardon sound.",
    year: 2019,
    mileageKm: 40000,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo / Direct Japanese Import',
    priceKes: 4650000,
    imageUrl: '/vehicles/volvo-xc40-r-design-2019/hero-front-34.jpg',
  },
  {
    id: 'subaru-xv-2019-black',
    category: 'Symmetrical AWD Adventure Crossover',
    name: 'Subaru XV 2019 2.0i-L EyeSight',
    tagline: 'Adventure-ready 2.0L Boxer AWD crossover with EyeSight driver assist, 220mm ground clearance, and sleek Crystal Black Silica finish.',
    year: 2019,
    mileageKm: 102000,
    grade: 'Grade 4.0',
    auctionHall: 'USS Tokyo / SBT Japan Export Center',
    priceKes: 3150000,
    imageUrl: '/vehicles/subaru-xv-2019-black/hero-front-34.jpg',
  },
  {
    id: 'toyota-harrier-gr-sport-2019',
    category: 'Gazoo Racing Luxury SUV',
    name: 'Toyota Harrier GR Sport 2019',
    tagline: 'Sporty luxury crossover with factory Gazoo Racing body kit, 19" GR alloy wheels, and leather/suede cabin.',
    year: 2019,
    mileageKm: 38000,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo / SBT Japan Export Center',
    priceKes: 4850000,
    imageUrl: '/vehicles/toyota-harrier-gr-sport-2019/hero-front-34.jpg',
  },
  {
    id: 'suzuki-every-2019',
    category: 'Ultra-Efficient Commercial Van',
    name: 'Suzuki Every 2019 Van',
    tagline: 'Compact, ultra-efficient 660cc engine with dual sliding doors, automatic transmission, and 350kg cargo payload.',
    year: 2019,
    mileageKm: 157000,
    grade: 'Grade 4.0',
    auctionHall: 'CAA Tokyo / Direct Japanese Import',
    priceKes: 1050000,
    imageUrl: '/vehicles/suzuki-every-2019/hero-front-34.jpg',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop, pageData }) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const SLIDE_INTERVAL = 8000;
  const currentSlide = FLAGSHIP_SLIDES[activeSlideIdx];

  const handleNext = useCallback(() => {
    setActiveSlideIdx((prev) => (prev + 1) % FLAGSHIP_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlideIdx((prev) => (prev - 1 + FLAGSHIP_SLIDES.length) % FLAGSHIP_SLIDES.length);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
    setTouchStartX(null);
  };

  // Keyboard navigation & Esc handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setIsHeroLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Body scroll lock during fullscreen theater lightbox
  useEffect(() => {
    if (isHeroLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isHeroLightboxOpen]);

  // Clean, automatic slide transition
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [handleNext]);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-transparent pt-2 sm:pt-6 pb-12 sm:pb-16 px-4 sm:px-8 text-center text-zinc-900 overflow-hidden">
      
      {/* Subtle Monochrome Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] bg-gradient-to-b from-slate-200/50 to-transparent blur-3xl pointer-events-none animate-ambient-spotlight" />

      <div className="max-w-[1240px] mx-auto relative z-10 space-y-2.5 sm:space-y-4">
        
        {/* Minimalist Provenance Eyebrow (Hidden on mobile to preserve vertical air) */}
        <div className="hidden sm:inline-flex items-center gap-2 animate-hero-1">
          <span className="font-mono text-[9.5px] uppercase tracking-[0.24em] text-zinc-600 font-semibold">
            {pageData?.badge || 'QUALITY JAPANESE IMPORTS'}
          </span>
        </div>

        {/* Display Hero Title with Editorial Air and Restraint - Compact for Above-the-Fold Video */}
        <div className="space-y-1 sm:space-y-1.5 max-w-[980px] mx-auto">
          <h1 className="text-[26px] xs:text-[34px] sm:text-[50px] md:text-[58px] font-bold text-zinc-950 tracking-[-0.035em] leading-[1.1] animate-hero-2">
            {pageData?.heroTitle || 'Japanese Provenance.'}
          </h1>

          <p className="max-w-[460px] mx-auto text-zinc-600 text-xs sm:text-[14.5px] leading-relaxed font-normal animate-hero-3">
            {pageData?.heroSubtitle || 'Grade 4.5+ auction imports, fully prepared in our workshop.'}
          </p>
        </div>

        {/* Clean, Decisive Action Pair */}
        <div className="flex flex-row items-center justify-center gap-2 sm:gap-2.5 pt-0.5 animate-hero-4 max-w-md mx-auto xs:max-w-none">
          <button
            onClick={onExploreFleet}
            className="group py-2.5 px-4 sm:py-2.5 sm:px-6 text-xs sm:text-[13.5px] rounded-full sm:rounded-xl font-bold tracking-tight inline-flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg bg-red-600 hover:bg-red-700 text-white transition-all hover:scale-105 active:scale-95"
          >
            <span>{pageData?.ctaText || 'Explore Available Fleet'}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost group py-2 px-3 sm:py-2.5 sm:px-5 text-xs sm:text-[13px] rounded-full sm:rounded-lg font-medium tracking-tight inline-flex items-center justify-center gap-1.5 text-zinc-700 hover:text-zinc-950 transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-zinc-500 group-hover:text-zinc-950 transition-colors" />
            <span className="hidden xs:inline">Our Workshop Standard</span>
            <span className="xs:hidden">Workshop</span>
          </button>
        </div>

        {/* 21:9 Widescreen Theatrical Cinema Stage — Positioned Above-the-Fold on Initial Page Load */}
        <div className="relative w-full mx-auto pt-2 sm:pt-3 animate-hero-5">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsHeroLightboxOpen(true)}
            className="w-full min-h-[260px] xs:min-h-[300px] sm:min-h-0 aspect-[16/10] sm:aspect-[21/9.2] max-h-[540px] overflow-hidden relative bg-zinc-900 border border-zinc-200/80 hover:border-zinc-300 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] select-none cursor-pointer group transition-all duration-500"
          >
            
            {/* Cinematic Media (Video or Image) */}
            {currentSlide.videoUrl ? (
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                key={currentSlide.id}
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] group-hover:scale-102 ease-out"
                poster={currentSlide.imageUrl}
              >
                <source src={currentSlide.videoUrl} type="video/mp4" />
                <img src={currentSlide.imageUrl} alt={currentSlide.name} className="w-full h-full object-cover" />
              </video>
            ) : (
              <img
                key={currentSlide.id}
                src={currentSlide.imageUrl}
                alt={currentSlide.name}
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] group-hover:scale-102 ease-out"
              />
            )}

            {/* Subtle Scrim Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* Left Top: Discreet Provenance Seal */}
            <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
              <div className="bg-black/75 backdrop-blur-md border border-white/15 px-2.5 sm:px-3 py-1 rounded-md text-[10.5px] sm:text-[11px] font-mono text-white flex items-center gap-1.5 shadow-lg">
                <span className="text-white font-bold">{currentSlide.grade}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-300">{currentSlide.auctionHall}</span>
              </div>
            </div>

            {/* Right Top: Minimal Audio & Fullscreen Toggle */}
            <div className="absolute top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-1.5 z-20">
              {currentSlide.videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-8 h-8 bg-white/90 hover:bg-white text-zinc-950 border border-zinc-300 shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg hover:scale-105 active:scale-95"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-900" /> : <Volume2 className="w-3.5 h-3.5 text-zinc-900" />}
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHeroLightboxOpen(true);
                }}
                className="w-8 h-8 bg-white/90 hover:bg-white text-zinc-950 border border-zinc-300 shadow-md backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg hover:scale-105 active:scale-95"
                title="Fullscreen Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5 text-zinc-900" />
              </button>
            </div>

            {/* Slide Information Overlay — Bottom Left with generous clearance for mobile indicators */}
            <div
              key={currentSlide.id}
              className="absolute bottom-3 xs:bottom-4 sm:bottom-7 left-3 xs:left-4 sm:left-8 pr-20 xs:pr-24 sm:pr-0 text-left z-20 pointer-events-none max-w-xl animate-slide-text"
            >
              <span className="font-mono text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.16em] text-zinc-400 block mb-0.5 sm:mb-1">
                {currentSlide.category} · {currentSlide.year}
              </span>
              <h2 className="text-base xs:text-lg sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] leading-snug sm:leading-tight mb-1 sm:mb-2 line-clamp-2">
                {currentSlide.name}
              </h2>
              <div className="flex items-center gap-2 font-mono text-xs sm:text-[13px] text-zinc-300">
                <span className="font-bold text-white text-xs xs:text-sm sm:text-lg">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
                <span className="text-zinc-600">·</span>
                <span>{currentSlide.mileageKm.toLocaleString()} KM</span>
              </div>
            </div>

            {/* Right Bottom: Subtle Slide Segment Rails with Progressive Timeline */}
            <div 
              className="absolute bottom-3 xs:bottom-4 sm:bottom-7 right-3 xs:right-4 sm:right-8 z-20 flex items-center gap-1.5 sm:gap-2 bg-black/80 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {FLAGSHIP_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIdx(idx)}
                  className="cursor-pointer group flex items-center p-0.5"
                  title={`Slide ${idx + 1}`}
                >
                  {idx === activeSlideIdx ? (
                    <div className="relative h-[2px] w-6 sm:w-11 bg-white/20 rounded-full overflow-hidden">
                      <div
                        key={`hero-progress-${activeSlideIdx}`}
                        className="h-full bg-white rounded-full animate-hero-progress"
                      />
                    </div>
                  ) : (
                    <div className="h-[2px] w-1.5 sm:w-2 rounded-full bg-white/30 group-hover:bg-white/60 transition-all duration-300" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen Theatrical Hero Lightbox Modal */}
      {isHeroLightboxOpen && typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 z-[9999] w-full h-full bg-black/98 backdrop-blur-2xl flex flex-col overflow-hidden select-none animate-fadeIn text-left"
          onClick={() => setIsHeroLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="h-16 px-6 sm:px-10 border-b border-zinc-800/80 flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="font-mono text-sm text-white font-bold uppercase tracking-wider truncate">
                {currentSlide.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-500 font-mono hidden sm:inline truncate">
                {currentSlide.category} · {currentSlide.grade}
              </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-300">
                <span className="text-white font-bold">0{activeSlideIdx + 1}</span>
                <span className="text-zinc-600"> / </span>
                <span className="text-zinc-400">0{FLAGSHIP_SLIDES.length}</span>
              </div>
              <button
                onClick={() => setIsHeroLightboxOpen(false)}
                className="p-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-md cursor-pointer transition-colors"
                title="Close fullscreen (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Stage */}
          <div 
            className="flex-1 min-h-0 w-full relative flex items-center justify-center p-4 sm:p-8 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {currentSlide.videoUrl ? (
              <video
                autoPlay
                muted={isMuted}
                loop
                playsInline
                key={currentSlide.id}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl"
              >
                <source src={currentSlide.videoUrl} type="video/mp4" />
                <img src={currentSlide.imageUrl} alt={currentSlide.name} className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl" />
              </video>
            ) : (
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.name}
                className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl pointer-events-none"
              />
            )}

            {/* Hairline Nav Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous car"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next car"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar */}
          <div 
            className="shrink-0 border-t border-zinc-800/80 bg-[#09090b]/95 px-6 sm:px-10 py-3 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-left font-mono">
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">PRICE (KES)</span>
              <span className="text-lg font-bold text-white">
                {currentSlide.priceKes.toLocaleString()}
              </span>
            </div>

            <button
              onClick={() => {
                setIsHeroLightboxOpen(false);
                onExploreFleet();
              }}
              className="bg-red-600 hover:bg-red-700 text-white !py-2.5 !px-5 text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Available Fleet</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
