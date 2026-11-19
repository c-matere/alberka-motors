import React, { useRef } from 'react';
import { 
  HybridIcon, 
  LhdIcon, 
  ManualIcon, 
  FourWdIcon, 
  ElectricIcon, 
  SunroofIcon, 
  DieselIcon, 
  KeiCarIcon, 
  AllFleetIcon 
} from './icons/CategoryIcons';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryOption {
  id: string;
  name: string;
  count: string;
  icon: React.FC<{ className?: string }>;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'all', name: 'All Fleet', count: '(All Stock)', icon: AllFleetIcon },
  { id: 'hybrid', name: 'Hybrid', count: '(43,153)', icon: HybridIcon },
  { id: 'lhd', name: 'Left Hand Drive', count: '(87,356)', icon: LhdIcon },
  { id: 'manual', name: 'Manual', count: '(27,378)', icon: ManualIcon },
  { id: '4wd', name: '4WD', count: '(79,294)', icon: FourWdIcon },
  { id: 'electric', name: 'Electric Vehicles', count: '(1,111)', icon: ElectricIcon },
  { id: 'sunroof', name: 'Sunroof', count: '(41,030)', icon: SunroofIcon },
  { id: 'diesel', name: 'Diesel', count: '(65,618)', icon: DieselIcon },
  { id: 'kei', name: 'Kei Cars', count: '(46,061)', icon: KeiCarIcon },
];

interface CategoryFilterSliderProps {
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
  localCounts?: Record<string, number>;
  className?: string;
}

export const CategoryFilterSlider: React.FC<CategoryFilterSliderProps> = ({
  activeCategory,
  onSelectCategory,
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

      {/* Categories Horizontal Track */}
      <div
        ref={scrollRef}
        className="car-choose__category-inner -brands footer__main-slider -js-accordion-slider flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto pb-2 pt-1 px-1 scroll-smooth no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const Icon = cat.icon;
          const localCount = localCounts[cat.id];

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`car-choose__category-item shrink-0 flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all text-left cursor-pointer group select-none min-w-[130px] sm:min-w-[155px] ${
                isSelected
                  ? 'bg-red-50/90 border-red-500 shadow-xs ring-1 ring-red-500/30'
                  : 'bg-white hover:bg-zinc-50/90 border-zinc-200/80 hover:border-zinc-300 shadow-2xs'
              }`}
              id={`used-carsBrowsbyCate_${cat.id}`}
            >
              {/* Category SVG Icon */}
              <div
                className={`car-choose__category-image w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-2xs'
                    : 'bg-zinc-100/80 text-zinc-600 group-hover:text-zinc-900 group-hover:bg-zinc-100'
                }`}
              >
                <Icon className="w-6 h-6" />
              </div>

              {/* Category Info */}
              <div className="car-choose__category-info min-w-0 flex-1">
                <p
                  className={`car-choose__category-name text-xs sm:text-[13px] font-bold leading-snug truncate ${
                    isSelected ? 'text-red-700' : 'text-zinc-900 group-hover:text-zinc-950'
                  }`}
                >
                  {cat.name}
                </p>
                <p
                  className={`car-other-category-count car-choose__category-items text-[10.5px] font-mono leading-none mt-1 truncate ${
                    isSelected ? 'text-red-600 font-semibold' : 'text-zinc-500'
                  }`}
                  data-type={cat.id}
                >
                  {typeof localCount === 'number' && localCount > 0
                    ? `(${localCount} in stock)`
                    : cat.count}
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
