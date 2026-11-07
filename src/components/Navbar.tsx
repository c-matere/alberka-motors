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
      <nav className="w-full bg-[#08090a]/85 backdrop-blur-md border-b border-[#23252a] h-[56px] flex items-center justify-center px-4 sm:px-6 sticky top-0 z-50">
        <div className="max-w-[1200px] w-full flex items-center justify-between text-[13px]" style={{ letterSpacing: '-0.011em' }}>
          
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('overview')}
            className="flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer shrink-0"
          >
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation Links (Linear Nav Text Buttons) */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = currentView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3 py-1.5 rounded-[6px] transition-colors cursor-pointer text-[13px] font-normal ${
                    isActive
                      ? 'text-white bg-white/5 font-medium'
                      : 'text-[#d0d6e0] hover:text-white hover:bg-white/3'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Utility Actions */}
          <div className="flex items-center gap-3 text-[#d0d6e0]">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="hover:text-white transition-colors p-1.5 cursor-pointer text-[#8a8f98] hover:bg-white/5 rounded-[6px]"
              title="Search fleet"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Saved Vehicles Trigger */}
            <button
              onClick={onOpenFavorites}
              className="hover:text-white transition-colors p-1.5 relative cursor-pointer text-[#8a8f98] hover:bg-white/5 rounded-[6px]"
              title="Saved vehicles"
            >
              <Heart className="w-4 h-4" />
              {favoritesCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#eb5757] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Linear High-Emphasis Action: Acid Lime Flashlight Button */}
            <a
              href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20am%20inquiring%20about%20your%20verified%20fleet."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !text-[13px] !py-1.5 !px-3.5 !rounded-[6px] shrink-0 font-[510] hidden sm:inline-flex"
            >
              VIP Concierge
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#d0d6e0] hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[56px] bg-[#08090a]/98 backdrop-blur-xl z-40 p-5 sm:p-6 flex flex-col justify-between md:hidden border-t border-[#23252a] overflow-y-auto">
          <div className="space-y-1 pt-2">
            <span className="text-[11px] font-mono text-[#8a8f98] uppercase tracking-wider block mb-3">Navigation</span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className="w-full text-left py-2.5 px-3 rounded-[6px] text-[15px] font-normal text-[#d0d6e0] hover:text-white hover:bg-white/5 flex items-center justify-between cursor-pointer transition-colors"
              >
                <span>{link.label}</span>
                {currentView === link.id && <span className="text-[11px] font-mono text-[#e4f222]">Active</span>}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#23252a] space-y-3 pb-8">
            <a
              href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full text-center justify-center py-2.5 font-[510]"
            >
              Direct WhatsApp Concierge
            </a>
          </div>
        </div>
      )}
    </>
  );
};
