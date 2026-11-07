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

  // Keyboard navigation & ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsHeroLightboxOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
    if (!isPlaying || isHeroLightboxOpen) return;

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
    <section className="relative w-full bg-[#09090b] pt-10 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-8 text-center text-[#f4f4f5] overflow-hidden">
      
      {/* Subtle Monochrome Ambient Spotlight in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative z-10 space-y-8">
        
        {/* Eyebrow Label with Single Subtle Red Dot */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#18181c] border border-[#27272a] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
          <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-zinc-300 font-medium">
            DIRECT JAPANESE IMPORTS // MOMBASA & NAIROBI
          </span>
        </div>

        {/* Display Hero Title with Razor-Sharp Inter Tracking */}
        <div className="space-y-4 max-w-[1100px] mx-auto">
          <h1 className="text-[34px] sm:text-[54px] md:text-[66px] lg:text-[74px] font-bold text-white tracking-[-0.035em] leading-[1.08]">
            Clean Japanese Cars. Honest Mileage. Cars You Can Trust.
          </h1>

          <p className="max-w-[760px] mx-auto text-zinc-400 text-[16px] sm:text-[19px] leading-relaxed tracking-[-0.01em]">
            Every vehicle is handpicked from top Japanese auctions, thoroughly serviced in our Mombasa workshop, and backed by a written 5,000 km warranty.
          </p>
        </div>

        {/* Action Buttons — Crisp Pure White Primary + Subtle Ghost Secondary */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
          <button
            onClick={onExploreFleet}
            className="btn-white group py-3 px-6 text-[14px] rounded-md font-semibold"
          >
            <span>Browse Cars in Stock</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost py-3 px-6 text-[14px] rounded-md font-medium"
          >
            <ShieldCheck className="w-4 h-4 text-zinc-400" />
            <span>Our 100-Point Workshop Check</span>
          </button>
        </div>

        {/* Theatrical Model Slideshow Selector */}
        <div className="pt-4">
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 no-scrollbar">
            {FLAGSHIP_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlideIdx(idx);
                    setProgress(0);
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-white text-zinc-950 font-semibold border-white shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-zinc-950 font-bold' : 'text-zinc-500'}`}>
                    0{idx + 1}
                  </span>
                  <span>{slide.name.split(' ')[0]} {slide.name.split(' ')[1]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 21:9 Widescreen Theatrical Stage */}
        <div className="relative w-full mx-auto">
          <div 
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="w-full h-[340px] xs:h-[420px] sm:h-[520px] md:h-[620px] overflow-hidden relative bg-black border border-zinc-800 rounded-xl shadow-2xl select-none"
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
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] hover:scale-102 ease-out"
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
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] hover:scale-102 ease-out"
              />
            )}

            {/* Theatrical Vignette & Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20 flex items-end p-6 sm:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[650px] space-y-1.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 block font-medium">
                  FLAGSHIP SHOWCASE // {currentSlide.category}
                </span>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-[-0.03em] leading-tight">
                  {currentSlide.name}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 hidden sm:block max-w-lg leading-relaxed">
                  {currentSlide.tagline}
                </p>
              </div>
            </div>

            {/* Slide Indicator Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-2">
              <div className="bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-md text-xs font-mono text-zinc-300 flex items-center gap-1.5 shadow-md">
                <span className="text-white font-bold">0{activeSlideIdx + 1}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">0{FLAGSHIP_SLIDES.length}</span>
              </div>
              <div className="bg-black/80 backdrop-blur-md border border-zinc-700 text-white text-[11px] font-mono px-2.5 py-1 rounded-md flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                <span className="font-bold">{currentSlide.grade}</span>
              </div>
            </div>

            {/* Controls Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 z-30">
              <button
                onClick={() => setIsHeroLightboxOpen(true)}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-md"
                title="Fullscreen Theater Mode"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={togglePlay}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-md"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-white" />}
              </button>

              {currentSlide.videoUrl && (
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-md"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-white" />}
                </button>
              )}

              <button
                onClick={handlePrev}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-md"
                title="Previous car"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-md"
                title="Next car"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Rolls-Royce Animated Timing Progress Line — Crisp Pure White */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-zinc-900/80 z-20">
              <div
                className="h-full bg-white transition-all ease-linear"
                style={{
                  width: `${isPlaying ? progress : ((activeSlideIdx + 1) / FLAGSHIP_SLIDES.length) * 100}%`,
                  transitionDuration: isPlaying ? '50ms' : '250ms',
                }}
              />
            </div>
          </div>

          {/* Floating Spec Inset Banner */}
          <div className="max-w-[1000px] mx-auto -mt-8 sm:-mt-10 relative z-20 bg-[#121215]/95 backdrop-blur-xl border border-zinc-800 p-5 sm:p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left shadow-2xl">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full sm:w-auto">
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  AUCTION GRADE
                </span>
                <span className="text-sm font-bold text-white block">
                  {currentSlide.auctionHall} {currentSlide.grade}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  YEAR & MILEAGE
                </span>
                <span className="text-sm font-bold text-white block">
                  {currentSlide.year} • {currentSlide.mileageKm.toLocaleString()} KM
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  WORKSHOP SERVICE
                </span>
                <span className="text-sm font-bold text-zinc-200 block">
                  {currentSlide.serviceBadge}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  DELIVERED PRICE
                </span>
                <span className="text-sm font-bold text-white font-mono block">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <button
                onClick={onExploreFleet}
                className="btn-white !py-2.5 !px-5 w-full sm:w-auto justify-center text-xs rounded-md font-semibold"
              >
                <span>View Full Showroom</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
      {/* Fullscreen Theatrical Hero Lightbox Modal */}
      {isHeroLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn text-left"
          onClick={() => setIsHeroLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div 
            className="flex items-center justify-between border-b border-zinc-800/80 pb-4 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span className="font-mono text-xs sm:text-sm text-white font-bold uppercase tracking-wider">
                {currentSlide.name}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="text-xs text-zinc-400 font-mono hidden sm:inline">
                {currentSlide.category} · {currentSlide.grade}
              </span>
            </div>

            <div className="flex items-center gap-2">
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

          {/* Center Stage Video / Image */}
          <div 
            className="relative flex-1 flex items-center justify-center my-4 overflow-hidden select-none"
            onClick={(e) => e.stopPropagation()}
          >
            {currentSlide.videoUrl ? (
              <video
                autoPlay
                muted={isMuted}
                loop
                playsInline
                key={currentSlide.id}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              >
                <source src={currentSlide.videoUrl} type="video/mp4" />
                <img src={currentSlide.imageUrl} alt={currentSlide.name} className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl" />
              </video>
            ) : (
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.name}
                className="max-h-[72vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
              />
            )}

            {/* Hairline Nav Controls */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Previous car"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/70 hover:bg-black text-white border border-zinc-800 hover:border-zinc-600 flex items-center justify-center transition-all cursor-pointer z-10 backdrop-blur-md"
              title="Next car"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Bar: Slide Switchers & Action */}
          <div 
            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800/80 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
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

            <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto">
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
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
