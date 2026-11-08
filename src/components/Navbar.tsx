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
    { id: 'trade-in', index: '02', label: 'Trade-In', desc: '20-min hoist check & equity appraisal' },
    { id: 'workshop', index: '03', label: 'Workshop', desc: '100-point overhaul & 5,000 km warranty' },
    { id: 'blog', index: '04', label: 'Journal', desc: 'Technical guides, auction decoding & Kenyan market research' },
    { id: 'about', index: '05', label: 'Why Alberka', desc: '26-year heritage & direct Japanese auction sourcing' },
    { id: 'locations', index: '06', label: 'Locations', desc: 'Tangana Rd, Mombasa & Westlands, Nairobi' },
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
        'https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20interested%20in%20inquiring%20about%20a%20vehicle%20in%20your%20inventory.',
        '_blank'
      );
    }
  };

  return (
    <>
      <nav className="w-full bg-[#09090b]/90 backdrop-blur-2xl border-b border-white/[0.08] h-16 sm:h-[68px] flex items-center justify-center px-4 sm:px-8 sticky top-0 z-50 transition-all">
        <div className="max-w-[1440px] w-full flex items-center justify-between gap-4">
          
          {/* Logo & Brand Emblem */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3.5 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors"
              className="h-8 sm:h-9 w-auto object-contain"
            />
            <div className="flex flex-col text-left pl-3 border-l border-white/15">
              <span className="font-bold text-sm sm:text-[14.5px] tracking-tight text-white leading-tight">
                ALBERKA MOTORS
              </span>
              <span className="font-mono text-[9px] tracking-[0.16em] text-zinc-400 leading-none mt-0.5">
                MOMBASA & NAIROBI
              </span>
            </div>
          </button>

          {/* Desktop Floating Segmented Controller (Apple / Leica Aesthetic) */}
          <div className="hidden lg:inline-flex items-center gap-1 bg-black/60 backdrop-blur-xl border border-white/[0.08] p-1.5 rounded-full shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium pill-interactive cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-zinc-950 font-bold shadow-sm scale-[1.02]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Right Action Suite */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-white">
            
            {/* Quick Search Capsule with Keyboard Shortcut Hint */}
            <button
              onClick={onOpenSearch}
              className="h-9 px-2.5 sm:px-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer hover:scale-102 active:scale-95"
              title="Search inventory (⌘K / Ctrl+K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden xl:inline text-xs text-zinc-400 font-medium">Search fleet</span>
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono bg-white/[0.06] text-zinc-400 border border-white/10 rounded">
                ⌘K
              </kbd>
            </button>

            {/* Saved Cars Capsule with Badge */}
            <button
              onClick={onOpenFavorites}
              className="w-9 h-9 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] hover:border-white/20 text-zinc-300 hover:text-white flex items-center justify-center transition-all cursor-pointer relative hover:scale-105 active:scale-95"
              title="Saved vehicles"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-heartbeat">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* WhatsApp VIP Concierge Pill */}
            <button
              onClick={handleContactClick}
              className="btn-white btn-glint !py-2 !px-4 !text-xs !rounded-full hidden sm:inline-flex cursor-pointer font-semibold shadow-sm items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 text-zinc-950" />
              <span>WhatsApp Us</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-9 h-9 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-zinc-300 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Editorial Luxury Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 sm:top-[68px] bg-[#09090b]/98 backdrop-blur-2xl z-40 p-6 flex flex-col justify-between lg:hidden border-t border-white/[0.08] overflow-y-auto animate-slideDown">
          
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
                        ? 'bg-zinc-900 border border-white/20'
                        : 'hover:bg-zinc-900/60 border border-transparent'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-500 font-semibold">{link.index}</span>
                        <span className={`text-base font-bold tracking-tight ${isActive ? 'text-white' : 'text-zinc-200 group-hover:text-white'}`}>
                          {link.label}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 pl-6 leading-relaxed">
                        {link.desc}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-white' : 'text-zinc-600'}`} />
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
                className="p-3 bg-[#0c0c0f] border border-white/[0.08] rounded-xl text-left flex items-center gap-2.5 cursor-pointer hover:border-white/20 transition-colors"
              >
                <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Search Cars</span>
                  <span className="text-[10px] font-mono text-zinc-500">Quick catalog scan</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="p-3 bg-[#0c0c0f] border border-white/[0.08] rounded-xl text-left flex items-center gap-2.5 cursor-pointer hover:border-white/20 transition-colors"
              >
                <Bookmark className="w-4 h-4 text-zinc-400 shrink-0" />
                <div>
                  <span className="text-xs font-bold text-white block">Saved Cars ({favoritesCount})</span>
                  <span className="text-[10px] font-mono text-zinc-500">Compare selection</span>
                </div>
              </button>
            </div>
          </div>

          {/* Footer & Direct Hotline */}
          <div className="pt-6 border-t border-white/[0.08] space-y-3 mt-6">
            <button
              onClick={handleContactClick}
              className="btn-white w-full py-3 text-xs sm:text-sm font-semibold justify-center inline-flex items-center gap-2 shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp (0714 333 888)</span>
            </button>
            
            <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-500 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Mombasa Tangana Rd · Nairobi Westlands Hub</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
