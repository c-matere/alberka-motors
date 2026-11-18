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
    <section className="w-full bg-transparent py-16 sm:py-24 px-4 sm:px-8 text-zinc-900 border-t border-zinc-200">
      <div className="max-w-[1240px] mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center justify-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-zinc-600 font-semibold block">
              DIRECTORY & NAVIGATION
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Site Architecture
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm">
            Quick reference index across verified stock, workshop standards, trade-in valuation, and showroom locations.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Box 1: Pages */}
          <div className="relative bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
              <Compass className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-mono font-semibold text-zinc-950 uppercase tracking-wider">Navigation</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  Home / Overview
                </button>
                <p className="text-xs text-zinc-600">Featured vehicles and Tokyo provenance.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  Verified Stock Runway
                </button>
                <p className="text-xs text-zinc-600">Filter by SUV, Hybrid, or 7-Seater MPV.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  Workshop & 100-Point Overhaul
                </button>
                <p className="text-xs text-zinc-600">100-point mechanical overhaul & fluids service.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  The Alberka Journal (Blog)
                </button>
                <p className="text-xs text-zinc-600">Technical research, auction sheets, and Kenya guides.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  Showroom & Workshop Hub
                </button>
                <p className="text-xs text-zinc-600">Next to Ganjoni Primary School, Mombasa.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  26-Year Provenance
                </button>
                <p className="text-xs text-zinc-600">Direct Japanese wholesale auction bidding.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                >
                  Showroom Locations
                </button>
                <p className="text-xs text-zinc-600">Tangana Road Flagship & Westlands Executive Hub.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Cars */}
          <div className="relative bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
              <Car className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-mono font-semibold text-zinc-950 uppercase tracking-wider">Vehicles in Stock</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-medium text-zinc-950 hover:text-zinc-700 text-left cursor-pointer transition-colors block"
                  >
                    {v.name}
                  </button>
                  <p className="text-xs text-zinc-600 font-mono">
                    {v.stockNo} · Grade {v.auctionGrade} · KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Guarantees */}
          <div className="relative bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-200">
              <Shield className="w-4 h-4 text-red-600" />
              <h3 className="text-xs font-mono font-semibold text-zinc-950 uppercase tracking-wider">Dealer Standards</h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li>
                <span className="font-medium text-zinc-950 block">100-Point Pre-Delivery Overhaul</span>
                <p className="text-xs text-zinc-600">Fresh synthetic fluids, filters & electronic diagnostic scan.</p>
              </li>
              <li>
                <span className="font-medium text-zinc-950 block">Grade 4.5+ Auction Guarantee</span>
                <p className="text-xs text-zinc-600">Original Japanese auction inspection sheet.</p>
              </li>
              <li>
                <span className="font-medium text-zinc-950 block">Direct NTSA TIMS Transfer</span>
                <p className="text-xs text-zinc-600">Rapid, legal logbook conveyancing.</p>
              </li>
              <li>
                <span className="font-medium text-zinc-950 block">Direct Concierge Service</span>
                <p className="text-xs text-zinc-600">Instant VIP WhatsApp support desk.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
