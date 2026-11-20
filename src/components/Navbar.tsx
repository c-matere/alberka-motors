import React, { useState, useEffect } from 'react';
import { Search, Bookmark, Menu, X, MessageCircle, ArrowRight, MapPin } from 'lucide-react';
import alberkaLogo from '../assets/alberka-logo.png';

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
      <nav className="w-full bg-white border-b border-[#ebebeb] h-20 flex items-center justify-center px-4 sm:px-8 sticky top-0 z-50 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-[1440px] w-full flex items-center justify-between gap-4">
          
          {/* Left: Brand Logo & Typography */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
            aria-label="Alberka Enterprises Home"
          >
            <img
              src={alberkaLogo}
              alt="Alberka Enterprises Limited"
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="hidden sm:flex flex-col text-left pl-3 border-l border-[#ebebeb]">
              <span className="font-extrabold text-[15px] tracking-tight text-[#222222] leading-tight">
                ENTERPRISES LIMITED
              </span>
              <span className="font-mono text-[9.5px] tracking-[0.16em] text-[#6a6a6a] leading-none mt-0.5 font-medium">
                QUALITY JAPANESE IMPORTS
              </span>
            </div>
          </button>

          {/* Mobile Quick Search Bar (Airbnb Compact Capsule) */}
          <button
            onClick={onOpenSearch}
            className="sm:hidden flex-1 flex items-center gap-2.5 bg-white border border-[#ebebeb] shadow-xs rounded-full px-3.5 py-2 text-left cursor-pointer transition-all ml-1 min-w-0"
            title="Search inventory"
            aria-label="Search fleet"
          >
            <Search className="w-4 h-4 text-[#ff385c] shrink-0" />
            <div className="min-w-0 flex-1">
              <span className="text-[#222222] text-xs font-semibold block truncate">Where to?</span>
              <span className="text-[#6a6a6a] text-[10px] block truncate">Any car · Verified stock</span>
            </div>
          </button>

          {/* Center: Airbnb Tab Navigation with 2px Hof (#222222) Active Underline */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-6 text-sm font-medium transition-colors cursor-pointer select-none whitespace-nowrap ${
                    isActive
                      ? 'text-[#222222] font-semibold'
                      : 'text-[#6a6a6a] hover:text-[#222222]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-[#222222] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Airbnb Utilities & Host/Order Action */}
          <div className="hidden sm:flex items-center gap-2 text-[#222222]">
            
            {/* 'Direct Japan Order' text link */}
            <button
              onClick={() => handleLinkClick('workshop')}
              className="px-3.5 py-2 rounded-full text-xs font-semibold text-[#222222] hover:bg-[#f7f7f7] transition-colors cursor-pointer whitespace-nowrap"
            >
              Order from Tokyo
            </button>

            {/* Circular Search Button */}
            <button
              onClick={onOpenSearch}
              className="w-10 h-10 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Search fleet (⌘K)"
              aria-label="Search fleet"
            >
              <Search className="w-4 h-4 text-[#222222]" />
            </button>

            {/* Circular Saved Cars Wishlist Button */}
            <button
              onClick={onOpenFavorites}
              className="w-10 h-10 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer relative hover:scale-105 active:scale-95"
              title="Saved vehicles"
              aria-label="Saved vehicles"
            >
              <Bookmark className="w-4 h-4 text-[#222222]" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#ff385c] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Circular Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#f7f7f7] hover:bg-[#ebebeb] text-[#222222] flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#222222]" /> : <Menu className="w-4 h-4 text-[#222222]" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Editorial Luxury Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-white/98 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between lg:hidden border-t border-[#ebebeb] text-[#222222] overflow-y-auto animate-slideDown">
          
          {/* Main Editorial Menu Links */}
          <div className="space-y-3 pt-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#6a6a6a] block px-2 mb-2 font-medium">
              INDEX // NAVIGATION
            </span>
            
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive = currentView === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full text-left p-3.5 rounded-2xl transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#ff385c] text-white shadow-xs'
                        : 'hover:bg-[#f7f7f7] border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[11px] font-mono font-medium ${isActive ? 'text-white/80' : 'text-[#6a6a6a]'}`}>{link.index}</span>
                        <span className={`text-base font-semibold tracking-tight ${isActive ? 'text-white' : 'text-[#222222]'}`}>
                          {link.label}
                        </span>
                      </div>
                      <p className={`text-xs pl-6 leading-relaxed ${isActive ? 'text-white/90' : 'text-[#6a6a6a]'}`}>
                        {link.desc}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-[#6a6a6a]'}`} />
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
                className="p-3 bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] rounded-2xl text-left flex items-center gap-2.5 cursor-pointer transition-colors"
              >
                <Search className="w-4 h-4 text-[#6a6a6a] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#222222] block">Search Cars</span>
                  <span className="text-[10px] text-[#6a6a6a]">Quick catalog scan</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="p-3 bg-[#f7f7f7] border border-[#ebebeb] hover:border-[#dddddd] rounded-2xl text-left flex items-center gap-2.5 cursor-pointer transition-colors"
              >
                <Bookmark className="w-4 h-4 text-[#6a6a6a] shrink-0" />
                <div>
                  <span className="text-xs font-semibold text-[#222222] block">Saved Cars ({favoritesCount})</span>
                  <span className="text-[10px] text-[#6a6a6a]">Compare selection</span>
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
              <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
              <span>Showroom: Next to Ganjoni Primary School, Mombasa</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
