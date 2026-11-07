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

  // Scroll to specific slide
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
    }, 600);
  }, []);

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % vehicles.length;
    scrollToSlide(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + vehicles.length) % vehicles.length;
    scrollToSlide(prevIdx);
  };

  // Sync active slide index on scroll
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

  // Auto-play timer (advances every 5.5s unless paused or hovered)
  useEffect(() => {
    if (!isPlaying || isUserInteracting || vehicles.length <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % vehicles.length;
        scrollToSlide(next);
        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying, isUserInteracting, vehicles.length, scrollToSlide]);

  return (
    <div
      className="w-full relative space-y-6"
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseLeave={() => setIsUserInteracting(false)}
    >
      {/* Slider Header Toolbar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 px-2">
        <div>
          <span className="launch-status-label mb-2">Showroom Lineup</span>
          <h2 className="feature-heading">Featured vehicles ready for delivery.</h2>
        </div>

        <div className="flex items-center gap-3">
          {/* Navigation Chevron Pills */}
          <div className="flex items-center gap-1.5 bg-[#0f1011] p-1 rounded-[6px] border border-[#23252a]">
            <button
              onClick={handlePrev}
              className="w-7 h-7 rounded-[4px] bg-transparent hover:bg-[#161718] text-[#d0d6e0] hover:text-[#ffffff] flex items-center justify-center transition-all cursor-pointer"
              title="Previous vehicle slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="w-7 h-7 rounded-[4px] bg-transparent hover:bg-[#161718] text-[#d0d6e0] hover:text-[#ffffff] flex items-center justify-center transition-all cursor-pointer"
              title="Next vehicle slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-7 h-7 rounded-[4px] bg-transparent hover:bg-[#161718] text-[#d0d6e0] hover:text-[#ffffff] flex items-center justify-center transition-all cursor-pointer"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>
          </div>

          <button
            onClick={onViewAll}
            className="btn-ghost cursor-pointer whitespace-nowrap !py-1.5 !px-3.5"
          >
            <span>All Fleet ({vehicles.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* The Cinematic Horizontal Slides Track */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex items-stretch gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 px-3 sm:px-4 no-scrollbar snap-x snap-mandatory scroll-smooth"
        style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px', WebkitOverflowScrolling: 'touch' }}
      >
        {vehicles.map((vehicle, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={vehicle.id}
              className={`showroom-slide snap-center shrink-0 w-[86vw] sm:w-[480px] md:w-[540px] lg:w-[580px] transition-[transform,opacity] duration-350 ease-out ${
                isActive ? 'scale-100 opacity-100' : 'scale-[0.98] opacity-85 hover:opacity-100'
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

      {/* Bottom Progress Indicator Bar & Direct Pagination Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#23252a] px-2">
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 no-scrollbar">
          {vehicles.map((v, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={v.id}
                onClick={() => scrollToSlide(idx)}
                className={`h-1 rounded-[2px] transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-7 bg-[#e4f222]'
                    : 'w-2 bg-[#23252a] hover:bg-[#383b3f]'
                }`}
                title={`Slide ${idx + 1}: ${v.name}`}
              />
            );
          })}
        </div>

        <div className="text-[12px] text-[#8a8f98] font-mono flex items-center gap-2">
          <span>{activeIndex + 1} / {vehicles.length}</span>
          <span>·</span>
          <span className="text-[#ffffff] font-sans font-normal">{vehicles[activeIndex]?.name}</span>
        </div>
      </div>
    </div>
  );
};
