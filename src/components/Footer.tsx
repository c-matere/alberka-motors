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
    <footer className="w-full bg-[#0f0714] border-t border-[rgba(197,168,128,0.2)] text-[#8c8a94] text-[13px] py-20 px-6">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Footnote Disclaimers */}
        <div className="border-b border-[rgba(197,168,128,0.15)] pb-10 mb-12 space-y-3 leading-[1.7] text-[12px] text-[#8c8a94] font-light">
          <p>
            1. <strong className="text-[#dfc7a5] font-['Cinzel'] uppercase">5,000 KM Warranty Covenant:</strong> The Alberka Motors 5,000 km / 90-Day Warranty applies to all verified retail passenger motor cars. Encompasses internal lubricated engine mechanical components and automatic transmission/transaxle assemblies. Subject to standard operating guidelines and verified service records at our approved coastal atelier facilities.
          </p>
          <p>
            2. <strong className="text-[#dfc7a5] font-['Cinzel'] uppercase">Acquisition Valuation Transparency:</strong> All stated values in Kenya Shillings (KES) are inclusive of 16% VAT, Import Duty, Excise Duty, and Railway Development Levy. Number plate registration and logbook conveyancing handled directly by our Mombasa legal documentation desk.
          </p>
          <p>
            3. <strong className="text-[#dfc7a5] font-['Cinzel'] uppercase">Japanese Auction Authenticity:</strong> Grade 4.5+ motor cars represent top-tier cosmetic and mechanical condition with genuine odometer distance certified by QISJ or JEVIC pre-export inspections.
          </p>
        </div>

        {/* Brand Insignia & Heritage Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-[rgba(197,168,128,0.15)]">
          <div className="flex items-center gap-4">
            <img
              src="/alberka-logo-cropped.png"
              alt="Alberka Motors Kenya"
              className="h-10 w-auto object-contain"
            />
            <div className="border-l border-[rgba(197,168,128,0.25)] pl-4">
              <span className="font-['Cinzel'] text-[14px] tracking-[0.25em] text-[#f5f5f7] block leading-tight">
                ALBERKA MOTORS (KENYA) LTD
              </span>
              <span className="font-['Cinzel'] text-[10px] tracking-[0.2em] text-[#c5a880] mt-0.5 block">
                HOUSE OF BESPOKE JAPANESE MARQUES // EST. 2000
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/254714333888?text=Salutations%20Alberka%20Motors.%20I%20wish%20to%20consult%20the%20concierge."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-rr-ghost !py-2 !px-4 !text-[11px]"
            >
              WHISPERS PRIVATE CONCIERGE
            </a>
          </div>
        </div>

        {/* Structured Multi-Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          
          <div>
            <h4 className="font-['Cinzel'] text-[#dfc7a5] text-[11px] mb-4 uppercase tracking-[0.2em]">THE FLEET</h4>
            <ul className="space-y-2.5 text-[12.5px]">
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  All Showroom Marques
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  All-Terrain Luxury SUVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Hybrids & e-POWER Vanguard
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Executive Suites & MPVs
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('inventory')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Compact Crossovers
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Cinzel'] text-[#dfc7a5] text-[11px] mb-4 uppercase tracking-[0.2em]">FLAGSHIP MARQUES</h4>
            <ul className="space-y-2.5 text-[12.5px]">
              {vehicles.slice(0, 5).map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="text-[#8c8a94] hover:text-[#f5f5f7] text-left truncate max-w-[180px] cursor-pointer transition-colors"
                  >
                    {v.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-['Cinzel'] text-[#dfc7a5] text-[11px] mb-4 uppercase tracking-[0.2em]">THE ATELIERS</h4>
            <ul className="space-y-2.5 text-[12.5px]">
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Tangana Road Mechanical Bays
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  100-Point Inspection Protocol
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('workshop')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  5,000 KM Written Covenant
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Trade-In Equity Appraisal
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('trade-in')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Asset Finance Partnership
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Cinzel'] text-[#dfc7a5] text-[11px] mb-4 uppercase tracking-[0.2em]">THE PRIVATE SUITES</h4>
            <ul className="space-y-2.5 text-[12.5px]">
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Mombasa — Tangana Rd Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Mombasa — Nyali Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Nairobi — Westlands Suite
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('locations')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Maritime Port Logistics
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-['Cinzel'] text-[#dfc7a5] text-[11px] mb-4 uppercase tracking-[0.2em]">PROVENANCE</h4>
            <ul className="space-y-2.5 text-[12.5px]">
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  USS Tokyo & CAA Bidding
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  QISJ & JEVIC Standards
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  Twenty-Six Year Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sitemap')} className="text-[#8c8a94] hover:text-[#f5f5f7] text-left cursor-pointer transition-colors">
                  House Directory Index
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 border-t border-[rgba(197,168,128,0.15)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#8c8a94] font-mono">
          <p>© {new Date().getFullYear()} Alberka Motors (Kenya) Ltd. Purveyors of Transcendent Japanese Motor Cars.</p>
          <div className="flex items-center gap-4 text-[#8c8a94]">
            <span>Mombasa · Nairobi</span>
            <span className="text-[rgba(197,168,128,0.4)]">//</span>
            <span>KRA & QISJ Compliant</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
