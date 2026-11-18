import React, { useState, useEffect, useCallback } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { createPortal } from 'react-dom';
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
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHeroLightboxOpen, setIsHeroLightboxOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const SLIDE_INTERVAL = 5000;
  const currentSlide = FLAGSHIP_SLIDES[activeSlideIdx];

  const handleNext = useCallback(() => {
    setActiveSlideIdx((prev) => (prev + 1) % FLAGSHIP_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setActiveSlideIdx((prev) => (prev - 1 + FLAGSHIP_SLIDES.length) % FLAGSHIP_SLIDES.length);
  }, []);

  const handleSelectSlide = (idx: number) => {
    if (idx === activeSlideIdx) {
      window.location.hash = `#car-${FLAGSHIP_SLIDES[idx].id}`;
    } else {
      setActiveSlideIdx(idx);
    }
  };

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

  // Body scroll lock during fullscreen lightbox
  useEffect(() => {
    if (isHeroLightboxOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isHeroLightboxOpen]);

  // Automatic slide transition
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [isPlaying, handleNext]);

  return (
    <section className="figma-carousel-section relative w-full pt-4 sm:pt-8 pb-12 sm:pb-16 text-center text-zinc-900 overflow-hidden">
      
      {/* Top Header Presentation */}
      <div className="figma-carousel-top max-w-[1240px] mx-auto px-4 mb-4 sm:mb-6">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 tracking-tight leading-[1.15]">
          {pageData?.heroTitle || 'Japanese Provenance. Direct Showroom Fleet.'}
        </h1>
        {pageData?.heroSubtitle && (
          <p className="max-w-[600px] mx-auto text-zinc-600 text-xs sm:text-sm mt-2 sm:mt-2.5 font-normal leading-relaxed">
            {pageData.heroSubtitle}
          </p>
        )}
      </div>

      {/* 3D Cover Flow Viewport (1:1 Pats Motor World Standard with Red Accents) */}
      <div 
        className="figma-carousel-viewport" 
        role="region" 
        aria-roledescription="carousel" 
        aria-label="Vehicle showcase carousel"
        style={{ cursor: 'grab', touchAction: 'pan-y', userSelect: 'none' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="figma-carousel-track">
          {FLAGSHIP_SLIDES.map((slide, idx) => {
            const offset = idx - activeSlideIdx;
            const total = FLAGSHIP_SLIDES.length;
            const isActive = offset === 0;

            let transformStr = '';
            let zIndexVal = 0;
            let opacityVal = 0;
            let pointerEventsVal: 'auto' | 'none' = 'none';

            if (offset === 0) {
              transformStr = 'translateX(0px) scale(1.15)';
              zIndexVal = 10;
              opacityVal = 1;
              pointerEventsVal = 'auto';
            } else if (offset === -1) {
              transformStr = 'translateX(calc(-1 * var(--figma-slide-offset, 480px) + -1 * var(--figma-slide-overlap, 0px))) scale(0.8)';
              zIndexVal = 5;
              opacityVal = 1;
              pointerEventsVal = 'auto';
            } else if (offset === 1) {
              transformStr = 'translateX(calc(1 * var(--figma-slide-offset, 480px) + 1 * var(--figma-slide-overlap, 0px))) scale(0.8)';
              zIndexVal = 5;
              opacityVal = 1;
              pointerEventsVal = 'auto';
            } else if (offset === -2) {
              transformStr = 'translateX(calc(-2 * var(--figma-slide-offset, 480px) + -1 * var(--figma-slide-overlap-far, -80px))) scale(0.65)';
              zIndexVal = 1;
              opacityVal = 1;
              pointerEventsVal = 'auto';
            } else if (offset === 2) {
              transformStr = 'translateX(calc(2 * var(--figma-slide-offset, 480px) + 1 * var(--figma-slide-overlap-far, -80px))) scale(0.65)';
              zIndexVal = 1;
              opacityVal = 1;
              pointerEventsVal = 'auto';
            } else {
              transformStr = `translateX(calc(${offset} * var(--figma-slide-offset, 480px) + ${Math.sign(offset)} * var(--figma-slide-overlap-far, -80px))) scale(0.65)`;
              zIndexVal = 0;
              opacityVal = 0;
              pointerEventsVal = 'none';
            }

            return (
              <div
                key={slide.id}
                className={`figma-slide ${isActive ? 'active' : ''}`}
                role="group"
                aria-roledescription="slide"
                aria-hidden={!isActive}
                aria-label={`Slide ${idx + 1} of ${total}: ${slide.name}`}
                style={{
                  transform: transformStr,
                  zIndex: zIndexVal,
                  opacity: opacityVal,
                  pointerEvents: pointerEventsVal,
                }}
                onClick={() => handleSelectSlide(idx)}
              >
                <div className="figma-slide-inner">
                  <img
                    alt={slide.name}
                    className="figma-slide-img"
                    loading="lazy"
                    src={slide.imageUrl}
                  />
                  <div className="figma-slide-overlay" />
                  <div className="figma-slide-content">
                    <h3 className="figma-slide-title">{slide.year} {slide.name}</h3>
                    <p className="figma-slide-label">
                      {slide.category} · Available · KES {slide.priceKes.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Centered Controls Stack: Counter on top + 3 Round Buttons */}
      <div className="figma-carousel-controls">
        <span className="figma-carousel-counter" aria-live="polite">
          <span className="figma-counter-status">{`Slide ${activeSlideIdx + 1} of ${FLAGSHIP_SLIDES.length}`}</span>
          <span aria-hidden="true">{`${activeSlideIdx + 1} of ${FLAGSHIP_SLIDES.length}`}</span>
        </span>

        <div className="figma-controls-group" role="group" aria-label="Slide controls">
          <button 
            type="button" 
            className="figma-nav-btn" 
            aria-label="Previous slide"
            onClick={handlePrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="M11.478 4.25 4 12l7.478 7.75.733-.709L5.91 12.51H20v-1.02H5.91l6.301-6.531z" clipRule="evenodd" />
            </svg>
          </button>

          <button 
            type="button" 
            className="figma-pause-btn" 
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" className="figma-pause-ring">
              <circle cx="18" cy="18" r="17.5" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
              <circle 
                cx="18" 
                cy="18" 
                r="17" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeDasharray="106.8" 
                className="figma-pause-progress"
                style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} 
              />
            </svg>
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 14" className="figma-pause-icon">
                <path fill="currentColor" d="M9.91 0h6.1v13.71h-6.1zM0 0h6.1v13.71H0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="figma-pause-icon" style={{ marginLeft: '2px' }}>
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
            )}
          </button>

          <button 
            type="button" 
            className="figma-nav-btn" 
            aria-label="Next slide"
            onClick={handleNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path fill="currentColor" fillRule="evenodd" d="M12.522 4.25 20 12l-7.478 7.75-.733-.709 6.302-6.531H4v-1.02h14.09L11.79 4.959z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bottom Description & Decisive Action CTA */}
      <div className="figma-carousel-bottom">
        <p className="figma-carousel-description">
          From luxury executive crossovers to rugged symmetrical AWDs and ultra-efficient vans — browse, compare verified auction sheets, and drive away with confidence from Mombasa.
        </p>
        <div className="flex flex-row items-center justify-center gap-3 pt-5">
          <button
            onClick={onExploreFleet}
            className="py-3 px-7 text-xs sm:text-sm rounded-full font-bold bg-red-600 hover:bg-red-700 text-white shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 cursor-pointer"
          >
            <span>{pageData?.ctaText || 'Explore Available Fleet'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={onExploreWorkshop}
            className="py-3 px-6 text-xs sm:text-sm rounded-full font-semibold text-zinc-700 hover:text-zinc-950 border border-zinc-200 hover:border-zinc-300 bg-white transition-all inline-flex items-center gap-2 cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
          >
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>Our Workshop Standard</span>
          </button>
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
            <img
              src={currentSlide.imageUrl}
              alt={currentSlide.name}
              className="max-h-full max-w-full w-auto h-auto object-contain rounded-xl shadow-2xl pointer-events-none"
            />

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
                window.location.hash = `#car-${currentSlide.id}`;
              }}
              className="bg-red-600 hover:bg-red-700 text-white !py-2.5 !px-5 text-xs font-bold rounded-lg cursor-pointer inline-flex items-center gap-1.5 shadow-md transition-all hover:scale-105 active:scale-95"
            >
              <span>View Full Vehicle Story</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
};
