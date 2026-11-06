import React from 'react';
import { ArrowLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface StickyLocalNavProps {
  currentView: string;
  selectedVehicle: Vehicle | null;
  onNavigate: (view: string, param?: string) => void;
  onBackToInventory: () => void;
}

export const StickyLocalNav: React.FC<StickyLocalNavProps> = ({
  currentView,
  selectedVehicle,
  onNavigate,
  onBackToInventory,
}) => {
  // If viewing an individual car
  if (currentView === 'vehicle-detail' && selectedVehicle) {
    return (
      <div className="sticky top-[52px] z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a] transition-all">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBackToInventory}
              className="text-[12px] text-zinc-400 hover:text-white flex items-center gap-1 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Fleet</span>
            </button>
            <span className="text-zinc-700 shrink-0">|</span>
            <span className="font-semibold text-white text-[14px] sm:text-[18px] tracking-tight truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[320px] md:max-w-none">
              {selectedVehicle.name}
            </span>
            <span className="hidden md:inline text-[12px] text-zinc-300 bg-[#18181c] border border-[#27272a] px-2.5 py-0.5 rounded-full font-medium shrink-0">
              {selectedVehicle.stockNo}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-[15px] font-bold text-white hidden sm:inline">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20ready%20to%20reserve%20or%20inspect%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="pricing-red-pill !py-1.5 !px-3 sm:!px-4 text-[12px] sm:text-[13px] whitespace-nowrap"
            >
              <span className="hidden sm:inline">Reserve / </span>Inquire
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Section titles mapping
  const titleMap: Record<string, string> = {
    overview: 'The Alberka Prestige Collection',
    inventory: 'Verified Performance & Luxury Fleet',
    workshop: 'Alberka Certified Engineering Lab',
    'trade-in': 'Automotive Trade-In & Valuation Studio',
    about: 'The Alberka Heritage',
    locations: 'Executive Showrooms & Concierge',
    sitemap: 'Directory & Navigation Tree',
    favorites: 'Your Saved Showroom Fleet',
  };

  const currentTitle = titleMap[currentView] || 'Alberka Motors Kenya';

  return (
    <div className="sticky top-[52px] z-40 bg-[#09090b]/90 backdrop-blur-md border-b border-[#27272a]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[52px] flex items-center justify-between gap-3">
        <div className="font-semibold text-white text-[15px] sm:text-[19px] tracking-tight truncate flex items-center gap-2">
          <span className="truncate">{currentTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          {currentView !== 'workshop' && (
            <button
              onClick={() => onNavigate('workshop')}
              className="outlined-explore-pill hidden sm:inline-flex cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#ef4444]" />
              <span>Certified Warranty</span>
            </button>
          )}

          {currentView !== 'inventory' ? (
            <button
              onClick={() => onNavigate('inventory')}
              className="pricing-blue-pill cursor-pointer"
            >
              Browse Fleet
            </button>
          ) : (
            <button
              onClick={() => onNavigate('trade-in')}
              className="outlined-explore-pill cursor-pointer"
            >
              Trade-In Calculator
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
