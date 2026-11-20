import React from 'react';
import { Home, Car, Globe, MapPin, Bookmark, MessageCircle, ArrowLeft } from 'lucide-react';
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
        <div className="bg-white/95 backdrop-blur-xl border border-[#ebebeb] shadow-lg rounded-full px-4 py-2 flex items-center justify-between gap-3">
          <button
            onClick={onBackToInventory}
            className="w-9 h-9 bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] rounded-full flex items-center justify-center shrink-0 cursor-pointer"
            title="Back to cars"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-[#222222] block truncate">
              {selectedVehicle.name}
            </span>
            <span className="font-mono text-[13px] font-bold text-[#DC2626] block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254180423075?text=${encodeURIComponent(
              `Hello Alberka Enterprises, I am interested in the ${selectedVehicle.year} ${selectedVehicle.name} (Stock ID: ${selectedVehicle.sbtStockId || selectedVehicle.stockNo}) priced at KES ${selectedVehicle.priceKes.toLocaleString()} at your showroom next to Ganjoni Primary School, Mombasa.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white py-2 px-4 text-xs font-bold rounded-full whitespace-nowrap shrink-0 flex items-center shadow-xs"
          >
            <span>Reserve via WhatsApp</span>
          </a>
        </div>
      </div>
    );
  }

  // If user is viewing a single blog article, show dedicated journal dock
  if (selectedBlogPost) {
    return (
      <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
        <div className="bg-white/95 backdrop-blur-xl border border-[#ebebeb] shadow-lg rounded-full px-4 py-2 flex items-center justify-between gap-3">
          <button
            onClick={onBackToJournal}
            className="w-9 h-9 bg-[#f7f7f7] hover:bg-[#ebebeb] border border-[#ebebeb] text-[#222222] rounded-full flex items-center justify-center shrink-0 cursor-pointer"
            title="Back to Journal"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-[#222222] block truncate">
              {selectedBlogPost.title}
            </span>
            <span className="font-mono text-[11px] text-[#6a6a6a] block leading-tight">
              {selectedBlogPost.category} · {selectedBlogPost.readTime}
            </span>
          </div>

          <a
            href={`https://wa.me/254180423075?text=${encodeURIComponent(
              `Hello Alberka Enterprises, I am reading '${selectedBlogPost.title}' and would like to consult your team.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#DC2626] hover:bg-[#B91C1C] text-white py-2 px-4 text-xs font-bold rounded-full whitespace-nowrap shrink-0 flex items-center shadow-xs"
          >
            <span>Consult Desk</span>
          </a>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Explore', icon: Home },
    { id: 'inventory', label: 'Stock', icon: Car },
    { id: 'workshop', label: 'Import', icon: Globe },
    { id: 'locations', label: 'Showroom', icon: MapPin },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="bg-white/95 backdrop-blur-xl border border-[#ebebeb] shadow-lg rounded-full px-3 py-1.5 flex items-center justify-around">
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
              className={`flex flex-col items-center justify-center py-1 px-3 transition-all cursor-pointer rounded-full ${
                isActive ? 'text-[#DC2626] font-semibold' : 'text-[#6a6a6a] hover:text-[#222222]'
              }`}
            >
              <div className="p-0.5">
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#DC2626]' : 'text-[#6a6a6a]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-[#DC2626] font-semibold' : 'text-[#6a6a6a]'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Saved Cars with Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-3 text-[#6a6a6a] hover:text-[#222222] transition-all cursor-pointer relative"
        >
          <div className="p-0.5 relative">
            <Bookmark className="w-4 h-4 text-[#6a6a6a]" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#DC2626] text-white text-[9px] font-mono w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5 text-[#6a6a6a]">Saved</span>
        </button>
      </div>
    </div>
  );
};
