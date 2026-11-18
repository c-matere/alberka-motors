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
        <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-2xl rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <button
            onClick={onBackToInventory}
            className="w-9 h-9 bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 rounded-lg flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-800"
            title="Back to cars"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-zinc-950 block truncate">
              {selectedVehicle.name}
            </span>
            <span className="font-mono text-[13px] font-bold text-zinc-950 block leading-tight">
              KES {selectedVehicle.priceKes.toLocaleString()}
            </span>
          </div>

          <a
            href={`https://wa.me/254180423075?text=${encodeURIComponent(
              `Hello Alberka Enterprises, I am interested in the ${selectedVehicle.year} ${selectedVehicle.name} (Stock ID: ${selectedVehicle.sbtStockId || selectedVehicle.stockNo}) priced at KES ${selectedVehicle.priceKes.toLocaleString()} at your showroom next to Ganjoni Primary School, Mombasa.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white !py-2 !px-3.5 !text-[12px] !rounded-md whitespace-nowrap shrink-0 flex items-center font-bold shadow-sm"
          >
            <span className="animate-whatsapp-vibrate inline-flex items-center justify-center mr-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
            </span>
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
        <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-2xl rounded-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-2xl">
          <button
            onClick={onBackToJournal}
            className="w-9 h-9 bg-zinc-100 border border-zinc-200 text-zinc-700 hover:bg-zinc-200 rounded-lg flex items-center justify-center shrink-0 cursor-pointer hover:bg-zinc-800"
            title="Back to Journal"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="min-w-0 flex-1">
            <span className="text-[12px] font-semibold text-zinc-950 block truncate">
              {selectedBlogPost.title}
            </span>
            <span className="font-mono text-[11px] text-zinc-600 block leading-tight">
              {selectedBlogPost.category} · {selectedBlogPost.readTime}
            </span>
          </div>

          <a
            href={`https://wa.me/254180423075?text=${encodeURIComponent(
              `Hello Alberka Enterprises, I am reading '${selectedBlogPost.title}' and would like to consult your team.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white !py-2 !px-3.5 !text-[12px] !rounded-md whitespace-nowrap shrink-0 flex items-center font-bold shadow-sm"
          >
            <span className="animate-whatsapp-vibrate inline-flex items-center justify-center mr-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-white fill-white" />
            </span>
            <span>Consult</span>
          </a>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: 'overview', label: 'Home', icon: Home },
    { id: 'inventory', label: 'Cars', icon: Car },
    { id: 'workshop', label: 'Import', icon: Globe },
    { id: 'locations', label: 'Showroom', icon: MapPin },
  ];

  return (
    <div className="fixed bottom-2 sm:bottom-3 inset-x-2.5 max-w-lg mx-auto z-40 md:hidden pb-[env(safe-area-inset-bottom,0px)]">
      <div className="bg-white/95 backdrop-blur-xl border border-zinc-200/90 shadow-2xl rounded-2xl px-2 py-1.5 flex items-center justify-around shadow-2xl">
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
                isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <div className="p-0.5">
                <Icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] mt-0.5 ${isActive ? 'text-zinc-950 font-semibold' : 'text-zinc-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Saved Cars with Badge */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2.5 text-zinc-600 hover:text-zinc-950 transition-all cursor-pointer relative"
        >
          <div className="p-0.5 relative">
            <Bookmark className="w-4 h-4 text-zinc-600" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-red-600 text-white text-[9px] font-mono w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium mt-0.5 text-zinc-600">Saved</span>
        </button>
      </div>
    </div>
  );
};
