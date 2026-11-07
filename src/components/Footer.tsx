import React from 'react';
import { Vehicle } from '../data/vehicles';

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
    <footer className="w-full bg-[#08090a] border-t border-[#23252a] text-[#8a8f98] text-[13px] py-16 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Footnote Disclaimers (Linear Ash #62666d) */}
        <div className="border-b border-[#23252a] pb-8 mb-10 space-y-2.5 leading-[1.6] text-[12px] text-[#62666d]">
          <p>
            1. 5,000 km Warranty Covenant: The Alberka Motors 5,000 km / 3-Month Warranty applies to all verified retail passenger vehicles. Covers internal lubricated engine mechanical components and automatic transmission/transaxle assemblies. Subject to standard operating guidelines and documented service records at our approved workshop facilities.
          </p>
          <p>
            2. Transparent Vehicle Pricing: All quoted prices in Kenya Shillings (KES) are inclusive of 16% VAT, Import Duty, Excise Duty, and Railway Development Levy. Number plate registration and logbook transfer handled directly by our Mombasa documentation desk.
          </p>
          <p>
            3. Japanese Auction Grading: Grade 4.5 vehicles represent top-tier cosmetic and mechanical condition with genuine mileage verified by QISJ or JEVIC pre-shipment inspections.
          </p>
        </div>

        {/* Brand Logo & Identity Bar */}
        <div className="flex items-center gap-3.5 mb-10 pb-6 border-b border-[#23252a]">
          <img
            src="/alberka-logo-cropped.png"
            alt="Alberka Motors Kenya"
            className="h-9 w-auto object-contain"
          />
          <div>
            <span className="text-[14px] font-[510] text-white block leading-tight">Alberka Motors (Kenya) Ltd</span>
            <span className="text-[11px] font-mono text-[#8a8f98]">Precision Japanese Mobility · Est. 2000 Mombasa & Nairobi</span>
          </div>
        </div>

        {/* Structured Multi-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          <div>
            <h4 className="font-[510] text-white text-[13px] mb-3 uppercase tracking-wider font-mono">Explore Fleet</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  All Showroom Fleet
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  SUVs & 4WD
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Hybrids & e-POWER
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Executive MPVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Compact Crossovers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[510] text-white text-[13px] mb-3 uppercase tracking-wider font-mono">Featured Models</h4>
            <ul className="space-y-2 text-[13px]">
              {vehicles.slice(0, 5).map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="text-[#8a8f98] hover:text-white text-left truncate max-w-[160px] cursor-pointer transition-colors"
                  >
                    {v.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[510] text-white text-[13px] mb-3 uppercase tracking-wider font-mono">Services</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa Workshop
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  150-Point Overhaul
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  5,000 km Warranty
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Trade-In Valuation
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Asset Finance
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[510] text-white text-[13px] mb-3 uppercase tracking-wider font-mono">Showrooms</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa — Tangana Rd
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Mombasa — Nyali
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Nairobi — Karen Hub
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Port Clearing Lounge
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-[510] text-white text-[13px] mb-3 uppercase tracking-wider font-mono">Atelier Heritage</h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Tokyo Auction Houses
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  QISJ Inspection Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Client Provenance
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="text-[#8a8f98] hover:text-white text-left cursor-pointer transition-colors">
                  Directory Index
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-[#23252a] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[#62666d] font-mono">
          <p>© {new Date().getFullYear()} Alberka Motors (Kenya) Ltd. Precision Japanese & European automotive curation.</p>
          <div className="flex items-center gap-6 text-[#8a8f98]">
            <span>Mombasa · Nairobi</span>
            <span className="w-1 h-1 rounded-full bg-[#23252a]" />
            <span>KRA & QISJ Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
