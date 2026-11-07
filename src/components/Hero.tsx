import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
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
  serviceBadge: string;
}

const FLAGSHIP_SLIDES: FlagshipSlide[] = [
  {
    id: 'nissan-serena',
    category: '7-Seater Family Hybrid',
    name: 'Nissan Serena Highway Star e-POWER',
    tagline: 'Quiet electric drive with 3-row comfort. Drives smoothly on electric power with no plug needed.',
    year: 2019,
    mileageKm: 52400,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    priceKes: 3850000,
    videoUrl: 'https://videos.pexels.com/video-files/3015510/3015510-hd_1920_1080_24fps.mp4',
    imageUrl: './vehicles/serena-highway-star.jpg',
    serviceBadge: '100-Point Mombasa Check',
  },
  {
    id: 'toyota-harrier',
    category: 'Luxury Hybrid SUV',
    name: 'Toyota Harrier Hybrid E-Four',
    tagline: 'Quiet and comfortable with smart all-wheel drive. Premium comfort with great fuel savings.',
    year: 2018,
    mileageKm: 44100,
    grade: 'Grade 4.5',
    auctionHall: 'CAA Tokyo',
    priceKes: 4850000,
    imageUrl: './vehicles/harrier-hybrid.jpg',
    serviceBadge: 'Hybrid Battery Tested',
  },
  {
    id: 'toyota-rav4',
    category: 'All-Weather Family SUV',
    name: 'Toyota RAV4 Adventure AWD',
    tagline: 'Smart All-Wheel Drive with 200mm ground clearance. Built tough for city driving and country roads.',
    year: 2020,
    mileageKm: 48200,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    priceKes: 4450000,
    imageUrl: './vehicles/rav4-adventure.jpg',
    serviceBadge: 'Inspected & Road-Ready',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const SLIDE_INTERVAL = 7000;
  const currentSlide = FLAGSHIP_SLIDES[activeSlideIdx];

  const handleNext = useCallback(() => {
    setActiveSlideIdx((prev) => (prev + 1) % FLAGSHIP_SLIDES.length);
    setProgress(0);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlideIdx((prev) => (prev - 1 + FLAGSHIP_SLIDES.length) % FLAGSHIP_SLIDES.length);
    setProgress(0);
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
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isHeroLightboxOpen]);

  // Smooth timing progress rail
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = 50;
    const step = (intervalMs / SLIDE_INTERVAL) * 100;

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
  }, [isPlaying, handleNext]);

  const togglePlay = () => {
    if (currentSlide.videoUrl && videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="relative w-full bg-[#09090b] pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-8 text-center text-[#f4f4f5] overflow-hidden">
      
      {/* Subtle Monochrome Ambient Spotlight in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-white/[0.035] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative z-10 space-y-7">
        
        {/* Minimalist Eyebrow Label with Single Subtle Red Dot */}
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
            JAPANESE AUTOMOTIVE ATELIER · MOMBASA & NAIROBI
          </span>
        </div>

        {/* Display Hero Title with Editorial Inter Tracking */}
        <div className="space-y-4 max-w-[1020px] mx-auto">
          <h1 className="text-[38px] sm:text-[58px] md:text-[70px] lg:text-[78px] font-bold text-white tracking-[-0.04em] leading-[1.04]">
            Japanese Provenance.<br />
            Delivered Without Compromise.
          </h1>

          <p className="max-w-[660px] mx-auto text-zinc-400 text-[15px] sm:text-[18px] leading-relaxed font-normal">
            Personally bid at Tokyo auctions. Fully serviced in our Mombasa workshop. Handed over with verified mileage and a 5,000 km written warranty.
          </p>
        </div>

        {/* Action Buttons — Crisp Pure White Primary + Minimal Ghost Secondary */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={onExploreFleet}
            className="btn-white group py-3 px-6 text-xs sm:text-[13.5px] rounded-lg font-semibold tracking-tight inline-flex items-center gap-2"
          >
            <span>Explore In-Stock Collection</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost py-3 px-6 text-xs sm:text-[13.5px] rounded-lg font-medium tracking-tight inline-flex items-center gap-2 text-zinc-300"
          >
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>Our Workshop Standards</span>
          </button>
        </div>

        {/* 21:9 Widescreen Theatrical Cinema Stage */}
        <div className="relative w-full mx-auto pt-4">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onClick={() => setIsHeroLightboxOpen(true)}
            className="w-full aspect-[16/10] sm:aspect-[21/9.5] max-h-[640px] overflow-hidden relative bg-black border border-white/[0.08] rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.8)] select-none cursor-pointer group"
          >
            
            {/* Cinematic Media (Video or High-Res Image) */}
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

            {/* Theatrical Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

            {/* Slide Information Overlay — Bottom Left */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 text-left z-20 pointer-events-none max-w-xl">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-zinc-400 block mb-1">
                {currentSlide.category} · {currentSlide.year}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-[-0.03em] leading-tight mb-1">
                {currentSlide.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 hidden md:block leading-relaxed line-clamp-1 mb-2">
                {currentSlide.tagline}
              </p>
              <div className="flex items-center gap-3 font-mono text-xs text-zinc-300">
                <span className="font-bold text-white text-sm sm:text-base">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
                <span className="text-zinc-600">·</span>
                <span>{currentSlide.mileageKm.toLocaleString()} KM</span>
                <span className="text-zinc-600">·</span>
                <span className="text-emerald-400">{currentSlide.serviceBadge}</span>
              </div>
            </div>

            {/* Slide Capsule Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
              <div className="bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md text-[11px] font-mono text-white flex items-center gap-2 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                <span className="font-bold">{currentSlide.grade}</span>
                <span className="text-zinc-600">|</span>
                <span className="text-zinc-300">{currentSlide.auctionHall}</span>
              </div>
            </div>

            {/* Minimalist Hairline Controls Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 z-20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHeroLightboxOpen(true);
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                title="Fullscreen Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-white" />}
              </button>

              {currentSlide.videoUrl && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleMute();
                  }}
                  className="w-8 h-8 sm:w-9 sm:h-9 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                </button>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                title="Previous car"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="w-8 h-8 sm:w-9 sm:h-9 bg-black/75 hover:bg-black text-white border border-white/15 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-lg shadow-md"
                title="Next car"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Rolls-Royce Timing Progress Line at Bottom Rim */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-white/15 z-20">
              <div
                className="h-full bg-white transition-all ease-linear shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                style={{
                  width: `${isPlaying ? progress : ((activeSlideIdx + 1) / FLAGSHIP_SLIDES.length) * 100}%`,
                  transitionDuration: isPlaying ? '50ms' : '250ms',
                }}
              />
            </div>
          </div>

          {/* Sleek Minimalist 3-Model Hairline Switcher */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 text-left">
            {FLAGSHIP_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIdx;
              const isCompleted = idx < activeSlideIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlideIdx(idx);
                    setProgress(0);
                  }}
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'bg-white/[0.04] border-white/35 text-white shadow-lg'
                      : 'bg-transparent border-white/[0.07] text-zinc-400 hover:text-white hover:border-white/20'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="text-xs sm:text-[13px] font-bold text-white tracking-tight truncate">
                      {slide.name}
                    </span>
                    <span className="font-mono text-xs text-zinc-300 shrink-0 font-medium">
                      KES {(slide.priceKes / 1000000).toFixed(2)}M
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mb-2">
                    <span className="truncate">{slide.year} · {slide.mileageKm.toLocaleString()} KM</span>
                    <span>{slide.grade}</span>
                  </div>

                  {/* Animated Hairline Segment Progress Rail */}
                  <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white transition-all ease-linear"
                      style={{
                        width: isActive
                          ? `${isPlaying ? progress : 100}%`
                          : isCompleted
                          ? '100%'
                          : '0%',
                        transitionDuration: isActive && isPlaying ? '50ms' : '200ms',
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Rolls-Royce Fullscreen Theatrical Hero Lightbox Modal */}
      {isHeroLightboxOpen && (
        <div 
          className="fixed inset-0 z-[100] w-full h-full bg-black/98 backdrop-blur-2xl flex flex-col overflow-hidden select-none touch-none overscroll-none animate-fadeIn text-left"
          onClick={() => setIsHeroLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="h-14 sm:h-16 px-4 sm:px-8 border-b border-zinc-800/80 flex items-center justify-between shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
              <span className="font-mono text-xs sm:text-sm text-white font-bold uppercase tracking-wider truncate">
                {currentSlide.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline truncate">
                {currentSlide.category} · {currentSlide.grade}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
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
            className="flex-1 min-h-0 w-full relative flex items-center justify-center p-3 sm:p-6 overflow-hidden select-none"
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
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous car"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next car"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Bottom Bar */}
          <div 
            className="shrink-0 border-t border-zinc-800/80 bg-[#09090b]/95 px-4 sm:px-8 py-2.5 sm:py-3 flex flex-col sm:flex-row items-center justify-between gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full sm:w-auto py-1">
              {FLAGSHIP_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => setActiveSlideIdx(idx)}
                  className={`px-3 py-1.5 text-xs rounded-md font-mono border transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                    activeSlideIdx === idx
                      ? 'bg-white text-zinc-950 font-bold border-white'
                      : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                  }`}
                >
                  <span className={`text-[10px] ${activeSlideIdx === idx ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>0{idx + 1}</span>
                  <span>{slide.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto shrink-0">
              <div className="text-left sm:text-right font-mono">
                <span className="text-[10px] text-zinc-400 uppercase tracking-wider block">DELIVERED PRICE</span>
                <span className="text-base sm:text-lg font-bold text-white">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsHeroLightboxOpen(false);
                  onExploreFleet();
                }}
                className="btn-white !py-2.5 !px-4 text-xs font-semibold cursor-pointer"
              >
                <span>Browse All Cars</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
