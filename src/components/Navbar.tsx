import React, { useState } from 'react';
import { Search, Bookmark, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  favoritesCount: number;
  onOpenSearch: () => void;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  favoritesCount,
  onOpenSearch,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'overview', label: 'SANCTUARY' },
    { id: 'inventory', label: 'THE FLEET' },
    { id: 'workshop', label: 'THE ATELIER' },
    { id: 'trade-in', label: 'COMMISSION' },
    { id: 'about', label: 'PROVENANCE' },
    { id: 'locations', label: 'THE SUITES' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="w-full bg-[#160a1d]/90 backdrop-blur-md border-b border-[rgba(197,168,128,0.2)] h-[64px] flex items-center justify-center px-6 sticky top-0 z-50 transition-all duration-500">
        <div className="max-w-[1500px] w-full flex items-center justify-between">
          
          {/* Brand Insignia */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-3 hover:opacity-85 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="hidden lg:flex flex-col text-left pl-3 border-l border-[rgba(197,168,128,0.25)]">
              <span className="font-['Cinzel'] text-[12px] tracking-[0.25em] text-[#f5f5f7] font-normal leading-tight">
                ALBERKA MOTORS
              </span>
              <span className="font-['Cinzel'] text-[9px] tracking-[0.22em] text-[#c5a880] leading-none mt-0.5">
                HOUSE OF BESPOKE MARQUES
              </span>
            </div>
          </button>

          {/* Aristocratic Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 text-[11px] font-['Cinzel'] tracking-[0.22em] transition-colors duration-400 cursor-pointer ${
                    isActive
                      ? 'text-[#dfc7a5]'
                      : 'text-[#8c8a94] hover:text-[#f5f5f7]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#c5a880]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Aristocratic Utility Suite */}
          <div className="flex items-center gap-4 text-[#f5f5f7]">
            {/* Search Palette Trigger */}
            <button
              onClick={onOpenSearch}
              className="hover:text-[#dfc7a5] transition-colors p-2 cursor-pointer text-[#8c8a94]"
              title="Search marques"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Curated Dossier (Favorites) */}
            <button
              onClick={onOpenFavorites}
              className="hover:text-[#dfc7a5] transition-colors p-2 relative cursor-pointer text-[#8c8a94]"
              title="Saved dossier"
            >
              <Bookmark className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#c5a880] text-[#0f0714] text-[9px] font-['Cinzel'] w-4 h-4 flex items-center justify-center font-semibold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Ghost Hairline Action Button: Whispers Private Concierge */}
            <a
              href="https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20inquire%20regarding%20a%20private%20viewing%20or%20bespoke%20commission."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-ghost !py-2 !px-4 !text-[10.5px] hidden sm:inline-flex"
            >
              <span>WHISPERS CONCIERGE</span>
            </a>

            {/* Mobile Nav Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#8c8a94] hover:text-[#f5f5f7] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Nocturnal Amethyst Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[64px] bg-[#0f0714]/98 backdrop-blur-2xl z-40 p-8 flex flex-col justify-between md:hidden border-t border-[rgba(197,168,128,0.2)] overflow-y-auto">
          <div className="space-y-4 pt-4">
            <span className="rr-eyebrow block mb-4">THE HOUSE DIRECTORY</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-3 border-b border-[rgba(255,255,255,0.06)] font-['Cinzel'] text-[14px] tracking-[0.2em] text-[#8c8a94] hover:text-[#dfc7a5] flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>{link.label}</span>
                {currentView === link.id && <span className="text-[10px] text-[#c5a880] tracking-widest font-mono">SELECTED</span>}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[rgba(197,168,128,0.2)] space-y-4">
            <a
              href="https://wa.me/254714333888?text=Salutations%20Alberka%20Motors"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-solid w-full text-center justify-center py-3"
            >
              <span>CONNECT VIA WHISPERS CONCIERGE</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
