import React from 'react';
import { Vehicle } from '../data/vehicles';
import { MessageCircle, Phone, Mail } from 'lucide-react';

interface FooterProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const Footer: React.FC<FooterProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicle,
}) => {
  return (
    <footer className="w-full bg-[#09090b] border-t border-[#27272a] text-[#a1a1aa] text-[13px] py-16 px-6 sm:px-10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Disclaimers & Consumer Assurance */}
        <div className="border-b border-[#27272a] pb-8 mb-10 space-y-3 leading-relaxed text-[12px] text-[#71717a]">
          <p>
            1. <strong className="text-white">5,000 KM Written Warranty:</strong> Covers engine internal mechanical components and automatic transmission/transaxle assemblies. Valid for 5,000 kilometers or 90 days from collection date, serviced through our approved workshop in Mombasa.
          </p>
          <p>
            2. <strong className="text-white">Clear, All-Inclusive Prices:</strong> All prices listed in Kenya Shillings (KES) include 16% VAT, KRA Import Duty, Excise Duty, and Railway Development Levy. NTSA TIMS logbook transfer handled directly by our conveyancing desk.
          </p>
          <p>
            3. <strong className="text-white">Japanese Auction Verification:</strong> Every car comes with an authentic Japanese export certificate and verified QISJ or JEVIC odometer verification sheet.
          </p>
        </div>

        {/* Brand Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-[#27272a]">
          <div className="flex items-center gap-4">
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors Kenya"
              className="h-10 w-auto object-contain"
            />
            <div className="border-l border-[#27272a] pl-4">
              <span className="font-['Inter'] font-bold text-[15px] text-white block leading-tight">
                ALBERKA MOTORS (KENYA) LTD
              </span>
              <span className="font-mono text-[11px] text-[#ef4444] mt-0.5 block font-medium">
                DIRECT JAPANESE IMPORTS // EST. 2000
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/254714333888?text=Hello%20Alberka%20Motors,%20I%20have%20an%20inquiry%20regarding%20your%20vehicles."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crimson !py-2.5 !px-4 text-[13px]"
            >
              <MessageCircle className="w-4 h-4 mr-1.5" />
              <span>WhatsApp Us (0714 333 888)</span>
            </a>
          </div>
        </div>

        {/* Multi-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14 text-[13px]">
          
          <div>
            <h4 className="font-bold text-white text-[13px] mb-3 uppercase tracking-wider">Showroom Fleet</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  All Cars in Stock
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  SUVs & 4WD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Hybrids & e-POWER
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  7-Seater Vans & MPVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Compact Hatchbacks
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-[13px] mb-3 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa Workshop Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  100-Point Inspection Check
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  5,000 KM Written Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Trade In Your Old Car
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Asset Finance Estimates
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-[13px] mb-3 uppercase tracking-wider">Showrooms</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa — Tangana Road
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa — Nyali Branch
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Nairobi — Westlands (Mwanzi Rd)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Book a VIP Test Drive
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-[13px] mb-3 uppercase tracking-wider">About Alberka</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Our 26-Year Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Japanese Auction Sourcing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  QISJ & JEVIC Odometer Guarantee
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="text-[#a1a1aa] hover:text-white text-left cursor-pointer transition-colors">
                  Site Directory & Links
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#71717a] font-mono">
          <p>© {new Date().getFullYear()} Alberka Motors (Kenya) Ltd. Clean Japanese Imports Since 2000.</p>
          <div className="flex items-center gap-3">
            <span>Mombasa · Nairobi</span>
            <span>·</span>
            <span>KRA & QISJ Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
