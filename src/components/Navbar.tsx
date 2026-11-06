import React, { useState } from 'react';
import { Search, Heart, MessageCircle, Menu, X } from 'lucide-react';

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
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Fleet' },
    { id: 'workshop', label: 'Master Workshop' },
    { id: 'trade-in', label: 'Trade-In' },
    { id: 'about', label: 'Heritage' },
    { id: 'locations', label: 'Showrooms' },
    { id: 'sitemap', label: 'Directory' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav className="w-full bg-[#09090b]/95 backdrop-blur-md border-b border-[#27272a] h-[52px] flex items-center justify-center px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-[1240px] w-full flex items-center justify-between text-[12px] font-normal text-white/80" style={{ letterSpacing: '-0.12px' }}>
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="./alberka-logo.svg"
              alt="Alberka Motors Kenya"
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors cursor-pointer text-[13px] ${
                    isActive ? 'text-white font-semibold border-b-2 border-white pb-0.5' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-4 text-white">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hover:text-white transition-colors p-1 cursor-pointer text-zinc-400"
              title="Search fleet"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Vehicles Trigger */}
            <button
              onClick={onOpenFavorites}
              className="hover:text-white transition-colors p-1 relative cursor-pointer text-zinc-400"
              title="Saved vehicles"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-[#dc2626] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Concierge Link */}
            <a
              href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20your%20verified%20luxury%20fleet."
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-white/10 transition-colors hidden sm:flex items-center gap-1.5 font-medium text-[11px] bg-white/5 border border-white/10 text-zinc-200 px-3 py-1 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] inline-block animate-pulse"></span>
              <span>VIP Concierge</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[52px] bg-[#09090b]/98 backdrop-blur-xl z-40 p-5 sm:p-6 flex flex-col justify-between md:hidden animate-apple-fade border-t border-[#27272a] overflow-y-auto">
          <div className="space-y-3 pt-2">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">Showroom Navigation</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-3 text-[17px] font-medium text-white border-b border-[#1f1f23] flex items-center justify-between cursor-pointer active:scale-98 transition-transform"
              >
                <span>{link.label}</span>
                {currentView === link.id && <span className="text-[12px] text-white font-semibold">Active</span>}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#27272a] space-y-3 pb-8">
            <a
              href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full pricing-blue-pill-lg text-center justify-center flex active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Concierge (+254 714 333888)</span>
            </a>
            <p className="text-center text-[12px] text-zinc-500">
              Alberka Motors · Mombasa & Nairobi Showrooms
            </p>
          </div>
        </div>
      )}
    </>
  );
};
