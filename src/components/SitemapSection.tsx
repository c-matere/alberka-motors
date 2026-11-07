import React from 'react';
import { Compass, Car, Wrench, MapPin, Shield, ArrowRight } from 'lucide-react';
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
    <section className="w-full bg-[#160a1d] py-20 sm:py-28 px-6 text-[#f5f5f7] border-t border-[rgba(197,168,128,0.18)]">
      <div className="max-w-[1400px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
            <span className="rr-eyebrow">
              HOUSE COMPENDIUM & DIRECTORY
            </span>
            <div className="h-[1px] w-6 bg-[rgba(197,168,128,0.4)]" />
          </div>
          <h1 className="rr-title-h1 text-[32px] sm:text-[46px] md:text-[54px] mb-4">
            THE HOUSE DIRECTORY.
          </h1>
          <p className="text-[#dfc7a5] font-['Cormorant_Garamond'] text-[18px] sm:text-[21px] italic leading-relaxed max-w-[700px] mx-auto">
            The comprehensive architectural compendium of all curated marques, mechanical atelier divisions, bespoke exchange studios, private showroom suites, and provenance charters.
          </p>
        </div>

        {/* Directory Grid (Hard 0px edges, hairline Rose Gold wire inlay) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Box 1: Platform Hubs */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[rgba(197,168,128,0.15)]">
              <Compass className="w-4 h-4 text-[#c5a880]" />
              <h3 className="font-['Cinzel'] text-[15px] text-[#f5f5f7] uppercase tracking-wider">Primary Chapters</h3>
            </div>
            <ul className="space-y-4 text-[13px]">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  SANCTUARY // OVERVIEW
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Hero cinematic stage & flagship presentation.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  THE FLEET // CURATED MARQUES
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Filterable repository with provenance badges.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  THE ATELIER // TANGANA ROAD
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">48-hour mechanical protocol & 100-point cert.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  BESPOKE COMMISSION & EXCHANGE
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Interactive equity appraisal studio.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  PROVENANCE // JAPANESE BIDDING
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Twenty-six year heritage & Tokyo auction houses.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                >
                  THE PRIVATE SHOWROOM SUITES
                </button>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Mombasa Tangana/Nyali & Nairobi Westlands.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Dedicated Marque Dossiers */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[rgba(197,168,128,0.15)]">
              <Car className="w-4 h-4 text-[#c5a880]" />
              <h3 className="font-['Cinzel'] text-[15px] text-[#f5f5f7] uppercase tracking-wider">Marque Dossiers</h3>
            </div>
            <ul className="space-y-4 text-[13px]">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-['Cinzel'] text-[13px] text-[#f5f5f7] hover:text-[#dfc7a5] text-left cursor-pointer transition-colors uppercase tracking-wider block"
                  >
                    {v.name}
                  </button>
                  <p className="text-[12px] text-[#8c8a94] font-mono mt-0.5">
                    {v.stockNo} // Grade {v.auctionGrade} // KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Concierge & Policies */}
          <div className="bg-[#131316] border border-[rgba(197,168,128,0.25)] p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[rgba(197,168,128,0.15)]">
              <Shield className="w-4 h-4 text-[#c5a880]" />
              <h3 className="font-['Cinzel'] text-[15px] text-[#f5f5f7] uppercase tracking-wider">Covenants & Protocols</h3>
            </div>
            <ul className="space-y-4 text-[13px]">
              <li>
                <span className="font-['Cinzel'] text-[12.5px] text-[#f5f5f7] block uppercase tracking-wider">5,000 KM Written Warranty</span>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Full mechanical backing on engine & transmission.</p>
              </li>
              <li>
                <span className="font-['Cinzel'] text-[12.5px] text-[#f5f5f7] block uppercase tracking-wider">Grade 4.5+ Auction Guarantee</span>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Zero chassis distortion, authenticated mileage.</p>
              </li>
              <li>
                <span className="font-['Cinzel'] text-[12.5px] text-[#f5f5f7] block uppercase tracking-wider">NTSA TIMS Legal Indemnity</span>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Immediate legal logbook conveyancing in-house.</p>
              </li>
              <li>
                <span className="font-['Cinzel'] text-[12.5px] text-[#f5f5f7] block uppercase tracking-wider">Whispers Private Concierge</span>
                <p className="text-[12px] text-[#8c8a94] font-light mt-0.5">Direct 24/7 client communication channel.</p>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
