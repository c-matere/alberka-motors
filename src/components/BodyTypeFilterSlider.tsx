import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AllFleetIcon } from './icons/CategoryIcons';

export interface BodyTypeOption {
  id: string;
  name: string;
  iconSrc?: string;
}

export const BODY_TYPE_OPTIONS: BodyTypeOption[] = [
  { id: 'all', name: 'All Fleet' },
  { id: 'suv', name: 'SUV', iconSrc: '/icons/body-types/suv.svg' },
  { id: 'van', name: 'Van', iconSrc: '/icons/body-types/van.svg' },
  { id: 'sedan', name: 'Sedan', iconSrc: '/icons/body-types/sedan.svg' },
  { id: 'hatchback', name: 'Hatchback', iconSrc: '/icons/body-types/hatchback.svg' },
  { id: 'wagon', name: 'Wagon', iconSrc: '/icons/body-types/wagon.svg' },
  { id: 'mini-van', name: 'Mini Van', iconSrc: '/icons/body-types/mini-van.svg' },
  { id: 'pick-up', name: 'Pick up', iconSrc: '/icons/body-types/pick-up.svg' },
  { id: 'truck', name: 'Truck', iconSrc: '/icons/body-types/truck.svg' },
  { id: 'convertible', name: 'Convertible', iconSrc: '/icons/body-types/convertible.svg' },
  { id: 'coupe', name: 'Coupe', iconSrc: '/icons/body-types/coupe.svg' },
  { id: 'bus', name: 'Bus', iconSrc: '/icons/body-types/bus.svg' },
  { id: 'heavy-equipment', name: 'Heavy Equipment', iconSrc: '/icons/body-types/heavy-equipment.svg' },
];

interface BodyTypeFilterSliderProps {
  activeBodyType: string;
  onSelectBodyType: (bodyTypeId: string) => void;
  localCounts?: Record<string, number>;
  className?: string;
}

export const BodyTypeFilterSlider: React.FC<BodyTypeFilterSliderProps> = ({
  activeBodyType,
  onSelectBodyType,
  localCounts = {},
  className = '',
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className={`relative w-full group/slider ${className}`}>
      {/* Scroll Left Button */}
      <button
        onClick={() => scroll('left')}
        type="button"
        aria-label="Scroll left"
        className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#ebebeb] text-[#222222] hover:text-black shadow-xs items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Body Types Horizontal Track — Airbnb Category Tab Strip */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-1 pt-1 px-2 scroll-smooth no-scrollbar border-b border-[#ebebeb]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BODY_TYPE_OPTIONS.map((bt) => {
          const isSelected = activeBodyType === bt.id;
          const realCount = localCounts[bt.id] ?? 0;

          return (
            <button
              key={bt.id}
              onClick={() => onSelectBodyType(bt.id)}
              className={`shrink-0 flex flex-col items-center justify-center gap-1.5 pb-2.5 pt-1 text-center cursor-pointer transition-all border-b-2 select-none group min-w-[64px] sm:min-w-[76px] ${
                isSelected
                  ? 'border-[#222222] text-[#222222] opacity-100'
                  : 'border-transparent text-[#6a6a6a] hover:text-[#222222] hover:border-[#dddddd] opacity-75 hover:opacity-100'
              }`}
              id={`used-carsBrowsbyType_${bt.id}`}
            >
              {/* Body Type SVG Silhouette */}
              <div className="w-7 h-5 flex items-center justify-center transition-transform group-hover:scale-105">
                {bt.iconSrc ? (
                  <img
                    src={bt.iconSrc}
                    alt={bt.name}
                    className={`w-full h-full object-contain filter ${
                      isSelected ? 'brightness-0' : 'brightness-50 group-hover:brightness-0'
                    }`}
                  />
                ) : (
                  <AllFleetIcon className={`w-5 h-5 ${isSelected ? 'text-[#222222]' : 'text-[#6a6a6a] group-hover:text-[#222222]'}`} />
                )}
              </div>

              {/* Body Type Info */}
              <span className={`text-[12px] font-medium leading-tight whitespace-nowrap ${isSelected ? 'font-semibold text-[#222222]' : 'text-[#6a6a6a] group-hover:text-[#222222]'}`}>
                {bt.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        type="button"
        aria-label="Scroll right"
        className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#ebebeb] text-[#222222] hover:text-black shadow-xs items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
