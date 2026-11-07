import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { VehicleCard } from './VehicleCard';

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
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  // Scroll to specific slide with luxury deceleration
  const scrollToSlide = useCallback((index: number) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const slides = container.querySelectorAll<HTMLElement>('.showroom-slide');
    if (!slides[index]) return;

    isProgrammaticScroll.current = true;
    const slide = slides[index];
    const containerWidth = container.clientWidth;
    const slideWidth = slide.clientWidth;
    const scrollTarget = slide.offsetLeft - (containerWidth - slideWidth) / 2;

    container.scrollTo({
      left: Math.max(0, scrollTarget),
      behavior: 'smooth',
    });

    setActiveIndex(index);

    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 700);
  }, []);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % vehicles.length;
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + vehicles.length) % vehicles.length;
    scrollToSlide(prevIdx);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !sliderRef.current) return;
    const container = sliderRef.current;
    const slides = container.querySelectorAll<HTMLElement>('.showroom-slide');
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    slides.forEach((slide, idx) => {
      const slideCenter = slide.offsetLeft + slide.clientWidth / 2;
      const distance = Math.abs(containerCenter - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    if (!isPlaying || isUserInteracting || vehicles.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % vehicles.length;
        scrollToSlide(next);
        return next;
      });
    }, 6500);

    return () => clearInterval(timer);
  }, [isPlaying, isUserInteracting, vehicles.length, scrollToSlide]);

  return (
    <div
      className="w-full relative space-y-8"
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseLeave={() => setIsUserInteracting(false)}
    >
      {/* Editorial Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
        <div className="space-y-2">
          <span className="rr-eyebrow block">THE ATELIER RUNWAY</span>
          <h2 className="rr-title-h2 text-[26px] sm:text-[36px]">
            CURATED MARQUES READY FOR COMMISSION.
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Aristocratic Controls (0px Radius, Hairline Rose Gold) */}
          <div className="flex items-center gap-1 bg-[#0f0714] p-1 border border-[rgba(197,168,128,0.25)]">
            <button
              onClick={handlePrev}
              className="w-8 h-8 bg-transparent hover:bg-[#160a1d] text-[#c5a880] hover:text-[#dfc7a5] flex items-center justify-center transition-all cursor-pointer"
              title="Previous Marque"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 bg-transparent hover:bg-[#160a1d] text-[#c5a880] hover:text-[#dfc7a5] flex items-center justify-center transition-all cursor-pointer"
              title="Next Marque"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-8 h-8 bg-transparent hover:bg-[#160a1d] text-[#8c8a94] hover:text-[#f5f5f7] flex items-center justify-center transition-all cursor-pointer"
              title={isPlaying ? 'Pause Runway' : 'Play Runway'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>

          <button
            onClick={onViewAll}
            className="btn-rr-ghost !py-2 !px-4 !text-[11px] whitespace-nowrap cursor-pointer"
          >
            <span>ENTIRE FLEET ({vehicles.length})</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>
      </div>

      {/* The Runway Track */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-6 overflow-x-auto pb-8 pt-2 px-2 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollPaddingLeft: '24px', scrollPaddingRight: '24px', WebkitOverflowScrolling: 'touch' }}
      >
        {vehicles.map((vehicle, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={vehicle.id}
              className={`showroom-slide snap-center shrink-0 w-[88vw] sm:w-[480px] md:w-[540px] lg:w-[580px] transition-all duration-700 ease-out ${
                isActive ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-80 hover:opacity-100'
              }`}
            >
              <VehicleCard
                vehicle={vehicle}
                isFavorite={favorites.includes(vehicle.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectVehicle}
                disableScrollReveal={true}
              />
            </div>
          );
        })}
      </div>

      {/* Quiet Progress Bar & Track Indicators */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[rgba(197,168,128,0.2)] px-2">
        <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {vehicles.map((v, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={v.id}
                onClick={() => scrollToSlide(idx)}
                className={`h-[2px] transition-all duration-500 cursor-pointer ${
                  isActive
                    ? 'w-10 bg-[#c5a880]'
                    : 'w-3 bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(197,168,128,0.4)]'
                }`}
                title={`Marque ${idx + 1}: ${v.name}`}
              />
            );
          })}
        </div>

        <div className="text-[11px] font-['Cinzel'] tracking-widest text-[#8c8a94] flex items-center gap-3">
          <span className="text-[#c5a880]">{activeIndex + 1} OF {vehicles.length}</span>
          <span className="text-[rgba(197,168,128,0.4)]">//</span>
          <span className="text-[#f5f5f7] uppercase">{vehicles[activeIndex]?.name}</span>
        </div>
      </div>
    </div>
  );
};
