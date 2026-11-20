import React from 'react';
import { Vehicle } from '../data/vehicles';
import { CmsSiteSettings } from '../services/cmsContent';
import alberkaLogo from '../assets/alberka-logo.png';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onOpenHelpCenter?: (tab?: 'faq' | 'policies' | 'contact') => void;
  settings?: CmsSiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenHelpCenter,
  settings,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#f7f7f7] border-t border-[#ebebeb] text-[#6a6a6a] text-xs sm:text-[13px] pt-12 pb-10 px-4 sm:px-8">
      <div className="max-w-[1280px] mx-auto space-y-10">
        
        {/* Brand & Showroom Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-[#ebebeb]">
          <div className="flex items-center gap-3.5">
            <img
              src={alberkaLogo}
              alt="Alberka Enterprises Limited"
              className="h-9 sm:h-10 w-auto object-contain"
            />
            <div className="border-l border-[#ebebeb] pl-3.5 text-left">
              <span className="font-bold text-sm tracking-tight text-[#222222] block leading-tight">
                {settings?.businessName || 'Alberka Enterprises Limited'}
              </span>
              <span className="text-[11px] text-[#6a6a6a] mt-0.5 block font-medium">
                Direct Japanese Vehicle Importers · Mombasa, Kenya
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[#222222] font-semibold">Showroom Hours:</span>
            <span className="text-[#6a6a6a]">{settings?.workingHours || 'Mon – Sat: 8:00 AM – 6:00 PM'}</span>
          </div>
        </div>

        {/* 3-Column Clean Editorial Navigation Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 text-left">
          
          {/* Column 1: Fleet & Direct Sourcing */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider">
              Fleet & Direct Sourcing
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Mombasa Showroom Stock
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Custom Tokyo Auction Bidding (USS Tokyo / CAA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Trade-In & Vehicle Valuation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop', 'stage-overhaul')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  100-Point Mechanical Overhaul Standard
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Provenance & Support */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider">
              Provenance & Compliance
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('faq') : onNavigate('about'))}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Help Center & FAQs
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about', 'anti-tampering-policy')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Guaranteed Odometer Policy (JEVIC / QISJ)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('overview', 'customer-reviews')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  Verified Client Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-[#6a6a6a] hover:text-[#222222] transition-colors cursor-pointer text-left"
                >
                  The Alberka Journal & Auction Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Mombasa Hub & Concierge */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-[#222222] uppercase tracking-wider">
              Mombasa Hub & Desk
            </h4>
            <div className="space-y-2.5 text-xs leading-relaxed">
              <p className="text-[#222222] font-medium">
                Next to Ganjoni Primary School, Archbishop Makarios Rd, Mombasa, Kenya
              </p>
              <p className="text-[#6a6a6a]">
                Direct Line / WhatsApp:{' '}
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#222222] font-semibold hover:underline"
                >
                  0180 423 075
                </a>
              </p>

              {/* Minimal Clean Social Icons */}
              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#222222] hover:text-white border border-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.26-1.5-1.4-1.76-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.22.89 2.41 1.02 2.58.12.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29" />
                  </svg>
                </a>

                <a
                  href="https://www.instagram.com/alberka_enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#222222] hover:text-white border border-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href="https://www.facebook.com/alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#222222] hover:text-white border border-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>

                <a
                  href="https://www.tiktok.com/@alberkamotors"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white hover:bg-[#222222] hover:text-white border border-[#ebebeb] text-[#222222] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                  title="TikTok"
                  aria-label="TikTok"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Single Minimal Bottom Bar: Copyright & Compliance */}
        <div className="pt-6 border-t border-[#ebebeb] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#6a6a6a]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© {currentYear} Alberka Enterprises Limited</span>
            <span>·</span>
            <button
              onClick={() => (onOpenHelpCenter ? onOpenHelpCenter('policies') : onNavigate('about'))}
              className="hover:text-[#222222] cursor-pointer"
            >
              Terms & Policies
            </button>
            <span>·</span>
            <button
              onClick={() => onNavigate('sitemap')}
              className="hover:text-[#222222] cursor-pointer"
            >
              Sitemap
            </button>
            <span>·</span>
            <span className="text-[#6a6a6a]">KRA & JEVIC Verified</span>
          </div>

          <div className="text-xs font-medium text-[#222222]">
            Mombasa Showroom · Sole Office & Yard
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
