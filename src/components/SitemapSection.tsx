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
    <section className="w-full bg-[#09090b] py-20 px-4 sm:px-6 text-white border-t border-zinc-800">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
            <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold block">
              Directory & Quick Links
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Explore Alberka Motors
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base">
            Find cars in stock, learn about our 5,000 KM warranty, trade-in options, and showroom locations in Mombasa and Nairobi.
          </p>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: Pages */}
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <Compass className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Main Pages</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('overview')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Home / Overview
                </button>
                <p className="text-xs text-zinc-400">Featured cars and introduction.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('inventory')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Cars in Stock (Showroom)
                </button>
                <p className="text-xs text-zinc-400">Filter by SUV, Hybrid, Van, or Hatchback.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshop')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Workshop & 5,000 KM Warranty
                </button>
                <p className="text-xs text-zinc-400">Our 100-point Mombasa check and full warranty.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('trade-in')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Trade In Your Old Car
                </button>
                <p className="text-xs text-zinc-400">Instant trade-in appraisal and vehicle upgrade.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Why Alberka Motors
                </button>
                <p className="text-xs text-zinc-400">26 years in Kenya, verified Japanese auction sheets.</p>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('locations')}
                  className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                >
                  Our Showrooms
                </button>
                <p className="text-xs text-zinc-400">Mombasa Tangana Road & Nairobi Westlands.</p>
              </li>
            </ul>
          </div>

          {/* Box 2: Cars */}
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <Car className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Available Cars</h3>
            </div>
            <ul className="space-y-3 text-sm">
              {vehicles.map((v) => (
                <li key={v.id}>
                  <button
                    onClick={() => onSelectVehicle(v)}
                    className="font-medium text-white hover:text-zinc-300 text-left cursor-pointer transition-colors block"
                  >
                    {v.name}
                  </button>
                  <p className="text-xs text-zinc-400 font-mono">
                    {v.stockNo} • Grade {v.auctionGrade} • KES {v.priceKes.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 3: Guarantees */}
          <div className="bg-[#121215] border border-zinc-800 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-zinc-800">
              <Shield className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Our Guarantees</h3>
            </div>
            <ul className="space-y-3 text-sm">
              <li>
                <span className="font-medium text-white block">5,000 KM Written Warranty</span>
                <p className="text-xs text-zinc-400">Full mechanical coverage for engine and gearbox.</p>
              </li>
              <li>
                <span className="font-medium text-white block">Grade 4.5+ Auction Guarantee</span>
                <p className="text-xs text-zinc-400">Genuine mileage and original Japanese auction sheet.</p>
              </li>
              <li>
                <span className="font-medium text-white block">Clean NTSA Logbook Transfer</span>
                <p className="text-xs text-zinc-400">Quick, safe transfer to your name via TIMS.</p>
              </li>
              <li>
                <span className="font-medium text-white block">WhatsApp Direct Contact</span>
                <p className="text-xs text-zinc-400">Chat directly with our showroom team anytime.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
