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
      <div className="sticky top-[56px] z-40 bg-[#08090a]/90 backdrop-blur-md border-b border-[#23252a] transition-all">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[48px] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={onBackToInventory}
              className="text-[12px] text-[#8a8f98] hover:text-[#ffffff] flex items-center gap-1 cursor-pointer shrink-0 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Fleet</span>
            </button>
            <span className="text-[#383b3f] shrink-0">/</span>
            <span className="font-normal text-[#ffffff] text-[13px] sm:text-[14px] tracking-tight truncate max-w-[130px] xs:max-w-[180px] sm:max-w-[320px] md:max-w-none">
              {selectedVehicle.name}
            </span>
            <span className="hidden md:inline text-[11px] text-[#8a8f98] bg-[#0f1011] border border-[#23252a] px-2 py-0.5 rounded-[4px] font-mono shrink-0">
              {selectedVehicle.stockNo}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <span className="text-[14px] font-mono text-[#ffffff] hidden sm:inline">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20ready%20to%20reserve%20or%20inspect%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !py-1.5 !px-3.5 text-[12px] whitespace-nowrap"
            >
              <span>Inquire / Reserve</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Section titles mapping
  const titleMap: Record<string, string> = {
    overview: 'The Alberka Prestige Collection',
    inventory: 'Verified Japanese Fleet',
    workshop: 'In-House Mechanical Facility',
    'trade-in': 'Valuation & Trade Exchange',
    about: 'The Alberka Heritage',
    locations: 'Mombasa & Nairobi Hubs',
    sitemap: 'Directory & Navigation Tree',
    favorites: 'Saved Showroom Fleet',
  };

  const currentTitle = titleMap[currentView] || 'Alberka Motors Kenya';

  return (
    <div className="hidden sm:block sticky top-[56px] z-40 bg-[#08090a]/90 backdrop-blur-md border-b border-[#23252a]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[48px] flex items-center justify-between gap-3">
        <div className="font-normal text-[#ffffff] text-[14px] tracking-tight truncate flex items-center gap-2">
          <span className="truncate">{currentTitle}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {currentView !== 'workshop' && (
            <button
              onClick={() => onNavigate('workshop')}
              className="btn-ghost hidden sm:inline-flex cursor-pointer !py-1.5 !px-3 !text-[12px]"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8a8f98]" />
              <span>Certified Warranty</span>
            </button>
          )}

          {currentView !== 'inventory' ? (
            <button
              onClick={() => onNavigate('inventory')}
              className="btn-primary cursor-pointer !py-1.5 !px-3.5 !text-[12px]"
            >
              Browse Fleet
            </button>
          ) : (
            <button
              onClick={() => onNavigate('trade-in')}
              className="btn-ghost cursor-pointer !py-1.5 !px-3 !text-[12px]"
            >
              Trade-In Calculator
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
