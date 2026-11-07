import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, MessageCircle } from 'lucide-react';

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

  // Clean, straightforward navigation links
  const navLinks = [
    { id: 'inventory', label: 'Showroom' },
    { id: 'trade-in', label: 'Trade-In' },
    { id: 'workshop', label: 'Workshop & Warranty' },
    { id: 'about', label: 'Why Alberka' },
    { id: 'locations', label: 'Locations' },
  ];

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
      <nav className="w-full bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a] h-[72px] flex items-center justify-center px-6 lg:px-10 sticky top-0 z-50 transition-all">
        <div className="max-w-[1440px] w-full flex items-center justify-between gap-6">
          
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3.5 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="flex flex-col text-left pl-3 border-l border-[#27272a]">
              <span className="font-bold text-[15px] tracking-[-0.02em] text-white leading-tight">
                ALBERKA MOTORS
              </span>
              <span className="font-mono text-[10px] tracking-wider text-zinc-400 leading-none mt-0.5">
                MOMBASA & NAIROBI
              </span>
            </div>
          </button>

          {/* Clean, Spacious Navigation Links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1.5 text-[14px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Suite */}
          <div className="flex items-center gap-3 sm:gap-4 text-white">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="Search inventory"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Cars (Favorites) */}
            <button
              onClick={onOpenFavorites}
              className="p-2.5 rounded-md hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors relative cursor-pointer"
              title="Saved cars"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-white text-zinc-950 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Pure White High-Contrast) */}
            <button
              onClick={handleContactClick}
              className="btn-white !py-2 !px-4 !text-xs !rounded-md hidden sm:inline-flex cursor-pointer font-semibold shadow-sm"
            >
              <MessageCircle className="w-3.5 h-3.5 text-zinc-950" />
              <span>WhatsApp Us</span>
            </button>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#09090b]/98 backdrop-blur-xl z-40 p-6 flex flex-col justify-between md:hidden border-t border-[#27272a] overflow-y-auto">
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block px-3 mb-2">
              Menu
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left py-3 px-3 rounded-md text-[15px] font-medium flex items-center justify-between transition-colors ${
                  currentView === link.id
                    ? 'bg-zinc-900 text-white font-semibold'
                    : 'text-zinc-400 hover:bg-zinc-900/60 hover:text-white'
                }`}
              >
                <span>{link.label}</span>
                {currentView === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                )}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[#27272a] space-y-3">
            <button
              onClick={handleContactClick}
              className="btn-white w-full py-3 text-[14px] justify-center cursor-pointer font-semibold"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              <span>Chat on WhatsApp (0714 333 888)</span>
            </button>
            <div className="text-center text-[11px] text-zinc-500 font-mono">
              Alberka Motors · Tangana Rd, Mombasa & Westlands, Nairobi
            </div>
          </div>
        </div>
      )}
    </>
  );
};
