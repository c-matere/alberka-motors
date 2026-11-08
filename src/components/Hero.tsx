import React, { useRef, useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';

interface HeroProps {
  onExploreFleet: () => void;
  onExploreWorkshop: () => void;
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
    id: 'nissan-serena',
    category: '7-Seater Hybrid',
    name: 'Nissan Serena Highway Star e-POWER',
    tagline: 'Quiet electric drive with 3-row comfort. Drives smoothly on electric power with no plug needed.',
    year: 2019,
    mileageKm: 52400,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    priceKes: 3850000,
    videoUrl: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
    imageUrl: './vehicles/serena-highway-star.jpg',
  },
  {
    id: 'toyota-harrier',
    category: 'Hybrid SUV',
    name: 'Toyota Harrier Hybrid E-Four',
    tagline: 'Quiet and comfortable with smart all-wheel drive. Premium comfort with great fuel savings.',
    year: 2018,
    mileageKm: 44100,
    grade: 'Grade 4.5',
    auctionHall: 'CAA Tokyo',
    priceKes: 4850000,
    imageUrl: './vehicles/harrier-hybrid.jpg',
  },
  {
    id: 'toyota-rav4',
    category: 'AWD SUV',
    name: 'Toyota RAV4 Adventure AWD',
    tagline: 'Smart All-Wheel Drive with 200mm ground clearance. Built tough for city driving and country roads.',
    year: 2020,
    mileageKm: 48200,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    priceKes: 4450000,
    imageUrl: './vehicles/rav4-adventure.jpg',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
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
    <section className="relative w-full bg-[#09090b] pt-16 sm:pt-24 pb-20 sm:pb-32 px-4 sm:px-8 text-center text-[#f4f4f5] overflow-hidden">
      
      {/* Subtle Monochrome Ambient Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none animate-ambient-spotlight" />

      <div className="max-w-[1240px] mx-auto relative z-10 space-y-8 sm:space-y-10">
        
        {/* Minimalist Provenance Eyebrow */}
        <div className="inline-flex items-center gap-2 animate-hero-1">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-zinc-400">
            MOMBASA & NAIROBI
          </span>
        </div>

        {/* Display Hero Title with Editorial Air and Restraint */}
        <div className="space-y-4 max-w-[980px] mx-auto">
          <h1 className="text-[38px] sm:text-[62px] md:text-[76px] lg:text-[84px] font-bold text-white tracking-[-0.04em] leading-[1.02] animate-hero-2">
            Japanese Provenance.
          </h1>

          <p className="max-w-[540px] mx-auto text-zinc-400 text-base sm:text-[18px] leading-relaxed font-normal animate-hero-3">
            Grade 4.5+ auction imports, fully prepared in Mombasa.
          </p>
        </div>

        {/* Clean, Decisive Action Pair */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-1 animate-hero-4">
          <button
            onClick={onExploreFleet}
            className="btn-white group py-3 px-6 text-xs sm:text-[13.5px] rounded-lg font-semibold tracking-tight inline-flex items-center gap-2"
          >
            <span>Explore Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost py-3 px-6 text-xs sm:text-[13.5px] rounded-lg font-medium tracking-tight inline-flex items-center gap-2 text-zinc-300"
          >
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>Our Workshop Standard</span>
          </button>
        </div>

        {/* 21:9 Widescreen Theatrical Cinema Stage — Pure, Uncluttered Visual Frame */}
        <div className="relative w-full mx-auto pt-6 animate-hero-5">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsHeroLightboxOpen(true)}
            className="w-full min-h-[350px] xs:min-h-[390px] sm:min-h-0 aspect-[16/11] sm:aspect-[21/9.5] max-h-[620px] overflow-hidden relative bg-black border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] select-none cursor-pointer group"
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
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
              <div className="bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                <span>{currentSlide.grade}</span>
                <span className="text-zinc-600">·</span>
                <span className="text-zinc-300">{currentSlide.auctionHall}</span>
              </div>
            </div>

            {/* Right Top: Minimal Audio & Fullscreen Toggle */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 z-20">
              {currentSlide.videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-8 h-8 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5 text-zinc-300" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHeroLightboxOpen(true);
                }}
                className="w-8 h-8 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                title="Fullscreen Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
              </button>
            </div>

            {/* Slide Information Overlay — Bottom Left with generous right margin for mobile clearance */}
            <div className="absolute bottom-4 sm:bottom-7 left-4 sm:left-8 pr-28 sm:pr-0 text-left z-20 pointer-events-none max-w-xl">
              <span className="font-mono text-[10px] sm:text-[10.5px] uppercase tracking-[0.16em] text-zinc-400 block mb-0.5 sm:mb-1">
                {currentSlide.category} · {currentSlide.year}
              </span>
              <h2 className="text-lg xs:text-xl sm:text-3xl md:text-4xl font-bold text-white tracking-[-0.03em] leading-snug sm:leading-tight mb-1.5 sm:mb-2 line-clamp-2">
                {currentSlide.name}
              </h2>
              <div className="flex items-center gap-2.5 font-mono text-xs sm:text-[13px] text-zinc-300">
                <span className="font-bold text-white text-sm sm:text-lg">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
                <span className="text-zinc-600">·</span>
                <span>{currentSlide.mileageKm.toLocaleString()} KM</span>
              </div>
            </div>

            {/* Right Bottom: Subtle Slide Segment Rails */}
            <div 
              className="absolute bottom-4 sm:bottom-7 right-4 sm:right-8 z-20 flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {FLAGSHIP_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activeSlideIdx
                      ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                      : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                  title={`Slide ${idx + 1}`}
                />
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
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span className="font-mono text-sm text-white font-bold uppercase tracking-wider truncate">
                {currentSlide.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline truncate">
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
              className="btn-white !py-2.5 !px-5 text-xs font-semibold cursor-pointer"
            >
              <span>Explore Full Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </button>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
