import React from 'react';
import { Compass, Car, Wrench, ArrowLeftRight, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface MobileBottomDockProps {
  currentView: string;
  selectedVehicle: Vehicle | null;
  onNavigate: (view: string) => void;
  onBackToInventory: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentView,
  selectedVehicle,
  onNavigate,
  onBackToInventory,
  favoritesCount,
  onOpenFavorites,
}) => {
  // If user is viewing a single vehicle story, show conversion dock
  if (selectedVehicle) {
    return (
      <div className="fixed bottom-2 inset-x-2 z-40 md:hidden">
        <div className="bg-[#0f0714]/95 backdrop-blur-xl border border-[rgba(197,168,128,0.35)] px-4 py-2.5 flex items-center justify-between gap-3">
          <button
            onClick={onBackToInventory}
            className="w-8 h-8 bg-[#160a1d] border border-[rgba(197,168,128,0.25)] text-[#dfc7a5] flex items-center justify-center shrink-0 cursor-pointer"
            title="Back to fleet"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="font-['Cinzel'] text-[10px] text-[#c5a880] block truncate uppercase">
              {selectedVehicle.name}
            </span>
            <span className="font-mono text-[12.5px] text-[#f5f5f7] block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20reserve%20a%20private%20inspection%20for%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-rr-solid !py-2 !px-3 !text-[9.5px] whitespace-nowrap shrink-0"
          >
            <MessageCircle className="w-3 h-3 mr-1" />
            <span>INQUIRE</span>
          </a>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'SANCTUARY', icon: Compass },
    { id: 'inventory', label: 'THE FLEET', icon: Car },
    { id: 'trade-in', label: 'COMMISSION', icon: ArrowLeftRight },
    { id: 'workshop', label: 'ATELIER', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-2 inset-x-2 z-40 md:hidden">
      <div className="bg-[#0f0714]/95 backdrop-blur-xl border border-[rgba(197,168,128,0.3)] px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 transition-all cursor-pointer ${
                isActive ? 'text-[#dfc7a5]' : 'text-[#8c8a94] hover:text-[#f5f5f7]'
              }`}
            >
              <div className={`p-1 ${isActive ? 'text-[#c5a880]' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`font-['Cinzel'] text-[8.5px] tracking-wider uppercase mt-0.5 ${isActive ? 'text-[#dfc7a5] font-medium' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Curated Dossier with Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2 text-[#8c8a94] hover:text-[#f5f5f7] transition-all cursor-pointer relative"
        >
          <div className="p-1 relative">
            <Bookmark className="w-4 h-4 text-[#8c8a94]" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-[#c5a880] text-[#0f0714] text-[8px] font-mono w-3 h-3 flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="font-['Cinzel'] text-[8.5px] tracking-wider uppercase mt-0.5">DOSSIER</span>
        </button>

        {/* Whispers Chat */}
        <a
          href="https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20inquire%20regarding%20the%20fleet."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2 text-[#8c8a94] hover:text-[#f5f5f7] transition-all cursor-pointer relative"
          title="Whispers Concierge"
        >
          <div className="p-1 relative">
            <MessageCircle className="w-4 h-4 text-[#c5a880]" />
          </div>
          <span className="font-['Cinzel'] text-[8.5px] tracking-wider uppercase mt-0.5 text-[#c5a880]">WHISPERS</span>
        </a>
      </div>
    </div>
  );
};
