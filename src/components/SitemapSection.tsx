import React from 'react';
import { Compass, Car, Shield } from 'lucide-react';
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
    <section className="w-full bg-[#09090b] py-16 sm:py-24 px-4 sm:px-8 text-white border-t border-white/[0.08]">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-400 font-semibold block">
              DIRECTORY & NAVIGATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Site Architecture
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Quick reference index across verified stock, workshop standards, trade-in valuation, and showroom locations.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Box 1: Pages */}
          <div className="relative bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4 before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
              <Compass className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">Navigation</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Home / Overview
                </button>
                <p className="text-xs text-zinc-400">Featured vehicles and Tokyo provenance.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Verified Stock Runway
                </button>
                <p className="text-xs text-zinc-400">Filter by SUV, Hybrid, or 7-Seater MPV.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Workshop & 5,000 KM Warranty
                </button>
                <p className="text-xs text-zinc-400">100-point Mombasa mechanical overhaul.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  The Alberka Journal (Blog)
                </button>
                <p className="text-xs text-zinc-400">Technical research, auction sheets, and Kenya guides.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Trade In & Upgrade
                </button>
                <p className="text-xs text-zinc-400">Instant trade equity calculator.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  26-Year Provenance
                </button>
                <p className="text-xs text-zinc-400">Direct Japanese wholesale auction bidding.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Showroom Locations
                </button>
                <p className="text-xs text-zinc-400">Mombasa Tangana Road & Nairobi Westlands.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Cars */}
          <div className="relative bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4 before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
              <Car className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">Vehicles in Stock</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                  >
                    {v.name}
                  </button>
                  <p className="text-xs text-zinc-400 font-mono">
                    {v.stockNo} · Grade {v.auctionGrade} · KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Guarantees */}
          <div className="relative bg-[#0c0c0f] border border-white/[0.08] rounded-2xl p-6 sm:p-8 space-y-4 before:absolute before:inset-x-6 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent">
            <div className="flex items-center gap-2.5 pb-3 border-b border-white/[0.08]">
              <Shield className="w-4 h-4 text-zinc-400" />
              <h3 className="text-xs font-mono font-semibold text-white uppercase tracking-wider">Dealer Standards</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <span className="font-medium text-white block">5,000 KM Written Warranty</span>
                <p className="text-xs text-zinc-400">Written engine & transmission coverage.</p>
              </li>
              <li>
                <span className="font-medium text-white block">Grade 4.5+ Auction Guarantee</span>
                <p className="text-xs text-zinc-400">Original Japanese auction inspection sheet.</p>
              </li>
              <li>
                <span className="font-medium text-white block">Direct NTSA TIMS Transfer</span>
                <p className="text-xs text-zinc-400">Rapid, legal logbook conveyancing.</p>
              </li>
              <li>
                <span className="font-medium text-white block">Direct Concierge Service</span>
                <p className="text-xs text-zinc-400">Instant VIP WhatsApp support desk.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
