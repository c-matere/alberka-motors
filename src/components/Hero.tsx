import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles
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
    category: '7-Seater e-POWER Hybrid',
    name: 'Nissan Serena Highway Star e-POWER',
    tagline: 'Quiet electric glide with 3-row comfort. 100% electric motor drive with zero range anxiety.',
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
    category: 'Executive Luxury Hybrid SUV',
    name: 'Toyota Harrier Hybrid E-Four',
    tagline: 'Whisper-quiet electric cruising with all-weather E-Four intelligent all-wheel drive.',
    year: 2018,
    mileageKm: 44100,
    grade: 'Grade 4.5',
    auctionHall: 'CAA Tokyo',
    priceKes: 4850000,
    imageUrl: './vehicles/harrier-hybrid.jpg',
    serviceBadge: 'Hybrid Battery Serviced',
  },
  {
    id: 'toyota-rav4',
    category: 'All-Terrain Dynamic Force AWD',
    name: 'Toyota RAV4 Adventure AWD',
    tagline: 'Dynamic Torque Vectoring All-Wheel Drive with rugged poise and high ground clearance.',
    year: 2020,
    mileageKm: 48200,
    grade: 'Grade 4.5',
    auctionHall: 'USS Tokyo',
    priceKes: 4450000,
    imageUrl: './vehicles/rav4-adventure.jpg',
    serviceBadge: 'Driveline Certified',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreFleet, onExploreWorkshop }) => {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
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

  // Autoplay timer with linear progress
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
    <section className="relative w-full bg-[#09090b] pt-10 sm:pt-16 pb-20 sm:pb-28 px-4 sm:px-8 text-center text-[#f4f4f5] overflow-hidden">
      
      {/* Subtle Crimson Gradient Glow in Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-[#dc2626]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-[1360px] mx-auto relative z-10 space-y-8">
        
        {/* Eyebrow Label */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#18181c] border border-[#27272a] rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#dc2626] animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#e4e4e7] font-semibold">
            DIRECT JAPANESE IMPORTS // MOMBASA & NAIROBI
          </span>
        </div>

        {/* Display Hero Title */}
        <div className="space-y-4 max-w-[1100px] mx-auto">
          <h1 className="text-[34px] sm:text-[54px] md:text-[66px] lg:text-[74px] font-bold text-white tracking-tight leading-[1.08]">
            Clean Japanese Cars. Honest Mileage. Cars You Can Trust.
          </h1>

          <p className="max-w-[760px] mx-auto text-[#a1a1aa] text-[16px] sm:text-[19px] leading-relaxed">
            Every vehicle is handpicked from top Japanese auctions, thoroughly serviced in our Mombasa workshop, and backed by a written 5,000 km warranty.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onExploreFleet}
            className="btn-crimson group py-3 px-6 text-[14.5px] rounded-lg"
          >
            <span>Browse Cars in Stock</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="btn-ghost py-3 px-6 text-[14.5px] rounded-lg"
          >
            <ShieldCheck className="w-4 h-4 text-[#ef4444]" />
            <span>Our 100-Point Workshop Check</span>
          </button>
        </div>

        {/* Rolls-Royce Theatrical Model Slideshow Selector */}
        <div className="pt-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
            {FLAGSHIP_SLIDES.map((slide, idx) => {
              const isActive = idx === activeSlideIdx;
              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setActiveSlideIdx(idx);
                    setProgress(0);
                  }}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full text-xs transition-all cursor-pointer border ${
                    isActive
                      ? 'bg-zinc-900 border-red-600 text-white shadow-lg'
                      : 'bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <span className={`font-mono text-[10px] ${isActive ? 'text-red-500 font-bold' : 'text-zinc-500'}`}>
                    0{idx + 1}
                  </span>
                  <span className="font-semibold">{slide.name.split(' ')[0]} {slide.name.split(' ')[1]}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 21:9 Widescreen Theatrical Stage */}
        <div className="relative w-full mx-auto">
          <div className="w-full h-[340px] xs:h-[420px] sm:h-[520px] md:h-[620px] overflow-hidden relative bg-black border border-zinc-800 rounded-2xl shadow-2xl">
            
            {/* Cinematic Media (Video or High-Res Image) */}
            {currentSlide.videoUrl ? (
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                key={currentSlide.id}
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] hover:scale-103 ease-out"
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
                className="w-full h-full object-cover scale-100 transition-transform duration-[7000ms] hover:scale-103 ease-out"
              />
            )}

            {/* Theatrical Vignette & Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/20 flex items-end p-6 sm:p-10 pointer-events-none">
              <div className="text-left text-white max-w-[650px] space-y-1.5">
                <span className="font-mono text-[11px] uppercase tracking-wider text-red-500 block font-semibold">
                  FLAGSHIP SHOWCASE // {currentSlide.category}
                </span>
                <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                  {currentSlide.name}
                </p>
                <p className="text-xs sm:text-sm text-zinc-300 hidden sm:block max-w-lg leading-relaxed">
                  {currentSlide.tagline}
                </p>
              </div>
            </div>

            {/* Rolls-Royce Slide Indicator Top Left */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-2">
              <div className="bg-black/80 backdrop-blur-md border border-zinc-800 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300 flex items-center gap-1.5 shadow-md">
                <span className="text-red-500 font-bold">0{activeSlideIdx + 1}</span>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-400">0{FLAGSHIP_SLIDES.length}</span>
              </div>
              <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-md">
                {currentSlide.grade}
              </span>
            </div>

            {/* Controls Top Right */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-30">
              <button
                onClick={togglePlay}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-full"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5 text-red-500" />}
              </button>

              {currentSlide.videoUrl && (
                <button
                  onClick={toggleMute}
                  className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-full"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-red-500" />}
                </button>
              )}

              <button
                onClick={handlePrev}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-full"
                title="Previous car"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-9 h-9 bg-black/80 hover:bg-zinc-900 text-white border border-zinc-800 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer rounded-full"
                title="Next car"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Rolls-Royce Animated Timing Progress Line */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-zinc-900/80 z-20">
              <div
                className="h-full bg-red-600 transition-all ease-linear"
                style={{
                  width: `${isPlaying ? progress : ((activeSlideIdx + 1) / FLAGSHIP_SLIDES.length) * 100}%`,
                  transitionDuration: isPlaying ? '50ms' : '300ms',
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
                <span className="text-sm font-bold text-emerald-400 block">
                  {currentSlide.serviceBadge}
                </span>
              </div>
              <div>
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  DELIVERED PRICE
                </span>
                <span className="text-sm font-bold text-red-400 font-mono block">
                  KES {currentSlide.priceKes.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex justify-end">
              <button
                onClick={onExploreFleet}
                className="btn-crimson !py-2.5 !px-5 w-full sm:w-auto justify-center text-xs rounded-lg font-semibold"
              >
                <span>View Full Showroom</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
