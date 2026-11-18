import React from 'react';
import { Vehicle } from '../data/vehicles';
import { MessageCircle } from 'lucide-react';
import { CmsSiteSettings } from '../services/cmsContent';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  settings?: CmsSiteSettings;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  settings,
}) => {
  return (
    <footer className="w-full bg-transparent relative text-zinc-600 text-xs sm:text-[13px] py-16 px-4 sm:px-8">
      <div className="max-w-[1240px] mx-auto relative z-10">
        
        {/* Disclaimers & Consumer Assurance */}
        <div className="pb-8 mb-10 space-y-2.5 leading-relaxed text-xs text-zinc-600 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-zinc-200 after:via-zinc-100 after:to-transparent">
          <p>
            1. <strong className="text-zinc-950">5,000 KM Written Warranty:</strong> Covers engine internal mechanical components and automatic transmission/transaxle assemblies. Valid for 5,000 kilometers or 90 days from collection date, serviced through our approved workshop at our certified technical workshop.
          </p>
          <p>
            2. <strong className="text-zinc-950">All-Inclusive Delivered Pricing:</strong> All listed prices in Kenya Shillings (KES) include 16% VAT, KRA Import Duty, Excise Duty, and Railway Development Levy. NTSA TIMS logbook transfer executed directly by our conveyancing desk.
          </p>
          <p>
            3. <strong className="text-zinc-950">Japanese Auction Verification:</strong> Every unit is accompanied by the original Japanese export certificate and verified QISJ or JEVIC odometer verification sheet.
          </p>
        </div>

        {/* Brand Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-zinc-200 after:via-zinc-100 after:to-transparent">
          <div className="flex items-center gap-4">
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Enterprises Kenya"
              className="h-9 w-auto object-contain"
            />
            <div className="border-l border-zinc-200 pl-4 text-left">
              <span className="font-bold text-sm tracking-tight text-zinc-950 block leading-tight">
                {settings?.businessName?.toUpperCase() || 'ALBERKA ENTERPRISES (KENYA) LTD'}
              </span>
              <span className="font-mono text-[10px] tracking-wider text-zinc-600 mt-0.5 block">
                {settings?.tagline?.toUpperCase() || 'DIRECT JAPANESE IMPORTS · EST. 2000'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${settings?.whatsappNumber || '254180423075'}?text=Hello%20Alberka%20Enterprises,%20I%20have%20an%20inquiry%20regarding%20your%20vehicles.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-white py-2.5 px-4 text-xs font-semibold inline-flex items-center gap-2"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us ({settings?.phone || '0180 423 075'})</span>
            </a>
          </div>
        </div>

        {/* Multi-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 text-xs text-left">
          
          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3">Showroom Fleet</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  All Vehicles in Stock
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  SUVs & All-Wheel Drive
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Hybrids & e-POWER
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  7-Seater Vans & MPVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Compact Hatchbacks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3">Technical Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Certified Workshop Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  100-Point Inspection Check
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  5,000 KM Written Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Trade In Your Vehicle
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Bank Finance Estimation
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3">Locations</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Tangana Road Flagship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Nyali Links Rd Branch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Westlands (Mwanzi Rd) Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  VIP Test Drive Booking
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] font-bold text-zinc-950 uppercase tracking-wider mb-3">About Alberka</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('blog')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  The Alberka Journal (Blog)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  26-Year Provenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Japanese Auction Bidding
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  QISJ & JEVIC Odometer Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="text-zinc-600 hover:text-zinc-950 text-left cursor-pointer transition-colors">
                  Site Directory
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip with Gradient Feather Divider */}
        <div className="pt-6 relative after:absolute after:top-0 after:left-0 after:right-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/[0.08] after:to-transparent flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 font-mono">
          <p>{settings?.footerNotice || `© ${new Date().getFullYear()} Alberka Enterprises (Kenya) Ltd. Direct Japanese Imports Since 2000.`}</p>
          <div className="flex items-center gap-3">
            <span>Kenya Nationwide</span>
            <span>·</span>
            <span>KRA & QISJ Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
