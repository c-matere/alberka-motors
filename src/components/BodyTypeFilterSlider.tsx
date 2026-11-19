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
        className="hidden md:flex absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200/90 text-zinc-700 hover:text-zinc-950 shadow-md items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Body Types Horizontal Track */}
      <div
        ref={scrollRef}
        className="car-choose__category-inner -brands footer__main-slider -js-accordion-slider flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 px-1 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {BODY_TYPE_OPTIONS.map((bt) => {
          const isSelected = activeBodyType === bt.id;
          const realCount = localCounts[bt.id] ?? 0;

          return (
            <button
              key={bt.id}
              onClick={() => onSelectBodyType(bt.id)}
              className={`car-choose__category-item shrink-0 flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-left cursor-pointer group select-none min-w-[130px] sm:min-w-[155px] ${
                isSelected
                  ? 'bg-red-50/90 border-red-500 shadow-xs ring-1 ring-red-500/30'
                  : 'bg-white hover:bg-zinc-50/90 border-zinc-200/80 hover:border-zinc-300 shadow-2xs'
              }`}
              id={`used-carsBrowsbyType_${bt.id}`}
            >
              {/* Body Type SVG Silhouette */}
              <div
                className={`car-choose__category-image w-11 h-9 sm:w-12 sm:h-10 rounded-lg flex items-center justify-center shrink-0 p-1 transition-colors ${
                  isSelected
                    ? 'bg-red-600/10 border border-red-200'
                    : 'bg-zinc-100/80 border border-zinc-200/60 group-hover:bg-zinc-100'
                }`}
              >
                {bt.iconSrc ? (
                  <img
                    src={bt.iconSrc}
                    alt={bt.name}
                    className={`w-full h-full object-contain transition-transform duration-200 ${
                      isSelected ? 'scale-105' : 'group-hover:scale-105'
                    }`}
                  />
                ) : (
                  <AllFleetIcon className={`w-5 h-5 ${isSelected ? 'text-red-600' : 'text-zinc-600'}`} />
                )}
              </div>

              {/* Body Type Info */}
              <div className="car-choose__category-info min-w-0 flex-1">
                <p
                  className={`car-choose__category-name text-xs sm:text-[13px] font-bold leading-snug truncate ${
                    isSelected ? 'text-red-700' : 'text-zinc-900 group-hover:text-zinc-950'
                  }`}
                >
                  {bt.name}
                </p>
                <p
                  className={`car-other-category-count car-choose__category-items text-[10.5px] font-mono leading-none mt-1 truncate ${
                    isSelected ? 'text-red-600 font-bold' : 'text-zinc-500'
                  }`}
                  data-type={bt.id}
                >
                  ({realCount})
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      <button
        onClick={() => scroll('right')}
        type="button"
        aria-label="Scroll right"
        className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-zinc-200/90 text-zinc-700 hover:text-zinc-950 shadow-md items-center justify-center transition-all opacity-80 hover:opacity-100 hover:scale-105 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
