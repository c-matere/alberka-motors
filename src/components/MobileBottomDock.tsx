import React from 'react';
import { Home, Car, Wrench, ArrowLeftRight, Heart, MessageCircle, ArrowLeft, Send } from 'lucide-react';
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
  // If user is deep inside a single vehicle's story, show conversion action dock
  if (selectedVehicle) {
    return (
      <div className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-apple-up">
        <div className="bg-[#121215]/95 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2.5 shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={onBackToInventory}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center shrink-0 cursor-pointer active:scale-95 transition-transform"
            title="Back to fleet"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[11px] text-zinc-400 block truncate">
              {selectedVehicle.name}
            </span>
            <span className="text-[14px] font-bold text-white block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20ready%20to%20reserve%20or%20inspect%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="pricing-red-pill !py-2 !px-4 text-[13px] font-semibold shrink-0 shadow-lg active:scale-95 transition-transform"
          >
            <MessageCircle className="w-4 h-4 mr-1" />
            <span>Inquire</span>
          </a>
        </div>
      </div>
    );
  }

  // Standard Mobile Thumb Dock (Home, Fleet, Workshop, Valuation, Saved, WhatsApp)
  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Fleet', icon: Car },
    { id: 'trade-in', label: 'Trade-In', icon: ArrowLeftRight },
    { id: 'workshop', label: 'Service', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden animate-apple-up">
      <div className="bg-[#121215]/95 backdrop-blur-xl border border-white/15 rounded-full px-3 py-1.5 shadow-2xl flex items-center justify-around">
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all cursor-pointer active:scale-90 ${
                isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-white/10' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-semibold text-white' : 'font-normal'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Saved Vehicles with Live Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-zinc-400 hover:text-white transition-all cursor-pointer active:scale-90 relative"
        >
          <div className="p-1 rounded-full relative">
            <Heart className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-0.5 -right-1 bg-[#dc2626] text-white text-[8px] w-3 h-3 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Saved</span>
        </button>

        {/* Direct WhatsApp Concierge */}
        <a
          href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20your%20verified%20fleet."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 px-2.5 text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-90 relative"
          title="WhatsApp Concierge"
        >
          <div className="p-1 rounded-full bg-white/5 border border-white/10 relative">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] absolute top-0.5 right-0.5 animate-pulse" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">Chat</span>
        </a>
      </div>
    </div>
  );
};
