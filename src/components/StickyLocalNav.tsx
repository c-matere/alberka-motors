import React from 'react';
import { ArrowLeft, ShieldCheck, Compass } from 'lucide-react';
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
  // If viewing an individual marquee
  if (currentView === 'vehicle-detail' && selectedVehicle) {
    return (
      <div className="sticky top-[64px] z-40 bg-[#0f0714]/92 backdrop-blur-md border-b border-[rgba(197,168,128,0.2)] transition-all">
        <div className="max-w-[1500px] mx-auto px-6 h-[50px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToInventory}
              className="font-['Cinzel'] text-[11px] tracking-[0.2em] text-[#8c8a94] hover:text-[#dfc7a5] flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>THE FLEET</span>
            </button>
            <span className="text-[rgba(197,168,128,0.3)] shrink-0">/</span>
            <span className="font-['Cinzel'] text-[12px] tracking-[0.16em] text-[#f5f5f7] truncate">
              {selectedVehicle.name}
            </span>
            <span className="hidden md:inline font-mono text-[10px] tracking-wider text-[#c5a880] border border-[rgba(197,168,128,0.3)] px-2 py-0.5 shrink-0">
              {selectedVehicle.stockNo}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[9px] font-['Cinzel'] tracking-[0.2em] text-[#8c8a94]">ACQUISITION VALUE</span>
              <span className="font-mono text-[13px] text-[#f5f5f7]">
                KES {selectedVehicle.priceKes.toLocaleString()}
              </span>
            </div>
            <a
              href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20reserve%20a%20private%20inspection%20for%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-solid !py-2 !px-4 !text-[10px]"
            >
              <span>ACQUIRE / RESERVE</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Section titles mapping in aristocratic vocabulary
  const titleMap: Record<string, { kicker: string; title: string }> = {
    overview: { kicker: 'SANCTUARY CHAPTER', title: 'THE ALBERKA PRESTIGE MANIFESTO' },
    inventory: { kicker: 'CURATED FLEET', title: 'VERIFIED JAPANESE MARQUES' },
    workshop: { kicker: 'TANGANA ROAD ATELIER', title: 'MASTER MECHANICAL COMMISSIONING' },
    'trade-in': { kicker: 'BESPOKE EXCHANGE', title: 'VEHICLE APPRAISAL & UPGRADE' },
    about: { kicker: 'TWENTY-SIX YEAR HERITAGE', title: 'THE PROVENANCE OF ALBERKA MOTORS' },
    locations: { kicker: 'THE PRIVATE SUITES', title: 'MOMBASA ATELIER & NAIROBI SUITE' },
    sitemap: { kicker: 'HOUSE DIRECTORY', title: 'ARCHITECTURAL NAVIGATION COMPENDIUM' },
  };

  const info = titleMap[currentView] || { kicker: 'ALBERKA MOTORS', title: 'HOUSE OF BESPOKE MARQUES' };

  return (
    <div className="hidden sm:block sticky top-[64px] z-40 bg-[#0f0714]/92 backdrop-blur-md border-b border-[rgba(197,168,128,0.15)]">
      <div className="max-w-[1500px] mx-auto px-6 h-[48px] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-['Cinzel'] text-[10px] tracking-[0.25em] text-[#c5a880] hidden md:inline">
            {info.kicker}
          </span>
          <span className="text-[rgba(197,168,128,0.3)] hidden md:inline">//</span>
          <span className="font-['Cinzel'] text-[12px] tracking-[0.16em] text-[#f5f5f7] truncate">
            {info.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {currentView !== 'workshop' && (
            <button
              onClick={() => onNavigate('workshop')}
              className="btn-rr-ghost !py-1.5 !px-3.5 !text-[10px] hidden md:inline-flex"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>5,000 KM COVENANT</span>
            </button>
          )}

          {currentView !== 'inventory' ? (
            <button
              onClick={() => onNavigate('inventory')}
              className="btn-rr-solid !py-1.5 !px-4 !text-[10px] cursor-pointer"
            >
              <span>EXPLORE THE FLEET</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('trade-in')}
              className="btn-rr-ghost !py-1.5 !px-4 !text-[10px] cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>COMMISSION APPRAISAL</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
