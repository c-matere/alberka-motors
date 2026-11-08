import React from 'react';
import { Home, Car, Wrench, ArrowLeftRight, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react';
import { Vehicle } from '../data/vehicles';
import { BlogPost } from '../data/blogs';

interface MobileBottomDockProps {
  currentView: string;
  selectedVehicle: Vehicle | null;
  selectedBlogPost?: BlogPost | null;
  onNavigate: (view: string) => void;
  onBackToInventory: () => void;
  onBackToJournal?: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenWhispers?: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  currentView,
  selectedVehicle,
  selectedBlogPost,
  onNavigate,
  onBackToInventory,
  onBackToJournal,
  favoritesCount,
  onOpenFavorites,
  onOpenWhispers,
}) => {
  // If user is viewing a single vehicle story, show simple conversion dock
  if (selectedVehicle) {
    return (
      <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
        <div className="bg-[#0c0c0f]/95 backdrop-blur-xl border border-white/[0.12] rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <button
            onClick={onBackToInventory}
            className="w-9 h-9 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-800"
            title="Back to cars"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-white block truncate">
              {selectedVehicle.name}
            </span>
            <span className="font-mono text-[13px] font-bold text-white block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors.%20I%20am%20interested%20in%20the%20${encodeURIComponent(selectedVehicle.name)}%20(${selectedVehicle.stockNo}).`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white !py-2 !px-3.5 !text-[12px] !rounded-md whitespace-nowrap shrink-0 flex items-center font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      </div>
    );
  }

  // If user is viewing a single blog article, show dedicated journal dock
  if (selectedBlogPost) {
    return (
      <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
        <div className="bg-[#0c0c0f]/95 backdrop-blur-xl border border-white/[0.12] rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <button
            onClick={onBackToJournal}
            className="w-9 h-9 bg-zinc-900 border border-zinc-700 text-zinc-300 rounded-lg flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-800"
            title="Back to Journal"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-white block truncate">
              {selectedBlogPost.title}
            </span>
            <span className="font-mono text-[11px] text-zinc-400 block leading-tight">
              {selectedBlogPost.category} · {selectedBlogPost.readTime}
            </span>
          </div>

          <a
            href={`https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20reading%20'${encodeURIComponent(selectedBlogPost.title)}'%20and%20would%20like%20to%20consult%20your%20team.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white !py-2 !px-3.5 !text-[12px] !rounded-md whitespace-nowrap shrink-0 flex items-center font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Consult</span>
          </a>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Cars', icon: Car },
    { id: 'trade-in', label: 'Trade-In', icon: ArrowLeftRight },
    { id: 'workshop', label: 'Workshop', icon: Wrench },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="bg-[#0c0c0f]/95 backdrop-blur-xl border border-white/[0.12] rounded-2xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 transition-all cursor-pointer rounded-lg ${
                isActive ? 'text-white font-semibold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              <div className="p-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-white font-semibold' : 'text-zinc-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Saved Cars with Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-zinc-400 hover:text-white transition-all cursor-pointer relative"
        >
          <div className="p-0.5 relative">
            <Bookmark className="w-4 h-4 text-zinc-400" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-white text-zinc-950 text-[9px] font-mono w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5 text-zinc-400">Saved</span>
        </button>

        {/* Contact WhatsApp */}
        <button
          onClick={() => {
            if (onOpenWhispers) onOpenWhispers();
            else window.open('https://wa.me/254714333888?text=Hello%20Alberka%20Motors.%20I%20would%20like%20more%20details%20about%20your%20cars.', '_blank');
          }}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-zinc-400 hover:text-white transition-all cursor-pointer relative"
          title="Contact Alberka"
        >
          <div className="p-0.5 relative">
            <MessageCircle className="w-4 h-4 text-zinc-300" />
          </div>
          <span className="text-[10px] font-medium mt-0.5 text-zinc-300">Contact</span>
        </button>
      </div>
    </div>
  );
};
