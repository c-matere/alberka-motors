import React from 'react';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
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
      <div className="sticky top-[72px] z-30 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={onBackToInventory}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Cars</span>
            </button>
            <span className="text-zinc-600 shrink-0">/</span>
            <span className="text-xs font-semibold text-white truncate">
              {selectedVehicle.name}
            </span>
            <span className="hidden md:inline font-mono text-[11px] text-zinc-400 border border-zinc-800 rounded px-1.5 py-0.5 shrink-0">
              {selectedVehicle.stockNo}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] text-zinc-400">Delivered Price</span>
              <span className="font-mono text-xs font-bold text-red-400">
                KES {selectedVehicle.priceKes.toLocaleString()}
              </span>
            </div>
            <a
              href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors.%20I%20would%20like%20to%20view%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crimson !py-1.5 !px-3 !text-xs !rounded"
            >
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Section titles mapping in simple language
  const titleMap: Record<string, { kicker: string; title: string }> = {
    overview: { kicker: 'Overview', title: 'Quality Japanese Cars' },
    inventory: { kicker: 'Showroom', title: 'Cars Available Now' },
    workshop: { kicker: 'Mombasa Workshop', title: '100-Point Inspection & 5,000 KM Warranty' },
    'trade-in': { kicker: 'Trade-In', title: 'Fair Appraisals & Instant Upgrades' },
    about: { kicker: 'About Us', title: '26 Years of Trust in Kenya' },
    locations: { kicker: 'Showrooms', title: 'Mombasa & Nairobi Locations' },
    sitemap: { kicker: 'Directory', title: 'Quick Links' },
  };

  const info = titleMap[currentView] || { kicker: 'Alberka Motors', title: 'Quality Japanese Cars' };

  return (
    <div className="hidden sm:block sticky top-[72px] z-30 bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-red-500 font-semibold">{info.kicker}</span>
          <span className="text-zinc-600">•</span>
          <span className="text-zinc-300 font-medium truncate">{info.title}</span>
        </div>

        <div className="flex items-center gap-3">
          {currentView !== 'workshop' && (
            <button
              onClick={() => onNavigate('workshop')}
              className="text-xs text-zinc-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
              <span>5,000 KM Warranty</span>
            </button>
          )}

          {currentView !== 'inventory' && (
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs text-red-400 hover:text-red-300 font-medium cursor-pointer"
            >
              View All Cars →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
