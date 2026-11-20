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
  icon: React.FC<{ className?: string }>;
}

export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: 'all', name: 'All Fleet', icon: AllFleetIcon },
  { id: 'hybrid', name: 'Hybrid', icon: HybridIcon },
  { id: '4wd', name: '4WD / AWD', icon: FourWdIcon },
  { id: 'kei', name: 'Kei Cars', icon: KeiCarIcon },
  { id: 'diesel', name: 'Diesel', icon: DieselIcon },
  { id: 'sunroof', name: 'Sunroof', icon: SunroofIcon },
  { id: 'manual', name: 'Manual', icon: ManualIcon },
  { id: 'electric', name: 'Electric Vehicles', icon: ElectricIcon },
  { id: 'lhd', name: 'Left Hand Drive', icon: LhdIcon },
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
        className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-[#ebebeb] text-[#222222] hover:text-black shadow-xs items-center justify-center transition-all opacity-90 hover:opacity-100 hover:scale-105 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {/* Categories Horizontal Track — Airbnb Category Tab Strip */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto pb-1 pt-1 px-2 scroll-smooth no-scrollbar border-b border-[#ebebeb]"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CATEGORY_OPTIONS.map((cat) => {
          const isSelected = activeCategory === cat.id;
          const Icon = cat.icon;
          const realCount = localCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`shrink-0 flex flex-col items-center justify-center gap-1.5 pb-2.5 pt-1 text-center cursor-pointer transition-all border-b-2 select-none group min-w-[70px] sm:min-w-[80px] ${
                isSelected
                  ? 'border-[#222222] text-[#222222] opacity-100'
                  : 'border-transparent text-[#6a6a6a] hover:text-[#222222] hover:border-[#dddddd] opacity-75 hover:opacity-100'
              }`}
              id={`used-carsBrowsbyCate_${cat.id}`}
            >
              {/* Category SVG Icon */}
              <div className="w-6 h-6 flex items-center justify-center transition-transform group-hover:scale-105">
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#222222]' : 'text-[#6a6a6a] group-hover:text-[#222222]'}`} />
              </div>

              {/* Category Label */}
              <span className={`text-[12px] font-medium leading-tight whitespace-nowrap ${isSelected ? 'font-semibold text-[#222222]' : 'text-[#6a6a6a] group-hover:text-[#222222]'}`}>
                {cat.name}
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
