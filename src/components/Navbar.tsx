import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, MessageCircle, ArrowRight, MapPin } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
  onOpenWhispers?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenSearch,
  onOpenFavorites,
  onOpenWhispers,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Editorial navigation links with descriptive subtext for mobile menu
  const navLinks = [
    { id: 'inventory', index: '01', label: 'Showroom', desc: 'Verified Tokyo stock & Japanese imports' },
    { id: 'workshop', index: '02', label: 'Import Process', desc: 'Direct Tokyo auction bidding, shipping & Mombasa port clearing' },
    { id: 'blog', index: '03', label: 'Journal', desc: 'Technical guides, auction decoding & Kenyan market research' },
    { id: 'about', index: '04', label: 'About Us', desc: '26-year heritage, Japanese sourcing & Mombasa showroom' },
  ];

  // Prevent background body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    if (onOpenWhispers) {
      onOpenWhispers();
      setMobileMenuOpen(false);
    } else {
      window.open(
        `https://wa.me/254180423075?text=${encodeURIComponent('Hello Alberka Enterprises, I am inquiring about vehicles at your showroom next to Ganjoni Primary School, Mombasa.')}`,
        '_blank'
      );
    }
  };

  return (
    <>
      <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 h-16 sm:h-[76px] flex items-center justify-center px-3 sm:px-8 sticky top-0 z-50 transition-all">
        <div className="max-w-[1440px] w-full flex items-center justify-between gap-2.5 sm:gap-4">
          
          {/* Logo & Brand Emblem (Mobile: Icon only; Desktop: Full typographic emblem) */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-2.5 sm:gap-3.5 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            aria-label="Alberka Enterprises Home"
          >
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Enterprises"
              className="h-10 sm:h-12 md:h-13 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col text-left pl-3.5 border-l border-zinc-200">
              <span className="font-extrabold text-[15px] sm:text-[16.5px] tracking-tight text-zinc-950 leading-tight">
                ALBERKA ENTERPRISES
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] tracking-[0.18em] text-zinc-500 leading-none mt-0.5 font-medium">
                QUALITY JAPANESE IMPORTS
              </span>
            </div>
          </button>

          {/* Mobile Search Bar: Occupies the entire remaining space in the header */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden flex-1 flex items-center gap-2 bg-zinc-100/90 hover:bg-zinc-200/80 active:bg-zinc-200 border border-zinc-200 rounded-full px-3 py-2 text-left cursor-pointer transition-all ml-1 min-w-0"
            title="Search inventory"
            aria-label="Search fleet"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-zinc-500 text-[12px] truncate">Search fleet (e.g. RAV4, Prado, Hybrid...)</span>
          </button>

          {/* Desktop Floating Segmented Controller (Apple / Leica Aesthetic) */}
          <div className="hidden lg:inline-flex items-center gap-1 bg-zinc-100/90 backdrop-blur-xl border border-zinc-200/80 p-1.5 rounded-full shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium pill-interactive cursor-pointer whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-red-600 text-white font-bold shadow-sm scale-[1.02]'
                      : 'text-zinc-600 hover:text-zinc-950 hover:bg-white/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Suite */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 text-zinc-900">
            
            {/* Quick Search Capsule */}
            <button
              onClick={onOpenSearch}
              className="h-9 px-3 rounded-full bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 flex items-center gap-2 transition-all cursor-pointer hover:scale-102 active:scale-95"
              title="Search inventory (⌘K / Ctrl+K)"
              aria-label="Search fleet"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden xl:inline text-xs text-zinc-400 font-medium">Search fleet</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white text-zinc-500 border border-zinc-200 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Saved Cars Capsule with Badge */}
            <button
              onClick={onOpenFavorites}
              className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200/80 border border-zinc-200 hover:border-zinc-300 text-zinc-700 hover:text-zinc-950 flex items-center justify-center transition-all cursor-pointer relative hover:scale-105 active:scale-95"
              title="Saved vehicles"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-heartbeat">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Tablet Menu Toggle Button (Visible only on tablets where segmented controller is hidden) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-zinc-950 flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-zinc-900" /> : <Menu className="w-5 h-5 text-zinc-900" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Editorial Luxury Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-14 sm:top-[68px] bg-white/98 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between lg:hidden border-t border-zinc-200 text-zinc-900 overflow-y-auto animate-slideDown">
          
          {/* Main Editorial Menu Links */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 block px-2 mb-2 font-semibold">
              INDEX // NAVIGATION
            </span>
            
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'hover:bg-zinc-50 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-[10px] font-semibold ${isActive ? 'text-white/80' : 'text-zinc-500'}`}>{link.index}</span>
                        <span className={`text-base font-bold tracking-tight ${isActive ? 'text-white' : 'text-zinc-800 group-hover:text-zinc-950'}`}>
                          {link.label}
                        </span>
                      </div>
                      <p className={`text-xs pl-6 leading-relaxed ${isActive ? 'text-white/90' : 'text-zinc-500'}`}>
                        {link.desc}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                  </button>
                );
              })}
            </div>

            {/* Quick Action Utility Bar */}
            <div className="grid grid-cols-2 gap-2.5 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-left flex items-center gap-2.5 cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-950 block">Search Cars</span>
                  <span className="text-[10px] font-mono text-zinc-500">Quick catalog scan</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="p-3 bg-zinc-50 border border-zinc-200 rounded-xl text-left flex items-center gap-2.5 cursor-pointer hover:border-zinc-300 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-zinc-950 block">Saved Cars ({favoritesCount})</span>
                  <span className="text-[10px] font-mono text-zinc-500">Compare selection</span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer & Direct Hotline */}
          <div className="pt-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] sm:pb-6 border-t border-zinc-200 space-y-3 mt-6">
            <button
              onClick={handleContactClick}
              className="w-full py-3 text-xs sm:text-sm font-bold justify-center inline-flex items-center gap-2 shadow-lg bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl transition-all cursor-pointer active:scale-98"
            >
              <span className="animate-whatsapp-vibrate inline-flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white fill-white" />
              </span>
              <span>Chat on WhatsApp (0180 423 075)</span>
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Showroom: Next to Ganjoni Primary School, Mombasa</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
