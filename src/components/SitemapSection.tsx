import React from 'react';
import { Compass, Car, Filter, Wrench, MapPin, BadgeDollarSign, Shield, ArrowRight } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface SitemapSectionProps {
  vehicles: Vehicle[];
  onNavigate: (view: string, param?: string) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
}

export const SitemapSection: React.FC<SitemapSectionProps> = ({
  vehicles,
  onNavigate,
  onSelectVehicle,
}) => {
  return (
    <section className="w-full bg-[#08090a] py-16 px-4 sm:px-6 text-[#d0d6e0] border-t border-[#23252a]">
      <div className="max-w-[1200px] mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-[640px] mx-auto">
          <span className="launch-status-label mb-2">
            Architecture & Navigation Index
          </span>
          <h1 className="hero-display mb-3">
            Site Map.
          </h1>
          <p className="text-[14px] sm:text-[15px] text-[#8a8f98] leading-relaxed">
            The complete directory of all vehicles, engineering divisions, trade-in studios, showroom locations, and operational policies.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Box 1: Platform Hubs */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <Compass className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Primary Platform</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Overview / Flagship Showcase
                </button>
                <p className="text-[12px] text-[#8a8f98]">Hero cinematic stage & company overview.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Curated Showroom Fleet
                </button>
                <p className="text-[12px] text-[#8a8f98]">Interactive vehicle catalog with filters.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Mombasa In-House Workshop
                </button>
                <p className="text-[12px] text-[#8a8f98]">48-hour overhaul and 100-point protocol.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Trade-In & Valuation Studio
                </button>
                <p className="text-[12px] text-[#8a8f98]">Interactive equity appraisal calculator.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Heritage & Japanese Bidding
                </button>
                <p className="text-[12px] text-[#8a8f98]">26-year story and USS Tokyo sourcing.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Showrooms & VIP Test Drives
                </button>
                <p className="text-[12px] text-[#8a8f98]">Mombasa Tangana/Nyali & Nairobi Westlands.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Dedicated Car Pages */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <Car className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Vehicle Product Pages</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                  >
                    {v.name}
                  </button>
                  <p className="font-mono text-[11px] text-[#8a8f98]">
                    Stock #{v.stockNo} · KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Technical & Workshop Protocol */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <Wrench className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Workshop & Quality</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  100-Point Pre-Delivery Protocol
                </button>
                <p className="text-[12px] text-[#8a8f98]">Full checklist covering 6 mechanical stages.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  5,000 km Warranty Covenant
                </button>
                <p className="text-[12px] text-[#8a8f98]">Covered powertrain and driveline terms.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Synthetic Lubricant Overhaul
                </button>
                <p className="text-[12px] text-[#8a8f98]">Castrol Edge synthetic oil specification.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Computer Diagnostic Module Scans
                </button>
                <p className="text-[12px] text-[#8a8f98]">OBD-II ECU scans using factory software.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Hybrid Battery Health Certification
                </button>
                <p className="text-[12px] text-[#8a8f98]">Delta voltage & SOH load analysis.</p>
              </li>
            </ul>
          </div>

          {/* Box 4: Showrooms & Desks */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <MapPin className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Locations & Contact</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Mombasa Island Flagship (Tangana Rd)
                </button>
                <p className="text-[12px] text-[#8a8f98]">Opposite AutoXpress · Tel: +254 714 333888.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Mombasa Nyali Branch (Links Rd)
                </button>
                <p className="text-[12px] text-[#8a8f98]">Coast retail showroom & customer reception.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Nairobi Westlands Hub (Mwanzi Rd)
                </button>
                <p className="text-[12px] text-[#8a8f98]">Opposite Westgate Mall · Tel: +254 748 999333.</p>
              </li>
              <li>
                <a
                  href="https://wa.me/254714333888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-normal text-[#8a8f98] hover:text-[#ffffff] transition-colors"
                >
                  WhatsApp Support Concierge
                </a>
                <p className="text-[12px] text-[#8a8f98]">Instant auction sheet & photo requests.</p>
              </li>
            </ul>
          </div>

          {/* Box 5: Sourcing & Finance */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <BadgeDollarSign className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Financing & Sourcing</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Trade-In Valuation Studio
                </button>
                <p className="text-[12px] text-[#8a8f98]">Apply current vehicle as direct equity.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  USS Tokyo & TAA Direct Bidding
                </button>
                <p className="text-[12px] text-[#8a8f98]">Custom auction ordering direct from Japan.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-normal text-[#ffffff] hover:text-[#e4f222] text-left cursor-pointer transition-colors"
                >
                  Asset Finance Partnerships
                </button>
                <p className="text-[12px] text-[#8a8f98]">Up to 80% financing via NCBA, Stanbic, I&M.</p>
              </li>
            </ul>
          </div>

          {/* Box 6: Standards & Legal */}
          <div className="bg-[#0f1011] border border-[#23252a] rounded-[12px] p-6 sm:p-8 hover:border-[#383b3f] transition-all">
            <div className="flex items-center gap-2 pb-3.5 mb-4 border-b border-[#23252a]">
              <Shield className="w-4 h-4 text-[#8a8f98]" />
              <h3 className="text-[16px] font-medium text-[#ffffff]">Import Standards & Legal</h3>
            </div>
            <ul className="space-y-3 text-[13px]">
              <li>
                <span className="font-normal text-[#ffffff]">KRA Duty Clearance</span>
                <p className="text-[12px] text-[#8a8f98]">All import duties, VAT, and levies paid in full.</p>
              </li>
              <li>
                <span className="font-normal text-[#ffffff]">QISJ / JEVIC Certification</span>
                <p className="text-[12px] text-[#8a8f98]">Authenticated Japanese odometer certificates.</p>
              </li>
              <li>
                <span className="font-normal text-[#ffffff]">NTSA TIMS Registration</span>
                <p className="text-[12px] text-[#8a8f98]">Clean logbook transfer directly into client name.</p>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
